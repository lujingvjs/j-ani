import Vue from 'vue'
// 导入组件，组件必须声明 name
import JTest from './src/test.vue'
// 为组件提供 install 安装方法，供按需引入
JTest.install = function (Vue) {
    Vue.component(JTest.name, JTest)
}
// 默认导出组件
export default JTest