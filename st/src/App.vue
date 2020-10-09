<template>
  <div id="app">
    <SignUp v-if="pageName === 'signUp'"></SignUp>
    <SignUp2021 v-else-if="pageName === 'signUp2021'"></SignUp2021>
    <Fruit v-else></Fruit>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>

import SignUp from "@/views/signUp/index.vue";
import SignUp2021 from "@/views/signUp2021/index.vue";
import Fruit from '@/views/fruit/index.vue';
import MyMixin from '@/mixins/index.js';
export default {
  name: 'app',
  data() {
    return {
      pageName: pageConfig.pageName
    }
  },
  components: {
    SignUp,
    Fruit,
    SignUp2021
  },
  mounted() {
    // console.log(this.pageName)
  },
  mixins: [MyMixin],
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
