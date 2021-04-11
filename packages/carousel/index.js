import Vue from 'vue'
// 导入组件，组件必须声明 name
import Jcarousel from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
Jcarousel.install = function (Vue) {
    Vue.component(Jcarousel.name, Jcarousel)
}
// 默认导出组件
export default Jcarousel