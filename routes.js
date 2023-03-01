import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/mail',
      component: MailIndex,
    },
  ],
}

export const router = createRouter(routerOptions)
