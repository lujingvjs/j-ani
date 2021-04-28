import Vue from 'vue'
// 导入组件，组件必须声明 name
import AniTxt from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
AniTxt.install = function (Vue) {
    Vue.component(AniTxt.name, AniTxt)
}
// 默认导出组件
export default AniTxt