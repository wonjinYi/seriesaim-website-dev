<script setup>
import { ref, computed } from 'vue';
import GoraniTransition from '@/components/GoraniTransition.vue';
import { REF_WORK_LIST as works } from '@/assets/globalState.js';

// 화살표 클릭하면 카드목록으로 이동
const movedest = ref();
function move() {
	movedest.value.scrollIntoView({ behavior: 'smooth' });
}

// 작업내역 썸네일 패치
const thumbnails = computed(() => {
	return works.value.map(w => getYoutubeThumbnails(w['유튜브링크']));
});

function getYoutubeThumbnails(videoUrl) {
	let videoId = '';

	// -- case 1 : youtube.com URL인 경우
	if (videoUrl.includes('youtube.com')) {
		videoId = videoUrl.split('v=')[1].split('&')[0];
	}
	// -- case 2 : youtu.be URL인 경우
	else if (videoUrl.includes('youtu.be')) {
		videoId = videoUrl.split('.be/')[1].split('&')[0];
	}

	return videoId
		? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
		: '';
}

function openVideo(url) {
	window.open(url);
}
</script>

<template>
	<div class="works-page">
		<!-- 인트로 영역 -->
		<div class="intro">
			<!-- 배경 위 텍스트 -->
			<div class="text-container">
				<div class="text-subcontainer">
					<p style="animation-delay: 1s">시리즈에임은 다양한 종류의</p>
					<p style="animation-delay: 1.25s">
						<span style="font-weight: 600">감각적인 영상</span>을 제작합니다
					</p>
				</div>
				<div class="text-subcontainer">
					<p style="animation-delay: 1.5s">
						아래에서 <span style="font-weight: 600">작업 내역</span>을
					</p>
					<p style="animation-delay: 1.75s">
						<span style="font-weight: 600">직접 확인</span>하세요
					</p>
				</div>
			</div>

			<!-- 배경 하단 화살표 버튼 -->
			<div v-if="works.length > 0" class="btn" @click="move">
				<span>➜</span>
			</div>
		</div>

		<!-- 작업내역 영역 -->
		<div v-if="works.length > 0" class="card-container-wrap">
			<gorani-transition transition-name="upfade" :threshold="0">
				<div class="card-container" ref="movedest">
					<!-- 작업내역 카드 -->

					<div
						v-for="(work, idx) in works"
						:key="idx"
						class="card"
						@click="openVideo(work.유튜브링크)"
					>
						<!-- 썸네일 -->

						<div class="img-wrap">
							<img :src="thumbnails[idx]" :alt="`${work.제목} 영상 썸네일`" />
						</div>
						<div class="text-contents">
							<!-- 태그 -->
							<div class="tags">
								<span v-if="work.기획태그_표시" class="tag 기획">기획</span>
								<span v-if="work.촬영태그_표시" class="tag 촬영">촬영</span>
								<span v-if="work.편집태그_표시" class="tag 편집">편집</span>
							</div>
							<!-- 제목, 고객 -->
							<p class="title">{{ work.제목 }}</p>
							<p class="client-name">{{ work.고객 }}</p>
						</div>
					</div>

					<!-- 빈공간채우기 dummy 카드 -->
					<div class="dummy-card"></div>
					<div class="dummy-card"></div>
				</div>
			</gorani-transition>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// vue transition
.card-fadein-enter-active,
.card-fadein-leave-active {
	transition: all 3s;
}
.card-fadein-enter-from,
.card-fadein-leave-to {
	opacity: 0;
	transform: translateY(2rem);
}

// element styles
.intro {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -99;
	min-height: 100vh;
	width: 100%;
	background: url(@/assets/images/works/main.png) no-repeat center;
	background-size: cover;

	animation: fadein-intro 0.5s both;
	animation-delay: 0.5s;
	@keyframes fadein-intro {
		from {
			opacity: 0;

			transform: translateY(-2rem);
		}
		to {
			opacity: 1;
		}
	}

	.text-container {
		position: absolute;
		top: 0;
		left: 10%;

		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100vh;

		color: white;
		text-align: right;
		font-size: 2rem;

		.text-subcontainer {
			padding: 2rem 0;
			line-height: 3rem;
			p {
				animation: intro-text-fadein 0.5s both;
			}
		}
		@keyframes intro-text-fadein {
			from {
				opacity: 0;
				transform: translateY(2rem);
			}
			to {
				opacity: 1;
			}
		}
	}
	.btn {
		display: inline-block;
		position: absolute;
		color: white;
		bottom: 1rem;
		left: calc(50% - 1rem);
		font-size: 2rem;
		transform: rotate(90deg);
		cursor: pointer;
		transition: border;
		animation: jump 1s infinite;
		@keyframes jump {
			0% {
				transform: rotate(90deg) translateX(-0.5rem);
				filter: opacity(0);
			}
			50% {
				transform: rotate(90deg) translateX(0);
				filter: opacity(1);
			}
			100% {
				transform: rotate(90deg) translateX(-0.5rem);
				filter: opacity(0);
			}
		}
	}
}

.card-container-wrap {
	// position: absolute;
	// top: 100vh;
	margin-top: 80vh;
	margin-bottom: 20vh;
	padding: 8rem 1rem;
	width: 100%;

	.spacer {
		flex: 1;
	}
}
.card-container {
	display: flex;
	flex-wrap: wrap;

	justify-content: center;
	align-items: stretch;

	margin: 0 auto;

	.dummy-card {
		// width: 25rem;
		width: 25%;
		margin: 0 2rem;
	}
	.card {
		// width: 25rem;
		width: 25%;
		margin: 2rem;
		background-color: white;
		box-shadow: 3px 5px 7px 0px rgba(200, 200, 200, 1);
		-webkit-box-shadow: 3px 5px 7px 0px rgba(200, 200, 200, 1);
		-moz-box-shadow: 3px 5px 7px 0px rgba(200, 200, 200, 1);

		cursor: pointer;
		transition: transform 0.5s;
		.img-wrap {
			width: 100%;
			img {
				width: 100%;
				height: auto;
				object-fit: cover;
			}
		}
		.text-contents {
			padding: 2% 5%;
			* {
				font-weight: 500;
			}
			.tags {
				.tag {
					display: inline-block;
					padding: 2px 8px;
					margin: 3px;
					border-radius: 2px;
					font-size: 0.9rem;
				}
				.tag.기획 {
					background-color: rgb(255, 242, 183);
				}
				.tag.촬영 {
					background-color: rgb(243, 252, 205);
				}
				.tag.편집 {
					background-color: rgb(248, 233, 233);
				}
			}
			.title {
				font-size: 1.1rem;
				padding: 0.3rem 0 0.8rem 0;
			}
			.client-name {
				color: #ababab;
				font-size: 0.7rem;
				padding-bottom: 0.3rem;
			}
		}
	}
	.card:hover {
		transform: scale(1.1);
		transition: transform 0.25s;
	}
}

@media (max-width: 1500px) {
	.card-container {
		.dummy-card,
		.card {
			width: 40%;
		}
	}
}

// 모바일
@media (max-width: 768px) {
	.intro .text-container {
		font-size: 1.5rem;
	}

	.card-container {
		.dummy-card,
		.card {
			width: 100%;
		}
	}
}
</style>
