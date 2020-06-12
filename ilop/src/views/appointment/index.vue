<template>
  <div class="appointment-wrap">
    <van-dialog v-model="dialogVisible" title="提交确认" show-cancel-button>
      <div class="panel">
        <div class="content-part">
          <div class="part-title border-bottom">主日聚会</div>
          <div style="margin: 8px 0;">{{ date }} - {{ hall }}</div>
        </div>
        <div style="margin-top: 16px;" class="content-part">
          <div class="part-title border-bottom">预约人员</div>
          <div
            style="margin: 8px 0;"
            v-for="(item, idx) in personList"
            :key="idx"
          >
            <div>
              {{ item.name }} - {{ item.mobile }} -
              {{ item.relationship ? item.relationship : "自己" }}
            </div>
          </div>
        </div>
        <div v-if="remark" style="margin-top: 16px;" class="content-part">
          <div class="part-title border-bottom">备注</div>
          <div style="margin-top: 8px; word-wrap:break-word;">
            {{ remark }}
          </div>
        </div>
      </div>
    </van-dialog>
    <Attention
      :handleSubmit="handleSubmit"
      :step.sync="step"
      v-if="step === 1"
    ></Attention>
    <div style="padding: 16px 0;" v-if="step === 0">
      <div class="title text-center">线上预约</div>
      <div class="tip">(预约可取消或修改)</div>
      <div class="form overflow-scroll">
        <van-form
          :validate-first="true"
          ref="form"
          @failed="onSubmitFailed"
          @submit="handleNext"
          :scroll-to-error="true"
          :show-error-message="false"
          label-width="120px"
        >
          <div class="panel">
            <div class="part-title border-bottom">主日聚会</div>
            <van-field :key="0" readonly required :value="date" label="日期" />
            <van-field
              :key="1"
              :rules="[{ required: true, message: '请选择第几堂' }]"
              readonly
              clickable
              required
              name="hall"
              :value="hall"
              label="第几堂"
              placeholder="请选择"
              @click="showHallPicker = true"
            />
          </div>
          <div style="margin-top: 16px;" class="panel">
            <div class="part-title border-bottom">预约人员</div>
            <van-field :key="2" name="hasSelf" label="是否包含您自己">
              <template #input>
                <van-checkbox
                  @click="handleClickHasSelf"
                  :value="hasSelf"
                  shape="square"
                  >包含自己</van-checkbox
                >
              </template>
            </van-field>
            <div
              class="panel"
              :key="`personItem${idx}`"
              v-for="(item, idx) in personList"
            >
              <van-icon
                @click="() => handleDeletePerson(idx)"
                v-if="!item.isSelf"
                color="#1989fa"
                size="20"
                class="close-btn"
                name="close"
              />
              <van-field
                :key="`3${idx}`"
                v-model="item.name"
                :name="`3${idx}name`"
                label="姓名"
                placeholder="请输入"
                required
                border
                clearable
                :rules="[{ required: true, message: '请输入姓名' }]"
              />
              <van-field
                :key="`4${idx}`"
                :rules="[
                  { required: true, message: '请输入手机号' },
                  {
                    validator: $utils.checkPhone,
                    message: '请输入正确的手机号',
                  },
                ]"
                :readonly="!!item.isSelf"
                type="tel"
                v-model="item.mobile"
                :name="`4${idx}mobile`"
                label="手机号"
                placeholder="请输入"
                maxlength="11"
                required
                border
                clearable
              />
              <van-field
                v-if="!item.isSelf"
                :key="`5${idx}`"
                :rules="[{ required: true, message: '请选择你们的关系' }]"
                readonly
                clickable
                required
                name="relationship"
                :value="item.relationship"
                label="关系"
                placeholder="请选择"
                @click="
                  currentIdx = idx;
                  showRelationshipPicker = true;
                "
              />
            </div>
            <van-button
              @click="handleAddPerson"
              v-if="personList.length < 3"
              size="small"
              block
              plain
              round
              type="info"
              >+ 添加人员</van-button
            >
          </div>
          <div class="panel">
            <van-field
              :key="6"
              v-model="remark"
              rows="3"
              maxLength="100"
              autosize
              type="textarea"
              name="remark"
              label="备注"
              placeholder="如有小孩前往聚会，请在此输入姓名和人数"
            />
          </div>
          <van-button class="bottom-btn" block type="info" native-type="submit">
            下一步
          </van-button>
        </van-form>
        <!-- 选择第几堂 -->
        <van-popup v-model="showHallPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="hallOptions"
            @confirm="onHallConfirm"
            @cancel="showHallPicker = false"
          />
        </van-popup>
        <!-- 选择关系 -->
        <van-popup v-model="showRelationshipPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="relationshipOptions"
            @confirm="onRelationshipConfirm"
            @cancel="showRelationshipPicker = false"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
