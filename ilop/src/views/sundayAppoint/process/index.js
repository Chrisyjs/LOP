import { relationshipOptions } from "@/lib/options";
import Attention from "@/components/attention";
import { getAppointmentInfo, submitAppointmentInfo } from "@/api/sundayAppoint.js";
import { mapMutations } from 'vuex';
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
      hallOptions: [],
      hallTip: "",
      userName: "",
      userMobile: this.$utils.getCookie("mobile"),
      hasSelf: false,
      remainCount: 3,
      personList: [],
      hallInfoList: [],
      relationshipOptions,
      showRelationshipPicker: false,
      remark: "",
      notice: "",
    };
  },
  components: {
    Attention,
  },
  mounted() {
    this.getPersonList();
  },
  destroyed() {
    this.setHasNotice(false);
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
    ...mapMutations(['setHasNotice']),
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
        // partySessionInfoList = [partySessionInfoList[0]]
        this.zrInfo = {
          id,
          topic,
          bible: scripture,
          date: `${appointmentTime}`,
          speaker: speakerName,
          remarkPlaceholder: "如带小朋友前来聚会，请填写小朋友的人数和年龄",
        };
        this.notice = remark;
        this.notice && (this.setHasNotice(true));
        this.userName = loginName;
        this.hallOptions = partySessionInfoList.map(item => item.time);
        this.hallInfoList = partySessionInfoList;
        if (this.hallOptions.length === 1) {
          this.hall = this.hallOptions[0];
          this.hallTip = "请注意本周主日仅一堂";
        } else {
          this.hallTip = "请注意上方第几堂选项选择";
          let obj = partySessionInfoList.find(item => item.appointmentlist.length) || {};
          this.hall = obj.sessionNum  ? obj.time : '';
        }
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
        "sessionType": this.hall.indexOf('第一堂') > -1 || this.hallOptions.length === 1 ? 1 : 2,
        "partyId": this.zrInfo.id,
        "remark": this.remark
      })
      if (code === 200) {
        this.$toast('预约成功！');
        this.$router.push('/sundayAppoint/list');
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
