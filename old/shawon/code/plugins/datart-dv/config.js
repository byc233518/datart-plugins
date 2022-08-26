import echartOptions from './echarts.option'

export default {
  datas: [
    {
      label: 'dimension',
      key: 'dimension',
      required: true,
      type: 'group',
    },
    {
      label: 'metrics',
      key: 'metrics',
      required: true,
      type: 'aggregate',
    },
    {
      label: 'filter',
      key: 'filter',
      type: 'filter',
      allowSameField: true,
    },
  ],
  styles: [
    {
      label: 'chart.title',
      key: 'chart',
      comType: 'group',
      expand: true,
      rows: [
        {
          label: 'chart.type',
          key: 'chartType',
          default: '',
          comType: 'select',
          options: {
            getItems: () => {
              const options = [{
                label:'选择图表',
                value: ''
              }]
              Object.keys(echartOptions).map((key) => {
                options.push({
                  label: echartOptions[key].name,
                  value: key
                })
              })
              return options
            }
          },
        },
        {
          label: 'chart.plugins',
          key: 'chartPlugins',
          default: '',
          comType: 'input'
        },
        {
          label: 'chart.autoToolTip',
          key: 'autoToolTip',
          default: '',
          comType: 'inputNumber',
          options: {
            placeholder: '自动播放时间（秒）'
          }
        },
        {
          label: 'chart.edit',
          key: 'chartEdit',
          default: '',
          comType: 'input'
        }
      ],
    },
    {
      label: 'common.title',
      key: 'delta',
      comType: 'group',
      rows: [
        {
          label: 'delta.richText',
          key: 'richText',
          default: '',
          comType: 'input',
        },
      ],
    },
    {
      label: 'border.title',
      key: 'border',
      comType: 'group',
      rows: [
        {
          label: 'border.type',
          key: 'borderType',
          default: 'dv-border-box-1',
          comType: 'select',
          options: {
            items: (() => {
              var arr = [{
                label: '无边框',
                value: ''
              }]
              for (var i = 1; i <= 13; i++) {
                arr.push({
                  label: 'BorderBox' + i,
                  value: 'dv-border-box-' + i
                })
              }
              return arr
            })(),
          },
        },
        {
          label: 'border.color',
          key: 'borderColor',
          comType: 'input',
          default: '["#4fd2dd", "#235fa7"]'
        },
        {
          label: 'border.backgroundColor',
          key: 'borderBackgroundColor',
          comType: 'fontColor',
          default: 'rgba(0,0,0,.3)'
        }
      ],
    },
    {
      label: 'decorate.title',
      key: 'decorate',
      comType: 'group',
      rows: [
        {
          label: 'decorate.type',
          key: 'decorateType',
          default: '',
          comType: 'select',
          options: {
            items: (() => {
              var arr = [{
                label: '无装饰',
                value: ''
              }]
              for (var i = 1; i <= 12; i++) {
                arr.push({
                  label: '装饰' + i,
                  value: 'dv-decoration-' + i
                })
              }
              return arr
            })(),
          },
        },
        {
          label: 'decorate.color',
          key: 'decorateColor',
          comType: 'input',
          default: '["#4fd2dd", "#235fa7"]'
        },
        {
          label: 'decorate.size',
          key: 'decorateSize',
          comType: 'input',
          default: '200,40',
          options: {
            placeholder: 'width,height'
          }
        },
        {
          label: 'decorate.position',
          key: 'decoratePosition',
          comType: 'input',
          default: '',
          options: {
            placeholder: 'top,right,bottom,left'
          }
        }
      ],
    }
  ],
  settings: [
    {
      label: "viz.palette.setting.paging.title",
      key: "paging",
      comType: "group",
      rows: [
        {
          label: "viz.palette.setting.paging.pageSize",
          key: "pageSize",
          default: 1000,
          comType: "inputNumber",
          options: {
            needRefresh: true,
            step: 1,
            min: 0,
          },
        },
      ],
    }
  ],
  i18ns: [
    {
      lang: 'zh-CN',
      translation: {
        chartName: '[Experiment] 大屏图表',
        common: {
          title: '富文本'
        },
        delta: {
          text: '内容',
        },
        code: {
          title: '代码配置',
          js: 'js配置'
        },
        chart: {
          title: '图表设置',
          option: '自定义Option',
          type: '图表类型',
          plugins: '扩展脚本',
          autoToolTip: '自动播放'
        },
        border: {
          title: '边框设置',
          type: '边框类型',
          color: '边框颜色',
          backgroundColor: '边框背景色'
        },
        decorate: {
          title: '装饰设置',
          type: '装饰类型',
          color: '装饰颜色',
          position: '装饰位置',
          size: '尺寸'
        }
      },
    },
    {
      lang: 'en-US',
      translation: {
        chartName: '[Experiment] 大屏图表',
        common: {
          showTitleAndUnit: '显示标题和刻度',
          nameGap: '标题与轴线距离',
          min: '最小值',
          max: '最大值',
        },
      }
    },
  ],
}