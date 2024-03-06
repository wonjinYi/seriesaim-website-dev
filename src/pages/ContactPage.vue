<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { API_URL } from '@/assets/constants.js';
import {
	REF_CONTACT_INFO,
	REF_FORM_TEMPLATE,
	REF_INIT_GLOBAL_STATE_FINISHED,
} from '@/assets/globalState.js';

import TextInputSet from '@/components/TextInputSet.vue';
import RadioInputSet from '@/components/RadioInputSet.vue';
import CheckboxInputSet from '@/components/CheckboxInputSet.vue';
import HorizontalDivider from '@/components/HorizontalDivider.vue';
import router from '../router';

const emits = defineEmits(['init-global-state']);

const loading = ref(true);
const showInvalidAlert = ref('');

const showSubmitConfirm = ref(false);
function openSubmitConfirm() {
	showSubmitConfirm.value = true;
	window.scrollBy({ top: 512 });
}
function closeSubmitConfirm() {
	showSubmitConfirm.value = false;
	window.scrollBy({ top: -120 });
}

watch(
	REF_INIT_GLOBAL_STATE_FINISHED,
	() => {
		if (REF_INIT_GLOBAL_STATE_FINISHED.value) {
			loading.value = false;
		}
	},
	{ immediate: true },
);

async function handleSubmit() {
	try {
		// preprocess
		showSubmitConfirm.value = false;
		loading.value = true;
		if (!validateForm()) {
			showInvalidAlert.value = '입력하지 않은 필수 항목이 있습니다';
			setTimeout(() => {
				showInvalidAlert.value = '';
			}, 5000);
			return;
		}

		// fetch & validate response
		const res = await axios.post(
			`${API_URL}?taskType=submitForm`,
			JSON.stringify(REF_FORM_TEMPLATE.value),
		);

		const status = res.data.status;
		const formId = res.data.data.id;
		if (status === 'error' || !formId) {
			throw new Error(JSON.stringify(res.data));
		}

		// done
		emits('init-global-state');
		router.push(`/contact/submitted/${formId}`);
	} catch (err) {
		console.error(err);
		alert('제출에 실패했습니다.');
	} finally {
		loading.value = false;
	}
}

function validateForm() {
	for (let section of REF_FORM_TEMPLATE.value) {
		for (let item of section.items) {
			if (item.type === 'text') {
				if (!item.answer && item.required) {
					return false;
				}
			} else if (item.type === 'checkbox') {
				if (item.answer.selected.length === 0 && item.required) {
					return false;
				}
			} else if (item.type === 'radio') {
				if (!item.answer.selected && item.required) {
					return false;
				}
			}
		}
	}

	return true;
}
</script>

<template>
	<div class="contact-page" ref="movedest">
		<!-- 로딩 오버레이 -->
		<transition>
			<div v-if="loading" class="loading-overlay"></div>
		</transition>

		<!-- Validation Fail Alert -->
		<transition>
			<div
				v-if="showInvalidAlert"
				class="invalid-alert"
				@click="() => (showInvalidAlert = '')"
			>
				<span>{{ showInvalidAlert }}</span>
			</div>
		</transition>

		<transition>
			<div v-if="REF_INIT_GLOBAL_STATE_FINISHED">
				<!-- 시리즈에임 연락처 -->
				<div class="contact-info">
					<!-- 헤더 -->
					<div class="item header" style="margin-bottom: 0.5rem">
						<span class="label" style="font-size: 2rem; font-weight: 700">
							contact
						</span>
						<horizontal-divider class="divider" />
					</div>

					<!-- 연락처 리스트 -->
					<div class="item" v-for="item in REF_CONTACT_INFO" :key="item.label">
						<span class="label">{{ item.label }}</span>
						<span class="value">{{ item.value }}</span>
					</div>
				</div>

				<!-- 인트로 섹션 -->
				<form
					readonly
					class="온라인-문의하기 grey-background"
					style="margin-bottom: 0"
				>
					<div class="form-header">
						<span class="title-kor">온라인 문의하기</span>
						<p class="desc">
							<span>모든 영상에</span>
							<span>최선을 기울입니다</span>
						</p>
					</div>
				</form>

				<!-- 입력폼 -->
				<form
					v-for="(section, sectionIdx) in REF_FORM_TEMPLATE"
					:key="sectionIdx"
					:class="{ 'grey-background': sectionIdx % 2 === 0 }"
				>
					<div class="form-header">
						<span class="title-kor">{{ section.header.title }}</span>
						<p class="desc">
							<span
								v-for="(line, i) in section.header.desc.split('\n')"
								:key="i"
							>
								{{ line }}
							</span>
						</p>
					</div>
					<div class="form-body">
						<template v-for="(item, itemIdx) in section.items" :key="itemIdx">
							<text-input-set
								v-if="item.type === 'text'"
								v-model="REF_FORM_TEMPLATE[sectionIdx].items[itemIdx].answer"
								:placeholder="item.placeholder"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</text-input-set>
							<checkbox-input-set
								v-else-if="item.type === 'checkbox'"
								v-model="REF_FORM_TEMPLATE[sectionIdx].items[itemIdx].answer"
								:use-etc="item.useEtc"
								:options="item.options"
								:max-select-num="item.options.length + item.useEtc"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</checkbox-input-set>
							<radio-input-set
								v-else-if="item.type === 'radio'"
								v-model="REF_FORM_TEMPLATE[sectionIdx].items[itemIdx].answer"
								:use-etc="item.useEtc"
								:options="item.options"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</radio-input-set>
						</template>
					</div>
				</form>

				<!-- 제출버튼 -->
				<div class="submit-btn-container">
					<!-- 제출confirm 열기 버튼 -->
					<div class="submit-btn" @click="openSubmitConfirm">제출</div>

					<!-- 제출confirm (예/아니요) 버튼) -->
					<transition name="confirm">
						<div v-if="showSubmitConfirm" style="margin-top: 2rem">
							<p style="font-weight: 400">정말 제출하시겠습니까?</p>
							<div style="display: flex; align-items: center; margin: 1rem">
								<span @click="closeSubmitConfirm" style="cursor: pointer">
									아니요
								</span>
								<div
									class="submit-btn"
									style="padding: 12px 24px; margin-left: 1rem"
									@click="handleSubmit"
								>
									네
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
// transition
.confirm-enter-active {
	transition: all 0.5s;
}
.confirm-leave-active {
	transition: all 0.5s;
}
.confirm-enter-from,
.confirm-leave-to {
	opacity: 0;
	transform: translateY(-2rem);
}

