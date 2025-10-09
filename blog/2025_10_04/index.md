# Premature optimizations and late optimizations in a chess puzzle database

In this post, I would like to talk about how optimizing some friendly-looking code that did not look like it could have much effect on the larger project, led to a 2x speed-up, and that this optimization could have been applied in the early stages of coding the project had we written efficient code by default, had we not followed this "avoid premature optimizations" so strictly.

## The setting

This project is a chess puzzle database. Usually, people are interested in chess puzzles as a function of their [theme](https://lichess.org/training/themes), of which there are dozens. But I am interested in building a database which I can query for positions with a specific configuration of pieces. For example, I want to see the list of all the positions with, say,

- exactly 3 white pawns
- at most 4 black rooks
- a total of at most 3 bishops (counting both black' and white's bishops)
- ...

This would perhaps be more interesting if I said that I wanted to practice puzzles of bishop endings (positions with only pawns and bishops), or knight endings, ...

In code, this can be easily built by loading all positions into an array, and then sorting positions by their number of pieces of each type. For example, sort by number of white pawns first, then break ties with the number of black pawns, then break ties with the number of white rooks, then knights, then bishops, then queens. We can add the player's turn in the position as well. This is Ok (I guess), but searching through this would be a nightmare if I wanted to select all the positions with exactly 3 bishops (and the rest we ignore). I cannot possibly imagine what the searching algorithm would look like, and we cannot change the ordering with every query.

This is one of the reasons why I built the [classification-tree](https://github.com/lluisalemanypuig/classification-tree) data structure. The classification tree is a tree-like data structure that has a fixed height, decided at compile time, and which corresponds to a number of key values to use to classify objects; each key is a property of the objects to be stored in the tree. This is a no-brainer, really, [check this figure](https://github.com/lluisalemanypuig/classification-tree/blob/main/figures/classification_tree_example.pdf). The internal nodes of the tree store key values, and only the leaves of the tree store the objects. Now, I thought that storing unique objects would be nice, and I do not think that all objects can be "sortable", so to do that, we would have to iterate over all objects in a leaf node checking for equality with the new object. If any pair matches, we can keep a count on the number of instances found for that matching object in the leaf node.

The classification tree can be used in a chess puzzle database, [chesspebase](https://github.com/lluisalemanypuig/chesspebase), to quickly retrieve the positions we are interested in: make the tree have 11 levels: one for each piece and color (white panws, black pawns, white rooks, black rooks, ...) and another extra level for the player turn. If we want the positions with exactly 4 black pawns, iterate over all nodes at the second level (first level is white pawns), and then check the subtrees corresponding to the key equal to 4 (note, we want 4 black pawns, so we check for key equal to 4, is everybody following?). If coded correctly, _all_ the leaves in those subtrees the positions will have exactly 4 black pawns. How cool is that?

## The performance issues

First, I would like to show the average time (over a number of executions) that it takes to load several databases of varying sizes, each 10 times larger than the previous. Each of these databases is a random subset of the full database, which was downloaded from [lichess](https://database.lichess.org/#puzzles) on March 2025.


| Database  | Execution time (s)  | Runs |
| --------: | ------------------: | ---: |
| 100       |  0.00026259         | 100  |
| 1000      |  0.00166805         | 100  |
| 10000     |  0.00972439         | 100  |
| 100000    |  0.12114961         | 100  |
| 1000000   |  4.497899           | 100  |
| full      | 90.8613162          | 5    |


To load the full database (a puny file of size a bit less than 1 GB), we need 90 seconds. This is not particularly fast, to say the least. Let's look at what `perf stat -d` has to say about loading the database with `1000000` positions.


| Value               | Concept               | Value                              |          |
| ------------------: | :-------------------- | ---------------------------------- | -------- |
|       4,422.20 (ms) | task-clock            |    1.000 CPUs utilized             |          |
|             22      | context-switches      |    4.975 /sec                      |          |
|              1      | cpu-migrations        |    0.226 /sec                      |          |
|         29,892      | page-faults           |    6.760 K/sec                     |          |
| 12,923,390,987      | cycles                |    2.922 GHz                       | (49.99%) |
| 11,321,687,649      | instructions          |    0.88  insn per cycle            | (62.49%) |
|  3,373,020,130      | branches              |  762.747 M/sec                     | (62.49%) |
|    242,417,774      | branch-misses         |    7.19% of all branches           | (62.49%) |
|  3,128,036,994      | L1-dcache-loads       |  707.348 M/sec                     | (62.50%) |
|    422,478,735      | L1-dcache-load-misses |   13.51% of all L1-dcache accesses | (62.52%) |
|     92,134,120      | LLC-loads             |   20.834 M/sec                     | (50.02%) |
|     41,885,020      | LLC-load-misses       |   45.46% of all LL-cache accesses  | (50.01%) |


Around 3 billion branches... and around 7% of them are misses. I majored in CS so I clearly know nothing about computer architecture (just press that button, and the thing turns on), but if I learned something is that too much branching goes against performance. So how do we reduce this? We run `perf record -g -F 1000` for a database with `1000000` positions.

Of all the things shown in the report, the following stood out to me:
```
16.28%  1.50%  cli  LIB  [.]  cpb::parse_fen(std::basic_string_view<...>)
 8.08%  8.00%  cli  LIB  [.]  cpb::position::operator==(cpb::position const&) const
 6.14%  0.01%  cli  LIB  [.]  __gnu_cxx::__normal_iterator<...>...
```
(the report has been edited to remove irrelevant details of this excerpt and to make it fit on screen)

Yes, we expect to be parsing a lot of FEN strings from the files so it is reasonable that the `parse_fen` function takes up 16% of the total execution time. But what about `position::operator==`? That takes up 8% of the time. Yes, we have to check that every new position loaded does not already exist in its corresponding leaf node. But I felt that was a little too much. And then I looked at the code for comparing two positions:

```c++
[[nodiscard]] constexpr bool operator== (const position& p) const noexcept
{
    for (std::size_t i = 0; i < 64; ++i) {
        if (pieces[i] != p.pieces[i]) {
            return false;
        }
    }
    return (en_passant[0] == p.en_passant[0]) and
            (en_passant[1] == p.en_passant[1]) and
            (player_turn == p.player_turn) and
            (white_king_castle == p.white_king_castle) and
            (white_queen_castle == p.white_queen_castle) and
            (black_king_castle == p.black_king_castle) and
            (black_queen_castle == p.black_queen_castle);
}
```

That for loop is correct. But didn't we have billions of branches? And most of them misses? So, if it is used so much, and we have so many branches (and quite some of them failing), maybe we could do something about this. I first thought about using `[[unlikely]]` but this does not affect performance at all in this case [^1].

## The fix

Then I realized that we are comparing 64 bytes. This is actually 8 integer values of 8 bytes each. So we can compare the pieces board as if they were integers, thus reducing the number of comparisons by a factor of 8. Let's try this, then. I will use `reinterpret_cast<const int64_t*>`. Notice, that this would have been perceived as a premature optimization.

```c++
[[nodiscard]] constexpr bool operator== (const position& p) const noexcept
{
    const int64_t *ptr1 = reinterpret_cast<const int64_t *>(&pieces);
    const int64_t *ptr2 = reinterpret_cast<const int64_t *>(&p.pieces);
    return (ptr1[0] == ptr2[0]) and (ptr1[1] == ptr2[1]) and
            (ptr1[2] == ptr2[2]) and (ptr1[3] == ptr2[3]) and
            (ptr1[4] == ptr2[4]) and (ptr1[5] == ptr2[5]) and
            (ptr1[6] == ptr2[6]) and (ptr1[7] == ptr2[7]) and
            (en_passant[0] == p.en_passant[0]) and
            (en_passant[1] == p.en_passant[1]) and
            (player_turn == p.player_turn) and
            (white_king_castle == p.white_king_castle) and
            (white_queen_castle == p.white_queen_castle) and
            (black_king_castle == p.black_king_castle) and
            (black_queen_castle == p.black_queen_castle);
}
```

This is the result of `perf record` for the same database file:
```
17.45%  1.50%  cli  LIB  [.]  cpb::parse_fen(std::basic_string_view<...>)
....
 3.66%  8.00%  cli  LIB  [.]  cpb::position::operator==(cpb::position const&) const
```

The new equality operator takes up now 3.66% of the time. Now let's look at the output of `perf stat`

| Value         | Concept               | Value                              |          |
|-------------: | :-------------------- | ---------------------------------- | -------- |
|            13 | context-switches      |    4.921 /sec                      |          |
|             0 | cpu-migrations        |    0.000 /sec                      |          |
|        29,893 | page-faults           |   11.316 K/sec                     |          |
| 6,917,255,381 | cycles                |    2.619 GHz                       | (49.96%) |
| 4,833,879,716 | instructions          |    0.70  insn per cycle            | (62.49%) |
| 1,217,335,785 | branches              |  460.837 M/sec                     | (62.53%) |
|    59,554,067 | branch-misses         |    4.89% of all branches           | (62.53%) |
| 1,026,997,590 | L1-dcache-loads       |  388.782 M/sec                     | (62.53%) |
|   349,179,593 | L1-dcache-load-misses |   34.00% of all L1-dcache accesses | (62.52%) |
|   226,743,859 | LLC-loads             |   85.837 M/sec                     | (49.96%) |
|   104,289,805 | LLC-load-misses       |   45.99% of all LL-cache accesses  | (49.96%) |


Let's compare the new output with the new output.


| Before         | After         | Concept               |
|--------------: | ------------: | ----------------------|
|             22 |            13 | context-switches      |
|              1 |             0 | cpu-migrations        |
|         29,892 |        29,893 | page-faults           |
| 12,923,390,987 | 6,917,255,381 | cycles                |
| 11,321,687,649 | 4,833,879,716 | instructions          |
|  3,373,020,130 | 1,217,335,785 | branches              |
|    242,417,774 |    59,554,067 | branch-misses         |
|  3,128,036,994 | 1,026,997,590 | L1-dcache-loads       |
|    422,478,735 |   349,179,593 | L1-dcache-load-misses |
|     92,134,120 |   226,743,859 | LLC-loads             |
|     41,885,020 |   104,289,805 | LLC-load-misses       |


Almost half the cycles, around 3x less instructions, almost 3x less branches, around 4x less branch misses. Yes there are more LLC-loads and this LLC-load misses. But how much has our program improved?

| Database  | Execution time (s) :: Before | Execution time (s) :: After |
| --------: | ---------------------------: | :-------------------------- |
| 100       |  0.00026259                  |  0.00038119                 |
| 1000      |  0.00166805                  |  0.00132709                 |
| 10000     |  0.00972439                  |  0.00947381                 |
| 100000    |  0.12114961                  |  0.09934928                 |
| 1000000   |  4.497899                    |  2.58159381                 |
| full      | 90.8613162                   | 46.0575606                  |


The time for the database that really matters is now half of what it was without the "premature" optimization.

## Conclusions

I could have written the already-efficient code when I first wrote the equality operator. Yes, it would have been perceived as a premature optimization because, let's face it, comparing 64 bytes is not that much and I'm sure the compiler can optimize this, right?

But let me share my take on this: I believe is important to build up experiences like this and write code that is as performant as possible by default (as learned from these previous experiences), especially in cases like this where it takes very little effort. And, finally, rather than calling this an _optimization_ at this point of development, I would call it a _late optimization_, one that should have been implemented at the very moment when the operator was written, a time when this would have been perceived as a "premature optimization". Of course, the more learn, the more late optimizations we will make.




[^1]: If you want to play around with this code and the effects of unlikely, go to [this commit of chesspebase](https://github.com/lluisalemanypuig/chesspebase/tree/78517cb88f37a10e3ebbdd8e726fcbaa2a52587d) and [this commit of classification-tree](https://github.com/lluisalemanypuig/classification-tree/tree/3b76d3bc48ad861010402c5dfb1bd6f994bd0dae).


