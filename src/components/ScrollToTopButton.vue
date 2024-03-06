<template>
	<div
		class="scroll-to-top"
		@click="scrollToTop"
		:class="{
			'up-animated': direction === 'up',
			'down-animated': direction === 'down',
		}"
	>
		<img :src="circleArrow" alt="circle arrow" />
	</div>
</template>

<script setup>
import circleArrow from '@/assets/images/circle_arrow.png';
import { ref } from 'vue';

const direction = ref();
let lastScrollY = 0;

window.addEventListener('scroll', () => {
	const scrollY = window.scrollY;
	direction.value = scrollY > lastScrollY ? 'down' : 'up';
	lastScrollY = scrollY;

	// https://velog.io/@ksh4820/JS-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9C%84%EC%B9%98-%EA%B5%AC%ED%95%98%EA%B8%B0
	let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
	let windowHeight = window.innerHeight; // 스크린 창
	let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
	if (scrollLocation + windowHeight >= fullHeight) {
		direction.value = 'up';
	}
	if (scrollLocation === 0) {
		direction.value = 'down';
	}
});

function scrollToTop() {
	window.scrollTo(0, 0);
}
</script>

<style lang="scss" scoped>
.scroll-to-top {
	position: fixed;
	right: 2rem;
	bottom: 2rem;
	cursor: pointer;
	opacity: 0;
	img {
		width: 4rem;
		height: 4rem;
		transform: rotate(-90deg);
	}
}
.up-animated {
	animation: up 0.25s both;
}
.down-animated {
	animation: down 0.25s both;
}
@keyframes up {
	0% {
		opacity: 0;
		transform: translateY(20%);
	}

	100% {
		opacity: 1;
	}
}
@keyframes down {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateY(20%);
	}
}
</style>
