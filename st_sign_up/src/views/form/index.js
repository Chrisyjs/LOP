import areaList from "@/lib/area";
import { sizeOptions, mqOptions, fishingDateOptions } from "@/lib/options";
import { checkNumberIsSerial } from "@/lib/utils";
export default {
  data() {
    return {
      from: "LOP",
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
      hometownChurch: "",
      areaList,
      showAddressPicker: false,
      reference: "",
      referenceMq: "",
      whoseMq: "",
      referenceMobile: "",
      referenceIsLeader: "",
      referenceLeader: "",
      referenceLeaderMobile: "",
      fishingDate: [],
      fishingDateOptions,
      fishingDateWarning: false,
      joinCarnival: "",
      hasFished: "",
      hasJoinedST: "是",
      prepare: "",
      memory: "",
      reason: "",
      expectation: "",
      experience: "",
    };
  },
  created() {
    // console.log(this.areaList);
  },
  watch: {},
  methods: {
    /**
     * 修改来自哪里
     */
    handleChangeFrom() {
      // this.$refs.form.resetValidation();
    },
    /**
     * 验证手机号
     */
    checkPhone(phone) {
      return /^1[3456789]\d{9}$/.test(phone)
    },
    /**
     * 选择做工时间
     */
    handleChangeFishingDate(names) {
      const isSerial = checkNumberIsSerial([...names]);
      this.fishingDateWarning = !isSerial;
    },
    /**
     * 提交表单
     */
    async handleSubmit() {
      const params = {
        churchType: this.from,
        name: this.username,
        gender: this.gender,
        birthday: this.birthday.replace('/', '-'),
        mobile: this.mobile,
        graduateFlag: this.isStudent,
        clothSizeType: this.size,
        regionType: this.mq,
        leaderName: this.leaderName,
        leaderMobile: this.leaderMobile,
        stLeaderFlag: this.dzz,
        hometown: this.address,
        hometownChurch: this.hometownChurch,
        referrerName: this.reference,
        referrerRegion: this.referenceMq,
        referrerMobile: this.referenceMobile,
        referrerLeader: this.referenceIsLeader === '是' ? this.referrerName : this.referenceLeader,
        referrerLeaderMobile: this.referenceIsLeader === '是' ? this.referenceMobile : this.referenceLeaderMobile,
        stOutTime: this.fishingDate.join('-'),
        joinPartyTime: this.joinCarnival,
        joinedFishingFlag: this.hasFished,
        joinStFlag: this.hasFished,
        prepareStContent: this.prepare,
        experienceContent: this.memory,
        reasonToJoin: this.reason,
        requestForSt: this.expectation,
        personalExperienceContent: this.experience
      }
      console.log(params)
      return;
      const { code, data, msg } = await submitFormApi(params);
      if (code === 200) {

      }
    },
    /**
     * 提交失败
     */
    onSubmitFailed(errorInfo) {
      const { values, errors } = errorInfo;
      // console.log(errorInfo)
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
