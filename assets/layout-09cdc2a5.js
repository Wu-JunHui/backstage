import{_ as x,u as S,a as T,c as V,r as o,o as a,b as i,w as e,d as p,e as s,f as v,t as C,g as B,E as D,h,F as $,i as y,j as M,k as L,l as R}from"./index-3741d514.js";const N="/backstage/assets/defaultUser-867c94b4.svg",U="/backstage/assets/logo-e3f620f9.svg",E="/backstage/assets/logoDark-d41f61f3.svg";const j={setup(){let c=S(),_=T();const u=t=>new URL(Object.assign({"../assets/defaultUser.svg":N,"../assets/logo.svg":U,"../assets/logoDark.svg":E})[`../assets/${t}.svg`],self.location).href;let n=()=>{c.commit("updateBarCollapse")};const g=V(()=>c.state.currentMenu);return{getImgSrc:u,hideSidebar:n,current:g,logoutHandler:()=>{D.confirm("确定退出登录吗?").then(()=>{c.commit("isLogout"),_.push({name:"login"})}).catch(()=>{})}}}},z={class:"h-left"},F={class:"h-right"},O={class:"el-dropdown-link"},q=["src"];function A(c,_,u,n,g,b){const t=o("Menu"),l=o("el-icon"),m=o("el-button"),f=o("el-breadcrumb-item"),k=o("el-breadcrumb"),r=o("el-dropdown-item"),d=o("el-dropdown-menu"),w=o("el-dropdown"),H=o("el-header");return a(),i(H,{class:"header-container"},{default:e(()=>[p("div",z,[s(m,{size:"small",color:"#e3d9d0",title:c.$store.state.barCollapse?"显示菜单":"折叠菜单",onClick:n.hideSidebar},{default:e(()=>[s(l,{size:18,color:"#2cb2c2"},{default:e(()=>[s(t)]),_:1})]),_:1},8,["title","onClick"]),s(k,{separator:"/",class:"bread"},{default:e(()=>[s(f,{to:{path:"/"}},{default:e(()=>[v("首页")]),_:1}),n.current?(a(),i(f,{key:0,to:n.current.path},{default:e(()=>[v(C(n.current.label),1)]),_:1},8,["to"])):B("",!0)]),_:1})]),p("div",F,[s(w,null,{dropdown:e(()=>[s(d,null,{default:e(()=>[s(r,null,{default:e(()=>[v("个人中心")]),_:1}),s(r,{onClick:n.logoutHandler},{default:e(()=>[v("退出登录")]),_:1},8,["onClick"])]),_:1})]),default:e(()=>[p("span",O,[p("img",{src:n.getImgSrc("defaultUser"),alt:""},null,8,q)])]),_:1})])]),_:1})}const G=x(j,[["render",A]]),I="/backstage/assets/logoDark-d41f61f3.svg";const J={setup(){const c=T(),_=S(),u=_.state.sidebarMenu;return{noChildren:()=>u.filter(t=>!t.children),hasChildren:()=>u.filter(t=>t.children),clickMenu:t=>{c.push({name:t.name}),_.commit("selectSidebarMenu",t)}}}},K={class:"logo"},P=p("img",{src:I,alt:""},null,-1),Q={key:0};function W(c,_,u,n,g,b){const t=o("el-icon"),l=o("el-menu-item"),m=o("el-menu-item-group"),f=o("el-sub-menu"),k=o("el-menu");return a(),i(k,{class:"el-menu-vertical-demo",collapse:c.$store.state.barCollapse,"text-color":"#fff","active-text-color":"#2cb2c2","background-color":"#3b3c3d"},{default:e(()=>[p("div",K,[P,c.$store.state.barCollapse?B("",!0):(a(),h("h3",Q,"后台管理系统"))]),(a(!0),h($,null,y(n.noChildren(),r=>(a(),i(l,{index:r.path,key:r.path,onClick:d=>n.clickMenu(r)},{default:e(()=>[s(t,null,{default:e(()=>[(a(),i(M(r.icon),{class:"icons"}))]),_:2},1024),p("span",null,C(r.label),1)]),_:2},1032,["index","onClick"]))),128)),(a(!0),h($,null,y(n.hasChildren(),r=>(a(),i(f,{index:r.label,key:r.path},{title:e(()=>[s(t,null,{default:e(()=>[(a(),i(M(r.icon),{class:"icons"}))]),_:2},1024),p("span",null,C(r.label),1)]),default:e(()=>[s(m,null,{default:e(()=>[(a(!0),h($,null,y(r.children,(d,w)=>(a(),i(l,{index:d.path,key:w,onClick:H=>n.clickMenu(d)},{default:e(()=>[s(t,null,{default:e(()=>[(a(),i(M(d.icon),{class:"icons"}))]),_:2},1024),p("span",null,C(d.label),1)]),_:2},1032,["index","onClick"]))),128))]),_:2},1024)]),_:2},1032,["index"]))),128))]),_:1},8,["collapse"])}const X=x(J,[["render",W]]);const Y={setup(){const c=S(),_=T(),u=L(),n=c.state.tagList;return{tags:n,changeMenu:t=>{_.push({name:t.name})},closeTag:(t,l)=>{const m=n.length-1;c.commit("closeTag",t),t.name===u.name&&(l===m?_.push({name:n[l-1].name}):_.push({name:n[l].name}))}}}},Z={class:"tag-container"};function ee(c,_,u,n,g,b){const t=o("el-tag");return a(),h("div",Z,[(a(!0),h($,null,y(n.tags,(l,m)=>(a(),i(t,{key:l.name,closable:l.name!=="home",effect:c.$route.name===l.name?"dark":"plain",onClick:f=>n.changeMenu(l),onClose:f=>n.closeTag(l,m)},{default:e(()=>[v(C(l.label),1)]),_:2},1032,["closable","effect","onClick","onClose"]))),128))])}const ne=x(Y,[["render",ee]]);const te=R({components:{Header:G,Sidebar:X,Tags:ne}}),oe={class:"layout-container"};function se(c,_,u,n,g,b){const t=o("Sidebar"),l=o("Header"),m=o("el-header"),f=o("Tags"),k=o("RouterView"),r=o("el-main"),d=o("el-container");return a(),h("div",oe,[s(d,null,{default:e(()=>[s(t),s(d,null,{default:e(()=>[s(m,null,{default:e(()=>[s(l)]),_:1}),s(r,null,{default:e(()=>[s(f),s(k)]),_:1})]),_:1})]),_:1})])}const ae=x(te,[["render",se]]);export{ae as default};