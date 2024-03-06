<template>
	<div class="radio-input-set">
		<p class="question">
			<slot></slot>
		</p>
		<div class="input-wrap">
			<!-- options 버튼 -->
			<div class="item-wrap" v-for="(option, index) in options" :key="index">
				<div
					class="item"
					@click="handleSelect(index)"
					:class="{
						selected: option === modelValue.selected,
						disabled: readOnly,
					}"
				>
					<div class="check-box"></div>
					<span class="value">{{ option }}</span>
				</div>
			</div>
			<!-- "기타" 버튼 -->
			<div class="item-wrap">
				<div
					v-if="useEtc"
					class="item"
					@click="handleSelect(-1)"
					:class="{
						selected: ETC_OPTION_LABEL === modelValue.selected,
						disabled: readOnly,
					}"
				>
					<div class="check-box"></div>
					<span class="value">{{ ETC_OPTION_LABEL }}</span>
				</div>
			</div>
		</div>

		<!-- 기타 항목을 선택했을 때 세부 내용을 입력할 텍스트필드 -->
		<transition name="fade-etc-textinput">
			<div
				class="etc-textinput"
				v-if="modelValue.selected === ETC_OPTION_LABEL"
			>
				<text-input-set
					v-model="etcText"
					style="margin: 0"
					:placeholder="`기타 항목 직접 입력`"
					:read-only="readOnly"
				></text-input-set>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { computed } from 'vue';

import TextInputSet from '@/components/TextInputSet.vue';
import { ETC_OPTION_LABEL } from '@/assets/constants.js';

const props = defineProps({
	modelValue: {
		type: Object,
		// {
		//     selected : [],
		//     etcText : ''
		// }
	},
	options: {
		type: Array,
	},
	useEtc: {
		type: Boolean,
		default: false,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:modelValue']);

const etcText = computed({
	get() {
		return props.modelValue.etcText;
	},
	set(value) {
		emits('update:modelValue', { ...props.modelValue, etcText: value });
	},
});

function handleSelect(index) {
	if (props.readOnly) {
		return;
	}
	// 선택된 체크박스의 값. (index매개변수가 -1이면 기타 항목으로 간주)
	const selectedValue = index !== -1 ? props.options[index] : ETC_OPTION_LABEL;

	// 선택해제
	if (selectedValue === props.modelValue.selected) {
		emits('update:modelValue', { selected: '', etcText: '' });
		return;
	}

	// 선택
	emits('update:modelValue', { ...props.modelValue, selected: selectedValue });
}
</script>

<style lang="scss" scoped>
// etc용 text input
.fade-etc-textinput-enter-active {
	transition: all 0.5s;
}
.fade-etc-textinput-enter-from {
	opacity: 0;
	transform: translateY(-1rem);
}
.etc-textinput {
	padding-left: 2rem;
	transform: translateY(-1rem);
}

//------------------------------
.radio-input-set {
	margin-bottom: 48px;
	p {
		font-weight: 600;
		font-size: 1rem;
		padding-bottom: 1rem;
	}
	.input-wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item-wrap {
			width: 49%;
			max-width: 512px;

			.item {
				width: fit-content;
				padding: 0.5rem;
				display: flex;
				align-items: center;
				border-radius: 0.5rem;
				margin: 0.5rem 0;
				font-weight: 300;
				cursor: pointer;
				.check-box {
					margin-right: 8px;
					width: 1rem;
					height: 1rem;
					border-radius: 50%;
					border: 1px solid rgb(20, 20, 20);
					color: white;
					transition: all 0.3s;
				}
				.value {
					font-size: 1rem;
				}
			}
		}
		.item:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.selected {
			.check-box {
				background-color: rgb(50, 50, 50);
				text-align: center;
				font-size: 0.8rem;
			}
		}
		.item.disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
}

@media (max-width: 768px) {
	.radio-input-set .input-wrap .item-wrap {
		width: 100%;
	}
}

@media (max-width: 430px) {
	.radio-input-set {
		margin-bottom: 32px;
		p {
			font-size: 0.85rem;
			word-break: keep-all;
		}
		.input-wrap .item-wrap .item {
			.value {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
