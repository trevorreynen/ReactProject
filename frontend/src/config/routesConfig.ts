// @/config/routesConfig.ts


const routesConfig = [
  { path: '/', component: () => import('@/pages/LandingPage/LandingPage') },
  { path: '/home', component: () => import('@/pages/HomePage/HomePage') },

  { path: '/test-page-1', component: () => import('@/pages/TestPage1/TestPage1') },
  { path: '/test-page-2', component: () => import('@/pages/TestPage2/TestPage2') },
  { path: '/test-page-3', component: () => import('@/pages/TestPage3/TestPage3') },
  { path: '/test-page-4', component: () => import('@/pages/TestPage4/TestPage4') },
  { path: '/test-page-5', component: () => import('@/pages/TestPage5/TestPage5') },
  { path: '/test-page-6', component: () => import('@/pages/TestPage6/TestPage6') },
  { path: '/test-page-7', component: () => import('@/pages/TestPage7/TestPage7') },
  { path: '/test-page-8', component: () => import('@/pages/TestPage8/TestPage8') },
  { path: '/test-page-9', component: () => import('@/pages/TestPage9/TestPage9') },



]

export default routesConfig

