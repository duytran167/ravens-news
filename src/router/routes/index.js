import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/BlogList'))
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile'))
  },
  {
    path: '/covidChart',
    component: lazy(() => import('../../views/CovidChart'))
  },
  {
    path: '/aboutUs',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/detail/:id',
    component: lazy(() => import('../../views/Detail'))
  },
  {
    path: '/create',
    component: lazy(() => import('../../views/Create'))
  },
  {
    path: '/edit/:id',
    component: lazy(() => import('../../views/Edit'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
