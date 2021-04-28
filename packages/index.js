// 导入颜色选择器组件
import Jcarousel from './carousel'
// 文字动画
import AniTxt from './aniTxt'
// 存储组件列表
const components = {
    Jcarousel,
    AniTxt
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
    for (let name in components) {
        Vue.component(name, components[name])
    }
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

//按需引入的方式导出 (不知道这里为什么不能直接导出components)?????????????
// export  { 
//     ...components 
// }   //错误写法
export {
    Jcarousel,
    AniTxt
}

//整体引入的方式导出
export default {
 // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
 install,
 // 以下是具体的组件列表
  ...components
}

