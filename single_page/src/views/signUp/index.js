import areaList from "@/lib/area";
import { sizeOptions, mqOptions, fishingDateOptions } from "@/lib/options";
import { checkNumberIsSerial } from "@/lib/utils";
import { submitSignUpApi } from '@/api'
import myMixins from '@/mixins';
export default {
  data() {
    return {
      currentYear: window.currentYear,
      from: "LOP",
      username: "",
      gender: "",
      birthday: "",
      showDatePicker: false,
      date: new Date(1995, 0, 1),
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
      hasRead: false,
      dialogVisible: false,
    };
  },
  created() {
    // console.log(this.areaList);
  },
  mixins: [myMixins],
  watch: {},
  methods: {
    /**
     * 重置验证信息
     */
    resetValidation() {
      this.$refs.form.resetValidation();
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
      const { code, data, msg } = await submitSignUpApi(params);
      if (code === 200) {
        this.dialogVisible = true;
      }
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
      const d = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
      this.birthday = d;
    },
    /**
     * 选择尺寸
     */
    onSizeConfirm(val) {
      this.showSizePicker = false;
      this.size = val.split(' ')[0];
    },
    /**
     * 选择牧区
     */
    onMqConfirm(val) {
      this.showMqPicker = false;
      this.whoseMq === "user" ? (this.mq = val) : (this.referenceMq = val);
      console.log(this.referenceMq)
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
