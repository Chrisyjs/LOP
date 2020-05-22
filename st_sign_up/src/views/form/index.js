import areaList from "@/lib/area";
import { sizeOptions, mqOptions, fishingDateOptions } from "@/lib/options";
export default {
  data() {
    return {
      from: "1",
      username: "",
      gender: "",
      birthday: "",
      showDatePicker: false,
      mobile: "",
      isStudent: "",
      size: "",
      sizeOptions,
      showSizePicker: false,
      mq: "",
      mqOptions,
      showMqPicker: false,
      leader: "",
      leaderMobile: "",
      dzz: "",
      address: "",
      areaList,
      showAddressPicker: false,
      reference: "",
      whoseMq: "",
      referenceMobile: "",
      referenceIsLeader: "",
      referenceLeader: "",
      referenceLeaderMobile: "",
      fishingDate: [],
      fishingDateOptions,
      joinCarnival: "",
      hasFished: "1",
      prepare: "",
      memory: "",
      reason: "",
      expectation: "",
      experience: "",
    };
  },
  created() {
    console.log(this.areaList);
  },
  watch: {},
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      console.log('success')
    },
    /**
     * 提交失败
     */
    onSubmitFailed(errorInfo) {
      const { values, errors } = errorInfo;
      console.log(errorInfo)
      this.$toast({message: errors[0].message, position: 'middle'});
    },
    /**
     * 选择日期
     */
    onDateConfirm(date) {
      this.showDatePicker = false;
      const d = date.toLocaleString() || "";
      this.birthday = d.split(" ")[0];
    },
    /**
     * 选择尺寸
     */
    onSizeConfirm(val) {
      this.showSizePicker = false;
      this.size = val;
    },
    /**
     * 选择牧区
     */
    onMqConfirm(val) {
      this.showMqPicker = false;
      this.whoseMq === "user" ? (this.mq = val) : (this.referenceMq = val);
    },
    /**
     * 选择地址
     */
    onAddressConfirm(values) {
      this.showAddressPicker = false;
      this.address = values.map((item) => item.name).join("/");
    },
  },
};
