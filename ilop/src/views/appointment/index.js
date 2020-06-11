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
        name: "yjs",
        mobile: 15700084697,
        isSelf: true,
      };
      this.personList = [{ ...this.selfInfo }];
      this.hasSelf = true;
    },
    /**
     * 勾选自己
     */
    handleClickHasSelf() {
      if (!this.hasSelf && this.personList.length >= 3) {
        this.$toast("预约人数最多三人");
        return;
      }
      if (this.hasSelf) {
        this.personList = this.personList.splice(1);
      } else {
        this.personList.unshift({ ...this.selfInfo });
      }
      this.hasSelf = !this.hasSelf;
    },
    /**
     * 添加人员
     */
    handleAddPerson() {
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
