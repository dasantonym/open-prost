
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', name: 'site.welcome', component: () => import('pages/welcome.vue') },
      { path: '/login', name: 'site.login', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/admin.vue'),
    children: [
      { path: '', name: 'settings.edit', component: () => import('pages/settings.vue') }
    ]
  },
  {
    path: '/items',
    component: () => import('layouts/admin.vue'),
    children: [
      { path: '', name: 'items.list', component: () => import('pages/items/list.vue') },
      { path: '/create', name: 'items.create', component: () => import('pages/items/edit.vue') },
      { path: '/:uuid/edit', name: 'items.edit', component: () => import('pages/items/edit.vue') }
    ]
  },
  {
    path: '/locations',
    component: () => import('layouts/admin.vue'),
    children: [
      { path: '', name: 'locations.list', component: () => import('pages/locations/list.vue') },
      { path: '/create', name: 'locations.create', component: () => import('pages/locations/edit.vue') },
      { path: '/:uuid/edit', name: 'locations.edit', component: () => import('pages/locations/edit.vue') }
    ]
  },
  {
    path: '/persons',
    component: () => import('layouts/admin.vue'),
    children: [
      { path: '', name: 'persons.list', component: () => import('pages/persons/list.vue') },
      { path: '/create', name: 'persons.create', component: () => import('pages/persons/edit.vue') },
      { path: '/:uuid/edit', name: 'persons.edit', component: () => import('pages/persons/edit.vue') }
    ]
  },
  {
    path: '/takeouts',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', name: 'takeouts.list', component: () => import('pages/takeouts/list.vue') },
      { path: '/create', name: 'takeouts.create', component: () => import('pages/takeouts/edit.vue') },
      { path: '/:uuid/edit', name: 'takeouts.edit', component: () => import('pages/takeouts/edit.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue')
  })
}

export default routes
