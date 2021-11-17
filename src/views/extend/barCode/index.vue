<template>
  <div class="BarCode-container app-container">
    <el-tabs type="border-card" class="JNPF-el_tabs">
      <el-tab-pane label="生成二维码">
        <el-row>
          <el-col :span="16">
            <el-form label-width="100px">
              <el-form-item label="二维码内容">
                <el-input v-model="qrcode" placeholder="输入要生成二维码的字符串">
                  <el-button slot="append" @click="getQRimg">生成</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="二维码图像">
                <div id="qrcode" ref="qrCode"></div>
                <p style="color:#666">使用微信扫一扫</p>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="生成条形码">
        <el-row>
          <el-col :span="16">
            <el-form label-width="100px">
              <el-form-item label="条形码内容">
                <el-input v-model="barcode" placeholder="输入要生成条形码的字符串">
                  <el-button slot="append" @click="getBarcode">生成</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="条形码图像">
                <canvas id="barcode"></canvas>
                <p style="color:#666">使用微信扫一扫</p>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>

import QRCode from 'qrcodejs2'
import JsBarcode from 'jsbarcode'
export default {
  name: 'extend-barCode',
  data() {
    return {
      qrcode: '',
      barcode: "",
    }
  },
  methods: {
    getQRimg() {
      if (!this.qrcode) {
        return
      }
      this.$refs.qrCode.innerHTML = "";
      let qrcode = new QRCode(this.$refs.qrCode, {
        width: 265,
        height: 265, // 高度
        text: this.qrcode, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
    },
    getBarcode() {
      let reg = /^[A-Za-z0-9]+$/
      if (!reg.test(this.barcode)) {
        this.$message({
          message: '请输入数字或者英文字母',
          type: 'error',
          duration: 1500,
        })
        return
      }
      JsBarcode("#barcode", this.barcode, {
        // format: "pharmacode",
        // lineColor: "#0aa",
        width: 4,
        height: 80,
        displayValue: false
      });
    }
  }

}
</script>

<style lang="scss" scoped>
.BarCode-container {
  padding: 0;
  // height: auto;
  #qrcode {
    width: 265px;
    height: 265px;
    border: 1px solid #eee;
  }
  #barcode {
    width: 265px;
    height: 80px;
    border: 1px solid #eee;
  }
}
</style>
