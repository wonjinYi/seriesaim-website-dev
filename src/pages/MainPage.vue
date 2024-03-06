<!-- 메인 페이지 (페이지 1) -->
<template>
	<div class="main-page">
		<video
			:src="bgVideo"
			autoplay
			muted
			loop
			playsinline
			@timeupdate="handleChange"
			@click="openYoutube"
			style="cursor: pointer"
		></video>
	</div>
</template>

<script setup>
import bgVideo from '@/assets/images/main/ShowReel.mp4';
function openYoutube() {
	window.open('https://www.youtube.com/@SeriesAIM/videos');
}
</script>

<style lang="scss" scoped>
.main-page {
	z-index: -1;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	video {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
