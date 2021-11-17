// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'dataForm',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true,
  cancelButtonText: '取 消',
  confirmButtonText: '确 定',
  idGlobal: 100
}

// 基础控件 【左面板】
export const inputComponents = [{
    __config__: {
      jnpfKey: 'comInput',
      label: '单行输入',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-input',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: []
    },
    placeholder: '请输入',
    maxlength: null,
    disabled: false,
    type: 'text'
  },
  {
    __config__: {
      jnpfKey: 'textarea',
      label: '多行输入',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-textarea',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
    },
    placeholder: '请输入',
    maxlength: null,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'numInput',
      label: '数字输入',
      showLabel: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'icon-ym icon-ym-generator-number',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    min: undefined,
    max: undefined,
    step: 1,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'switch',
      label: '开关',
      labelWidth: null,
      showLabel: true,
      tag: 'el-switch',
      tagIcon: 'icon-ym icon-ym-generator-switch',
      defaultValue: false,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'radio',
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'icon-ym icon-ym-generator-radio',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      optionType: 'default',
      border: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'checkbox',
      label: '多选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-checkbox-group',
      tagIcon: 'icon-ym icon-ym-generator-checkbox',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      optionType: 'default',
      border: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'select',
      label: '下拉框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-select',
      tagIcon: 'icon-ym icon-ym-generator-select',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'cascader',
      label: '级联选择',
      labelWidth: null,
      showLabel: true,
      tag: 'el-cascader',
      tagIcon: 'icon-ym icon-ym-generator-cascader',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: ''
    },
    options: [{
      id: "1",
      fullName: '选项1',
      children: [{
        id: "2",
        fullName: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    props: {
      props: {
        multiple: false,
        value: 'id',
        label: 'fullName',
        children: 'children'
      }
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'time',
      label: '时间选择',
      labelWidth: null,
      showLabel: true,
      tag: 'el-time-picker',
      tagIcon: 'icon-ym icon-ym-generator-time',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'date',
      label: '日期选择',
      labelWidth: null,
      showLabel: true,
      tag: 'el-date-picker',
      tagIcon: 'icon-ym icon-ym-generator-date',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'uploadImg',
      label: '图片上传',
      labelWidth: null,
      showLabel: true,
      tag: 'JNPF-UploadImg',
      tagIcon: 'icon-ym icon-ym-generator-upload',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    disabled: false,
    accept: '',
    showTip: false,
    fileSize: 2,
    sizeUnit: 'MB',
    limit: 9
  },
  {
    __config__: {
      jnpfKey: 'rate',
      label: '评分',
      labelWidth: null,
      showLabel: true,
      tag: 'el-rate',
      tagIcon: 'icon-ym icon-ym-generator-rate',
      defaultValue: 0,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    max: 5,
    allowHalf: false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'slider',
      label: '滑块',
      labelWidth: null,
      showLabel: true,
      tag: 'el-slider',
      tagIcon: 'icon-ym icon-ym-generator-slider',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1
  },
  {
    __config__: {
      jnpfKey: 'JNPFText',
      label: '文本',
      labelWidth: null,
      showLabel: false,
      tag: 'JNPF-Text',
      tagIcon: 'icon-ym icon-ym-generator-textarea',
      defaultValue: '这是一段文字',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    style: { width: '100%' },
    textStyle: {
      "color": '#000000',
      'text-align': 'left',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'line-height': 32,
      'font-size': 12
    }
  },
  {
    __config__: {
      jnpfKey: 'editor',
      label: '富文本',
      showLabel: true,
      labelWidth: null,
      tag: 'JNPF-Quill',
      tagIcon: 'icon-ym icon-ym-generator-rich-text',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请输入'
  }
]

// 高级控件 【左面板】
export const selectComponents = [{
    __config__: {
      jnpfKey: 'comSelect',
      label: '公司组件',
      labelWidth: null,
      showLabel: true,
      tag: 'com-select',
      tagIcon: 'icon-ym icon-ym-generator-company',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'depSelect',
      label: '部门组件',
      labelWidth: null,
      showLabel: true,
      tag: 'dep-select',
      tagIcon: 'icon-ym icon-ym-generator-department',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'posSelect',
      label: '岗位组件',
      labelWidth: null,
      showLabel: true,
      tag: 'pos-select',
      tagIcon: 'icon-ym icon-ym-generator-jobs',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    multiple: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'userSelect',
      label: '用户组件',
      labelWidth: null,
      showLabel: true,
      tag: 'user-select',
      tagIcon: 'icon-ym icon-ym-generator-user',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    multiple: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'treeSelect',
      label: '树形选择',
      labelWidth: null,
      showLabel: true,
      tag: 'JNPFTreeSelect',
      tagIcon: 'icon-ym icon-ym-generator-tree',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: ''
    },
    placeholder: '请选择',
    props: {
      props: {
        value: 'id',
        label: 'fullName',
        children: 'children'
      }
    },
    options: [{
      id: "1",
      fullName: '选项1',
      children: [{
        id: "2",
        fullName: '选项1-1'
      }]
    }],
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'billRule',
      label: '单据组件',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-documents',
      defaultValue: null,
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      rule: ''
    }
  },
  {
    __config__: {
      jnpfKey: 'table',
      label: '设计子表',
      showLabel: false,
      layout: 'rowFormItem',
      tag: 'JNPF-InputTable',
      tagIcon: 'icon-ym icon-ym-generator-table',
      defaultValue: [],
      dragDisabled: false,
      showTitle: true,
      type: 'table',
      rowType: 'table',
      children: [],
      tableName: ''
    },
    actionText: '添加',
    'show-summary': false,
    tableConf: {},
    defaultValue: []
  },
  {
    __config__: {
      jnpfKey: 'address',
      label: '省市区联动',
      labelWidth: null,
      showLabel: true,
      tag: 'JNPF-Address',
      tagIcon: 'icon-ym icon-ym-generator-Provinces',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    placeholder: '请选择',
    disabled: false,
    level: 2
  }
]

// 系统控件 【左面板】
export const systemComponents = [{
    __config__: {
      jnpfKey: 'createUser',
      label: '创建人员',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-founder',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'createTime',
      label: '创建时间',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-createtime',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'modifyUser',
      label: '修改人员',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-modifier',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'modifyTime',
      label: '修改时间',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-modifytime',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'currOrganize',
      label: '所属公司',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-company',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'currDept',
      label: '所属部门',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-department',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'currPosition',
      label: '所属岗位',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-station',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    }
  }
]

// 布局控件 【左面板】
export const layoutComponents = [{
    __config__: {
      jnpfKey: 'groupTitle',
      label: '分组标题',
      labelWidth: null,
      showLabel: false,
      tag: 'groupTitle',
      tagIcon: 'icon-ym icon-ym-generator-group',
      defaultValue: null,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    content: "分组标题",
    'content-position': "left"
  },
  {
    __config__: {
      jnpfKey: 'card',
      label: '卡片',
      showLabel: false,
      tag: 'el-card',
      tagIcon: 'icon-ym icon-ym-generator-card',
      defaultValue: [],
      layout: 'rowFormItem',
      dragDisabled: false,
      children: []
    },
    shadow: 'always'
  }
]