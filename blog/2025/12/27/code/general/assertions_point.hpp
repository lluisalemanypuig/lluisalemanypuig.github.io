#pragma once

static_assert(is_point_v<point<2>>);
static_assert(is_point_v<point<2, float>>);
static_assert(is_point_v<const point<2>&>);
static_assert(is_point_v<const point<2, float>&>);
static_assert(point<1>::depth == 0);
static_assert(point<2>::depth == 0);
static_assert(point<3>::depth == 0);
static_assert(point<4>::depth == 0);
