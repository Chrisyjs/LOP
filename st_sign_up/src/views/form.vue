<template>
  <div class="form-wrap">
    <div class="title">2020 ST 报名表</div>
    <div class="form">
      <van-form @submit="handleSubmit" label-width="120px">
        <!-- 公共需填 -->
        <van-field required name="from" label="您来自哪里">
          <template #input>
            <van-radio-group v-model="from" direction="horizontal">
              <van-radio name="1">LOP</van-radio>
              <van-radio name="2">家乡教会</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="username"
          name="username"
          label="姓名"
          placeholder="请输入"
          required
          border
          clearable
        />
        <van-field required name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          required
          name="birthday"
          :value="birthday"
          label="出生年月"
          placeholder="请选择"
          @click="showDatePicker = true"
        />
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
            type="date"
            :min-date="new Date(1970, 10, 1)"
            :max-date="new Date(2005, 1, 1)"
            @confirm="onDateConfirm"
            @cancel="showDatePicker = false"
          />
        </van-popup>
        <van-field
          type="tel"
          v-model="mobile"
          name="mobile"
          label="联系方式"
          placeholder="请输入"
          maxlength="11"
          required
          border
          clearable
        />
        <van-field required name="isStudent" label="学生或工作">
          <template #input>
            <van-radio-group v-model="isStudent" direction="horizontal">
              <van-radio name="0">学生</van-radio>
              <van-radio name="1">工作人士</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          required
          name="size"
          :value="size"
          label="衣服尺码"
          placeholder="请选择"
          @click="showSizePicker = true"
        />
        <van-popup v-model="showSizePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="sizeOptions"
            @confirm="onSizeConfirm"
            @cancel="showSizePicker = false"
          />
        </van-popup>
        <!-- LOP 需填 -->
        <template v-if="from == 1">
          <van-field
            readonly
            clickable
            required
            name="mq"
            :value="mq"
            label="牧区"
            placeholder="请选择"
            @click="
              whoseMq = 'user';
              showMqPicker = true;
            "
          />
          <van-field
            v-model="leader"
            name="leader"
            label="组长"
            placeholder="请输入"
            required
            border
            clearable
          />
          <van-field
            type="tel"
            v-model="leaderMobile"
            name="leaderMobile"
            label="组长电话"
            placeholder="请输入"
            maxlength="11"
            required
            border
            clearable
          />
          <van-field required name="dzz" label="报名大组长">
            <template #input>
              <van-radio-group v-model="dzz" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </template>
        <!-- 家乡教会需填 -->
        <template v-else-if="from == 2">
          <van-field
            readonly
            clickable
            required
            name="address"
            :value="address"
            label="家乡"
            placeholder="点击选择省市区"
            @click="showAddressPicker = true"
          />
          <van-popup v-model="showAddressPicker" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onAddressConfirm"
              @cancel="showAddressPicker = false"
            />
          </van-popup>
          <van-field
            v-model="reference"
            name="reference"
            label="推荐人(LOP)"
            placeholder="请输入"
            required
            border
            clearable
          />
          <van-field
            readonly
            clickable
            required
            name="referenceMq"
            :value="referenceMq"
            label="推荐人牧区"
            placeholder="请选择"
            @click="
              whoseMq = 'reference';
              showMqPicker = true;
            "
          />
          <van-field
            type="tel"
            v-model="referenceMobile"
            name="referenceMobile"
            label="推荐人电话"
            placeholder="请输入"
            maxlength="11"
            required
            border
            clearableI
          />
          <van-field required name="referenceIsLeader" label="推荐人是否组长">
            <template #input>
              <van-radio-group
                v-model="referenceIsLeader"
                direction="horizontal"
              >
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <template v-if="referenceIsLeader === '0'">
            <van-field
              v-model="referenceLeader"
              name="referenceLeader"
              label="推荐人组长"
              placeholder="请输入"
              required
              border
              clearable
            />
            <van-field
              type="tel"
              v-model="referenceLeaderMobile"
              name="referenceLeaderMobile"
              label="推荐人组长电话"
              placeholder="请输入"
              maxlength="11"
              required
              border
              clearableI
            />
          </template>
        </template>
        <!-- 公共需填 -->
      </van-form>
      <!-- 牧区选择弹框 -->
      <van-popup v-model="showMqPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="mqOptions"
          @confirm="onMqConfirm"
          @cancel="showMqPicker = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import areaList from "@/lib/area";
export default {
  data() {
    return {
      from: "",
      username: "",
      gender: "",
      birthday: "",
      showDatePicker: false,
      mobile: "",
      size: "",
      sizeOptions: ["S", "M", "L", "XL", "XXL", "其他"],
      showSizePicker: false,
      mq: "",
      mqOptions: ["SQ", "BJ", "GZD", "GZX", "ZJG", "XS"],
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
    handleSubmit() {},
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
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 16px 12px;
  .title {
    text-align: center;
    font-size: 18px;
    color: rgb(11, 177, 243);
    font-weight: bold;
  }
  .form {
    margin-top: 12px;
  }
}
</style>
