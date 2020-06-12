import { hallOptions, relationshipOptions } from "lib/options";
import Attention from "./attention";
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
      date: "2020-06-10 主日",
      showHallPicker: false,
      hallOptions,
      hall: "",
      userName: "",
      userMobile: "",
      hasSelf: false,
      personList: [{ ...defaultPerson }],
      selfInfo: {},
      relationshipOptions,
      showRelationshipPicker: false,
      remark: "",
    };
  },
  components: {
    Attention
  },
  mounted() {
    this.getPersonList();
  },
  computed: {
    personCount: function () {
      return this.personList.length + this.hasSelf
    },
    countLimit: function () {
      let t = this.remainCount <= 3 ? this.remainCount : 3;
      t = t - Number(this.hasSelf) - this.personList.length;
      console.log(t)
      return t;
    },
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
    getPersonList() {
      this.selfInfo = {
        name: "ttt",
        mobile: 18766666666,
      };
      this.personList = [{ ...this.selfInfo }];
      this.remainCount = 1;
    },
    /**
     * 勾选自己
     */
    handleClickHasSelf() {
      if (!this.hasSelf && !this.countLimit) {
        this.$toast(this.remainCount >= 3 ? "一个账号最多预约3人" : `目前预约名额仅剩${this.remainCount}名`);
        return;
      }
      this.hasSelf = !this.hasSelf;
    },
    /**
     * 添加人员
     */
    handleAddPerson() {
      if (!this.countLimit) {
        this.$toast(this.remainCount >= 3 ? "一个账号最多预约3人" : `目前预约名额仅剩${this.remainCount}名`);
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
     * 提交失败
     */
    onSubmitFailed(errorInfo) {
      const { values, errors } = errorInfo;
      console.log(errorInfo)
      this.$toast({message: errors[0].message, position: 'middle'});
    },
    /**
     * 下一步
     */
    handleNext() {
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
