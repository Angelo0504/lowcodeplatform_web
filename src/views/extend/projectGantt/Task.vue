<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main order-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="项目任务" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <el-row class="JNPF-common-search-box" :gutter="20">
          <el-form @submit.native.prevent>
            <el-col :span="6">
              <el-form-item label="关键词">
                <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">
                  {{$t('common.search')}}</el-button>
                <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
          <div class="JNPF-common-search-box-right">
            <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新建任务
            </el-button>
          </div>
        </el-row>
        <JNPF-table v-loading="listLoading" :data="list" row-key="id" :hasNO="false"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column type="index" width="50" label="序号" align="center" fixed="left" />
          <el-table-column prop="fullName" label="任务名称" show-overflow-tooltip width="200"
            fixed="left" />
          <el-table-column prop="signColor" label="标记" width="50" fixed="left">
            <template slot-scope="scope">
              <i class="icon-ym icon-ym-extend-star"
                :style="'color:' + scope.row.signColor + '!important;'"
                v-if="scope.row.signColor"></i>
              <i class="icon-ym icon-ym-extend-star-o i-default" v-else></i>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始日期" width="100" fixed="left">
            <template slot-scope="scope">{{ scope.row.startTime | toDate("yyyy-MM-dd") }}</template>
          </el-table-column>
          <el-table-column prop="endTime" label="结束日期" width="100" fixed="left">
            <template slot-scope="scope">{{scope.row.endTime | toDate("yyyy-MM-dd") }}</template>
          </el-table-column>
          <el-table-column label="完成进度" width="80" prop="schedule" fixed="left">
            <template slot-scope="scope">{{scope.row.schedule}}%</template>
          </el-table-column>
          <el-table-column :resizable="false" v-for="i in ganttTitleDate" :label="i.full_date"
            :key="i.id" align="center">
            <el-table-column class-name="gantt-item" v-for="t in i.children" :resizable="false"
              :key="t.id" :label="t.name" align="center" width="50">
              <template slot-scope="scope">
                <div :class="dayGanttType(scope.row, t.full_date)"
                  :style="'background:' + scope.row.signColor + '!important;'"
                  v-if="scope.row.signColor"></div>
                <div :class="dayGanttType(scope.row, t.full_date)" v-else></div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope" v-if="scope.row.parentId !='0'">
              <el-button size="mini" type="text" @click="addOrUpdateHandle(scope.row.id)">编辑
              </el-button>
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
      </div>
    </div>
  </transition>
</template>

