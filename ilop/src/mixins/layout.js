export default {
  mounted() {
    this.$nextTick(() => {
      let dom = document.querySelector(".overflow-scroll");
      let header = document.querySelector('.fixed-header');
      let bottom = document.querySelector('.fixed-bottom');
      let h = (header ? header.offsetHeight : 0) + (bottom ? bottom.offsetHeight : 0);
      dom.style.height = document.documentElement.clientHeight - h + "px";
    });
  },
}