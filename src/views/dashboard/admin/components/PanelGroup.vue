<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :span="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img src="@/assets/images/home/sold.png" alt="">
        </div>
        <div class="card-panel-description">
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
          <div class="card-panel-text">总销售额</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <img src="@/assets/images/home/ask.png" alt="">
        </div>
        <div class="card-panel-description">
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
          <div class="card-panel-text">访问量</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <img src="@/assets/images/home/pay.png" alt="">
        </div>
        <div class="card-panel-description">
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
          <div class="card-panel-text">支付笔数</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img src="@/assets/images/home/return.png" alt="">
        </div>
        <div class="card-panel-description">
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
          <div class="card-panel-text">线上购物转化率</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: { CountTo }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-bottom: 10px;
  .card-panel {
    border-radius: 4px;
    background: #fff;
    display: flex;
    padding: 34px 25px;
    background-image: url("../../../../assets/images/home/bg.png");
    background-size: cover;
    background-position: center;
    .icon-people,
    .icon-message,
    .icon-money,
    .icon-shopping {
      width: 75px;
      height: 75px;
      text-align: center;
      line-height: 89px;
      border-radius: 50%;
      margin-right: 32px;
      flex-shrink: 0;
    }
  }
  .card-panel-num {
    font-size: 20px;
    font-weight: 600;
  }
  .card-panel-text {
    margin-top: 4px;
    font-size: 14px;
    color: #666;
  }
}
.icon-people {
  background: #f2ebfb;
}

.icon-message {
  background: #edf8fe;
}

.icon-money {
  background: #fef3ef;
}

.icon-shopping {
  background: #ffeff2;
}

.icon-people {
  color: #40c9c6;
}

.icon-message {
  color: #36a3f7;
}

.icon-money {
  color: #f4516c;
}

.icon-shopping {
  color: #34bfa3;
}
.card-panel-description {
  padding-top: 15px;
}
</style>