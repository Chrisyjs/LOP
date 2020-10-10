import { placeOptions } from "lib/options";
import {  } from "@/api";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      userName: '',
      userMobile: '',
      place: '',
      placeOptions,
      showPlacePicker: false,
      minDate: new Date(),
      useDate: '',
      date: '',
      showDatePicker: false,
      duration: '',
      reason: '',
      remark: '',
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
    },
    /**
     * 选择使用时间
     */
    onDateConfirm(date) {
      this.useDate = dayjs(date).format('YYYY-MM-DD HH:mm');
      this.showDatePicker = false;
    },
    /**
     * 时间过滤
     */
    dateFilter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 15 === 0);
      } 
      return options;
    }
  },
};
