
<template>
  <div class="form-wrap">
    <div class="title">2020 ST 报名表</div>
    <div class="form">
      <van-form @failed="onSubmitFailed" @submit="handleSubmit" :scroll-to-error="true" :show-error-message="false" label-width="120px">
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
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field :rules="[{ required: true, message: '请选择性别' }]" required name="gender" label="性别">
          <template #input>
            <van-radio-group  v-model="gender" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :rules="[{ required: true, message: '请选择出生年月' }]"
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
          :rules="[{ required: true, message: '请输入联系方式' }]"
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
        <van-field :rules="[{ required: true, message: '请选择身份' }]" required name="isStudent" label="学生或工作">
          <template #input>
            <van-radio-group v-model="isStudent" direction="horizontal">
              <van-radio name="0">学生</van-radio>
              <van-radio name="1">工作人士</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :rules="[{ required: true, message: '请选择衣服尺码' }]"
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
            :rules="[{ required: true, message: '请选择牧区' }]"
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
            :rules="[{ required: true, message: '请输入组长' }]"
            v-model="leader"
            name="leader"
            label="组长"
            placeholder="请输入"
            required
            border
            clearable
          />
          <van-field
            :rules="[{ required: true, message: '请输入组长电话' }]"
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
          <van-field :rules="[{ required: true, message: '请选择是否报名大组长' }]" required name="dzz" label="报名大组长">
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
            :rules="[{ required: true, message: '请选择省市区' }]"
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
            :rules="[{ required: true, message: '请输入推荐人' }]"
            v-model="reference"
            name="reference"
            label="推荐人(LOP)"
            placeholder="请输入"
            required
            border
            clearable
          />
          <van-field
            :rules="[{ required: true, message: '请选择推荐人牧区' }]"
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
            :rules="[{ required: true, message: '请输入推荐人电话' }]"
            type="tel"
            v-model="referenceMobile"
            name="referenceMobile"
            label="推荐人电话"
            placeholder="请输入"
            maxlength="11"
            required
            border
            clearable
          />
          <van-field :rules="[{ required: true, message: '请选择推荐人身份' }]" required name="referenceIsLeader" label="推荐人是否组长">
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
              :rules="[{ required: true, message: '请输入推荐人组长' }]"
              v-model="referenceLeader"
              name="referenceLeader"
              label="推荐人组长"
              placeholder="请输入"
              required
              border
              clearable
            />
            <van-field
              :rules="[{ required: true, message: '请输入推荐人组长电话' }]"
              type="tel"
              v-model="referenceLeaderMobile"
              name="referenceLeaderMobile"
              label="推荐人组长电话"
              placeholder="请输入"
              maxlength="11"
              required
              border
              clearable
            />
          </template>
        </template>
        <!-- 公共需填 -->
        <div class="item-wrap">
          <div class="item-label form-required mb-10">fishing参加时间</div>
          <van-field class="field-padding-none" name="fishingDate" :rules="[{ required: true, message: '请选择fishing参加时间' }]">
            <template #input>
              <van-checkbox-group class="border-bottom" v-model="fishingDate" direction="horizontal">
                <van-checkbox
                  v-for="(item, idx) in fishingDateOptions"
                  :key="idx"
                  :name="idx + 1"
                  shape="square"
                  >第{{ idx + 1 }}天</van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>
        </div>
        <div class="item-wrap">
          <div class="item-label form-required">参加嘉年华（09/05-09/06）</div>
          <van-field class="border-bottom" :rules="[{ required: true, message: '请选择是否参加嘉年华' }]" name="joinCarnival">
            <template #input>
              <van-radio-group v-model="joinCarnival" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
        <van-field :rules="[{ required: true, message: '请选择是否参加过fishing' }]" required name="hasFished" label="参加过fishing">
          <template #input>
            <van-radio-group v-model="hasFished" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div v-if="hasFished == '1'" class="item-wrap">
          <div class="item-label form-required">您准备为今年ST预备什么？</div>
          <van-field
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="prepare"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="prepare"
            placeholder="请输入"
          />
        </div>
        <div v-if="hasFished == '1'" class="item-wrap">
          <div class="item-label form-required">
            分享一下您ST的美好回忆和见证
          </div>
          <van-field
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="memory"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="memory"
            placeholder="请输入"
          />
        </div>
        <div v-if="hasFished == '0'" class="item-wrap">
          <div class="item-label form-required">为什么报名ST？</div>
          <van-field
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="reason"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="reason"
            placeholder="请输入"
          />
        </div>
        <div class="item-wrap">
          <div class="item-label form-required">您对2020ST的期待</div>
          <van-field
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="expectation"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="expectation"
            placeholder="请输入"
          />
        </div>
        <div v-if="hasFished == '0'" class="item-wrap">
          <div class="item-label form-required">个人见证分享</div>
          <van-field
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="experience"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="experience"
            placeholder="请输入"
          />
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
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

<script src="./index.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
