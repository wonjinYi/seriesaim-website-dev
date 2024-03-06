<template>
	<header :class="{ 'header-white': headerColor == HEADER_COLOR.WHITE }">
		<!-- 로고 이미지 -->
		<div class="header-logo" @click="changePage('Main')">
			<img :src="logo" alt="logo" />
		</div>

		<!-- 네비게이션 -->
		<nav>
			<!-- 페이지 이동 버튼 -->
			<div class="nav-item" @click="changePage('About')">
				<span>ABOUT</span>
			</div>
			<div class="nav-item" @click="changePage('Works')">
				<span>WORKS</span>
			</div>
			<div class="nav-item" @click="changePage('Contact')">
				<span>CONTACT</span>
			</div>
			<!-- 선택된 페이지를 나타내는 아랫점 -->
			<div class="dot"></div>
		</nav>
	</header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/images/logo_black.png';

// 라우터 설정
const router = useRouter();
const routeListForWhiteHeader = ['Main', 'Works'];

// 헤더 색상 설정
const HEADER_COLOR = { BLACK: 'BLACK', WHITE: 'WHITE' };
const headerColor = computed(() => {
	const routeName = router.currentRoute.value.name;
	return routeListForWhiteHeader.includes(routeName)
		? HEADER_COLOR.WHITE
		: HEADER_COLOR.BLACK;
});

// 헤더 아래 점 표시/위치 설정
const SHOW_DOT = { TRUE: '1', FALSE: '0' }; // opacity
const showDot = computed(() => {
	const routeName = router.currentRoute.value.name;
	const hideDotRoute = ['Main', 'NotFound', 'FormSubmitted', 'FormViewer'];
	if (hideDotRoute.includes(routeName)) {
		return SHOW_DOT.FALSE;
	} else {
		return SHOW_DOT.TRUE;
	}
});
const DOT_POSITION = { ABOUT: '-6rem', WORKS: '0rem', CONTACT: '6rem' };
const dotPosition = computed(() => {
	const routeName = router.currentRoute.value.name;
	if (!routeName) return '0';
	else return DOT_POSITION[routeName.toUpperCase()];
});

// 페이지 이동
function changePage(dest) {
	router.push({ name: dest });
}
</script>

<style lang="scss" scoped>
header {
	width: 100%;
	text-align: center;
	font-weight: 500;
	padding: 1.5rem;
	filter: brightness(1);
	transition: filter 1s;

	.header-logo img {
		width: 5rem;
		height: auto;
		cursor: pointer;
	}

	nav {
		display: flex;
		justify-content: center;

		position: relative;
		padding-top: 1rem;

		.nav-item {
			width: 6rem;
			justify-content: center;
			cursor: pointer;
		}
		.dot {
			position: absolute;
			top: 2.5rem;
			transform: translateX(v-bind(dotPosition));
			opacity: v-bind(showDot);
			width: 4px;
			height: 4px;
			background-color: black;
			border-radius: 50%;

			transition: all 0.5s;
		}
	}
}
header.header-white {
	transition: filter 1s;
	-webkit-filter: brightness(0) invert(1);
	filter: brightness(0) invert(1);
}
</style>
