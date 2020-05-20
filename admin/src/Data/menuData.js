const MenuData = [
    {
        name: '工作台',
        url: 'workbench',    
        icon: 'pie-chart'
    },
    {
        name: '文章管理',
        url: 'article/articleList',
        icon: 'desktop',
        children: [
            { name: '文章列表', url: 'article/articleList' },
            { name: '新增文章', url: 'article/addArticle' },
            { name: '文章类型', url: 'article/articleType' }
          ]
    },
    {
        name: '留言管理',
        url: 'comments/commentList',
        icon: 'carry-out',
        children: [
            { name: '留言列表', url: 'comments/commentList' },
          ]
    },
    {
        name: '需求管理',
        url: 'requirement/requirementList',
        icon: 'carry-out',
        children: [
            { name: '需求列表', url: 'requirement/requirementList' },
          ]
    },
    {
        name: '鸡汤管理',
        url: 'soup/soupList',
        icon: 'gift',
        children: [
            { name: '鸡汤列表', url: 'soup/soupList' },
            { name: '新增鸡汤', url: 'soup/addSoup' },
          ]
    },
    {
        name: '公告管理',
        url: 'notice/noticeList',
        icon: 'sound',
        children: [
            { name: '公告列表', url: 'notice/noticeList' },
            { name: '新增公告', url: 'notice/addNotice' },
          ]
    },
    {
        name: '用户管理',
        url: 'user/tagList',
        icon: 'tag',
        children: [
            { name: '用户设置', url: 'user/userSetting' },
            { name: '标签列表', url: 'user/tagList' },
            { name: '新增标签', url: 'user/addTag' },
          ]
    },
]

export default MenuData;