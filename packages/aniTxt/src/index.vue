<!--
 * @Author: your name
 * @Date: 2021-04-28 08:57:49
 * @LastEditTime: 2021-04-28 09:34:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jAni/code/j-ani/packages/animationTxt/index.vue
-->
<template>
  <div id="txtBox"></div>
</template>

<script>
export default {
  name: "AniTxt",
  components: {},
  props: {
    aniTxt: {
      type: [String],
      default: "helloword!!!",
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initTxt();
    });
  },
  methods: {
    /**
     * 初始化文字
     */
    initTxt() {
      const div = document.getElementById("txtBox");
      // 将字符串拆为数组
      [...this.aniTxt].forEach((item) => {
        let span = document.createElement("span");
        span.innerHTML = item;
        div.appendChild(span);
        // 鼠标放上给元素添加color类名
        span.addEventListener("mouseover", function () {
          this.classList.add("color");
        });
        // 动画结束，需要移出color,这样再鼠标放上，才能触发动画
        span.addEventListener("animationend", function () {
          this.classList.remove("color");
        });
      });
    },
  },
  watch: {},
};
</script>

<style  lang="less">
@keyframes anitxt {
  50% {
    transform: scale(2);
    color: yellow;
  }
  to {
    transform: scale(0.5);
    color: yellowgreen;
  }
}
#txtBox {
  text-transform: uppercase;
  font-size: 40px;
  font-weight: bold;
  & > span {
    position: relative;
    display: inline-block;
  }
  .color {
    color: red;
    animation: anitxt 1s linear;
  }
}
</style>


