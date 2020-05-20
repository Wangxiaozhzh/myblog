import http from './http'
import servicePath from './apiUrl'

// 统一处理请求

// 用户登录
export const userLogin = (data)=>http.post(servicePath.userLogin,data);
// 更新用户信息
export const updateUserInfo = (data)=>http.post(servicePath.updateUserInfo,data);
// 注销登录
export const userLogout = ()=>http.get(servicePath.userLogout);
// 获取所有文章列表
export const getArticleList = () => http.get(servicePath.getArticleList);
// 根据文章id删除文章
export const deleteArticleById = (data)=>http.post(servicePath.deleteArticleById,data);
// 获取文章列表
export const getTypeInfo = () => http.get(servicePath.getTypeInfo);
//根据文章id获取文章详细内容
export const getArticleById = (data) => http.post(servicePath.getArticleById,data);
//新增文章
export const addArticle = (data) => http.post(servicePath.addArticle,data);
//根据id修改文章内容
export const updateArticle = (data) => http.post(servicePath.updateArticle,data);
//根据id更新文章类型
export const updateTypeInfo = (data) => http.post(servicePath.updateTypeInfo,data);
// 根据id删除文章类型
export const deleteTypeInfo = (data) => http.post(servicePath.deleteTypeInfo,data);
//根据阅读量排行
export const getArticleRankList = ()=>http.get(servicePath.getArticleRankList);
//新增文章类型
export const addTypeInfo = (data) => http.post(servicePath.addTypeInfo,data);
// 获取所有评论列表
export const getCommentsList = ()=>http.get(servicePath.getCommentsList);
// 修改评论状态
export const updateCommentStatus = (data) => http.post(servicePath.updateCommentStatus,data);
// 删除评论
export const deleteCommentById = (data) => http.post(servicePath.deleteCommentById,data);
//获取所有鸡汤
export const getSoupWord = () => http.get(servicePath.getSoupWord);
//新增鸡汤
export const addSoupWord = (data) => http.post(servicePath.addSoupWord,data);
//根据id删除鸡汤
export const deleteSoupById = (data) => http.post(servicePath.deleteSoupById,data);
//根据id修改鸡汤
export const editSoupWord = (data) => http.post(servicePath.editSoupWord,data);
// 根据id获取鸡汤详情
export const getSoupWordById = (data)=> http.post(servicePath.getSoupWordById,data);
//获取所有公告
export const getAllNotice = () => http.get(servicePath.getAllNotice);
//修改公告
export const updateNoticeById =(data) => http.post(servicePath.updateNoticeById,data);
//删除公告
export const deleteNoticeById = (data) => http.post(servicePath.deleteNoticeById,data);
//新增公告
export const addNotice = (data) => http.post(servicePath.addNotice,data);
//根据id获取公告
export const getNoticeById = (data) => http.post(servicePath.getNoticeById,data);
//获取用户tags
export const getUserTags = () => http.get(servicePath.getUserTags);
//新增用户tags
export const addTag = (data) => http.post(servicePath.addTag,data);
// 获取所有需求
export const getRequirementsInfo = () => http.get(servicePath.getRequirementsInfo);
// 获取用户信息
export const getUserInfo = () => http.get(servicePath.getUserInfo);
// 更改需求状态
export const updateRequireStatus = (data) => http.post(servicePath.updateRequireStatus,data); 