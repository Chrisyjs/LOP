import areaList from "@/lib/area";
import { sizeOptions, mqOptions, fishingDateOptions } from "@/lib/options";
import { checkNumberIsSerial } from "@/lib/utils";
import { submitFormApi } from '@/api'
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
      //
      dialogVisible: false,
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
      const isLop = this.from === 'LOP';
      const hasJoinedST = this.hasJoinedST === '是';
      const params = {
        churchType: this.from,
        name: this.username,
        gender: this.gender,
        birthday: this.birthday.replace(/\//g, '-'),
        mobile: this.mobile,
        graduateFlag: this.isStudent,
        clothSizeType: this.size,
        regionType: isLop ? this.mq : '',
        leaderName: isLop ? this.leaderName : '',
        leaderMobile: isLop ? this.leaderMobile : '',
        stLeaderFlag: isLop ? this.dzz : '',
        hometown: !isLop ? this.address : '',
        hometownChurch: !isLop ? this.hometownChurch : '',
        referrerName: !isLop ? this.reference : '',
        referrerRegion: !isLop ? this.referenceMq : '',
        referrerMobile: !isLop ? this.referenceMobile : '',
        referrerLeader: !isLop ? (this.referenceIsLeader === '是' ? this.referrerName : this.referenceLeader) : '',
        referrerLeaderMobile: !isLop ? (this.referenceIsLeader === '是' ? this.referenceMobile : this.referenceLeaderMobile) : '',
        stOutTime: this.fishingDate.join('-'),
        joinPartyTime: this.joinCarnival,
        joinedFishingFlag: this.hasFished,
        joinStFlag: this.hasJoinedST,
        prepareStContent: hasJoinedST ? this.prepare : '',
        experienceContent: hasJoinedST ? this.memory : '',
        reasonToJoin: !hasJoinedST ? this.reason : '',
        requestForSt: !hasJoinedST ? this.expectation : '',
        personalExperienceContent: !hasJoinedST ? this.experience : ''
      }
      console.log(params)
      const { code, data, msg } = await submitFormApi(params);
      if (code === 200) {
        this.dialogVisible = true;
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
      const d = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
      this.birthday = d;
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