<script>
import dayjs from "dayjs"; // 导入日期js
const uuidv4 = require("uuid/v4"); // 导入uuid生成插件
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { TaskList, Delete } from '@/api/extend/projectGantt'
import Form from './TaskForm'
export default {
  components: { Form },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: false,
      formVisible: false,
      dateType: 'monthAndDay',
      startDate: '',
      endDate: '',
      projectId: '',
      managerIds: ''
    }
  },
  computed: {
    // 甘特图标题日期分配
    ganttTitleDate() {
      // 分解开始和结束日期
      let start_date_spilt = dayjs(this.startDate)
        .format("YYYY-M-D")
        .split("-");
      let end_date_spilt = dayjs(this.endDate)
        .format("YYYY-M-D")
        .split("-");
      let start_year = Number(start_date_spilt[0]);
      let start_mouth = Number(start_date_spilt[1]);
      let end_year = Number(end_date_spilt[0]);
      let end_mouth = Number(end_date_spilt[1]);
      // 自动更新日期类型以适应任务时间范围跨度
      if (this.autoGanttDateType) {
        // 计算日期跨度
        let mouth_diff = this.timeDiffTime(
          this.startDate,
          this.endDate,
          "months"
        );
        if (mouth_diff > 12) {
          // 12个月以上的分到yearAndMouth
          this.setDataType("yearAndMonth");
        } else if (mouth_diff > 2) {
          // 2个月以上的分到yearAndWeek
          this.setDataType("yearAndWeek");
        } else {
          this.setDataType("monthAndDay");
        }
      }
      // 不自动更新日期类型，以dateType固定展示
      if (this.dateType === "yearAndWeek") {
        return this.yearAndWeekTitleDate(
          start_year,
          start_mouth,
          end_year,
          end_mouth
        );
      } else if (this.dateType === "monthAndDay") {
        return this.mouthAndDayTitleDate(
          start_year,
          start_mouth,
          end_year,
          end_mouth
        );
      } else {
        return this.yearAndMouthTitleDate(
          start_year,
          start_mouth,
          end_year,
          end_mouth
        );
      }
    },
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(item) {
      if (!item || !item.id) return
      this.projectId = item.id
      this.managerIds = item.managerIds
      this.startDate = item.startTime
      this.endDate = item.endTime
      this.$nextTick(() => { this.initData() })
    },
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      TaskList(query, this.projectId).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    search() {
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.initData()
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.reset()
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.projectId, id, this.managerIds)
      })
    },
    /**
    * 年-周模式gantt标题
    * start_year: 起始年
    * start_mouth：起始月
    * end_year：结束年
    * end_mouth：结束月
    */
    yearAndWeekTitleDate(start_year, start_mouth, end_year, end_mouth) {
      // 处理年份
      let year_diff = end_year - start_year;
      // 只存在同年或前后年的情况
      if (year_diff === 0) {
        // 年间隔为同一年
        let isLeap = this.isLeap(start_year); // 是否闰年
        let mouths = this.generationMonths(
          start_year,
          start_mouth,
          end_mouth + 1,
          isLeap,
          true,
          true
        ); // 处理月份
        return mouths;
      }
      // 处理开始月份
      let startIsLeap = this.isLeap(start_year);
      let start_mouths = this.generationMonths(
        start_year,
        start_mouth,
        13,
        startIsLeap,
        true,
        true
      );
      // 处理结束月份
      let endIsLeap = this.isLeap(end_year);
      let end_mouths = this.generationMonths(
        end_year,
        1,
        end_mouth + 1,
        endIsLeap,
        true,
        true
      );
      return start_mouths.concat(end_mouths);
    },
    /**
     * 月-日模式gantt标题
     * start_year: 起始年
     * start_mouth：起始月
     * end_year：结束年
     * end_mouth：结束月
     */
    mouthAndDayTitleDate(start_year, start_mouth, end_year, end_mouth) {
      // 处理年份
      let year_diff = end_year - start_year;
      // 只存在同年或前后年的情况
      if (year_diff === 0) {
        // 年间隔为同一年
        let isLeap = this.isLeap(start_year); // 是否闰年
        let mouths = this.generationMonths(
          start_year,
          start_mouth,
          end_mouth + 1,
          isLeap
        ); // 处理月份
        return mouths;
      }
      // 处理开始月份
      let startIsLeap = this.isLeap(start_year);
      let start_mouths = this.generationMonths(
        start_year,
        start_mouth,
        13,
        startIsLeap
      );
      // 处理结束月份
      let endIsLeap = this.isLeap(end_year);
      let end_mouths = this.generationMonths(
        end_year,
        1,
        end_mouth + 1,
        endIsLeap
      );
      return start_mouths.concat(end_mouths);
    },
    /**
     * 生成月份函数
     * year: Number 当前年份
     * start_num: Number 开始月分
     * end_num：Number 结束月份
     * isLeap: Boolean 是否闰年
     * insert_days: Boolean 是否需要插入 日
     * week: 是否以周的间隔
     */
    generationMonths(
      year,
      start_num = 1,
      end_num = 13,
      isLeap = false,
      insert_days = true,
      week = false
    ) {
      let months = [];
      if (insert_days) {
        // 无需 日 的模式
        for (let i = start_num; i < end_num; i++) {
          // 需要 日 的模式
          let days = this.generationDays(year, i, isLeap, week);
          months.push({
            name: `${i}月`,
            date: i,
            full_date: `${year}-${i}`,
            children: days,
            id: uuidv4()
          });
        }
        return months;
      }
      for (let i = start_num; i < end_num; i++) {
        // 需要 日 的模式
        months.push({
          name: `${i}月`,
          date: i,
          full_date: `${year}-${i}`,
          id: uuidv4()
        });
      }
      return months;
    },
    /**
     * 生成日期函数
     * year: Number 当前年份
     * month: Number 当前月份
     * isLeap: Boolean 是否闰年
     * week: Boolean 是否间隔一周
     */
    generationDays(year, month, isLeap = false, week = false) {
      let big_month = [1, 3, 5, 7, 8, 10, 12].includes(month);
      let small_month = [4, 6, 9, 11].includes(month);
      let dates_num = big_month ? 32 : small_month ? 31 : isLeap ? 30 : 29;
      let days = [];
      if (week) {
        let _day = 1; // 从周日开始
        let _start_day_inweek = this.timeInWeek(`${year}-${month}-1`);
        if (_start_day_inweek !== 0) {
          _day = 8 - _start_day_inweek;
        }
        for (let i = _day; i < dates_num; i += 7) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            full_date: `${year}-${month}-${i}`
          });
        }
      } else {
        for (let i = 1; i < dates_num; i++) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            full_date: `${year}-${month}-${i}`
          });
        }
      }
      return days;
    },
    /**
     * 是否闰年函数
     * year: Number 当前年份
     */
    isLeap(year) {
      return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    },
    /**
     * 当前日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    dayGanttType(row, date, unit = "days") {
      let start_date = row.startTime;
      let end_date = row.endTime;
      let between = dayjs(date).isBetween(start_date, end_date, unit);
      if (between) {
        return "item-on";
      }
      let start = dayjs(start_date).isSame(date, unit);
      let end = dayjs(end_date).isSame(date, unit);
      if (start && end) {
        return "item-on item-full";
      }
      if (start) {
        return "item-on item-start";
      }
      if (end) {
        return "item-on item-end";
      }
    },
    /**
     * 实际日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    realDayGanttType(row, date, unit = "days") {
      let start_date = row[this.selfProps.realStartDate];
      let end_date = row[this.selfProps.realEndDate];
      let between = dayjs(date).isBetween(start_date, end_date, unit);
      if (between) {
        return "real-on";
      }
      let start = dayjs(start_date).isSame(date, unit);
      let end = dayjs(end_date).isSame(date, unit);
      if (start && end) {
        return "real-on real-full";
      }
      if (start) {
        return "real-on real-start";
      }
      if (end) {
        return "real-on real-end";
      }
    },
    // 以下是时间计算类函数 ------------------------------------------------------时间计算---------------------------------------
    /**
     * 计算时差
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeDiffTime(startDate, endDate, unit = "days") {
      return dayjs(endDate).diff(startDate, unit);
    },
    /**
     * 比较时间，是否之前
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeIsBefore(startDate, endDate, unit = "days") {
      return dayjs(startDate).isBefore(endDate, unit);
    },
    /**
     * 时间加计算函数
     * date：原时间
     * num：需要增加的时间数量
     * nuit：增加时间的单位 day year
     */
    timeAdd(date, num = 1, nuit = "day", format = "YYYY-MM-DD") {
      return dayjs(date)
        .add(num, nuit)
        .format(format);
    },
    /**
     * 时间格式化函数
     * date 需要格式化的数据
     * format 格式化的格式
     */
    timeFormat(date, format = "YYYY-MM-DD") {
      return date ? dayjs(date).format(format) : this.emptyCellText;
    },
    /**
     * 查询时间是周几
     */
    timeInWeek(date) {
      return dayjs(date).day();
    },
  }
}
</script>
<style lang="scss" scoped>
.main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  >>> .el-table {
    flex: 1;
  }
  .JNPF-common-search-box-right {
    margin-right: 10px;
  }
  .item-on {
    position: absolute;
    top: 50%;
    left: 0;
    right: -1px;
    margin-top: -8px;
    height: 16px;
    background: #409eff;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    &.item-start {
      left: 50%;
      // &:after {
      //   position: absolute;
      //   top: 16px;
      //   left: 0;
      //   z-index: 1;
      //   content: "";
      //   width: 0;
      //   height: 0;
      //   border-color: #409eff transparent transparent;
      //   border-width: 6px 6px 6px 0;
      //   border-style: solid;
      // }
    }
    &.item-end {
      right: 50%;
      // &:after {
      //   position: absolute;
      //   top: 16px;
      //   right: 0;
      //   z-index: 1;
      //   content: "";
      //   width: 0;
      //   height: 0;
      //   border-color: transparent #409eff;
      //   border-width: 0 6px 6px 0;
      //   border-style: solid;
      // }
    }
  }
}
</style>