//  ----------------------

// fixed contents
.loading-overlay {
	z-index: 999;
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.invalid-alert {
	z-index: 998;
	position: fixed;
	width: 100vw;
	padding: 2rem 0;
	bottom: 0;
	left: 0;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	cursor: pointer;
	font-size: 1.2rem;
}

// -----------------------

$form-header-width: 128px;

.contact-info {
	padding: 0 10vw;
	padding-bottom: 84px;
	.item {
		display: flex;
		align-items: center;
		padding: 0.8rem 0;
		.label {
			display: block;
			width: $form-header-width;
			font-size: 1.2rem;
			font-weight: 400;
			text-align: right;
		}
		.value {
			display: block;
			font-size: 1.2rem;
			font-weight: 300;
			text-align: left;
			padding-left: 2rem;
		}
	}
	.divider {
		flex: 1;
		transform: scaleX(-1);
		padding-right: 2rem;
	}
}

// form style
form {
	padding: 4rem 10vw;
	display: flex;
	.form-header {
		margin-right: 10vw;
		width: $form-header-width;
		text-align: right;
		span {
			display: block;
		}
		.title-kor {
			font-size: 1.2rem;
			font-weight: 600;
		}
		.title-eng {
			margin-top: 8px;
			margin-bottom: 16px;
			font-size: 1rem;
			font-weight: 300;
		}
		.desc {
			margin-top: 1rem;
			font-size: 0.9rem;

			color: grey;
			span {
				font-weight: 400;
				margin-top: 8px;
			}
		}
	}
	.form-body {
		flex: 1;
	}
}
form.grey-background {
	background-color: rgb(248, 248, 248);
}

.submit-btn-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 4rem 0 12rem 0;
	.submit-btn {
		text-align: center;
		width: fit-content;
		padding: 12px 48px;
		background-color: black;
		color: white;
		cursor: pointer;
		transition: all 0.3s;
	}
	.submit-btn:hover {
		background-color: rgb(80, 80, 80);
	}
}
</style>

<!-- 모바일 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
	.contact-info {
		padding: 4rem 10vw;
		.item {
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			.label {
				width: auto;
				padding: 0;
			}
			.value {
				padding: 0;
			}
		}
		.item.header {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
		.divider {
			padding-right: 1rem;
		}
	}

	form {
		margin-bottom: 3rem;
		flex-direction: column;
		.form-header {
			text-align: left;
			margin-right: 0;
			margin-bottom: 2rem;
			width: 100%;
			span {
				display: inline;
			}
			.title-kor {
				font-size: 1.2rem;
				margin-right: 0.5rem;
			}
			.title-eng {
				margin: 0;
				font-size: 0.8rem;
			}
			.desc {
				span {
					margin-right: 3px;
					word-break: keep-all;
				}
			}
		}
		.form-body {
			flex: 1;
		}
	}

	.submit-btn-container {
		display: flex;
		justify-content: center;
		padding-bottom: 128px;
		.submit-btn {
			text-align: center;
			width: fit-content;
			padding: 12px 48px;
			background-color: black;
			color: white;
			cursor: pointer;
			transition: all 0.3s;
		}
		.submit-btn:hover {
			background-color: rgb(80, 80, 80);
		}
	}
}

@media (max-width: 512px) {
}

// 갤럭시 폴드
@media (max-width: 400px) {
	.general-desc {
		p {
			text-align: left;
			display: block;
			text-indent: 16px;
			margin: 1.5rem 0;
			line-height: 1rem;
			font-size: 12px;
			letter-spacing: 2px;
		}
	}
}
</style>
