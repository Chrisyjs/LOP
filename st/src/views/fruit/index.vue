<template>
  <div class="form-wrap">
    <div class="title">2020 ST 果子统计</div>
    <div class="tip">(建议使用手机浏览器打开该网页)</div>
    <div class="form">
      <van-form
        :validate-first="true"
        ref="form"
        @failed="onSubmitFailed"
        @submit="handleSubmit"
        :scroll-to-error="true"
        :show-error-message="false"
        label-width="80px"
      >
        <van-field
          v-model="username"
          name="username"
          label="您的姓名"
          placeholder="请输入"
          required
          border
          clearable
          :rules="[{ required: true, message: '请输入您的姓名' }]"
        />
        <van-field
          v-model="fruitName"
          name="fruitName"
          label="果子姓名"
          placeholder="请输入"
          required
          border
          clearable
          :rules="[{ required: true, message: '请输入果子姓名' }]"
        />
        <van-field
          :rules="[{ required: true, message: '请选择果子性别' }]"
          required
          name="gender"
          label="果子性别"
        >
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :rules="[{ required: true, message: '请选择果子年龄' }]"
          readonly
          clickable
          required
          name="age"
          :value="age"
          label="果子年龄"
          placeholder="请选择"
          @click="showAgePicker = true"
        />
        <van-popup v-model="showAgePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="fruitAgeOptions"
            @confirm="onAgeConfirm"
            @cancel="showAgePicker = false"
          />
        </van-popup>
        <van-field
          :rules="[{ required: true, message: '请选择果子身份' }]"
          required
          name="identity"
          label="果子身份"
        >
          <template #input>
            <van-radio-group v-model="identity" direction="horizontal">
              <van-radio name="学生">学生</van-radio>
              <van-radio name="工作">工作</van-radio>
              <van-radio name="未知">未知</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :rules="[{ required: true, message: '请选择果子类型' }]"
          readonly
          clickable
          required
          name="type"
          :value="type"
          label="果子类型"
          placeholder="请选择"
          @click="showTypePicker = true"
        />
        <van-popup v-model="showTypePicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="fruitTypeOptions"
            @confirm="onTypeConfirm"
            @cancel="showTypePicker = false"
          />
        </van-popup>
        <van-field
          :rules="[{ required: true, message: '请选择禾场' }]"
          readonly
          clickable
          required
          name="city"
          :value="city"
          label="禾场"
          placeholder="请选择"
          @click="showCityPicker = true"
        />
        <van-popup v-model="showCityPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="fruitCityOptions"
            @confirm="onCityConfirm"
            @cancel="showCityPicker = false"
          />
        </van-popup>
        <van-field
          v-model="address"
          name="address"
          label="具体地址"
          placeholder="请输入遇到果子的具体地址"
          required
          border
          clearable
          :rules="[{ required: true, message: '请输入具体地址' }]"
        />
        <div class="item-wrap">
          <div class="item-label form-required">果子联系方式</div>
          <van-field
            :rules="[
              { required: true, message: '请至少输入一种果子有效联系方式' },
            ]"
            class="border-bottom"
            v-model="contact"
            rows="4"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="contact"
            placeholder="样式一：手机号 xxx；样式二：微信号 xxx；样式三：qq号 xxx；样式四：邮箱号 xxx；等"
          />
        </div>
        <div class="item-wrap">
          <div class="item-label form-unRequired">备注</div>
          <van-field
            class="border-bottom"
            v-model="remark"
            rows="2"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="remark"
            placeholder="果子其他信息"
          />
        </div>
        <div class="tip">(如手机无法提交，请尝试用电脑提交)</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <!-- 提交成功弹框 -->
      <van-dialog
        @confirm="onReload"
        v-model="dialogVisible"
        title="录入成功"
        :message="`感谢您的摆上，上帝纪念！`"
      ></van-dialog>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
