#pragma once

typedef bezier<point<2>, point<2>> bezier1;
typedef bezier<bezier1, bezier1> bezier2;
typedef bezier<bezier2, bezier2> bezier3;
typedef bezier<bezier3, bezier3> bezier4;
typedef bezier<bezier4, bezier4> bezier5;

typedef bezier<const point<2>&, const point<2>&> bezier1_constpoint;
typedef bezier<bezier1_constpoint, bezier1_constpoint> bezier2_constpoint;
typedef bezier<bezier2_constpoint, bezier2_constpoint> bezier3_constpoint;
typedef bezier<bezier3_constpoint, bezier3_constpoint> bezier4_constpoint;
typedef bezier<bezier4_constpoint, bezier4_constpoint> bezier5_constpoint;

static_assert(not is_bezier_v<int>);
static_assert(is_bezier_v<bezier<point<2>, point<2>>>);

static_assert(bezier1::depth == 1);
static_assert(bezier1::dimension == 2);

static_assert(bezier2::depth == 2);
static_assert(bezier2::dimension == 2);

static_assert(bezier3::depth == 3);
static_assert(bezier3::dimension == 2);

static_assert(bezier4::depth == 4);
static_assert(bezier4::dimension == 2);

static_assert(bezier5::depth == 5);
static_assert(bezier5::dimension == 2);

static_assert(bezier1_constpoint::depth == 1);
static_assert(bezier1_constpoint::dimension == 2);

static_assert(bezier2_constpoint::depth == 2);
static_assert(bezier2_constpoint::dimension == 2);

static_assert(bezier3_constpoint::depth == 3);
static_assert(bezier3_constpoint::dimension == 2);

static_assert(bezier4_constpoint::depth == 4);
static_assert(bezier4_constpoint::dimension == 2);

static_assert(bezier5_constpoint::depth == 5);
static_assert(bezier5_constpoint::dimension == 2);

static_assert(is_bezier_v<bezier1>);
static_assert(is_bezier_v<bezier2>);
static_assert(is_bezier_v<bezier3>);
static_assert(is_bezier_v<bezier4>);
static_assert(is_bezier_v<bezier5>);

static_assert(is_bezier_v<bezier1_constpoint>);
static_assert(is_bezier_v<bezier2_constpoint>);
static_assert(is_bezier_v<bezier3_constpoint>);
static_assert(is_bezier_v<bezier4_constpoint>);
static_assert(is_bezier_v<bezier5_constpoint>);
