<template>
  <div class="appointmentList-wrap">
    <div class="title text-center border-bottom" style="borderColor: #dbdbdb">我的预约</div>
    <van-empty v-if="!listData.length" description="暂无预约信息"></van-empty>
    <div v-else class="list overflow-scroll">
      <div class="panel" v-for="(item, idx) in listData" :key="idx">
        <div>
          <div class="part-title border-bottom">主日信息</div>
          <div class="content">
            <div class="item" flex="main:left cross:center">
              <div>日期:</div>
              <div>{{item.date}}</div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div>场次:</div>
              <div>{{item.hall}}</div>
            </div>
            <div class="item" flex="main:left cross:center">
              <div>时间:</div>
              <div>{{item.hall === '第一堂' ? '09:00-10:00' : '10:30-11:30'}}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="part-title border-bottom">预约信息</div>
          <div class="content" v-for="(jtem, jdx) in item.personList" :key="jdx">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: [
        {
          date: "2020-06-12",
          speaker: "yjs",
          topic: "测试",
          hall: "第一堂",
          personList: [
            {
              name: "hh",
              mobile: "15798887654",
            },
            {
              name: "xx",
              mobile: "17876543466",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.appointmentList-wrap {
  padding: 16px 0px;
  .list {
    padding: 16px;
  }
}
</style>
