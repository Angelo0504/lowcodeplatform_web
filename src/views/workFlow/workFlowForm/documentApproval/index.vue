<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>文件签批意见表</h1>
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
        <el-col :span="12" v-if="JudgeShow('fileName')">
          <el-form-item label="文件名称" prop="fileName">
            <el-input v-model="dataForm.fileName" placeholder="文件名称"
              :disabled="JudgeWrite('fileName')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('draftedPerson')">
          <el-form-item label="拟稿人" prop="draftedPerson">
            <el-input v-model="dataForm.draftedPerson" placeholder="拟稿人"
              :disabled="JudgeWrite('draftedPerson')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('serviceUnit')">
          <el-form-item label="发文单位" prop="serviceUnit">
            <el-input v-model="dataForm.serviceUnit" placeholder="发文单位"
              :disabled="JudgeWrite('serviceUnit')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fillPreparation')">
          <el-form-item label="文件拟办" prop="fillPreparation">
            <el-input v-model="dataForm.fillPreparation" placeholder="文件拟办"
              :disabled="JudgeWrite('fillPreparation')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('fillNum')">
          <el-form-item label="文件编码" prop="fillNum">
            <el-input v-model="dataForm.fillNum" placeholder="文件编码"
              :disabled="JudgeWrite('fillNum')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('receiptDate')">
          <el-form-item label="收文日期" prop="receiptDate">
            <el-date-picker v-model="dataForm.receiptDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('receiptDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('fileJson')">
          <el-form-item label="相关附件">
            <UploadFile v-model="fileList" :disabled="JudgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('modifyOpinion')">
          <el-form-item label="修改意见" prop="modifyOpinion">
            <JNPF-Quill v-model="dataForm.modifyOpinion" :disabled="JudgeWrite('modifyOpinion')" />
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
  name: 'DocumentApproval',
  data() {
    return {
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        serviceUnit: '',
        draftedPerson: '',
        fillPreparation: '',
        fillNum: '',
        fileName: '',
        modifyOpinion: '',
        receiptDate: '',
        fileJson: '',
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        receiptDate: [
          { required: true, message: '收文日期不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的文件签批意见表"
    }
  }
}
</script>