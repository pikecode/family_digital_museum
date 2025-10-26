export default {
  pages: [
    'pages/index/index',
    'pages/family-tree/index',
    'pages/family-tree/member-detail',
    'pages/photo-album/index',
    'pages/photo-album/album-detail',
    'pages/family-rules/index',
    'pages/family-rules/rule-detail',
    'pages/upload-data/index',
    'pages/family-square/index',
    'pages/my/index',
    'pages/mall/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '家庭数字馆',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#d4af37',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/mall/index',
        text: '商城',
        iconPath: 'assets/icons/mall.png',
        selectedIconPath: 'assets/icons/mall-active.png'
      },
      {
        pagePath: 'pages/upload-data/index',
        text: '签到',
        iconPath: 'assets/icons/checkin.png',
        selectedIconPath: 'assets/icons/checkin-active.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/icons/me.png',
        selectedIconPath: 'assets/icons/me-active.png'
      }
    ]
  }
}
