<template>
  <div class="chart-container app-container nohead">
    <div id="chart" style="height:530px;margin-top:30px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import resize from '../mixins/resize'
export default {
  name: 'extend-graphDemo-echartsTree',
  mixins: [resize],
  data() {
    return {
      chart: null,

    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
      var data1 = {
        "name": "植物界",
        "children": [
          {
            "name": "蓝藻门",
            "children": [
              {
                "name": "蓝藻纲",
                "children": [
                  { "name": "色球藻目", "value": 'Chroococcales' },
                  { "name": "颤藻目", "value": 'Oscillatoriales' },
                  { "name": "念珠藻目", "value": 'Nostocales' },
                  { "name": "真枝藻目", "value": 'Stigonematales' },
                ]
              }
            ]
          },
          {
            "name": "裸藻门",
            "children": [
              {
                "name": "裸藻纲",
                "children": [
                  { "name": "裸藻目", "value": 'Euglenales' },
                  { "name": "柄裸藻目", "value": 'Colaciales' },
                ]
              }
            ]
          },
          {
            "name": "甲藻门",
            "children": [
              {
                "name": "甲藻纲",
                "children": [
                  { "name": "原甲藻目", "value": 'Prorocentrales' },
                  { "name": "鳍藻目", "value": 'Dinophysiales' },
                  { "name": "裸甲藻目", "value": 'Czymnodiniales' },
                  { "name": "夜光藻目", "value": 'Noctilucales' },
                  { "name": "冠甲藻目", "value": 'Lophodiniales' },
                  { "name": "多甲藻目", "value": 'Peridiniales' },
                  { "name": "钙甲藻目", "value": 'Theracosphaerales' },
                  { "name": "囊沟藻目", "value": 'Blastodiniales' },
                  { "name": "植甲藻目", "value": 'Phytodinales' },
                  { "name": "丝甲藻目", "value": 'Dinotrichales' },
                  { "name": "变甲藻目", "value": 'Dinamoebidales' },
                ]
              },
              {
                "name": "共甲藻纲",
                "children": [
                  { "name": "共甲藻目", "value": 'Syndiniales' },
                ]
              }
            ]
          },
          {
            "name": "黄藻门",
            "children": [
              {
                "name": "黄藻纲",
                "children": [
                  { "name": "异鞭藻目", "value": 'Heterochloridales' },
                  { "name": "根黄藻目", "value": 'Rhizochloridales' },
                  { "name": "异囊藻目", "value": 'Heteroglocales' },
                  { "name": "柄球藻目", "value": 'Mischococcales' },
                  { "name": "异丝藻目", "value": 'Heterotrichales' },
                  { "name": "气球藻目", "value": 'Botrydiales' },
                ]
              }
            ]
          },
          {
            "name": "硅藻门",
            "children": [
              {
                "name": "中心硅藻纲",
                "children": [
                  { "name": "圆筛藻目", "value": 'Coscinodiscales' },
                  { "name": "根管藻目", "value": 'Rhizosoleniales' },
                  { "name": "盒形藻目", "value": 'Biddulphiales' },
                ]
              },
              {
                "name": "羽纹硅藻纲",
                "children": [
                  { "name": "舟形藻目", "value": 'Naviculales' },
                  { "name": "等片藻目", "value": 'Diatomales' },
                  { "name": "曲壳藻目", "value": 'Achnanthales' },
                  { "name": "短缝藻目", "value": 'Eunotiales' },
                  { "name": "双菱藻目", "value": 'Surirellales' },
                ]
              }
            ]
          },
          {
            "name": "绿藻门",
            "children": [
              {
                "name": "绿藻纲",
                "children": [
                  { "name": "团藻目", "value": 'Volvocales' },
                  { "name": "四孢藻目", "value": 'Tetrasporales' },
                  { "name": "绿球藻目", "value": 'Chlorococcales' },
                  { "name": "丝藻目", "value": 'Ulotrichales' },
                  { "name": "胶毛藻目", "value": 'Chaetophorales' },
                  { "name": "石莼目", "value": 'Ulvales' },
                  { "name": "溪菜目", "value": 'Prasiolales' },
                  { "name": "鞘藻目", "value": 'Oedogoniales' },
                  { "name": "刚毛藻目", "value": 'Cladophorales' },
                  { "name": "管藻目", "value": 'Siphonales' },
                  { "name": "管枝藻目", "value": 'Siphonocladales' },
                  { "name": "绒枝藻目", "value": 'Dasycladales' },
                  { "name": "接合藻目", "value": 'Conjugatophyceae' }
                ]
              }
            ]
          },
          {
            "name": "褐藻门",
            "children": [
              {
                "name": "褐藻纲",
                "children": [
                  { "name": "水云目", "value": 'Ectocarpales' },
                  { "name": "黑顶藻目", "value": 'Sphace-lariales' },
                  { "name": "线翼藻目", "value": 'Tilopteriales' },
                  { "name": "索藻目", "value": 'Chordariales' },
                  { "name": "马鞭藻目", "value": 'Cutileriales' },
                  { "name": "毛头藻目", "value": 'Sporochnales' },
                  { "name": "网管藻目", "value": 'Dictyosiphonales' },
                  { "name": "萱藻目", "value": 'Scytosiphonales' },
                  { "name": "网地藻目", "value": 'Dictyota-les' },
                  { "name": "酸藻目", "value": 'Desmarestiales' },
                  { "name": "海带目", "value": 'Lamina-riales' },
                  { "name": "墨角藻目", "value": 'Fucales' },
                  { "name": "德威藻目", "value": 'Durvil-laeales' },
                ]
              },
            ]
          },
          {
            "name": "红藻门",
            "children": [
              { "name": "红藻纲", "value": 'Florideophyceae' }
            ]
          },
          {
            "name": "地衣门",
            "children": [
              { "name": "子囊衣纲", "value": 'Ascolichenes' },
              { "name": "担子衣纲", "value": 'Basidiolichenes' },
              { "name": "藻状菌衣纲", "value": 'Phycolichenes' }
            ]
          },
          {
            "name": "苔藓植物门",
            "children": [
              {
                "name": "苔纲",
                "children": [
                  { "name": "泥炭藓目", "value": 'Sphagnales' },
                  { "name": "黑藓目", "value": 'Andreaeales' },
                ]
              }
            ]
          },
          {
            "name": "蕨类植物门",
            "children": [
              {
                "name": "石松亚门",
                "children": [
                  { "name": "石松目", "value": 'Lycopodiales' },
                  { "name": "卷柏目", "value": 'Selaginellales' },
                ]
              },
              {
                "name": "水韭亚门",
                "children": [
                  { "name": "水韭目", "value": 'Isoetales' },
                ]
              },
              {
                "name": "楔叶蕨亚门",
                "children": [
                  { "name": "木贼目", "value": 'Equisetales' },
                ]
              },
              {
                "name": "松叶蕨亚门",
                "children": [
                  { "name": "松叶蕨目", "value": 'Psilotales' },
                ]
              },
              {
                "name": "真蕨亚门",
                "children": [
                  { "name": "瓶尔小草目", "value": 'Ophioglossales' },
                  { "name": "莲座蕨目", "value": 'Marattiales' },
                  { "name": "紫萁目", "value": 'Osmundales' },
                  { "name": "水龙骨目(真蕨目)", "value": 'Polypodiales(Filicales)' },
                  { "name": "槐叶苹目", "value": 'Salviniales' },
                ]
              },
            ]
          },
          {
            "name": "裸子植物门",
            "children": [
              {
                "name": "银杏纲",
                "children": [
                  { "name": "银杏目", "value": 'Ginkgoales' },
                ]
              },
              {
                "name": "松杉纲",
                "children": [
                  { "name": "松杉目", "value": 'Pinales' },
                ]
              },
              {
                "name": "苏铁纲",
                "children": [
                  { "name": "苏铁目", "value": 'Cycadales' },
                ]
              },
              {
                "name": "买麻藤纲",
                "children": [
                  { "name": "买麻藤目", "value": 'Gnetales' },
                ]
              },
              {
                "name": "红豆杉纲",
                "children": [
                  { "name": "红豆衫目", "value": 'Taxales' },
                ]
              },
            ]
          },
          {
            "name": "被子植物门",
            "children": [
              {
                "name": "百合亚纲",
                "children": [
                  {
                    "name": "百合目",
                    "children": [
                      { "name": "田葱科", "value": 'Philydraceae' },
                      { "name": "雨久花科", "value": 'Pontederiaceae' },
                      { "name": "血皮草科", "value": 'Haemodoraceae' },
                      { "name": "蓝星科", "value": 'Cyanastraceae' },
                      { "name": "百合科", "value": 'Liliaceae' },
                      { "name": "鸢尾科", "value": 'Iridaceae' },
                      { "name": "翡若翠科", "value": 'Velloziaceae' },
                      { "name": "芦荟科", "value": 'Aloeaceae' },
                      { "name": "龙舌兰科", "value": 'Agavaceae' },
                      { "name": "刺叶树科", "value": 'Xanthorrhoeaceae' },
                      { "name": "匍茎草科", "value": 'Hanguanaceae' },
                      { "name": "箭根薯科", "value": 'Taccaceae' },
                      { "name": "百部科", "value": 'Stemonaceae' },
                      { "name": "菝葜科", "value": 'Smilacaceae' },
                      { "name": "薯蓣科", "value": 'Dioscoreaceae' }
                    ]
                  },
                  {
                    "name": "兰目",
                    "children": [
                      { "name": "地鸢尾科", "value": 'Geosiridaceae' },
                      { "name": "水玉簪科", "value": 'Burmanniaceae' },
                      { "name": "白玉簪科", "value": 'Corsiaceae' },
                      { "name": "兰科", "value": 'Orchidaceae' }
                    ]
                  }
                ]
              },
              {
                "name": "泽泻亚纲",
                "children": [
                  {
                    "name": "泽泻目",
                    "children": [
                      { "name": "花蔺科", "value": 'Butomaceae' },
                      { "name": "沼鳖科", "value": 'Limnocharitaceae' },
                      { "name": "泽泻科", "value": 'Alismataceae' }
                    ]
                  },
                  {
                    "name": "水鳖目",
                    "children": [
                      { "name": "水鳖科", "value": 'Hydrocharitaceae' }
                    ]
                  },
                  {
                    "name": "茨藻目",
                    "children": [
                      { "name": "水蕹科", "value": 'Aponogetonaceae' },
                      { "name": "冰沼草科", "value": 'Scheuchzeriaceae' },
                      { "name": "水麦冬科", "value": 'Juncaginaceae' },
                      { "name": "眼子菜科", "value": 'Potamogetonaceae' },
                      { "name": "流苏菜科", "value": 'Ruppiaceae' },
                      { "name": "茨藻科", "value": 'Najadaceae' },
                      { "name": "角果藻科", "value": 'Zannichelliaceae' },
                      { "name": "海王草科", "value": 'Posidoniaceae' },
                      { "name": "丝粉藻科", "value": 'Cymodoceaceae' },
                      { "name": "大叶藻科", "value": 'Zosteraceae' }
                    ]
                  },
                  {
                    "name": "霉草目",
                    "children": [
                      { "name": "无叶科", "value": 'Petrosaviaceae' },
                      { "name": "霉草科", "value": 'Triuridaceae' }
                    ]
                  }
                ]
              },
              {
                "name": "槟榔亚纲",
                "children": [
                  { "name": "棕榈目", "value": 'Arecales' },
                  { "name": "环花草目", "value": 'Cyclanthales' },
                  { "name": "露兜树目", "value": 'Pandanales' },
                  { "name": "天南星目", "value": 'Arales' }
                ]
              },
              {
                "name": "鸭跖草亚纲",
                "children": [
                  {
                    "name": "鸭拓草目",
                    "children": [
                      { "name": "偏穗草科", "value": 'Rapateaceae' },
                      { "name": "黄眼草科", "value": 'Xyridaceae' },
                      { "name": "鸭跖草科", "value": 'Mayacaceae' },
                      { "name": "鸭跖草科", "value": 'Commelinaceae' }
                    ]
                  },
                  {
                    "name": "谷精草目",
                    "children": [
                      { "name": "谷精草科", "value": 'Eriocaulaceae' }
                    ]
                  },
                  {
                    "name": "帚灯草目",
                    "children": [
                      { "name": "须叶藤科", "value": 'Flagellariaceae' },
                      { "name": "假芦苇科", "value": 'Joinvilleaceae' },
                      { "name": "帚灯草科", "value": 'Restionaceae' },
                      { "name": "刺鳞草科", "value": 'Centrolepidaceae' }
                    ]
                  },
                  {
                    "name": "灯芯草目",
                    "children": [
                      { "name": "灯心草科", "value": 'Juncaceae' },
                      { "name": "梭子草科", "value": 'Thurniaceae' }
                    ]
                  },
                  {
                    "name": "莎草目",
                    "children": [
                      { "name": "莎草科", "value": 'Cyperaceae' },
                      { "name": "禾本科", "value": 'Poaceae' }
                    ]
                  },
                  {
                    "name": "独芯草目",
                    "children": [
                      { "name": "独蕊草科", "value": 'Hydatellaceae' }
                    ]
                  },
                  {
                    "name": "香蒲目",
                    "children": [
                      { "name": "黑三棱科", "value": 'Sparganiaceae' },
                      { "name": "香蒲科", "value": 'Typhaceae' }
                    ]
                  }
                ]
              },
              {
                "name": "姜亚纲",
                "children": [
                  {
                    "name": "凤梨目",
                    "children": [
                      { "name": "凤梨科", "value": 'Bromeliaceae' }
                    ]
                  },
                  {
                    "name": "姜目",
                    "children": [
                      { "name": "旅人蕉科", "value": 'Strelitziaceae' },
                      { "name": "赫蕉科", "value": 'Heliconiaceae' },
                      { "name": "芭蕉科", "value": 'Musaceae' },
                      { "name": "兰花蕉科", "value": 'Lowiaceae' },
                      { "name": "姜科", "value": 'Zingiberaceae' },
                      { "name": "闭鞘姜科", "value": 'Costaceae' },
                      { "name": "美人蕉科", "value": 'Cannaceae' },
                      { "name": "竹芋科", "value": 'Marantaceae' }
                    ]
                  }
                ]
              },
              {
                "name": "木兰亚纲",
                "children": [
                  { "name": "木兰目", "value": 'Magnoliales' },
                  { "name": "樟目", "value": 'Laurales' },
                  { "name": "胡椒目", "value": 'Piperales' },
                  { "name": "马兜铃目", "value": 'Aristolochiales' },
                  { "name": "八角目", "value": 'Illiciales' },
                  { "name": "睡莲目", "value": 'Nymphaeales' },
                  { "name": "毛茛目", "value": 'Ranunculales' },
                  { "name": "罂粟目", "value": 'Papaverales' }
                ]
              },
              {
                "name": "金缕梅亚纲",
                "children": [
                  { "name": "昆栏树目", "value": 'Trochodendrales' },
                  { "name": "金缕梅目", "value": 'Hamamelidales' },
                  { "name": "交让木目", "value": 'Daphniphyllales' },
                  { "name": "对药树目", "value": 'Didymelales' },
                  { "name": "杜仲目", "value": 'Eucommiales' },
                  { "name": "荨麻目", "value": 'Urticales' },
                  { "name": "胡桃目", "value": 'Juglandales' },
                  { "name": "杨梅目", "value": 'Myricales' },
                  { "name": "山毛榉目", "value": 'Fagales' },
                  { "name": "木麻黄目", "value": 'Casuarinales' }
                ]
              },
              {
                "name": "石竹亚纲",
                "children": [
                  { "name": "石竹目", "value": 'Caryophyllales' },
                  { "name": "蓼目", "value": 'Polygonales' },
                  { "name": "蓝雪目", "value": 'Plumbaginales' }
                ]
              },
              {
                "name": "五桠果亚纲",
                "children": [
                  { "name": "五桠果目", "value": 'Dilleniales' },
                  { "name": "山茶目", "value": 'Theales' },
                  {
                    "name": "锦葵目",
                    "children": [
                      { "name": "杜英科", "value": 'Elaeocarpaceae' },
                      { "name": "椴树科", "value": 'Tiliaceae' },
                      { "name": "梧桐科", "value": 'Sterculiaceae' },
                      { "name": "木棉科", "value": 'Bombacaceae' },
                      { "name": "锦葵科", "value": 'Malvaceae' }
                    ]
                  },
                  { "name": "玉蕊目", "value": 'Lecythidales' },
                  { "name": "猪笼草目", "value": 'Nepenthales' },
                  { "name": "堇菜目", "value": 'Violales' },
                  { "name": "杨柳目", "value": 'Salicales' },
                  { "name": "白花菜目", "value": 'Capparales' },
                  { "name": "肉穗果目", "value": 'Batales' },
                  { "name": "杜鹃花目", "value": 'Ericales' },
                  { "name": "岩梅目", "value": 'Diapensiales' },
                  { "name": "柿树目", "value": 'Ebenales' },
                  { "name": "报春花目", "value": 'Primulales' },
                ]
              },
              {
                "name": "蔷薇亚纲",
                "children": [
                  {
                    "name": "蔷薇目",
                    "children": [
                      { "name": "瓣裂果科", "value": 'Brunelliaceae' },
                      { "name": "牛栓藤科", "value": 'Connaraceae' },
                      { "name": "船形果科", "value": 'Eucryphiaceae' },
                      { "name": "火把树科", "value": 'Cunoniaceae' },
                      { "name": "澳楸科", "value": 'Davidsoniaceae' },
                      { "name": "毛枝树科", "value": 'Dialypetalanthaceae' },
                      { "name": "海桐花科", "value": 'Pittosporaceae' },
                      { "name": "腺毛草科", "value": 'Byblidaceae' },
                      { "name": "绣球花科", "value": 'Hydrangeaceae' },
                      { "name": "弯药树科", "value": 'Columelliaceae' },
                      { "name": "茶藨子科", "value": 'Grossulariaceae' },
                      { "name": "鳞叶树科", "value": 'Bruniaceae' },
                      { "name": "四柱木科", "value": 'Anisophylleaceae' },
                      { "name": "假海桐科", "value": 'Alseuosmiaceae' },
                      { "name": "景天科", "value": 'Crassulaceae' },
                      { "name": "土瓶草科", "value": 'Cephalotaceae' },
                      { "name": "虎耳草科", "value": 'Saxifragaceae' },
                      { "name": "蔷薇科", "value": 'Rosaceae' },
                      { "name": "沙莓科", "value": 'Neuradaceae' },
                      { "name": "假黄杨科", "value": 'Crossosomataceae' },
                      { "name": "金壳果科", "value": 'Chrysobalanaceae' },
                      { "name": "海人树科", "value": 'Surianaceae' },
                      { "name": "棒木科", "value": 'Rhabdodendraceae' }
                    ]
                  },
                  {
                    "name": "豆目",
                    "children": [
                      { "name": "含羞草科", "value": 'Mimosaceae' },
                      { "name": "苏木科", "value": 'Caesalpiniaceae' },
                      { "name": "蝶形花科", "value": 'Fabaceae' }
                    ]
                  },
                  {
                    "name": "山龙眼目",
                    "children": [
                      { "name": "胡颓子科", "value": 'Elaeagnaceae' },
                      { "name": "山龙眼科", "value": 'Proteaceae' }
                    ]
                  },
                  {
                    "name": "小二仙草目",
                    "children": [
                      { "name": "小二仙草科", "value": 'Haloragaceae' },
                      { "name": "古奴科", "value": 'Gunneraceae' }
                    ]
                  },
                  {
                    "name": "川苔草目",
                    "children": [
                      { "name": "川苔草科", "value": 'Podostemaceae' }
                    ]
                  },
                  {
                    "name": "桃金娘目",
                    "children": [
                      { "name": "海桑科", "value": 'Sonneratiaceae' },
                      { "name": "千屈菜科", "value": 'Lythraceae' },
                      { "name": "管萼科", "value": 'Penaeaceae' },
                      { "name": "隐翼科", "value": 'Crypteroniaceae' },
                      { "name": "瑞香科", "value": 'Thymelaeaceae' },
                      { "name": "菱科", "value": 'Trapaceae' },
                      { "name": "桃金娘科", "value": 'Myrtaceae' },
                      { "name": "石榴汁", "value": 'Punicaceae' },
                      { "name": "柳叶菜科", "value": 'Onagraceae' },
                      { "name": "方枝树科", "value": 'Oliniaceae' },
                      { "name": "野牡丹科", "value": 'Melastomataceae' },
                      { "name": "使君子科", "value": 'Combretaceae' },
                      { "name": "双翼果科", "value": 'Alzateaceae' },
                      { "name": "谷木科", "value": 'Memecylaceae' }
                    ]
                  },
                  {
                    "name": "红树目",
                    "children": [
                      { "name": "红树科", "value": 'Rhizophoraceae' }
                    ]
                  },
                  {
                    "name": "山茱萸目",
                    "children": [
                      { "name": "八角枫科", "value": 'Alangiaceae' },
                      { "name": "紫树科", "value": 'Nyssaceae' },
                      { "name": "山茱萸科", "value": 'Cornaceae' },
                      { "name": "绞木科", "value": 'Garryaceae' }
                    ]
                  },
                  {
                    "name": "檀香目",
                    "children": [
                      { "name": "毛丝花科", "value": 'Medusandraceae' },
                      { "name": "十齿花科", "value": 'Dipentodontaceae' },
                      { "name": "铁青树科", "value": 'Olacaceae' },
                      { "name": "山柚子科", "value": 'Opiliaceae' },
                      { "name": "檀香科", "value": 'Santalaceae' },
                      { "name": "羽毛果科", "value": 'Misodendraceae' },
                      { "name": "桑寄生科", "value": 'Loranthaceae' },
                      { "name": "房底珠科", "value": 'Eremolepidaceae' },
                      { "name": "槲寄生科", "value": 'Viscaceae' },
                      { "name": "蛇菰科", "value": 'Balanophoraceae' }
                    ]
                  },
                  {
                    "name": "大花草目",
                    "children": [
                      { "name": "菌花科", "value": 'Hydnoraceae' },
                      { "name": "帽蕊草科", "value": 'Mitrastemonaceae' },
                      { "name": "大花草科", "value": 'Rafflesiaceae' }
                    ]
                  },
                  {
                    "name": "卫矛目",
                    "children": [
                      { "name": "四棱果科", "value": 'Geissolomataceae' },
                      { "name": "卫矛科", "value": 'Celastraceae' },
                      { "name": "翅子藤科", "value": 'Hippocrateaceae' },
                      { "name": "木根草科", "value": 'Stackhousiaceae' },
                      { "name": "刺茉莉科", "value": 'Salvadoraceae' },
                      { "name": "冬青科", "value": 'Aquifoliaceae' },
                      { "name": "茶茱萸科", "value": 'Icacinaceae' },
                      { "name": "鳞枝树科", "value": 'Aextoxicaceae' },
                      { "name": "心翼果科", "value": 'Cardiopteridaceae' },
                      { "name": "棒果木科", "value": 'Corynocarpaceae' },
                      { "name": "毒鼠子科", "value": 'Dichapetalaceae' },
                      { "name": "苦皮树科", "value": 'Tepuianthaceae' }
                    ]
                  },
                  {
                    "name": "大戟目",
                    "children": [
                      { "name": "黄杨科", "value": 'Buxaceae' },
                      { "name": "油蜡树科", "value": 'Simmondsiaceae' },
                      { "name": "攀打科", "value": 'Pandaceae' },
                      { "name": "大戟科", "value": 'Euphorbiaceae' }
                    ]
                  },
                  {
                    "name": "鼠李目",
                    "children": [
                      { "name": "鼠李科", "value": 'Rhamnaceae' },
                      { "name": "火筒树科", "value": 'Leeaceae' },
                      { "name": "葡萄科", "value": 'Vitaceae' }
                    ]
                  },
                  {
                    "name": "亚麻目",
                    "children": [
                      { "name": "古柯科", "value": 'Erythroxylaceae' },
                      { "name": "香膏科", "value": 'Humiriaceae' },
                      { "name": "粘木科", "value": 'Ixonanthaceae' },
                      { "name": "亚麻藤科", "value": 'Hugoniaceae' },
                      { "name": "亚麻科", "value": 'Linaceae' }
                    ]
                  },
                  {
                    "name": "远志目",
                    "children": [
                      { "name": "金虎尾科", "value": 'Malpighiaceae' },
                      { "name": "蜡烛树科", "value": 'Vochysiaceae' },
                      { "name": "三角蛤科", "value": 'Trigoniaceae' },
                      { "name": "孔药花科", "value": 'Tremandraceae' },
                      { "name": "黄叶树科", "value": 'Xanthophyllaceae' },
                      { "name": "刺球果科", "value": 'Krameriaceae' }
                    ]
                  },
                  {
                    "name": "无患子目",
                    "children": [
                      { "name": "省沽油科", "value": 'Staphyleaceae' },
                      { "name": "蜜花科", "value": 'Melianthaceae' },
                      { "name": "钟萼木科", "value": 'Bretschneideraceae' },
                      { "name": "叠珠树科", "value": 'Akaniaceae' },
                      { "name": "无患子科", "value": 'Sapindaceae' },
                      { "name": "七叶树科", "value": 'Hippocastanaceae' },
                      { "name": "槭树科", "value": 'Aceraceae' },
                      { "name": "橄榄科", "value": 'Burseraceae' },
                      { "name": "漆树科", "value": 'Anacardiaceae' },
                      { "name": "三柱草科", "value": 'Julianiaceae' },
                      { "name": "苦木科", "value": 'Simaroubaceae' },
                      { "name": "叶柄花科", "value": 'Cneoraceae' },
                      { "name": "楝科", "value": 'Meliaceae' },
                      { "name": "芸香科", "value": 'Rutaceae' },
                      { "name": "蒺藜科", "value": 'Zygophyllaceae' }
                    ]
                  },
                  {
                    "name": "牻牛儿苗目",
                    "children": [
                      { "name": "酢浆草科", "value": 'Oxalidaceae' },
                      { "name": "牻牛儿苗科", "value": 'Geraniaceae' },
                      { "name": "池花科", "value": 'Limnanthaceae' },
                      { "name": "旱金莲科", "value": 'Tropaeolaceae' },
                      { "name": "凤仙花科", "value": 'Balsaminaceae' }
                    ]
                  },
                  {
                    "name": "伞形目",
                    "children": [
                      { "name": "五加科", "value": 'Araliaceae' },
                      { "name": "伞形科", "value": 'Apiaceae' }
                    ]
                  },
                ]
              },
              {
                "name": "菊亚纲",
                "children": [
                  {
                    "name": "龙胆目",
                    "children": [
                      { "name": "马钱科", "value": 'Loganiaceae' },
                      { "name": "轮叶科", "value": 'Retziaceae' },
                      { "name": "龙胆科", "value": 'Gentianaceae' },
                      { "name": "囊叶木科", "value": 'Saccifoliaceae' },
                      { "name": "夹竹桃科", "value": 'Apocynaceae' },
                      { "name": "萝藦科", "value": 'Asclepiadaceae' }
                    ]
                  },
                  {
                    "name": "茄目",
                    "children": [
                      { "name": "核果木科", "value": 'Duckeodendraceae' },
                      { "name": "假茄科", "value": 'Nolanaceae' },
                      { "name": "茄科", "value": 'Solanaceae' },
                      { "name": "旋花科", "value": 'Convolvulaceae' },
                      { "name": "菟丝子科", "value": 'Cuscutaceae' },
                      { "name": "睡菜科", "value": 'Menyanthaceae' },
                      { "name": "花葱科", "value": 'Polemoniaceae' },
                      { "name": "田基麻科", "value": 'Hydrophyllaceae' },
                      { "name": "异轮叶科", "value": 'Retziaceae' }
                    ]
                  },
                  {
                    "name": "唇形目",
                    "children": [
                      { "name": "盖裂寄生科", "value": 'Lennoaceae' },
                      { "name": "紫草科", "value": 'Boraginaceae' },
                      { "name": "马鞭草科", "value": 'Verbenaceae' },
                      { "name": "唇形科", "value": 'Lamiaceae' }
                    ]
                  },
                  {
                    "name": "水马齿目",
                    "children": [
                      { "name": "杉叶藻科", "value": 'Hippuridaceae' },
                      { "name": "水马齿科", "value": 'Callitrichaceae' },
                      { "name": "水穗草科", "value": 'Hydrostachyaceae' }
                    ]
                  },
                  {
                    "name": "车前目",
                    "children": [
                      { "name": "车前科", "value": 'Plantaginaceae' }
                    ]
                  },
                  {
                    "name": "玄参目",
                    "children": [
                      { "name": "醉鱼草科", "value": 'Buddlejaceae' },
                      { "name": "木犀科", "value": 'Oleaceae' },
                      { "name": "玄参科", "value": 'Scrophulariaceae' },
                      { "name": "球花科", "value": 'Globulariaceae' },
                      { "name": "苦槛蓝科", "value": 'Myoporaceae' },
                      { "name": "列当科", "value": 'Orobanchaceae' },
                      { "name": "苦苣苔科", "value": 'Gesneriaceae' },
                      { "name": "爵床科", "value": 'Acanthaceae' },
                      { "name": "胡麻科", "value": 'Pedaliaceae' },
                      { "name": "紫葳科", "value": 'Bignoniaceae' },
                      { "name": "对叶藤科", "value": 'Mendonciaceae' },
                      { "name": "狸藻科", "value": 'Lentibulariaceae' }
                    ]
                  },
                  {
                    "name": "桔梗目",
                    "children": [
                      { "name": "五膜草科", "value": 'Pentaphragmataceae' },
                      { "name": "楔瓣花科", "value": 'Sphenocleaceae' },
                      { "name": "桔梗科", "value": 'Campanulaceae' },
                      { "name": "花柱草科", "value": 'Stylidiaceae' },
                      { "name": "陀螺果科", "value": 'Donatiaceae' },
                      { "name": "蓝针花", "value": 'Brunoniaceae' },
                      { "name": "草海桐科", "value": 'Goodeniaceae' }
                    ]
                  },
                  {
                    "name": "茜草目",
                    "children": [
                      { "name": "茜草科", "value": 'Rubiaceae' },
                      { "name": "假牛繁缕科", "value": 'Theligonaceae' }
                    ]
                  },
                  {
                    "name": "川续断目",
                    "children": [
                      { "name": "忍冬科", "value": 'Caprifoliaceae' },
                      { "name": "五福花科", "value": 'Adoxaceae' },
                      { "name": "败酱科", "value": 'Valerianaceae' },
                      { "name": "川续断科", "value": 'Dipsacaceae' }
                    ]
                  },
                  {
                    "name": "头花草目",
                    "children": [
                      { "name": "头花草科", "value": 'Calyceraceae' }
                    ]
                  },
                  {
                    "name": "菊目",
                    "children": [
                      { "name": "菊科", "value": 'Asteraceae' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
      var data2 = {
        "name": "管理系统",
        "children": [
          {
            "name": "基本信息",
            "children": [
              { "name": "用户信息", "value": 4216 },
              { "name": "监控区域", "value": 2443 },
              { "name": "监控设备", "value": 4132 },
              { "name": "模具信息", "value": 4114 },
              { "name": "业务人员信息", "value": 4516 }
            ]
          },
          {
            "name": "业务履历",
            "children": [
              { "name": "入库记录", "value": 2105 },
              { "name": "出库记录", "value": 1316 },
              { "name": "维修记录", "value": 3151 },
              { "name": "保养记录", "value": 3770 },
              { "name": "报废记录", "value": 2435 },
              { "name": "生产履历", "value": 5833 }
            ]
          },
          {
            "name": "监控中心",
            "children": [
              { "name": "监控看板", "value": 6563 },
              { "name": "异常记录", "value": 8878 },
              { "name": "日志查询", "value": 8873 },
              { "name": "提醒通知", "value": 8533 }
            ]
          },
          {
            "name": "系统配置",
            "children": [
              { "name": "参数配置", "value": 8933 },
              { "name": "服务配置", "value": 9835 }
            ]
          }
        ]
      };
      var option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        legend: {
          top: '2%',
          left: '3%',
          orient: 'vertical',
          data: [{
            name: '植物界',
            icon: 'rectangle'
          },
          {
            name: '管理系统',
            icon: 'rectangle'
          }],
          borderColor: '#c23531'
        },
        series: [
          {
            type: 'tree',
            name: '植物界',
            data: [data1],
            top: '5%',
            left: '7%',
            bottom: '2%',
            right: '60%',
            symbolSize: 7,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },
            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
          {
            type: 'tree',
            name: '管理系统',
            data: [data2],
            top: '20%',
            left: '60%',
            bottom: '22%',
            right: '18%',
            symbolSize: 7,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              }
            },
            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      this.chart.setOption(option)
    }
  }
}
</script>
