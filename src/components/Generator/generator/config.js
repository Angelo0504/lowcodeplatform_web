// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'dataForm',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  popupType: 'general',
  generalWidth: '600px',
  fullScreenWidth: '100%',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: false,
  cancelButtonText: '取 消',
  confirmButtonText: '确 定',
  formStyle: '',
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
      regList: [],
      trigger: 'blur'
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
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
      regList: [],
      trigger: 'blur'
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': true,
    readonly: false,
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
      dragDisabled: false,
      regList: [],
      trigger: ['blur', 'change']
    },
    placeholder: '数字文本',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': 1,
    'inactive-value': 0
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
      regList: [],
      trigger: 'change',
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
    style: {},
    size: 'medium',
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
      regList: [],
      trigger: 'change',
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
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'select',
      label: '下拉选择',
      labelWidth: null,
      showLabel: true,
      tag: 'el-select',
      tagIcon: 'icon-ym icon-ym-generator-select',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'change',
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
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
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
      regList: [],
      trigger: 'change',
      dataType: 'static',
      propsUrl: '',
      dictionaryType: ''
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
    style: { width: '100%' },
    props: {
      props: {
        multiple: false,
        value: 'id',
        label: 'fullName',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    readonly: false,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    type: 'date',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'timestamp',
    readonly: false
  },
  {
    __config__: {
      jnpfKey: 'uploadFz',
      label: '文件上传',
      labelWidth: null,
      showLabel: true,
      tag: 'JNPF-UploadFz',
      tagIcon: 'icon-ym icon-ym-generator-upload',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'click'
    },
    disabled: false,
    accept: '',
    fileSize: 2,
    sizeUnit: 'MB',
    buttonText: '点击上传',
    showTip: false,
    limit: 9
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
      dragDisabled: false,
      regList: [],
      trigger: 'click'
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
      jnpfKey: 'colorPicker',
      label: '颜色选择',
      labelWidth: null,
      showLabel: true,
      tag: 'el-color-picker',
      tagIcon: 'icon-ym icon-ym-generator-color',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'medium'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },
  {
    __config__: {
      jnpfKey: 'divider',
      label: '分割线',
      labelWidth: null,
      showLabel: false,
      tag: 'el-divider',
      tagIcon: 'icon-ym icon-ym-generator-divider',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    __slot__: {
      default: '我是分割线'
    },
    'content-position': "center"
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
      required: false,
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
      labelWidth: null,
      showLabel: true,
      tag: 'JNPF-Quill',
      tagIcon: 'icon-ym icon-ym-generator-rich-text',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'blur'
    },
    placeholder: '请输入内容...'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
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
      regList: [],
      trigger: 'change',
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
    multiple: false,
    clearable: true,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'billRule',
      label: '单据组件',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      defaultValue: '',
      tagIcon: 'icon-ym icon-ym-generator-documents',
      defaultValue: null,
      layout: 'colFormItem',
      required: false,
      span: 24,
      dragDisabled: false,
      trigger: 'change',
      rule: ''
    },
    readonly: true,
    placeholder: '系统自动生成',
  },
  {
    __config__: {
      jnpfKey: 'table',
      label: '设计子表',
      showLabel: false,
      tagIcon: 'icon-ym icon-ym-generator-table',
      tag: 'JNPF-InputTable',
      defaultValue: [],
      layout: 'rowFormItem',
      dragDisabled: false,
      showTitle: true,
      type: 'table',
      rowType: 'table',
      children: [],
      tableName: ''
    },
    disabled: false,
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
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    disabled: false,
    level: 2
  },
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      noShow: false
    },
    readonly: true,
    placeholder: '系统自动生成'
  },
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
      required: false,
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
      span: '24',
      dragDisabled: false,
      children: [],
    },
    shadow: 'always'
  },
  {
    __config__: {
      jnpfKey: 'row',
      label: '栅格布局',
      tagIcon: 'icon-ym icon-ym-generator-layout',
      layout: 'rowFormItem',
      span: '24',
      dragDisabled: false,
      layoutTree: true,
      rowType: 'layout',
    },
    type: 'default',
    justify: 'start',
    align: 'top'
  },
]