import { createRouter, createWebHistory } from 'vue-router';

// 뷰 불러오기 ------------------------------------
import NotFoundPage from '@/pages/NotFoundPage.vue';

import MainPage from '@/pages/MainPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import WorksPage from '@/pages/WorksPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import FormSubmittedPage from '@/pages/FormSubmittedPage.vue';
import FormViewerPage from '@/pages/FormViewerPage.vue';

// 라우터 설정 ------------------------------------
const routes = [
	{
		// 정의된 path가 아닌 다른 path로 접근하려고 하면 NotFoundPage로 이동
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundPage,
	},
	// 아래와 일치하는 path로 접근하면 지정된 페이지(component)를 App.vue의 router-view자리에 표시
	{
		path: '/',
		name: 'Main',
		component: MainPage,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutPage,
	},
	{
		path: '/works',
		name: 'Works',
		component: WorksPage,
	},
	{
		path: '/contact',
		name: 'Contact',
		component: ContactPage,
	},
	{
		path: '/contact/submitted/:id',
		name: 'FormSubmitted',
		component: FormSubmittedPage,
	},
	{
		path: '/form/:id',
		name: 'FormViewer',
		component: FormViewerPage,
	},
];

// 라우터 객체 생성
const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(/*to, from, savedPosition*/) {
		return { top: 0 };
	},
});

export default router;
