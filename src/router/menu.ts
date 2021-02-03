import routes from './routes'
import { routesList2Map, getMenuList } from './utils'

export const orgMenuList = [
  {
    icon: 'icon-dashboard_icon1',
    // name: '仪表盘',
    index: '/'
  },
  {
    icon: 'icon-ic-menu-interview',
    name: '面试官工作台',
    index: 'interview-console',
    children: [
      {
        // name: '小倍简历筛选',
        index: '/about'
      },
      {
        // name: '小倍面试安排',
        index: '/main/test_1'
      },
      {
        // name: '简历筛选',
        index: '/main/test_2'
      },
      {
        // name: '面试安排',
        index: '/main/interview-confirm'
      }
    ]
  }
]

export const menuList = getMenuList(orgMenuList, routesList2Map(routes))

console.log('menuList', menuList)

export default orgMenuList
