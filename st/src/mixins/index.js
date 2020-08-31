export default {
  mounted() {
    this.zoomForbid();
  },
  methods: {
    zoomForbid() {
      // 禁止双指放大缩小
      window.onload = function() {
        document.addEventListener("touchstart", function(event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        });
        document.addEventListener("gesturestart", function(event) {
          event.preventDefault();
        });
      };
    },
  },
};
