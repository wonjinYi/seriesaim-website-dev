<!-- 어바웃 페이지 (페이지 2) -->

<script setup>
import { ref } from 'vue';
import GoraniTransition from '@/components/GoraniTransition.vue';
import HorizontalDivider from '@/components/HorizontalDivider.vue';

import descImg_1 from '@/assets/images/about/1.jpeg';
import descImg_2 from '@/assets/images/about/2.jpeg';

// process 섹션 내용 불러오기
const processList = [
	['서비스 문의 및 신청', '내부 기획', '시나리오 제작', '촬영'], // row 1
	['촬영본 검토', '제작', '피드백 수정', '최종 완성'], // row 2
];
function getNum(rIdx, sIdx) {
	return rIdx * 4 + sIdx + 1;
}
function getImageUrl(num) {
	//https://blogcreator.blog/post/39
	return new URL(
		`/src/assets/images/about/process/process_0${num}.svg`,
		import.meta.url,
	).href;
}

// process 에니메이션 관리
const intersected = ref({
	forbestoutput: false,
	descLeftImaged: false,
	descRightImaged: false,
	process: false,
});

function handleIntersectIn(targetName) {
	intersected.value[targetName] = true;
}

function handleIntersectOut(targetName) {
	setTimeout(() => {
		intersected.value[targetName] = false;
	}, 500);
}
</script>

<template>
	<div class="about-page">
		<!-- 슬로건 인트로 섹션 -->
		<div class="slogan">
			<div class="left slogan-animation" style="animation-delay: 1s">
				<p style="font-weight: 500">{{ `❝ We❜re your media partner ❞` }}</p>
			</div>

			<div class="right">
				<p class="slogan-animation" style="animation-delay: 1.25s">
					<span style="font-weight: 600">시리즈에임</span>은
				</p>
				<p class="slogan-animation" style="animation-delay: 1.5s">
					<span style="font-weight: 600">올라운드 미디어 콘텐츠</span>를
					제작하는
				</p>
				<div class="slogan-right-lastline">
					<!-- 수평 디바이더 -->
					<div class="divider slogan-divider-animation">
						<horizontal-divider />
					</div>
					<!-- 텍스트 -->
					<p class="slogan-animation" style="animation-delay: 1.75s">
						<span style="font-weight: 600">당신의 비즈니스 파트너</span>입니다.
					</p>
				</div>
			</div>
		</div>

		<!-- for best output 타이포그래피 섹션 -->
		<gorani-transition
			transition-name="upfade"
			target-name="forbestoutput"
			@intersect-in="handleIntersectIn"
			@intersect-out="handleIntersectOut"
			:threshold="0.25"
		>
			<div class="for-best-output">
				<!-- for best -->
				<div class="for-best">
					<div class="for word">
						<p
							class="shadow-text"
							:class="{ 'for-animation': intersected.forbestoutput }"
						>
							for
						</p>
						<p class="black-text">for</p>
					</div>
					<div class="best word">
						<p
							class="shadow-text"
							:class="{ 'best-animation': intersected.forbestoutput }"
						>
							best
						</p>
						<p class="black-text">best</p>
					</div>
				</div>
				<!-- output -->
				<div class="output word">
					<p
						class="shadow-text"
						:class="{ 'output-animation': intersected.forbestoutput }"
					>
						output
					</p>
					<p class="black-text">output</p>
				</div>
			</div>
		</gorani-transition>

		<!-- 사진+글 설명 섹션 -->
		<div class="description">
			<gorani-transition
				transition-name="upfade"
				target-name="descLeftImaged"
				@intersect-in="handleIntersectIn"
				@intersect-out="handleIntersectOut"
			>
				<div class="item left-imged">
					<div class="img-wrap">
						<img :src="descImg_1" alt="암실에서 촬영하는 이미지" />
					</div>
					<div class="text-container">
						<p
							class="text"
							:class="{ 'left-imged-animation': intersected.descLeftImaged }"
							:style="{
								'animation-delay': `${0.25 * (index + 1)}s`,
							}"
							v-for="(text, index) in [
								'시리즈에임은 예술가와 감독 모두가 영감을 주고',
								'협력적인 환경에서 작업할 수 있는 스튜디오를',
								'만들겠다는 비전을 가지고 설립되었습니다.',
								'미디어 콘텐츠를 통해 수용자와',
								'창의적인 커뮤니케이션을 주도하는 것이',
								'저희의 목표입니다.',
							]"
							:key="index"
						>
							{{ text }}
						</p>
					</div>
				</div>
			</gorani-transition>

			<gorani-transition
				transition-name="upfade"
				target-name="descRightImaged"
				@intersect-in="handleIntersectIn"
				@intersect-out="handleIntersectOut"
			>
				<div class="item right-imged">
					<div class="img-wrap">
						<img :src="descImg_2" alt="암실에서 촬영하는 이미지" />
					</div>
					<div class="text-container">
						<p
							class="text"
							:class="{ 'right-imged-animation': intersected.descRightImaged }"
							:style="{
								'animation-delay': `${0.25 * (index + 1)}s`,
							}"
							v-for="(text, index) in [
								'시리즈에임은 유수의 스타트업 기업과의',
								'인터뷰 콘텐츠를 제작하면서 혁신과 도전의 가치를',
								'기업 정신에 새겼으며,',
								'단지 영상을 위한 영상이 아닌 창작자와 수용자 모두가',
								'만족할 수 있는 콘텐츠를 제작하고자 합니다.',
							]"
							:key="index"
						>
							{{ text }}
						</p>
					</div>
				</div>
			</gorani-transition>
		</div>

		<!-- Process 섹션 -->
		<div class="process">
			<!-- 수직 디바이더 -->
			<gorani-transition
				transition-name="scale-y-fade"
				target-name="process-divider"
				@intersect-in="handleIntersectIn"
				@intersect-out="handleIntersectOut"
			>
				<div class="divider">
					<horizontal-divider />
				</div>
			</gorani-transition>

			<!-- PRocess 글씨 -->
			<gorani-transition
				transition-name="upfade"
				target-name="process"
				@intersect-in="handleIntersectIn"
				@intersect-out="handleIntersectOut"
				style="width: 100%"
			>
				<p class="title">Process</p>

				<div class="process-item-container">
					<div v-for="(row, rIdx) in processList" :key="rIdx" class="item-row">
						<template v-for="(step, sIdx) in row" :key="step">
							<div
								class="arrow"
								v-if="sIdx !== 0"
								:class="{ 'process-item-animation': intersected.process }"
								:style="{
									'animation-delay': `${0.25 * getNum(rIdx, sIdx)}s`,
								}"
							>
								<img
									src="@/assets/images/about/process/process_arrow.svg"
									alt="화살표 아이콘"
								/>
							</div>
							<div
								class="item"
								:class="{ 'process-item-animation': intersected.process }"
								:style="{
									'animation-delay': `${0.25 * getNum(rIdx, sIdx)}s`,
								}"
							>
								<img :src="getImageUrl(getNum(rIdx, sIdx))" :alt="step" />
								<span class="number">
									{{ `0${getNum(rIdx, sIdx)}` }}
								</span>
								<span class="desc">{{ step }}</span>
							</div>
						</template>
					</div>
				</div>
			</gorani-transition>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.about-page {
	padding-top: 3rem;
	margin-bottom: 4rem;
}

