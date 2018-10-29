import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/homepage',
		name: 'HelloWorld',
		component: HelloWorld,
		meta:{requireAuth:true},
		children:[
		{
			path: '/home',
			name:'home',
			component: resolve => require(['../components/common/homepage.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/heade',
			name:'heade',
			component: resolve => require(['../components/page/heade.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/uploadImg',
			name:'uploading',
			component: resolve => require(['../components/common/uploading.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/homeswipper',
			name:'homeswipper',
			component: resolve => require(['../components/common/homeswipper.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/labels',
			name:'labels',
			component: resolve => require(['../components/common/labels.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/labelmodify',
			name:'labelmodify',
			component: resolve => require(['../components/common/labelmodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/labelsee',
			name:'labelsee',
			component: resolve => require(['../components/common/labelsee.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/navigationbar',
			name:'navigationbar',
			component: resolve => require(['../components/common/navigationbar.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/addnavigation',
			name:'addnavigation',
			component: resolve => require(['../components/common/addnavigation.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/navigationmodify',
			name:'navigationmodify',
			component: resolve => require(['../components/common/navigationmodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/feedback',
			name:'feedback',
			component: resolve => require(['../components/common/feedback.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/appmini',
			name:'appmini',
			component: resolve => require(['../components/common/appmini.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/screen',
			name:'screen',
			component: resolve => require(['../components/common/screen.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/buyinfo',
			name:'buyinfo',
			component: resolve => require(['../components/common/buyinfo.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/adddiscovery',
			name:'adddiscovery',
			component: resolve => require(['../components/common/adddiscovery.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/examine',
			name:'examine',
			component: resolve => require(['../components/common/examine.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/discovery',
			name:'discovery',
			component: resolve => require(['../components/common/discovery.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/discoverymodify',
			name:'discoverymodify',
			component: resolve => require(['../components/common/discoverymodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/advertisement',
			name:'advertisement',
			component: resolve => require(['../components/common/advertisement.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/accountcheck',
			name:'accountcheck',
			component: resolve => require(['../components/common/accountcheck.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/linkadvertising',
			name:'linkadvertising',
			component: resolve => require(['../components/common/linkadvertising.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/advterisedetailsmody',
			name:'advterisedetailsmody',
			component: resolve => require(['../components/common/advterisedetailsmody.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/byeraccountcheck',
			name:'byeraccountcheck',
			component: resolve => require(['../components/common/byeraccountcheck.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/member',
			name:'member',
			component: resolve => require(['../components/common/member.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/memberset',
			name:'memberset',
			component: resolve => require(['../components/common/memberset.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/memberrecharge',
			name:'memberrecharge',
			component: resolve => require(['../components/common/memberrecharge.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/membermodify',
			name:'membermodify',
			component: resolve => require(['../components/common/membermodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/memberadd',
			name:'memberadd',
			component: resolve => require(['../components/common/memberadd.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/membersetmodify',
			name:'membersetmodify',
			component: resolve => require(['../components/common/membersetmodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/memberrechargemodify',
			name:'memberrechargemodify',
			component: resolve => require(['../components/common/memberrechargemodify.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/memberrechargeadd',
			name:'memberrechargeadd',
			component: resolve => require(['../components/common/memberrechargeadd.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/aboutus',
			name:'aboutus',
			component: resolve => require(['../components/common/aboutus.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/advertising',
			name:'advertising',
			component: resolve => require(['../components/common/advertising.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/advterisedetails',
			name:'advterisedetails',
			component: resolve => require(['../components/common/advterisedetails.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/order',
			name:'order',
			component: resolve => require(['../components/common/order.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/orderediting',
			name:'orderediting',
			component: resolve => require(['../components/common/orderediting.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/settop',
			name:'settop',
			component: resolve => require(['../components/common/settop.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/personal',
			name:'personal',
			component: resolve => require(['../components/common/personal.vue'], resolve),
			meta:{requireAuth:true},
		},
		{
			path: '/sellinfoexamine',
			name:'sellinfoexamine',
			component: resolve => require(['../components/common/sellinfoexamine.vue'], resolve),
			meta:{requireAuth:true},
		}
		]
	},
	{ 
		path: '/',
		name: 'login',
		component: resolve => require(['../components/login.vue'], resolve),
	},
	]
})

