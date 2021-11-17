<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>行文呈批表</h1>
      <span class="number">流程编码：{{dataForm.billNo}}</span>
    </div>
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      :disabled="setting.readonly">
      <el-row>
        <el-col :span="12" v-if="JudgeShow('flowTitle')">
          <el-form-item label="流程标题" prop="flowTitle">
            <el-input v-model="dataForm.flowTitle" placeholder="流程标题"
              :disabled="JudgeWrite('flowTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('flowUrgent')">
          <el-form-item label="紧急程度" prop="flowUrgent">
            <el-select v-model="dataForm.flowUrgent" placeholder="选择紧急程度"
              :disabled="JudgeWrite('flowUrgent')">
              <el-option :key="item.value" :label="item.label" :value="item.value"
                v-for="item in flowUrgentOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fileTitle')">
          <el-form-item label="文件标题" prop="fileTitle">
            <el-input v-model="dataForm.fileTitle" placeholder="文件标题"
              :disabled="JudgeWrite('fileTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('draftedPerson')">
          <el-form-item label="主办单位" prop="draftedPerson">
            <el-input v-model="dataForm.draftedPerson" placeholder="主办单位"
              :disabled="JudgeWrite('draftedPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fillNum')">
          <el-form-item label="文件编码" prop="fillNum">
            <el-input v-model="dataForm.fillNum" placeholder="文件编码"
              :disabled="JudgeWrite('fillNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('sendUnit')">
          <el-form-item label="发往单位" prop="sendUnit">
            <el-input v-model="dataForm.sendUnit" placeholder="发往单位"
              :disabled="JudgeWrite('sendUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('typing')">
          <el-form-item label="打字" prop="typing">
            <el-input v-model="dataForm.typing" placeholder="打字" :disabled="JudgeWrite('typing')">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('writingDate')">
          <el-form-item label="发文日期" prop="writingDate">
            <el-date-picker v-model="dataForm.writingDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('writingDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('shareNum')">
          <el-form-item label="份数" prop="shareNum">
            <el-input v-model="dataForm.shareNum" placeholder="份数"
              :disabled="JudgeWrite('shareNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('description')">
          <el-form-item label="备注" prop="description">
            <el-input v-model="dataForm.description" placeholder="备注" type="textarea" :rows="3"
              :disabled="JudgeWrite('description')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
  </div>
</template>

<script>
import comMinix from '../minix';
export default {
  mixins: [comMinix],
  name: 'BatchTable',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        fileTitle: '',
        draftedPerson: '',
        fillNum: '',
        sendUnit: '',
        typing: '',
        description: '',
        writingDate: '',
        shareNum: '',
        fileJson: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        writingDate: [
          { required: true, message: '发文日期不能为空', trigger: 'change' },
        ],
        shareNum: [
          { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
        ]
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的行文呈批表"
    }
  }
}
</script>