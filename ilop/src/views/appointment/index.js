import { hallOptions, relationshipOptions } from "lib/options";
import Attention from "./attention";
import { getAppointmentInfo, submitAppointmentInfo } from "@/api";
const defaultPerson = {
  name: "",
  mobile: "",
  relationship: "",
};
export default {
  data() {
    return {
      dialogVisible: false,
      step: 0,
      currentIdx: 0,
      zrInfo: {},
      showHallPicker: false,
      hall: "",
      hallOptions,
      userName: "",
      userMobile: this.$utils.getCookie("mobile"),
      hasSelf: false,
      remainCount: 3,
      personList: [],
      hallInfoList: [],
      relationshipOptions,
      showRelationshipPicker: false,
      remark: "",
    };
  },
  components: {
    Attention,
  },
  mounted() {
    this.getPersonList();
  },
  computed: {
    personCount: function() {
      return this.personList.length + this.hasSelf;
    },
    countLimit: function() {
      let t = this.remainCount <= 3 ? this.remainCount : 3;
      t = t - Number(this.hasSelf) - this.personList.length;
      console.log(t);
      return t;
    },
  },
  watch: {
    hall(newVal) {
      let idx = this.hallOptions.findIndex(item => item === this.hall);
      let hallInfo = this.hallInfoList.find(item => item.sessionNum === idx + 1);
      const { appointmentlist, remark, peopleAmount, peopleAppliedAmount } = hallInfo;
      let obj = appointmentlist.find(item => item.mobile === this.userMobile);
      this.hasSelf = !!obj;
      this.personList = appointmentlist.filter(item => item.mobile !== this.userMobile);
      this.remainCount = peopleAmount - peopleAppliedAmount;
      this.remark = remark;
    }
  },
  methods: {
    /**
     * 提交预约
     */
    handleSubmit() {
      this.dialogVisible = true;
    },
    /**
     * 获取人员列表
     */
    async getPersonList() {
      this.$utils.loading();
      const { data, code } = await getAppointmentInfo(this.userMobile);
      if (code === 200) {
        const {
          id,
          partySessionInfoList,
          topic,
          scripture,
          appointmentTime,
          speakerName,
          loginName,
          remark
        } = data;
        this.zrInfo = {
          id,
          topic,
          bible: scripture,
          date: `${appointmentTime}`,
          speaker: speakerName,
          remarkPlaceholder: remark || "目前暂时不建议带小朋友前来聚会",
        };
        this.hallInfoList = partySessionInfoList;
        let obj = partySessionInfoList.find(item => item.appointmentlist.length) || {sessionNum: 1};
        this.hall = this.hallOptions[obj.sessionNum - 1];
        this.userName = loginName;
      }
    },
    /**
     * 勾选自己
     */
    handleClickHasSelf() {
      if (!this.hasSelf && this.countLimit <= 0) {
        this.$toast(
          this.remainCount >= 3
            ? "一个账号最多预约3人"
            : `目前预约名额仅剩${this.remainCount}名`
        );
        return;
      }
      this.hasSelf = !this.hasSelf;
    },
    /**
     * 添加人员
     */
    handleAddPerson() {
      if (this.countLimit <= 0) {
        this.$toast(
          this.remainCount >= 3
            ? "一个账号最多预约3人"
            : `目前预约名额仅剩${this.remainCount}名`
        );
        return;
      }
      this.personList.push({ ...defaultPerson });
    },
    /**
     * 删除人员
     */
    handleDeletePerson(idx) {
      this.personList.splice(idx, 1);
    },
    /**
     * 提交预约信息
     */
    async handleConfirmSubmit() {
      this.dialogVisible = false;
      const { code } = await submitAppointmentInfo({
        "loginMobile": this.userMobile,
        "loginName": this.userName,
        "memberList": this.personList.concat(this.hasSelf ? [{
          mobile: this.userMobile,
          name: this.userName
        }] : []),
        "sessionType": this.hall.indexOf('第一堂') ? 1 : 2,
        "partyId": this.zrInfo.id,
        "remark": this.remark
      })
      if (code === 200) {
        this.$toast('预约成功！');
        this.$router.push('/myself');
      }
    },
    /**
     * 校验失败
     */
    onSubmitFailed(errorInfo) {
      const { values, errors } = errorInfo;
      console.log(errorInfo);
      this.$toast({ message: errors[0].message, position: "middle" });
    },
    /**
     * 下一步
     */
    handleNext() {
      /* if (this.remainCount <= 0) {
        this.$toast(`目前预约名额仅剩${this.remainCount}名`)
        return;
      } */
      if (!this.personCount) {
        this.$toast("请输入预约人员信息");
        return;
      }
      this.step = 1;
    },
    /**
     * 选择第几堂
     */
    onHallConfirm(val) {
      this.showHallPicker = false;
      this.hall = val;
    },
    /**
     * 选择关系
     */
    onRelationshipConfirm(val) {
      this.showRelationshipPicker = false;
      this.personList[this.currentIdx].relationship = val;
    },
  },
};
