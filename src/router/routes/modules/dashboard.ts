import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  parentId: 0,
  redirect: '/dashboard/workbench',
  meta: {
    orderNo: 10,
    icon: 'ant-design:home-outlined',
    title: t('routes.dashboard.dashboard'),
  },
  children: [

    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
        icon: 'ant-design:appstore-outlined',
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
        icon: 'ant-design:bar-chart-outlined',
      },
    },

  ],
}

export default dashboard
