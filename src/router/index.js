import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user-index" */ '../views/Index.vue'),
    children:[
      {
        path: '/manager',
        name: 'Manager',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "manager" */ '../views/Manager.vue')
      },
      {
        path: '/listgoods',
        name: 'ListGoods',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listgoods" */ '../views/ListGoods.vue')
      },
      {
        path: '/listgoodscate',
        name: 'ListGoodsCate',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listgoodscate" */ '../views/ListGoodsCate.vue')
      },
      {
        path: '/listgoodsattr',
        name: 'ListGoodsSattr',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listgoodsattr" */ '../views/ListGoodSattr.vue')
      },
      {
        path: '/listswiper',
        name: 'ListSwiper',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listswiper" */ '../views/ListSwiper.vue')
      },
      {
        path: '/listrole',
        name: 'ListRole',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listrole" */ '../views/ListRole.vue')
      },
      {
        path: '/listmenu',
        name: 'ListMenu',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listmenu" */ '../views/ListMenu.vue')
      }
      ,
      {
        path: '/listorder',
        name: 'ListOrder',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listorder" */ '../views/ListOrder.vue')
      }
      ,
      {
        path: '/listclient',
        name: 'ListClient',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "listclient" */ '../views/ListClient.vue')
      }
      ,
      {
        path: '/goodsadd',
        name: 'GoodsAdd',
        //按需加载路由组件
        component: () => 
        import(/* webpackChunkName: "goodsadd" */ '../views/GoodsAdd.vue')
      }
    ]
  }
  ,
  {
    path: '*',
    redirect: {
      path: '/'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (!token && to.path != '/') {
    next('/');
    return;
  } else if (token && to.path == '/'||to.path=='/index') {
    next('/listorder');
    return;
  }
  next();
})
router.beforeResolve((to, from, next) => {
  next();
})
router.afterEach((to, from) => {

})

export default router
