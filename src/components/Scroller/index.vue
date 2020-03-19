<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroller",
  //传递给其他组件的数据
  props: {
    handToScroll: {
      type: Function,
      default: function() {}
    },
    handTotouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    //引用better-scroll插件
    var scroll = new Bscroll(this.$refs.wrapper, {
      //tap跟click是一样的，但是click会有延迟，所以用tap好
      tap: true,

      probeType: 1
    });
    this.scroll = scroll;
    scroll.on("scroll", pos => {
      this.handToScroll(pos);
    });
    scroll.on("touchEnd", pos => {
      this.handTotouchEnd(pos);
    });
  },
  methods: {
    //指定滑倒高度
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style>
.wrapper {
  height: 100%;
}
</style>
