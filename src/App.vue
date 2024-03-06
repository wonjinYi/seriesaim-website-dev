<template>
	<div class="root">
		<!-- 헤더 구간 -->
		<!-- : 로고, 네비게이션 -->
		<the-header></the-header>

		<!-- scroll to top 버튼 -->
		<scroll-to-top-button
			v-if="$route.name !== 'Main' && $route.name !== 'FormSubmitted'"
		></scroll-to-top-button>

		<!-- view 구간 -->
		<!-- url경로에 따라 알맞은 페이지(.vue파일)를 src/pages폴더에서 꺼내와 보여줍니다. -->
		<!-- 어떤 경로에 어떤 페이지를 보여줄지는 src/router.js파일이 결정합니다. -->
		<router-view v-slot="{ Component }">
			<transition>
				<component :is="Component" @init-global-state="fetchGlobalState" />
			</transition>
		</router-view>
	</div>
</template>

<script setup>
import TheHeader from '@/TheHeader.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';

// 전역상태 초기화
import axios from 'axios';
import { API_URL } from '@/assets/constants.js';
import {
	REF_CONTACT_INFO,
	REF_FORM_TEMPLATE,
	REF_WORK_LIST,
	REF_INIT_GLOBAL_STATE_FINISHED,
} from '@/assets/globalState.js';

async function fetchGlobalState() {
	try {
		const res = await axios.get(`${API_URL}?taskType=init`);
		const data = res.data.data;

		REF_CONTACT_INFO.value = data.contactInfo;
		REF_FORM_TEMPLATE.value = data.formTemplate;
		REF_WORK_LIST.value = data.works;
		REF_INIT_GLOBAL_STATE_FINISHED.value = true;
	} catch (err) {
		console.error(err);
		if (confirm('기본 정보를 불러오는데 실패했습니다. 재시도 할까요?')) {
			fetchGlobalState();
		}
	}
}

fetchGlobalState();
</script>

<style lang="scss">
.v-enter-active {
	transition: all 0.25s linear;
	transition-delay: 0.25s;
}
.v-leave-active {
	transition: all 0.25s linear;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
