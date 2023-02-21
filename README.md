<div align=center>

<img width="240" src="/public/logo.svg" >

</div>

<div align=center>

# 通用后台管理系统

</div>
&nbsp;

## 概述

![登录页](/public/loginPage.webp)

![系统首页](/public/homePage.webp)

![用户管理页](/public/userPage.webp)

基于 Vite + Vue3 构建的**纯前端静态 Web 应用**，使用 [Mock.js](http://mockjs.com/) 在本地模拟项目中请求后端的各类数据，同时可根据不同用户的登录权限，显示不同的侧边栏菜单

当前管理系统中：

- 默认**管理员**账号：`admin`，密码：`123456`
- 默认**成员**账号：`Apple`，密码：`123456`

部署于 GitHub pages: https://outofforbit.com/backstage

部署于 Gitee pages: https://w-junhui.gitee.io/backstage

## 技术应用

（1）使用 [Element Plus](https://element-plus.gitee.io/zh-CN/) 构建项目 UI 界面：

- 使用 [Vue 3](https://www.javascriptc.com/vue3js/) 的 `setup` 语法构建项目的`普通组件`和`路由组件`

（2）使用 [Vue Router 4](https://router.vuejs.org/zh/) 构建项目的前端路由系统：

- 使用 **Hash** 路由模式，在路由配置的 `component` 属性中使用 `() = > import()` 组件导入语法实现**路由懒加载**
- 在用户登录后返回的侧边栏菜单对象中，包含了设置**动态子路由**的 `path`、`name`、`component`的相关属性，因此在管理菜单数据的 `mutation` 中，通过全局路由对象提供的 `addRoute()` 方法**动态**添加子路由，同时使用 [Vite](https://vitejs.cn/) 的动态导入模块语法 `import.meta.glob` 实现**动态路由懒加载**
- 设置**全局前置守卫**，处理登录前通过修改路径的非法访问，以及处理登录后访问不存在路径

（3）使用 [Mock.js](http://mockjs.com/) 模拟后端的各类数据：

- 封装 `Mock.js` 模块，使用**正则表达式**匹配请求路径并拦截项目中的 Ajax 请求
- 根据项目的不同功能模块，封装不同的数据请求函数，在拦截请求后进行调用以返回正确的数据

（4）使用 [Axios](http://axios-js.com/) 发起 Ajax 请求，并对 Axios 进行**二次封装**：

- **统一**处理项目中所有请求的**重复步骤**，包括在请求前自定义携带 header、处理请求失败的反馈信息、解构赋值请求成功的参数对象以简化嵌套，方便赋值
- 根据请求携带参数中定义的 `mock` 布尔值，可选择是否使用 [fastmock](https://www.fastmock.site/) 的模拟数据
- 根据已封装好的 Ajax 请求环境配置文件，判断在`开发环境`、`测试环境`、`生产环境`下应使用的**请求根路径**，防止`生产环境`使用 fastmock
- 将项目中的所有 Ajax 请求函数封装为**统一**的接口模块 `api.js`，在该模块导入已二次封装的 `request` 函数，实现**统一管理**项目所有的请求接口

（5）使用 [Vuex 4](https://vuex.vuejs.org/zh/) 管理项目数据，实现不同组件间的**数据通讯**：

- 在用户登录后会返回一个的侧边栏菜单对象，通过提交 mutation 将其存储至 Vuex 中，以供侧边栏动态设置菜单项以及面包屑动态设置路径名
- 在点击侧边栏菜单后会返回一个`激活菜单栏对象`，通过提交 mutation 将其存储至 Vuex 中，供路由组件显示区顶部的 `tag` 标签使用
- 通过 `localStorage` 持久化登录后的侧边栏菜单对象、激活菜单对象，并在 `main.js` 中提交对应的 mutation 以防止页面刷新后 Vuex 数据丢失引起的侧边栏、面包屑、tag 标签数据丢失

（6）使用 [Echarts.js](https://echarts.apache.org/zh/index.html) 构建首页中的数据展示：

- 对首页中具有 X/Y 轴的图表（折线图、柱状图）进行基础的通用对象配置，对饼状图单独定义配置对象
- 处理请求返回的 Mock 图表源数据，并将其与每个图表的配置对象结合以渲染图表

（7）使用 **vue-cookies** 存储或移除浏览器 cookie 的登录认证 `token`

（8）使用 **vue3-lottie** 加载 `JSON` 格式的 lottie 动画，实现展示页面**低消耗**的 Web 网页动画

## 开发模式

```sh
# Fork仓库后，安装依赖
npm i
# 启用普通的开发环境
npm run dev
```

## 构建与部署

借助 [GitHub Actions](https://docs.github.com/zh/actions)，当前应用能在构建项目的同时，自动部署至 [GitHub Pages](https://docs.github.com/zh/pages) 和 [Gitee Pages](https://gitee.com/help/articles/4136#article-header0)。同时，构建项目也不再需要手动执行脚本命令（npm run build ），而是使用 GitHub Actions，在工作流中增加构建项目的任务步骤即可

通过工作流的相关设置，项目自动构建完毕后，构建目录 `dist/` 将会部署在远程仓库的 `gh-pages` 分支

该项目部署与我的博客部署类似，可参考我的博客文章 [《我的博客部署之路》](https://w-junhui.gitee.io/%E6%8A%80%E6%9C%AF%E5%8D%9A%E6%96%87/VuePress/%E6%88%91%E7%9A%84%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2%E4%B9%8B%E8%B7%AF.html)  
CSDN：[我的 VuePress 博客部署之路](https://blog.csdn.net/INT_FUTURE/article/details/128975977)

## 静态资源

为尽可能提升后台系统的访问与运行速度：

- 图片均使用 `.webp` 格式，而类似于 logo 的小图标则使用 `.svg` 格式,
- lottie 动画使用 `JSON` 格式

## 联系我

如果对该仓库的代码有任何疑问，可通过邮箱联系我：wu-junhui@foxmail.com  
或者你也可以创建一个 [Issues](https://github.com/Wu-JunHui/Wu-JunHui.github.io/issues)

## 开源许可

[MIT](/LICENSE)
