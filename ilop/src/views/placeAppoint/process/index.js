import { getBaseInfo, getDetail } from "@/api/placeAppoint.js";
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
      reasonOptions: []
      detailReason: '',
      remark: '',
      step: 0, */

      userName: 'yjs',
      userMobile: '15700084697',
      place: '',
      placeOptions: [],
      showPlacePicker: false,
      minDate: new Date(),
      useDate: '2020-10-10',
      date: '2020-10-10',
      showDatePicker: false,
      duration: '2',
      reason: '',
      showResonPicker: false,
      reasonOptions: [],
      detailReason: '456',
      remark: '12',
      step: 0,
      attention: ''
    };
  },
  components: {
    Attention
  },
  mounted() {
    this.getBaseInfo();
  },
  computed: {
  },
  watch: {
    place(n) {
      this.attention = this.placeOptions.find(item => item.name == n).notice;
    } 
  },
  methods: {
    /**
     * 获取基本信息
     */
    async getBaseInfo() {
      const { data, code } = await getBaseInfo();
      if (code === 200) {
        this.placeOptions = data.placeList;
        this.reasonOptions = data.reasonList;
      }
    },
    /**
     * 获取申请详情
     */
    async getDetail() {
      let id = 1;
      const { data, code } = await getDetail(id);
      if (code === 200) {
      }
    },
    /**
     * 选择场地
     */
    onPlaceConfirm(val) {
      this.place = val.name;
      this.showPlacePicker = false;
    },
    /**
     * 选择原因
     */
    onReasonConfirm(val) {
      this.reason = val.name;
      this.showResonPicker = false;
    },
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
