import {  } from "lib/options";
import {  } from "@/api";
export default {
  data() {
    return {
      userName: '',
      userMobile: ''
    };
  },
  components: {
  },
  mounted() {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    /**
     * 提交表单
     */
    onSubmit() {

    },
    /**
     * 失败校验
     */
    onSubmitFailed(errorInfo) {
      const { values, errors } = errorInfo;
      this.$toast({ message: errors[0].message, position: "middle" });
    }
  },
};
