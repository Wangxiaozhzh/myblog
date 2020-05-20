import React, { Suspense,lazy } from 'react';
import {Route,Switch} from 'react-router-dom'
import {Spin} from 'antd'
import '../Static/Css/common.css'

// 懒加载配置
const Workbench = lazy(()=>
    import('../Pages/workbench/workbench')
);
const ArticleList = lazy(()=>
    import('../Pages/article/articleList')
)
const AddArticle = lazy(()=>
    import("../Pages/article/addArticle")
)
const ArticleType = lazy(()=>
    import("../Pages/article/articleType")
)
const CommentList = lazy(()=>
    import("../Pages/comments/commentList")
)
const RequirementList = lazy(()=>
    import("../Pages/requirement/requirementList")
)
const SoupList = lazy(()=>
    import("../Pages/soup/soupList")
)
const AddSoup = lazy(()=>
    import("../Pages/soup/addSoup")
)
const NoticeList = lazy(()=>
    import("../Pages/notice/noticeList")
)
const AddNotice = lazy(()=>
    import("../Pages/notice/addNotice")
)
const TagList = lazy(()=>
    import("../Pages/user/tagList")
)
const AddTag = lazy(()=>
    import("../Pages/user/addTag")
)
const UserSetting = lazy(()=>
    import("../Pages/user/userSetting")
)




const Contents=()=>(
    <Suspense fallback={<div className="example"><Spin tip='加载中...'></Spin></div>}>
        <Switch>
            <Route path="/workbench" component={Workbench} />
            <Route path="/article/articleList" component={ArticleList} />
            <Route path="/article/addArticle" exact component={AddArticle} />
            <Route path="/article/addArticle/:id" exact component={AddArticle} />
            <Route path="/article/articleType"  component={ArticleType} />
            <Route path="/comments/commentList" component={CommentList} />
            <Route path="/requirement/requirementList" component={RequirementList} />
            <Route path='/soup/soupList' exact component={SoupList} />
            <Route path='/soup/addSoup' exact component={AddSoup} />
            <Route path='/soup/addSoup/:id' exact component={AddSoup} />
            <Route path='/notice/noticeList' exact component={NoticeList} />
            <Route path='/notice/addNotice' exact component={AddNotice} />
            <Route path='/notice/addNotice/:id' exact component={AddNotice} />
            <Route path='/user/tagList' component={TagList} />
            <Route path='/user/addTag'  component={AddTag} />
            <Route path='/user/userSetting'  component={UserSetting} />
            <Route exact path='/' component={Workbench} />   
        </Switch>     
    </Suspense>
)

export default Contents;