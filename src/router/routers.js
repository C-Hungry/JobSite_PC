import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'md-home',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        meta: {
          icon: 'md-people',
          title: '用户管理'
        },
        component: () => import('@/view/user/user-manage.vue')
      }
    ]
  },
  {
    path: '/website',
    name: 'website',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'h5HomeManage',
        name: 'h5HomeManage',
        meta: {
          icon: 'ios-construct',
          title: 'H5首页设置'
        },
        component: () => import('@/view/website/h5-home-manage.vue')
      }
    ]
  },
  {
    path: '/job',
    name: 'job',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'md-briefcase',
      title: '岗位管理'
    },
    children: [
      {
        path: 'jobAdd',
        name: 'jobAdd',
        meta: {
          icon: 'md-briefcase',
          title: '新增岗位'
        },
        component: () => import('@/view/job/job-add.vue')
      },
      {
        path: 'jobManage',
        name: 'jobManage',
        meta: {
          icon: 'md-briefcase',
          title: '岗位列表'
        },
        component: () => import('@/view/job/job-manage.vue')
      },
      {
        path: 'jobEdit',
        name: 'jobEdit',
        meta: {
          icon: 'md-briefcase',
          title: '编辑岗位',
          hideInMenu: true
        },
        component: () => import('@/view/job/job-edit.vue')
      },
      {
        path: 'jobKeywordsManage',
        name: 'jobKeywordsManage',
        meta: {
          icon: 'md-briefcase',
          title: '关键字管理'
        },
        component: () => import('@/view/job/job-keywords-manage.vue')
      }
    ]
  },
  // {
  //   path: '/apply',
  //   name: 'apply',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'applyManage',
  //       name: 'applyManage',
  //       meta: {
  //         icon: 'ios-megaphone',
  //         title: '报名管理'
  //       },
  //       component: () => import('@/view/apply/apply-manage.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/registerUser',
  //   name: 'registerUser',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'registerUserManage',
  //       name: 'registerUserManage',
  //       meta: {
  //         icon: 'md-person-add',
  //         title: '注册用户管理'
  //       },
  //       component: () => import('@/view/register-user/register-user-manage.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
