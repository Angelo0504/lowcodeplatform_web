<template>
  <div ref="print">
    <div class="record">
      <el-table :data="tableData3">
        <el-table-column label="基本信息">
          <el-table-column prop="data1" label="工号"></el-table-column>
          <el-table-column prop="data2" label="100001"></el-table-column>
          <el-table-column prop="data3" label="姓名"></el-table-column>
          <el-table-column prop="data4" label="红幻波"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" border style="border-top: none">
        <el-table-column label="受教育情况">
          <el-table-column prop="date" label="时间范围"></el-table-column>
          <el-table-column prop="education" label="教育名称"></el-table-column>
          <el-table-column prop="reward" label="获得奖励"></el-table-column>
          <el-table-column prop="prove" label="证明人">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData3: [
        {
          data1: "性别",
          data2: "男",
          data3: "部门",
          data4: "技术部",
        },
        {
          data1: "用工性质",
          data2: "合同制",
          data3: "职位",
          data4: "通讯工程师",
        },
        {
          data1: "身份证号",
          data2: "35020419601122205X",
          data3: "联系电话",
          data4: "17708718904",
        },
        {
          data1: "出生年月",
          data2: "1988-11-22",
          data3: "参加工作",
          data4: "2007-12-06",
        },
        {
          data1: "最高学历",
          data2: "大学",
          data3: "学历期间",
          data4: "1992-1996",
        },
      ],
      tableData: [
        {
          date: "1980-1986",
          education: "小学",
          reward: "优秀学生",
          prove: "小米",
        },
        {
          date: "1986-1989",
          education: "初中",
          reward: "三好学生",
          prove: "小明",
        },
        {
          date: "1989-1992",
          education: "高中",
          reward: "三好学生",
          prove: "李四",
        },
        {
          date: "1992-1996",
          education: "大学",
          reward: "",
          prove: "",
        },
      ],
    };
  }
};
</script>