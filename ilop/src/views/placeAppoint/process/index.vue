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
        label-width="100px"
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
          <van-field
            key="place"
            :rules="[{ required: true, message: '请选择场地' }]"
            readonly
            clickable
            required
            name="place"
            :value="place"
            label="申请场地"
            placeholder="请选择"
            @click="showPlacePicker = true"
          />
          <van-popup v-model="showPlacePicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="placeOptions"
              @cancel="showPlacePicker = false"
            />
          </van-popup>
          <van-field
            key="useDate"
            :rules="[{ required: true, message: '请选择使用时间' }]"
            readonly
            clickable
            required
            name="useDate"
            :value="useDate"
            label="使用时间"
            type="datetime"
            placeholder="请选择"
            @click="showDatePicker = true"
          />
          <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
              :value="date"
              :min-date="minDate"
              type="datetime"
              :filter="dateFilter"
              @confirm="onDateConfirm"
              @cancel="showDatePicker = false"
            />
          </van-popup>
          <van-field
            key="duration"
            v-model="duration"
            name="duration"
            label="使用时长 (小时)"
            type="digit"
            placeholder="请输入"
            required
            border
            clearable
            :rules="[{ required: true, message: '请输入使用时长' }]"
          />
          <van-field
            key="reason"
            v-model="reason"
            name="reason"
            label="申请原因"
            placeholder="请输入"
            required
            border
            clearable
            :rules="[{ required: true, message: '请输入申请原因' }]"
          />
          <van-field
            key="remark"
            v-model="remark"
            name="remark"
            label="备注"
            placeholder="请输入"
            border
            clearable
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