.slogan {
	padding: 4rem 4rem;
	p {
		font-size: 2.5rem;
		line-height: 5rem;
	}

	.right {
		padding-top: 2rem;
		text-align: right;

		.slogan-right-lastline {
			display: flex;
			align-items: center;
			.divider {
				flex: 1;
				padding-right: 2rem;
				animation: slogan-divider-fade-in 3s both ease;
			}
			@keyframes slogan-divider-fade-in {
				0% {
					opacity: 0;
					transform: scale(0) translateX(-100%);
				}
				100% {
					opacity: 1;
				}
			}
		}
	}

	.slogan-animation {
		animation: slogan-upfade-in 0.5s both;
	}
	@keyframes slogan-upfade-in {
		0% {
			opacity: 0;
			transform: translateY(2rem);
		}
		100% {
			opacity: 1;
		}
	}
}

.for-best-output {
	// for-best, output 공통스타일
	$for-word-size: 30vw;

	padding: 15rem 4vw;
	p {
		font-family: Noto Sans KR;
		// font-size: 15rem;
		font-size: 18vw;
		font-weight: 600;
	}
	.word {
		position: relative;
	}
	.shadow-text {
		position: absolute;
		top: 0;
		z-index: -1;
		color: lightgrey;
		opacity: 0;
	}

	// for-best, output 개별스타일
	.for-best {
		display: flex;
		padding-bottom: 2rem;
		.for {
			width: $for-word-size;
		}
		.for .shadow-text {
			transform: scaleY(-1);
			top: 60%;
		}
		.for .shadow-text.for-animation {
			animation: shadow-downfade-in 8s both;
		}

		.best .shadow-text {
			transform: scaleY(-1);
			top: -70%;
		}
		.best .shadow-text.best-animation {
			animation: shadow-upfade-in 4s both;
		}
	}
	.output {
		padding-left: $for-word-size;
		// text-align: right;
		.shadow-text {
			top: -50%;

			filter: blur(4px);
			-webkit-filter: blur(4px);
		}
		.shadow-text.output-animation {
			animation: shadow-upfade-in 6s both;
		}
	}

	@keyframes shadow-downfade-in {
		0% {
			opacity: 0;
			top: 25%;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes shadow-upfade-in {
		0% {
			opacity: 0;
			top: 0;
		}
		100% {
			opacity: 1;
		}
	}
}

.description {
	padding: 0 15%;
	.item {
		display: flex;
		align-items: center;
		height: fit-content;
		padding: 5rem 0;
		.img-wrap {
			max-width: 50%;
			height: 100%;
		}
		.img-wrap img {
			width: 100%;
			height: auto;
		}

		.text-container {
			flex: 1;
			font-size: 1.5vw;
			line-height: 3.5vw;
			white-space: nowrap;
		}
	}
	.item.left-imged {
		.text-container {
			padding-left: 1rem;
			text-align: right;
		}
		.left-imged-animation {
			animation: left-imged-toleft-fadein 1s both;
		}
		@keyframes left-imged-toleft-fadein {
			0% {
				opacity: 0;
				transform: translateX(10%);
			}
			100% {
				opacity: 1;
			}
		}
	}
	.item.right-imged {
		flex-direction: row-reverse;
		.text-container {
			padding-right: 1rem;
			text-align: left;
		}
		.right-imged-animation {
			animation: right-imged-toright-fadein 0.75s both;
		}
		@keyframes right-imged-toright-fadein {
			0% {
				opacity: 0;
				transform: translateX(-10%);
			}
			100% {
				opacity: 1;
			}
		}
	}
}

.process {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10% 5%;

	.divider {
		width: 25rem;
		transform: rotate(-90deg) translateY(50%);
		margin-top: 8rem;
		margin-bottom: 20rem;
	}

	.title {
		font-size: 5vw;
		font-weight: bold;
		margin-bottom: 10vw;
		color: black;
		text-align: center;
		width: 100%;
	}
	.process-item-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		.item-row {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: space-between;
			width: 90%;

			.item,
			.arrow {
				width: 12.5%;
				margin-bottom: 5vw;
			}
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: black;
				img {
					height: 5vw;
					width: auto;
					filter: brightness(0);
				}
				.number {
					font-size: 1.5vw;
					font-weight: bold;
					margin-top: 2vw;
					margin-bottom: 1vw;
				}
				.desc {
					font-size: 1.3vw;
					// font-weight: lighter;
				}
			}
			.arrow {
				margin-top: 1.5vw;
				text-align: center;
				img {
					height: 2vw;
					width: auto;
					filter: brightness(0);
				}
			}

			.process-item-animation {
				animation: process-item-fadein 0.25s both;
			}
			@keyframes process-item-fadein {
				0% {
					opacity: 0;
					transform: translateX(-10%);
				}
				100% {
					opacity: 1;
					transform: translateX(0);
				}
			}
		}
	}
}
</style>

