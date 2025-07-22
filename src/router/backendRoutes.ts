import type { RouteRecordRaw } from 'vue-router'

export function transformBackendRoutes(data: any[]): RouteRecordRaw[] {
  const loadComponent = (name: string) => {
    return () => import(`@/views/${name}.vue`)
  }

  const convert = (item: any): RouteRecordRaw => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name || item.path.replace(/\//g, '-'),
      component: loadComponent(item.component),
      meta: item.meta || {},
    }

    if (item.children) {
      route.children = item.children.map(convert)
    }

    return route
  }

  return data.map(convert)
}