import { fruitTypeOptions, fruitCityOptions, fruitAgeOptions } from "@/lib/options";
import { submitFruitApi } from '@/api'
import myMixins from '@/mixins';
export default {
  data() {
    return {
      currentYear: window.currentYear,
      username: "",
      fruitName: "",
      gender: "",
      age: "",
      showAgePicker: false,
      fruitAgeOptions,
      identity: "",
      type: "",
      showTypePicker: false,
      fruitTypeOptions,
      city: "",
      showCityPicker: false,
      fruitCityOptions,
      address: "",
      contact: "",
      remark: "",
      //
      dialogVisible: false,
    };
  },
  created() {
    console.log('this.currentYear', this.currentYear)
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
     * 提交表单
     */
    async handleSubmit() {
      const params = {
        recorderName: this.username,
        sheepName: this.fruitName,
        sheepGender: this.gender,
        sheepAge: this.age,
        sheepRole: this.identity,
        sheepType: this.type,
        place: this.city,
        placeDetail: this.address,
        sheepContact: this.contact,
        remark: this.remark
      }
      console.log(params)
      const { code, data, msg } = await submitFruitApi(params);
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
    /**
     * 选择年龄
     */
    onAgeConfirm(val) {
      this.showAgePicker = false;
      this.age = val;
    },
  },
};
