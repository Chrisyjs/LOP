<template>
  <div class="place-appoint" style="padding: 16px 0;">
    <div class="title text-center">场地申请</div>
    <div class="form overflow-scroll">
      <van-form
        :validate-first="true"
        ref="form"
        @failed="onSubmitFailed"
        @submit="onSubmit"
        :scroll-to-error="true"
        :show-error-message="false"
        label-width="120px"
      >
        <div class="panel">
          <van-field
            key="userName"
            v-model="userName"
            name="userName"
            label="申请人姓名"
            placeholder="请输入"
            required
            border
            clearable
            :rules="[{ required: true, message: '请输入申请人姓名' }]"
          />
          <van-field
            key="userMobile"
            type="tel"
            v-model="userMobile"
            name="userMobile"
            label="申请人手机号"
            placeholder="请输入"
            maxlength="11"
            readonly
            required
            border
            :rules="[{ required: true, message: '请输入申请人手机号' }]"
          />
        </div>
        <van-button class="bottom-btn" block type="info" native-type="submit">
          确认提交
        </van-button>
      </van-form>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