<!-- // 모바일 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
	.slogan {
		min-height: calc(100vh - 260px);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		p {
			font-size: 5vw;
		}
		.left {
			text-align: center;
		}
		.right .slogan-right-lastline {
			flex-direction: column-reverse;
			justify-content: center;
			align-items: flex-end;
			.divider {
				width: 100%;
				padding: 2.5rem 0;
			}
		}
	}
	.description {
		padding: 0 10%;
		.item {
			.img-wrap {
				max-width: 100%;
				height: 100%;
			}
			.img-wrap img {
				width: 100%;
				height: auto;
			}
		}

		.item.left-imged,
		.item.right-imged {
			flex-direction: column;
			.text-container {
				margin-top: 1rem;
				width: 100%;
				font-size: 1.1rem;
				line-height: 2rem;
				padding: 0;
			}
		}
	}

	.process {
		margin-top: 4rem;
		.title {
			font-size: 2rem;
			text-align: center;
			margin-top: 2rem;
			margin-bottom: 3rem;
		}
		.process-item-container {
			.item-row {
				.arrow {
					display: none;
				}

				.item {
					width: 48%;
					margin-bottom: 3rem;
					img {
						height: 3rem;
					}
					.number {
						font-size: 1rem;
						margin-top: 1rem;
						margin-bottom: 0.5rem;
					}
					.desc {
						font-size: 1rem;
					}
				}
			}
		}
	}
}

@media (max-width: 400px) {
	.description {
		.item.left-imged,
		.item.right-imged {
			.text-container {
				font-size: 0.8rem;
				line-height: 2rem;
			}
		}
	}
}
</style>
