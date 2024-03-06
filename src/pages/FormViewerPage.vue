<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/assets/constants.js';

import TextInputSet from '@/components/TextInputSet.vue';
import RadioInputSet from '@/components/RadioInputSet.vue';
import CheckboxInputSet from '@/components/CheckboxInputSet.vue';
import HorizontalDivider from '@/components/HorizontalDivider.vue';

const route = useRoute();
const loading = ref(true);

const formId = ref('');
const formCreatedAt = ref('');
const formData = ref([]);

async function fetchForm() {
	try {
		loading.value = true;
		const res = await axios.get(
			`${API_URL}?taskType=form&formId=${route.params.id}`,
		);

		if (res.data.status === 'error') {
			throw new Error(JSON.stringify(res.data));
		}

		formData.value = res.data.data.formData;
		formId.value = res.data.data.formId;
		formCreatedAt.value = res.data.data.createdAt.split('KST')[1];
	} catch (err) {
		console.error(err);
		if (confirm('신청서를 불러오는데 실패했습니다. 재시도 할까요?')) {
			fetchForm();
		}
	} finally {
		loading.value = false;
	}
}

fetchForm();
</script>

<template>
	<div class="contact-page">
		<!-- 로딩 오버레이 -->
		<transition>
			<div
				v-if="loading"
				class="loading-overay"
				style="
					position: fixed;
					width: 100vw;
					height: 100vh;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0.5);
					display: flex;
					justify-content: center;
					align-items: center;
				"
			></div>
		</transition>

		<!-- FORM정보 -->
		<h2
			style="
				text-align: center;
				font-size: 2rem;
				font-weight: 500;
				margin: 3rem 0;
			"
		>
			문의내용 조회
		</h2>
		<HorizontalDivider />

		<transition>
			<div v-if="formId">
				<div
					class="created-at"
					style="text-align: right; padding: 2rem 10vw 0 10vw"
				>
					<!-- FORM ID -->
					<p style="font-size: 1rem; font-weight: 500">문의 ID</p>
					<p
						style="font-size: 0.8rem; font-weight: 300; margin: 0.5rem 0 2rem 0"
					>
						{{ formId }}
					</p>

					<!-- FORM 제출일시 -->
					<p style="font-size: 1rem; font-weight: 500">문의 제출일시</p>
					<p style="font-size: 0.8rem; font-weight: 300; margin-top: 0.5rem">
						{{ formCreatedAt }}
					</p>
				</div>

				<!-- 입력된 폼 -->
				<form v-for="(section, sectionIdx) in formData" :key="sectionIdx">
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
								v-model="formData[sectionIdx].items[itemIdx].answer"
								:placeholder="item.placeholder"
								:read-only="true"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</text-input-set>
							<checkbox-input-set
								v-else-if="item.type === 'checkbox'"
								v-model="formData[sectionIdx].items[itemIdx].answer"
								:use-etc="item.useEtc"
								:options="item.options"
								:max-select-num="item.options.length + item.useEtc"
								:read-only="true"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</checkbox-input-set>
							<radio-input-set
								v-else-if="item.type === 'radio'"
								v-model="formData[sectionIdx].items[itemIdx].answer"
								:use-etc="item.useEtc"
								:options="item.options"
								:read-only="true"
							>
								{{ `${item.question} ${item.required ? '∗' : ''}` }}
							</radio-input-set>
						</template>
					</div>
				</form>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
$form-header-width: 128px;

.contact-page {
	// padding: 4rem 0;
}

.contact-info {
	padding: 0 8rem;
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
}

// form style
form {
	padding: 4rem 10vw;
	// margin-bottom: 128px;
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
</style>

<!-- 모바일 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
	form {
		margin-bottom: 3rem;
		// display: flex;
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
	.contact-info {
		.item {
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			.label {
				width: auto;
			}
			.value {
				padding: 0;
			}
		}
		.item.header .label {
			padding-bottom: 2rem;
		}
	}
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
