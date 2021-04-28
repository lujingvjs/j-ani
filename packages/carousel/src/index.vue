<!--
 * @Author: lujing
 * @Date: 2021-04-10 19:30:35
 * @LastEditTime: 2021-04-11 20:32:22
 * @LastEditors: Please set LastEditors
 * @Description: 轮播图组件
 * @FilePath: /jAni/code/j-ani/packages/carousel/src/index.vue
-->
<template>
  <div
    class="wrapper"
    :style="setBoxSize"
    @mouseleave="_mouseOut"
    @mouseenter="_mouseIn"
  >
    <button
      v-if="isHover"
      @click="_changeIndex('pre')"
      class="control-btn preIcon"
    ></button>
    <button
      v-if="isHover"
      @click="_changeIndex('next')"
      class="control-btn nextIcon"
    ></button>
    <div :style="setBoxSize" class="carousel-out-box">
      <ul
        class="carousel-content-box transitionStyl"
        ref="slideBoxId"
        :style="contentBox"
      >
        <li
          :style="setBoxSize"
          v-for="(item, index) in pictureList"
          :class="{ active: index === currPage }"
          :key="index"
        >
          <img :src="item.src" alt="" srcset="" />
        </li>
      </ul>
    </div>
    <div class="indicator-box">
      <li
        class="indicator-item"
        v-for="(item, index) in pictureList.slice(1)"
        :key="index"
      >
        <div class="circle"></div>
        <div
          class="point"
          v-if="
            currPage === index ||
            (currPage === pictureList.length - 1 && index === 0)
          "
        ></div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jcarousel",
  components: {},
  props: {
    width: {
      type: [String, Number],
      default: 500,
    },
    height: {
      type: [String, Number],
      default: 300,
    },
    pictureListProp: {
      type: Array,
      default: () => {
        return [
          { name: "第一张图片说明", src:  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3130125737,4291579555&fm=26&gp=0.jpg" },
          { name: "第二张图片说明", src:   "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=11918710,2392753884&fm=26&gp=0.jpg" },
          { name: "第三张图片说明", src:  "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/ca1349540923dd54ea2076a4d309b3de9d8248af.jpg" }
       
        ];
      },
    },
    delayTime: {
      type: [String, Number],
      default: 2000,
    },
  },
  data() {
    return {
      domElement: null, // dom元素
      pictureList: [],
      // 当前显示的图片
      currPage: 0,
      // 轮播计时器
      timer: null,
      // 鼠标是否hover
      isHover: false,
    };
  },
  computed: {
    setBoxSize() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
    contentBox() {
      return {
        width: `${this.width * this.pictureList.length}px`,
      };
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    /**
     * 鼠标移出
     */
    _mouseOut() {
      this.isHover = false;
      this.autoPlay();
    },
    /**
     * 鼠标进入
     */
    _mouseIn() {
      this.isHover = true;
      clearInterval(this.timer);
    },
    /**
     * 初始化操作
     */
    init() {
      // 找到需要操作的dom
      this.domElement = this.$refs.slideBoxId;
      // 复制最后一张图片，实现无缝滚动
      let tempArr = this.pictureListProp.slice(0);
      let firstPic = tempArr.shift();
      this.pictureList = [...this.pictureListProp, firstPic];
      this.autoPlay();
    },
    // 轮播方法
    autoPlay() {
      this.timer = setInterval(() => {
        this._changeIndex();
      }, this.delayTime);
    },

    /**
     * @param type:next-下一个  pre-上一个
     */
    _changeIndex(type = "next") {
      // 向后轮播
      if (type === "next") {
        if (this.currPage >= this.pictureList.length - 1) {
          // 去掉过渡
          this.domElement.classList.remove("transitionStyl");
          setTimeout(() => {
            this.currPage = 0;
            this._movePage();
          }, 10);
          setTimeout(() => {
            // 加上过渡
            this.domElement.classList.add("transitionStyl");
            this.currPage = 1;
            // 移动页面
            this._movePage();
          }, 50);
        } else {
          this.currPage++;
          // 移动页面
          this._movePage();
        }
      } else {
        if (this.currPage <= 0) {
          // 去掉过渡,将图片移动到最后一个
          this.domElement.classList.remove("transitionStyl");
          setTimeout(() => {
            this.currPage = this.pictureList.length - 1;
            this._movePage();
          }, 10);
          setTimeout(() => {
            // 加上过渡
            this.domElement.classList.add("transitionStyl");
            this.currPage--;
            // 移动页面
            this._movePage();
          }, 50);
        } else {
          this.currPage--;
          // 移动页面
          this._movePage();
        }
      }
    },
    // 移动页面
    _movePage() {
      console.log("this.currPage==", this.currPage);
      this.domElement.style.left = -(this.currPage * this.width) + "px";
    },
  },
  watch: {},
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  // 外包容器
  .carousel-out-box {
    // 内容盒子
    overflow: hidden;
    position: relative;
    .carousel-content-box {
      position: absolute;
      left: 0;
      top: 0;
      list-style: none;
      text-align: left;
      padding: 0;
      margin: 0;
      &.transitionStyl {
        transition: all 0.4s;
      }
      li {
        display: inline-block;
        white-space: nowrap;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // 控制按钮样式
  .control-btn {
    border: 0;
    padding: 0;
    margin: 0;
    outline: none;
    position: absolute;
    z-index: 10;
    top: 40%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &.preIcon {
      left: 5px;
      background: url("../imgs/preIcon.png") center/100% 100% no-repeat;
    }
    &.nextIcon {
      right: 5px;
      background: url("../imgs/nextIcon.png") center/100% 100% no-repeat;
    }
  }
  //指示器
  .indicator-box {
    position: absolute;
    left: 50px;
    bottom: 10px;
    z-index: 5;
    li {
      list-style: none;
      display: inline-block;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0 5px;
      .circle {
        position: absolute;
        display: inline-block;
        left: 2px;
        top: 2px;
        width: 4px;
        height: 4px;
        border: 2px solid #eee;
        border-radius: 50%;
      }
      .point {
        position: absolute;
        left: 2px;
        top: 2px;
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
      }
    }
  }
}
</style>
