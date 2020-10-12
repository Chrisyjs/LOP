import {  } from "@/api";
import Attention from "@/components/attention";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      /* userName: '',
      userMobile: '',
      place: '',
      placeOptions: [],
      showPlacePicker: false,
      minDate: new Date(),
      useDate: '',
      date: '',
      showDatePicker: false,
      duration: '',
      reason: '',
      showResonPicker: false,
      detailReason: '',
      remark: '',
      step: 0, */

      userName: 'yjs',
      userMobile: '15700084697',
      place: '123',
      placeOptions: [],
      showPlacePicker: false,
      minDate: new Date(),
      useDate: '2020-10-10',
      date: '2020-10-10',
      showDatePicker: false,
      duration: '2',
      reason: '123',
      showResonPicker: false,
      detailReason: '456',
      remark: '12',
      step: 0,
    };
  },
  components: {
    Attention
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
