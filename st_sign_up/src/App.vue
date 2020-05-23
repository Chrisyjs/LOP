<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'app',
  components: {
  },
  mounted() {
    // 禁止双指放大缩小
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault()
      })
    }
  },
  methods: {
  },
}
</script>

<style lang="scss">
#app {
  background-color: #fff;
  font-size: 14px;
}
</style>
