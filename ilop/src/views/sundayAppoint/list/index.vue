<template>
  <div class="appointmentList-wrap">
    <van-nav-bar
      class="fixed-header title"
      @click-left="$router.replace('/home')"
      left-arrow
      left-text="返回"
      title="我的预约"
    ></van-nav-bar>
    <van-empty v-if="!listData.length" description="暂无预约信息"></van-empty>
    <div v-else class="list overflow-scroll">
      <div class="panel" v-for="(item, idx) in listData" :key="idx">
        <div class="part">
          <div class="part-title border-bottom font-size-15">主日信息</div>
          <div class="content" style="padding-left: 10px;">
            <div class="item" flex="main:left cross:center">
              <div class="label">主&nbsp;&nbsp;&nbsp;&nbsp;题：</div>
              <div style="margin-left: -7px;">《{{ item.topic }}》</div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div class="label">讲&nbsp;&nbsp;&nbsp;&nbsp;员：</div>
              <div>{{ item.speakerName }}</div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div class="label">经&nbsp;&nbsp;&nbsp;&nbsp;文：</div>
              <div>{{ item.scripture }}</div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div class="label">日&nbsp;&nbsp;&nbsp;&nbsp;期：</div>
              <div>
                {{ item.appointmentTime }}
              </div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div class="label">第几堂：</div>
              <div>
                {{ item.sessionInfo }}
              </div>
            </div>
          </div>
        </div>
        <div class="part">
          <div class="part-title border-bottom font-size-15">预约信息</div>
          <table class="content table">
            <thead>
              <th>姓名</th>
              <th>手机号</th>
              <th>关系</th>
              <th v-if="item.canCancel">操作</th>
            </thead>
            <tbody>
              <tr v-for="(jtem, jdx) in item.appointmentlist" :key="jdx">
                <td>{{ jtem.name }}</td>
                <td>{{ jtem.mobile }}</td>
                <td>{{ jtem.relationship ? jtem.relationship : "自己" }}</td>
                <td v-if="item.canCancel">
                  <van-button
                    @click="() => handleCancel(jtem)"
                    type="info"
                    plain
                    size="mini"
                    >取消预约</van-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMyAppointmentList,
  cancelAppointment,
} from "@/api/sundayAppoint.js";
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      listData: [],
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    /**
     * 获取列表数据
     */
    async getListData() {
      this.$utils.loading();
      const { code, data } = await getMyAppointmentList(
        this.$utils.getCookie("mobile")
      );
      if (code === 200) {
        data.length &&
          (data[0].canCancel =
            new Date().valueOf() <
            new Date(
              `${data[0].appointmentTime.replace(/-/g, "/")} 00:00:00`
            ).valueOf());
        this.listData = data;
      }
    },
    /**
     * 取消预约
     */
    handleCancel(item) {
      this.$dialog
        .confirm({
          title: "系统提示",
          message: "确定要取消预约吗？",
        })
        .then(() => {
          cancelAppointment(item.id).then((data) => {
            if (data.code === 200) {
              this.$toast("取消成功");
              this.getListData();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.appointmentList-wrap {
  font-size: 14px;
  .overflow-scroll {
    height: calc(100vh - 108px);
  }
  .list {
    padding: 0 16px;
    .label {
      margin-right: 10px;
      font-weight: bold;
    }
  }
  .part-title {
    padding-left: 10px;
    padding-bottom: 4px;
  }
  .table {
    text-align: left;
    width: 100%;
  }
  .content {
    padding: 4px 8px;
    padding-bottom: 0;
    line-height: 22px;
  }
  .part + .part {
    margin-top: 8px;
  }
}
</style>
