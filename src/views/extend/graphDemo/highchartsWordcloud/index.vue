<template>
  <div class="chart-container app-container nohead">
    <el-alert title="免责声明：Highcharts组件不属于JNPF产品，只用于介绍第三方组件如何在《JNPF快速开发平台》中使用。如果对这些组件感兴趣，请使用正版。"
      type="warning" :closable="false" class="mb-10" />
    <highcharts :options="chartOptions" :callback="myCallback"
      style="height:530px;margin-top:30px;"></highcharts>
  </div>
</template>

<script>

import { Chart } from "highcharts-vue";
import Highcharts from 'highcharts';
import highchartsWordcloud from 'highcharts/modules/wordcloud'
highchartsWordcloud(Highcharts)
export default {
  name: 'extend-graphDemo-highchartsWordcloud',
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {}

    }
  },
  mounted() {
    var text = 'Mountain no ling, river water is exhausted, winter thunder bursts, summer rain and snow, heaven and earth together, is dare and you must.At the same time, it is better to forget the leighton river than to help each other at the same time.';
    var data = text
      .split(/[,\. ]+/g)
      .reduce(function (arr, word) {
        var obj = arr.find(function (obj) {
          return obj.name === word;
        });
        if (obj) {
          obj.weight += 1;
        } else {
          obj = {
            name: word,
            weight: 1
          };
          arr.push(obj);
        }
        return arr;
      }, [])
    this.chartOptions = {
      series: [{
        type: 'wordcloud',
        data: data
      }],
      title: {
        text: '词云图'
      },
      credits: {
        enabled: false
      }
    }
  },

  methods: {
    myCallback() {
      console.log("this is callback function");
    }
  }
}
</script>
