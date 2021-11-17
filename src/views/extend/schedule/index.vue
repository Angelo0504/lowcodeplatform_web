<template>
  <div class="Schedule-container app-container">
    <FullCalendar class='demo-app-calendar' ref="fullCalendar" defaultView="dayGridMonth" :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }" :plugins="calendarPlugins" :weekends="calendarWeekends" :events="calendarEvents"
      @dateClick="handleDateClick" locale='zh-cn' @eventClick='eventClick' :buttonText='buttonText'
      height='parent' :eventLimit='true' allDayText='全天' :editable='true'
      @datesRender="datesRender" />
    <!-- :dayNamesShort='dayNamesShort' :dayNames='dayNamesShort' axisFormat='HH:mm' timeFormat='HH:mm' -->
    <Form v-if="formVisible" ref="Form" @refreshDataList="refreshDataList" />
  </div>
</template>
<script>
import { AppDayList, AppList, List } from '@/api/extend/schedule'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Form from './Form'
export default {
  name: 'extend-schedule',
  components: {
    FullCalendar,
    Form
  },
  data() {
    return {
      formVisible: false,
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        bootstrapPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [],
      buttonText: { today: "今日", month: "月", week: "周", day: "日", list: "日程" },
      dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      titleFormat: { year: 'numeric', month: '2-digit' },
      columnHeaderFormat: [
        'ddd',    // Mon
        'MM月dd日 ddd', // Mon 9/7
        'MM月dd日 ddd'  // Monday 9/7
      ],
      startTime: '',
      endTime: '',
    }
  },
  created() { },
  mounted() {
    // let calendarApi = this.$refs.fullCalendar.getApi()
    // console.log(calendarApi);
  },
  methods: {
    datesRender(calendar) {
      let view = calendar.view
      this.startTime = this.jnpf.toDate(view.activeStart, "yyyy-MM-dd HH:mm")
      this.endTime = this.jnpf.toDate(view.activeEnd, "yyyy-MM-dd HH:mm")
      this.initData()
    },
    handleDateClick(arg) {
      let startTime = this.jnpf.toDate(arg.date, "yyyy-MM-dd HH:00"),
        clickTime = this.jnpf.toDate(arg.date, "yyyyMMdd"),
        currTime = this.jnpf.toDate(new Date(), "yyyyMMdd");
      if (clickTime < currTime) return
      if (clickTime == currTime) {
        let thisDate = new Date();
        thisDate.setHours(thisDate.getHours() + 1);
        startTime = this.jnpf.toDate(thisDate, "yyyy-MM-dd HH:00");
      }
      this.addOrUpdateHandle('', startTime)
      this.addOrUpdateHandle('', new Date(startTime).getTime())
    },
    eventClick(data) {
      if (this.jnpf.toDate(data.event.start, "yyyyMMddHHmm") > this.jnpf.toDate(new Date(), "yyyyMMddHHmm")) {
        this.addOrUpdateHandle(data.event.id)
      }
    },
    initData() {
      // let query = {
      //   startTime: new Date(this.startTime).getTime(),
      //   endTime: new Date(this.endTime).getTime(),
      // }
      let query = {
        startTime: this.startTime,
        endTime: this.endTime,
      }
      List(query).then(res => {
        this.calendarEvents = res.data.list.map(o => ({
          id: o.id,
          title: o.content,
          start: o.startTime,
          end: o.endTime,
          color: o.colour,
          editable: false,
          allDay: false
        }))
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id, startTime) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, startTime)
      })
    },
    refreshDataList() {
      this.formVisible = false
      this.initData()
    }
  }
}
</script>
<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import '~@fullcalendar/bootstrap/main.css';
.Schedule-container {
  padding: 0;
  .fc-toolbar.fc-header-toolbar {
    padding: 10px;
    margin-bottom: 0;
  }
  .fc-button-primary {
    background-color: #1890ff;
    border-color: #1890ff;
    height: 32px;
    line-height: 32px;
    padding: 0 0.65em;
    font-size: 12px;
  }
  .fc-button-primary:not(:disabled):active,
  .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #1682e6;
    border-color: #1682e6;
  }
  .fc-button .fc-icon {
    line-height: 16px;
  }
  .fc-unthemed th {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #909399;
    font-weight: normal;
    background: #f5f7fa;
  }
  .fc-center {
    color: #606266;
  }
  .fc-unthemed th,
  .fc-unthemed td,
  .fc-unthemed thead,
  .fc-unthemed tbody,
  .fc-unthemed .fc-divider,
  .fc-unthemed .fc-row,
  .fc-unthemed .fc-content,
  .fc-unthemed .fc-popover,
  .fc-unthemed .fc-list-view,
  .fc-unthemed .fc-list-heading td {
    border-color: #ebeef5;
    color: #606266;
  }
}
</style>