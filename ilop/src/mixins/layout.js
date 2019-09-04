export default {
  mounted() {
    this.$nextTick(() => {
      let dom = document.querySelector(".overflow-scroll");
      dom.style.height = document.documentElement.clientHeight - 100 + "px";
    });
  },
}