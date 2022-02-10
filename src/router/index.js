import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
      // name: 'Index',
      // component: () => import("@/pages/console.vue"),
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/pages/Login.vue"),
    },
    {
        path: '/index/console',
        name: 'Console',
        component: () => import("@/pages/console.vue"),
    },
    // {
    //     path: '/console',
    //     name: 'Console',
    //     component: () => import("@/pages/Console.vue"),
    // },
    {
        path: '/console/alert',
        name: 'Alert',
        component: () => import("@/pages/Alert.vue"),
    },
    {
        path: '/md/consoleView',
        name: 'ConsoleView',
        component: () => import("@/pages/middle/ConsoleView.vue"),
    },
   {
        path: '/md/console/commodity/commodityCompare',
        name: 'CommodityCompare',
        component: ()=> import("@/pages/middle/CommodityCompare.vue"),
    },
      {
          path: '/md/console/commodity/commodityRecommend',
          name: 'CommodityRecommend',
          component: ()=> import("@/pages/middle/CommodityRecommend.vue")
      },

    {
        path: '/md/console/purchase/purchaseOperation',
        name: 'MdPurchaseOperation',
        component: () => import("@/pages/middle/MdPurchaseOperation.vue"),
    },
    {
        path: '/md/console/predictSales',
        name: 'PredictSales',
        component: () => import("@/pages/middle/PredictSales.vue"),
    },
    {
        path: '/md/console/pricing',
        name: 'Pricing',
        component: () => import("@/pages/middle/Pricing.vue"),
    },
    {
        path: '/md/console/predictReturn',
        name: 'PredictReturn',
        component: () => import("@/pages/middle/PredictReturn.vue"),
    },
	{
	    path: '/md/console/importData',
	    name: 'ImportData',
	    component: () => import("@/pages/middle/ImportData.vue"),
	},
  ]
})
