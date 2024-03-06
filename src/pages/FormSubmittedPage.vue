<template>
	<div class="form-submitted-page">
		<img :src="checkIcon" alt="check-icon" />

		<p>
			<span>제출이 완료되었습니다</span>
		</p>
		<p>
			<span>아래 주소에서 문의하신 내용을 </span>
			<span>다시 확인하실 수 있습니다</span>
		</p>

		<a :href="viewerUrl" target="_blank">{{ viewerUrl }}</a>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import checkIcon from '@/assets/images/about/process/process_08.svg';

const route = useRoute();
const formId = route.params.id;

const viewerUrl = window.location.href.split('/contact')[0] + `/form/${formId}`;
</script>

<style lang="scss" scoped>
.form-submitted-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100vw;
	min-height: calc(100vh - 130px);

	img {
		width: 10rem;
		height: auto;
		filter: brightness(0);
		margin-bottom: 2rem;
	}

	p {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	span {
		text-align: center;
		font-size: 1.2rem;
		font-weight: 200;
		margin: 1rem 0.15rem;
	}

	a {
		text-decoration: none;
		color: black;
		margin-top: 2rem;
		padding: 0.5rem 2rem;
		border-bottom: 2px solid black;
		transition: background-color 0.5s;
		word-wrap: break-word;
		word-break: break-all;
		max-width: 80%;
	}
	a:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
}

@media (max-width: 768px) {
	.form-submitted-page {
		img {
			width: 8rem;
			height: auto;
		}
	}
}
</style>
