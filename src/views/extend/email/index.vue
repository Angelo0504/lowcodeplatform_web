<template>
  <div class="app-container Email-container nohead">
    <el-tabs tab-position="left" style="height:100%" v-model="activeTab"
      :before-leave="beforeLeaveTab">
      <el-tab-pane name="writeMail">
        <span slot="label"><i class="icon-ym icon-ym-btn-edit"></i>写邮件</span>
      </el-tab-pane>
      <el-tab-pane name="inBox">
        <span slot="label"><i class="icon-ym icon-ym-extend-envelope"></i>收件箱</span>
      </el-tab-pane>
      <el-tab-pane name="star">
        <span slot="label"><i class="icon-ym icon-ym-extend-star"></i>星标件</span>
      </el-tab-pane>
      <el-tab-pane name="draft">
        <span slot="label"><i class="icon-ym icon-ym-extend-exclamation-triangle"></i>草稿箱</span>
      </el-tab-pane>
      <el-tab-pane name="sent">
        <span slot="label"><i class="icon-ym icon-ym-extend-paper-plane"></i>已发送</span>
      </el-tab-pane>
      <el-tab-pane name="setAccount">
        <span slot="label"><i class="icon-ym icon-ym-extend-cog"></i>邮箱配置</span>
      </el-tab-pane>
      <el-tab-pane disabled name="line"></el-tab-pane>
      <el-tab-pane label="我的文件夹" name="subordinate" disabled>
      </el-tab-pane>
      <el-tab-pane name="Personal">
        <el-link slot="label" :underline="false" type="warning"><i
            class="ym-custom ym-custom-checkbox-blank-circle"></i>Personal
        </el-link>
      </el-tab-pane>
      <el-tab-pane name="Work">
        <el-link slot="label" :underline="false" type="primary"><i
            class="ym-custom ym-custom-checkbox-blank-circle"></i>Work
        </el-link>
      </el-tab-pane>
      <el-tab-pane name="Business">
        <el-link slot="label" :underline="false" type="danger"><i
            class="ym-custom ym-custom-checkbox-blank-circle"></i>Business
        </el-link>
      </el-tab-pane>
      <el-tab-pane name="Clients">
        <el-link slot="label" :underline="false" type="success"><i
            class="ym-custom ym-custom-checkbox-blank-circle"></i>Clients
        </el-link>
      </el-tab-pane>
      <div class="main JNPF-flex-main">
        <el-row class="JNPF-common-search-box" :gutter="16">
          <el-form @submit.native.prevent>
            <el-col :span="6">
              <el-form-item label="关键词">
                <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="日期">
                <el-date-picker v-model="pickerVal" type="daterange" start-placeholder="开始日期"
                  end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp"
                  clearable :editable="false">
                </el-date-picker>
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
            <el-button type="primary" icon="el-icon-download" @click="receiveEmail"
              :loading="receiveing">收邮件</el-button>
          </div>
        </el-row>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column label="" width="40">
            <template slot-scope="scope">
              <template v-if="activeTab==='inBox'|| activeTab==='star'">
                <span v-if=" scope.row.isRead">
                  <i class="icon-ym icon-ym-extend-envelope-open-o i-default" title='点击标记为未读'
                    @click="ReceiveUnread(scope.row)"></i></span>
                <span v-else><i class="icon-ym icon-ym-extend-envelope text-warning" title='点击标记为已读'
                    @click="ReceiveRead(scope.row)"></i></span>
              </template>
              <span v-else><i class="icon-ym icon-ym-extend-envelope-open-o i-default"></i></span>
            </template>
          </el-table-column>
          <el-table-column label="" width="40" prop="attachment">
            <template slot-scope="scope">
              <span v-if="scope.row.attachment && JSON.parse(scope.row.attachment).length"><i
                  class="icon-ym icon-ym-extend-paperclip i-default"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="sender" label="发件人" width="180"
            v-if="activeTab==='inBox'|| activeTab==='star'" />
          <el-table-column prop="recipient" label="收件人" width="180"
            v-if="activeTab==='draft'|| activeTab==='sent'" />
          <el-table-column prop="subject" label="主题" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link @click="write(scope.row.id)" style="font-size:12px"
                v-if="activeTab==='draft'">
                {{ scope.row.subject }}
              </el-link>
              <el-link @click="readInfo(scope.row.id,activeTab==='sent',scope.$index)"
                style="font-size:12px" v-else>
                {{ scope.row.subject }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="120">
            <template slot-scope="scope">
              <span v-if="activeTab==='inBox'|| activeTab==='star'">
                {{ scope.row.fdate | toDate() }}</span>
              <span v-if="activeTab==='draft'|| activeTab==='sent'">
                {{ scope.row.creatorTime | toDate() }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="" width="40" v-if="activeTab==='inBox'|| activeTab==='star'">
            <template slot-scope="scope">
              <span v-if="scope.row.starred"><i
                  class="icon-ym icon-ym-extend-star text-warning img-star" title='点击取消星标'
                  @click="ReceiveNoStarred(scope.row,scope.$index)"></i></span>
              <span v-else><i class="icon-ym icon-ym-extend-star-o i-default img-star"
                  title='点击标记为星标邮件' @click="ReceiveYesStarred(scope.row)"></i></span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <!-- <el-dropdown>
                <el-button type="text" size="mini">
                  移动到<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="move(scope.row.id,'Personal')">Personal
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="move(scope.row.id,'Work')">Work
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="move(scope.row.id,'Business')">Business
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="move(scope.row.id,'Clients')">Clients
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </el-tabs>
    <Config v-if="configVisible" ref="config" />
    <Form v-show="formVisible" ref="Form" @close="formVisible=false" @refresh="refresh" />
    <Detail v-show="detailVisible" ref="detail" @close="detailVisible=false" @setRead="setRead" />
  </div>
</template>

<script>
import { EmailList, Receive, Delete, ReceiveRead, ReceiveUnread, ReceiveYesStarred, ReceiveNoStarred } from '@/api/extend/email'
import Config from './Config'
import Form from './Form'
import Detail from './Detail'

export default {
  name: 'extend-email',
  components: { Config, Form, Detail },
  data() {
    return {
      receiveing: false,
      configVisible: false,
      formVisible: false,
      detailVisible: false,
      subordinateIds: [],
      activeTab: 'inBox',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerVal: [],
      keyword: '',
      startTime: '',
      endTime: '',
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      list: []
    }
  },
  watch: {
    activeTab(val) {
      this.reset()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.list = []
      this.keyword = ''
      this.pickerVal = ''
      this.startTime = ''
      this.endTime = ''
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      let data = {
        ...this.listQuery,
        keyword: this.keyword,
        startTime: this.startTime,
        endTime: this.endTime,
        type: this.activeTab
      }
      EmailList(data).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    beforeLeaveTab(activeName, oldActiveName) {
      let noChangeList = ['writeMail', 'setAccount', 'Personal', 'Work', 'Business', 'Clients']
      if (noChangeList.indexOf(activeName) > -1) {
        if (activeName === 'setAccount') {
          this.configVisible = true
          this.$nextTick(() => {
            this.$refs.config.init()
          })
        }
        if (activeName === 'writeMail') {
          this.write()
        }
        return false
      }
    },
    search() {
      if (this.pickerVal && this.pickerVal.length) {
        this.startTime = this.pickerVal[0]
        this.endTime = this.pickerVal[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    readInfo(id, isSend, index) {
      this.detailVisible = true
      this.$nextTick(() => {
        this.$refs.detail.init(id, isSend, index)
      })
    },
    write(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    // 收邮件
    receiveEmail() {
      this.receiveing = true
      Receive().then(res => {
        this.receiveing = false
        this.$message({
          message: `收件成功${res.data}条`,
          type: 'success',
          duration: 1000,
          onClose: () => { }
        })
        if (this.activeTab == 'inBox') {
          this.reset()
        } else {
          this.activeTab = 'inBox'
        }
      }).catch(() => {
        this.receiveing = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.list.splice(index, 1);
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    ReceiveRead(row) {
      ReceiveRead(row.id).then(res => {
        row.isRead = 1
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    ReceiveUnread(row) {
      ReceiveUnread(row.id).then(res => {
        row.isRead = 0
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    ReceiveYesStarred(row) {
      ReceiveYesStarred(row.id).then(res => {
        row.starred = 1
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    ReceiveNoStarred(row, index) {
      ReceiveNoStarred(row.id).then(res => {
        if (this.activeTab === 'star') {
          this.list.splice(index, 1);
        } else {
          row.starred = 0
        }
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    move(id, key) {
      // console.log(id, key);
    },
    setRead(index) {
      this.list[index].isRead = 1
    },
    refresh(isSend) {
      this.formVisible = false
      if (isSend) {
        if (this.activeTab === 'sent') {
          this.reset()
        } else {
          this.activeTab = 'sent'
        }
      } else {
        if (this.activeTab === 'draft') {
          this.reset()
        } else {
          this.activeTab = 'draft'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Email-container {
  position: relative;
  .JNPF-common-search-box {
    margin-bottom: 0;
  }
  >>> .el-tabs__item {
    text-align: left !important;
    .icon-ym {
      font-size: 14px;
      margin-right: 8px;
    }
    .ym-custom {
      font-size: 12px;
      margin-right: 10px;
    }
  }
  >>> .el-tabs__content {
    height: 100%;
    // .el-tab-pane {
    //   height: 100%;
    //   overflow: hidden;
    // }
  }
  >>> #tab-line {
    height: 20px;
    width: 160px;
    &::after {
      position: absolute;
      width: 100%;
      height: 1px;
      background: #ddd;
      content: '';
      display: block;
      overflow: hidden;
      top: 10px;
      left: 0;
    }
  }
  .main {
    height: 100%;
    overflow: hidden;
    .icon-ym {
      cursor: pointer;
      font-size: 14px;
      &.img-star {
        font-size: 16px;
      }
    }
  }
}
</style>