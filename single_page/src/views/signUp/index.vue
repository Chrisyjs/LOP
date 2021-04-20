<template>
  <div class="form-wrap">
    <div class="title">2021 ST 报名表</div>
    <div class="tip">(建议使用手机浏览器打开该网页)</div>
    <div class="form">
      <van-form
        :validate-first="true"
        ref="form"
        @failed="onSubmitFailed"
        @submit="handleSubmit"
        :scroll-to-error="true"
        :show-error-message="false"
        label-width="120px"
      >
        <!-- 公共需填 -->
        <van-field :key="0" required name="from" label="您来自哪里">
          <template #input>
            <van-radio-group
              @change="resetValidation"
              v-model="from"
              direction="horizontal"
            >
              <van-radio name="LOP">LOP</van-radio>
              <van-radio name="家乡教会">家乡教会</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :key="1"
          v-model="username"
          name="username"
          label="姓名"
          placeholder="请输入"
          required
          border
          clearable
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          :key="2"
          :rules="[{ required: true, message: '请选择性别' }]"
          required
          name="gender"
          label="性别"
        >
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :key="3"
          :rules="[{ required: true, message: '请选择出生年月日' }]"
          readonly
          clickable
          required
          name="birthday"
          :value="birthday"
          label="出生年月日"
          placeholder="请选择"
          @click="showDatePicker = true"
        />
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
            :value="date"
            type="date"
            :min-date="new Date(1970, 0, 1)"
            :max-date="new Date(2006, 11, 31)"
            @confirm="onDateConfirm"
            @cancel="showDatePicker = false"
          />
        </van-popup>
        <van-field
          :key="4"
          :rules="[
            { required: true, message: '请输入联系方式' },
            { validator: checkPhone, message: '请输入正确的手机号' },
          ]"
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
        <van-field
          :key="5"
          :rules="[{ required: true, message: '请选择身份' }]"
          required
          name="isStudent"
          label="学生或工作"
        >
          <template #input>
            <van-radio-group v-model="isStudent" direction="horizontal">
              <van-radio name="学生">学生</van-radio>
              <van-radio name="工作">工作</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :key="6"
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
        <div v-if="from == 'LOP'">
          <van-field
            :key="7"
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
            :key="8"
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
            :key="9"
            :rules="[
              { required: true, message: '请输入组长电话' },
              { validator: checkPhone, message: '请输入正确的手机号' },
            ]"
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
          <van-field
            :key="10"
            :rules="[{ required: true, message: '请选择是否报名大组长' }]"
            required
            name="dzz"
            label="报名大组长"
          >
            <template #input>
              <van-radio-group v-model="dzz" direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
        <!-- 家乡教会需填 -->
        <div v-else-if="from == '家乡教会'">
          <van-field
            :key="11"
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
          <van-field
            :key="12"
            :rules="[{ required: true, message: '请输入家乡教会名字' }]"
            v-model="hometownChurch"
            name="hometownChurch"
            label="家乡教会名字"
            placeholder="请输入"
            required
            border
            clearable
          />
          <van-popup v-model="showAddressPicker" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onAddressConfirm"
              @cancel="showAddressPicker = false"
            />
          </van-popup>
          <van-field
            :key="13"
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
            :key="14"
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
            :key="15"
            :rules="[
              { required: true, message: '请输入推荐人电话' },
              { validator: checkPhone, message: '请输入正确的手机号' },
            ]"
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
          <van-field
            :key="16"
            :rules="[{ required: true, message: '请选择推荐人身份' }]"
            required
            name="referenceIsLeader"
            label="推荐人是否组长"
          >
            <template #input>
              <van-radio-group
                v-model="referenceIsLeader"
                direction="horizontal"
                @change="resetValidation"
              >
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <d v-if="referenceIsLeader === '否'">
            <van-field
              :key="17"
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
              :key="18"
              :rules="[
                { required: true, message: '请输入推荐人组长电话' },
                { validator: checkPhone, message: '请输入正确的手机号' },
              ]"
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
          </d>
        </div>
        <!-- 公共需填 -->
        <div class="item-wrap">
          <div class="item-label form-required mb-10">
            fishing参加时间(08/25-08/28 周三至周六)
            <div class="fishing-date-warning" v-if="fishingDateWarning">
              目前选择时间不连续哦(也可提交)
            </div>
          </div>
          <van-field
            :key="19"
            class="field-padding-none"
            name="fishingDate"
            :rules="[{ required: true, message: '请选择fishing参加时间' }]"
          >
            <template #input>
              <van-checkbox-group
                @change="handleChangeFishingDate"
                class="border-bottom"
                v-model="fishingDate"
                direction="horizontal"
              >
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
          <div class="item-label form-required">
            参加嘉年华(08/29 周日)
          </div>
          <van-field
            :key="20"
            class="border-bottom"
            :rules="[{ required: true, message: '请选择是否参加嘉年华' }]"
            name="joinCarnival"
          >
            <template #input>
              <van-radio-group v-model="joinCarnival" direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
        <van-field
          :key="21"
          :rules="[{ required: true, message: '请选择是否参加过fishing' }]"
          required
          name="hasFished"
          label="参加过fishing"
        >
          <template #input>
            <van-radio-group v-model="hasFished" direction="horizontal">
              <van-radio name="是">是</van-radio>
              <van-radio name="否">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          :key="22"
          :rules="[{ required: true, message: '请选择是否参加过ST' }]"
          required
          name="hasJoinedST"
          label="参加过ST"
        >
          <template #input>
            <van-radio-group
              @change="resetValidation"
              v-model="hasJoinedST"
              direction="horizontal"
            >
              <van-radio name="是">是</van-radio>
              <van-radio name="否">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- <div v-if="hasJoinedST == '是'" class="item-wrap">
          <div class="item-label form-required">您准备为今年ST预备什么？</div>
          <van-field
            :key="23"
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="prepare"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="prepare"
            placeholder="请输入"
          />
        </div> -->
        <!-- <div v-if="hasJoinedST == '是'" class="item-wrap">
          <div class="item-label form-required">
            分享一下您ST的美好回忆和见证
          </div>
          <van-field
            :key="24"
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="memory"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="memory"
            placeholder="请输入"
          />
        </div> -->
        <!-- <div v-if="hasJoinedST == '否'" class="item-wrap">
          <div class="item-label form-required">为什么报名ST？</div>
          <van-field
            :key="25"
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="reason"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="reason"
            placeholder="请输入"
          />
        </div> -->
        <div class="item-wrap">
          <div class="item-label form-required">您对2021ST的期待</div>
          <van-field
            :key="26"
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
        <!-- <div v-if="hasJoinedST == '否'" class="item-wrap">
          <div class="item-label form-required">个人见证分享</div>
          <van-field
            :key="27"
            :rules="[{ required: true, message: '请输入相应内容' }]"
            class="border-bottom"
            v-model="experience"
            rows="3"
            :autosize="{ maxHeight: 100 }"
            type="textarea"
            name="experience"
            placeholder="请输入"
          />
        </div> -->
        <div class="need-know">
          <div class="nk-title">报名须知：</div>
          <div class="nk-content">
            1.今年ST报名费为50RMB，请在报名时一并上交报名费；<br />
            2.当您决定报名后，鼓励您开始为ST筹款，今年基础自筹费为900RMB；<br />
            3.若您不知道ST账户或ST相关细节，请找您的组长或推荐人了解详情；
          </div>
          <van-field
            :key="28"
            name="hasRead"
            :rules="[{ required: true, message: '请阅读报名须知后打勾' }]"
          >
            <template #input>
              <van-checkbox v-model="hasRead" shape="square">
                我已理解报名条件，确认报名信息无误，愿意报名2021ST
              </van-checkbox>
            </template>
          </van-field>
        </div>
        <div class="tip">(如手机无法提交，请尝试用电脑提交)</div>
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
      <!-- 提交成功弹框 -->
      <van-dialog
        @confirm="onReload"
        v-model="dialogVisible"
        title="报名成功"
        :message="`感谢您报名2021ST，上帝纪念！`"
      ></van-dialog>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
