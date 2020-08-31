import { fruitTypeOptions, fruitCityOptions } from "@/lib/options";
import { submitFormApi } from '@/api'
export default {
  data() {
    return {
      username: "",
      gender: "",
      age: "",
      identity: "",
      type: "",
      showTypePicker: false,
      fruitTypeOptions,
      city: "",
      showCityPicker: false,
      fruitCityOptions,
      address: "",
      contact: "",
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
     * 提交表单
     */
    async handleSubmit() {
      const params = {
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
      console.log(errorInfo)
      this.$toast({message: errors[0].message, position: 'middle'});
    },
    /**
     * 选择果子类型
     */
    onTypeConfirm(val) {
      this.showTypePicker = false;
      this.type = val;
    },
    /**
     * 选择禾场
     */
    onCityConfirm(val) {
      this.showCityPicker = false;
      this.city = val;
    },
  },
};
