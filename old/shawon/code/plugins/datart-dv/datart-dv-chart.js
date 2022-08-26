/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import SvgIcon from './icon.svg';
import config from './config';
import defaultChartOption from './echarts.option';
import util from './util.js'

//大屏分享预览
if (location.search.indexOf('from=dv') >= 0) {
  setInterval(() => {
    if (parent.document.querySelector('.dyVrIE')) {
      parent.document.querySelector('.dyVrIE').style.display = 'none'
      parent.document.querySelector('.grid-background').style.background = '#000'
      parent.document.querySelector('.grid-background').style.overflow = 'hidden'
      util.adaptationDv()
    }
  })
}

export function DatartDvCharts ({ dHelper }) {
  return {
    config: config,
    useIFrame: true,
    isISOContainer: 'dv-echarts',
    dependency: ['https://oss.yzcstatic.com/static/vue/2.5/vue.min.js', 'https://oss.yzcstatic.com/static/datart/datav.min.vue.js', 'https://oss.yzcstatic.com/static/datart/echarts.min.js'],
    meta: {
      id: 'dv-echarts',
      name: '大屏图表',
      icon: SvgIcon,
      containerId: ''
    },
    async onMount (options, context) {
      if (!context.document) {
        return;
      }
      this.context = context
      this.options = options
      this.onReady = false
      const stylesConfig = options.config.styles;
      const { chartType, autoToolTip } = this.getChartStyle(stylesConfig)
      const env = options.widgetSpecialConfig?.env
      const [initContent] = dHelper.getStyles(stylesConfig, ['delta'], ['richText']);
      const tmpOption = defaultChartOption[chartType] ? defaultChartOption[chartType].option : ''
      this.currentChartType = chartType
      this.defaultChartOption = defaultChartOption
      this.autoToolTip = parseInt((autoToolTip + '').replace('秒', ''))
      this.env = env
      if (env === 'workbench') {
        await util.loadJs('https://oss.yzcstatic.com/static/datart/src-min-noconflict/ace.js', 'ace', parent.document)
        await util.loadJs('https://oss.yzcstatic.com/static/datart/src-min-noconflict/ext-beautify.js', 'ace-ext-beautify', parent.document)
        util.init(options, context)
        util.initEditor()
        util.setEditorValue(initContent.option || `option=${util.obj2str(tmpOption)}`)
        setTimeout(() => {
          util.beautifyCode()
        }, 500)
        util.setChartPlugins(initContent.plugins || '')
      }
      if (this.autoToolTip > 0) {
        await util.loadJs('https://oss.yzcstatic.com/static/datart/echarts-auto-tooltip.js', 'echarts-auto-tooltip', parent.document)
      }
      context.saveCustomOption = this.saveCustomOption.bind(this)
      this.initChartView(options, context)
      await this.loadChartPlugins(initContent.plugins || '')
      if (chartType) {
        const chartOption = this.getOptions(this.options.dataset, this.options.config)
        this.chart?.draw(Object.assign({}, chartOption), true)
        if (this.autoToolTip > 0 && !this.loopToolTip) {
          this.loopToolTip = parent.window.tools.loopShowTooltip(this.chart.$chart, chartOption, { interval: this.autoToolTip * 1000, loopSeries: true })
        }
      }
    },
    async onUpdated (options) {
      const stylesConfig = options.config.styles
      const { chartType } = this.getChartStyle(stylesConfig)
      this.options = options
      this.env = options.widgetSpecialConfig?.env
      if (!this.onReady) {
        return
      }
      if (!this.isMatchRequirement(options.config)) {
        return;
      }
      this.chart?.updateBorder(this.getBorder(stylesConfig))
      this.chart?.updateDecorate(this.getDecorate(stylesConfig))
      if (this.currentChartType !== chartType) {
        // 切换图表类型
        if (!chartType) {
          this.currentChartType = chartType
          util.setEditorValue('')
          this.chartOption = null
          this.chart?.$chart.clear()
          return
        }
        this.onReady = false
        await this.loadChartPlugins(this.defaultChartOption[chartType].plugins || '')
        this.destoryVmOption().then(() => {
          this.chart?.$chart.clear()
          this.currentChartType = chartType
          this.chartOption = this.getOptions(options.dataset, options.config, true)
          let defaultOption = this.defaultChartOption[chartType].option
          defaultOption = typeof defaultOption === 'string' ? defaultOption : util.obj2str(defaultOption)
          let editOption = defaultOption.indexOf('option') < 0 ? `option=${defaultOption}` : defaultOption
          util.setEditorValue(editOption)
          this.chartOption.onChange({ option: editOption, plugins: util.getChartPlugins() })
          this.chart?.draw(Object.assign({}, this.chartOption), true)
        })
      } else {
        this.chartOption = this.getOptions(options.dataset, options.config)
        this.chart.draw(Object.assign({}, this.chartOption), true)
      }
      setTimeout(() => {
        this.updated = false
      }, 1000)
    },
    onUnMount () {
      this.chart?.dispose()
      this.destoryVmOption()
      util.initLayoutView(false)
      util.editor = null
    },
    onResize () {
      this.chart?.$chart.resize();
    },
    initChartView (options, context) {
      const self = this
      const containerId = options.containerId
      const node = context.document.createElement("div")
      const nodeId = containerId + '-dv'
      node.id = nodeId
      context.document.getElementById(containerId).appendChild(node)
      const stylesConfig = options.config.styles
      const Vue = context.window.Vue
      const borderStyle = this.getBorder(stylesConfig)
      const decorate = this.getDecorate(stylesConfig)
      this.chart = new Vue({
        el: context.document.getElementById(nodeId),
        data: {
          tipMsg: '',
          borderStyle,
          decorate,
          options,
          chartOption: {},
          $chart: null,
          containerId,
        },
        template: this.getTemplate(),
        mounted () {
          this.$chart = context.window.echarts.init(this.$refs.chart);
        },
        watch: {
          borderStyle: {
            handler (oldVal, newVal) {
              if (self.env === 'workbench') {
                setTimeout(() => {
                  this.$chart = context.window.echarts.init(this.$refs.chart)
                  this.draw(self.chartOption)
                }, 50)
              }
            },
            immediate: false,
            deep: true
          }
        },
        computed: {
          decorateSize () {
            return this.decorate.decorateSize.split(',')
          },
          decoratePosition () {
            let pos = this.decorate.decoratePosition.split(',')
            switch (pos.length) {
              case 0:
                return [0, 0, 0, 0]
                break;
              case 1:
                return [pos[0], 0, 0, 0]
                break;
              case 2:
                return [pos[0], pos[1], 0, 0]
                break;
              case 3:
                return [pos[0], pos[1], pos[2], 0]
                break;
              case 4:
                return [pos[0], pos[1], pos[2], pos[3]]
                break;
            }
          },
          decorateStyle () {
            const { decoratePosition, decorateSize } = this
            return { top: this.getPos(decoratePosition[0]), right: this.getPos(decoratePosition[1]), bottom: this.getPos(decoratePosition[2]), left: this.getPos(decoratePosition[3]), width: this.getPos(decorateSize[0]), height: this.getPos(decorateSize[1]) }
          }
        },
        methods: {
          getPos (pos) {
            if (typeof pos === 'string') {
              return pos
            }
            return pos + 'px'
          },
          draw (options, refresh = true) {
            if (!options) {
              return
            }
            try {
              if (self.onReady) {
                this.$chart.setOption(options, refresh)
              }
            } catch (e) {
              this.showTip(e + '')
              console.error(e)
              this.$chart.dispose()
            }
          },
          updateBorder (borderStyle) {
            this.borderStyle = borderStyle
          },
          updateDecorate (decorateStyle) {
            this.decorate = decorateStyle
          },
          dispose () {
            this.$chart?.dispose()
            this.$refs.dvWrapper && this.$refs.dvWrapper.parentNode.removeChild(this.$refs.dvWrapper)
          },
          showTip (msg, opts = { type: 'error', duration: 3000 }) {
            this.tipDuration = opts.duration
            this.tipMsg = msg
            this.tipTimer && clearTimeout(this.tipTimer)
            this.tipTimer = setTimeout(() => {
              this.tipMsg = ''
            }, this.tipDuration)
          },
          onTipMouseEnter () {
            this.tipTimer && clearTimeout(this.tipTimer)
          },
          onTipMouseLeave () {
            this.tipTimer = setTimeout(() => {
              this.tipMsg = ''
            }, this.tipDuration)
          }
        }
      })
    },
    getOptions (dataset, config, changeChartType, vmOption) {
      const stylesConfig = config.styles;
      const [initContent] = dHelper.getStyles(stylesConfig, ['delta'], ['richText']);
      const dataConfigs = config.datas || [];
      const groupConfigs = dataConfigs
        .filter(c => c.type === 'group')
        .flatMap(config => config.rows || []);
      const aggregateConfigs = dataConfigs
        .filter(c => c.type === 'aggregate')
        .flatMap(config => config.rows || []);
      const infoConfigs = dataConfigs
        .filter(c => c.type === "info")
        .flatMap(config => config.rows || []);
      const sizeConfigs = dataConfigs
        .filter(c => c.type === "size")
        .flatMap(config => config.rows || []);

      const chartDataSet = dHelper.transformToDataSet(
        dataset.rows,
        dataset.columns,
        dataConfigs,
      );

      if (!this.currentChartType) {
        return null
      }

      let customOption = {}
      if (vmOption) {
        customOption = vmOption
      } else if (initContent && !changeChartType) {
        customOption = this.getVmOption(initContent.option) || {}
      } else {
        const { option, plugins } = this.defaultChartOption[this.currentChartType]
        if (typeof option === 'string') {
          customOption = this.getVmOption(option) || {}
        } else {
          customOption = JSON.parse(JSON.stringify(option))
        }
        this.env === 'workbench' && util.setChartPlugins(plugins || '')
      }

      const yAxisColumns = aggregateConfigs.map((aggConfig, index) => {
        const col = {
          name: dHelper.getColumnRenderName(aggConfig),
          color: config.color?.start,
          type: customOption.series && customOption.series[index] && customOption.series[index].type ? customOption.series[index].type : this.currentChartType,
          data: chartDataSet.map(dc => ({
            ...aggConfig,
            ...this.getExtraSeriesRowData(dc),
            ...this.getExtraSeriesDataFormat(aggConfig?.format),
            value: dc.getCell(aggConfig),
          })),
          ...this.getLabelStyle(stylesConfig),
        };
        if (this.currentChartType === 'gauge') {
          //仪盘表
          col.detail = this.getGaugeDetail(stylesConfig, aggregateConfigs[0])
        }
        return col
      });

      let option = {
        tooltip: {
          trigger: 'item',
          formatter: this.getTooltipFormmater(stylesConfig, groupConfigs, aggregateConfigs, infoConfigs, chartDataSet),
        },
        legend: {
          data: yAxisColumns.map(col => col?.name) || []
        }
      }
      if (this.currentChartType === 'pie') {
        option.series = this.getPieSeries(stylesConfig, chartDataSet, groupConfigs, aggregateConfigs, infoConfigs)
      } else if (this.currentChartType === 'funnel') {
        // 漏斗图
        const dataList = !groupConfigs.length
          ? chartDataSet
          : chartDataSet?.sort(
            (a, b) =>
              (b?.getCell(aggregateConfigs[0])) -
              (a?.getCell(aggregateConfigs[0])),
          );
        const aggregateList = !groupConfigs.length
          ? aggregateConfigs?.sort(
            (a, b) =>
              (chartDataSet?.[0]?.getCell(b)) -
              (chartDataSet?.[0]?.getCell(a)),
          )
          : aggregateConfigs;
        Object.assign(option.tooltip, {
          trigger: 'item',
        })
        option.series = this.getFunnelSeries(stylesConfig, aggregateList, groupConfigs, dataList, infoConfigs)
      } else {
        option.series = yAxisColumns
      }

      if (this.currentChartType === 'progressPoll') {
        option = this.getProgressOption(dataset, config)
      } else if (this.currentChartType === 'thermometer') {
        option = this.getThermometerOption(dataset)
      } else if (this.currentChartType === 'map') {
        const mapLevelName = 'china'
        const geoChina = this.context.window.geoChina
        const geoChinaCity = this.context.window.geoChinaCity
        this.isNormalGeoMap = false
        this.geoMap = mapLevelName === 'china' ? geoChina : geoChinaCity
        option = this.getMapOption(chartDataSet, groupConfigs, aggregateConfigs, sizeConfigs, stylesConfig, infoConfigs)
      }

      if (!/^(progressPoll|thermometer|map)$/.test(this.currentChartType) && customOption.xAxis) {
        option.xAxis = this.getXAxis(stylesConfig, groupConfigs, chartDataSet)
      }

      return Object.assign({}, util.deepMerge({}, customOption, option), { ...this.getOnChange() })
    },
    getXAxis (styles, xAxisConfigs, chartDataSet) {
      const fisrtXAxisConfig = xAxisConfigs[0];
      return {
        type: 'category',
        data: chartDataSet.map(d => d.getCell(fisrtXAxisConfig)),
      };
    },
    getOnChange () {
      return this.mouseEvents?.reduce((acc, cur) => {
        if (cur.name === 'click') {
          Object.assign(acc, {
            onChange: delta => {
              this.updated = true
              cur.callback?.({
                seriesName: 'richText',
                value: delta,
              })
            }
          });
        }
        return acc;
      }, {});
    },
    // 饼图
    getPieSeries (
      styleConfigs,
      chartDataSet,
      groupConfigs,
      aggregateConfigs,
      infoConfigs) {
      if (!groupConfigs?.length) {
        const row = chartDataSet?.[0];
        return [{
          ...this.getBarSeiesImpl(styleConfigs),
          data: aggregateConfigs.map(config => {
            return {
              ...config,
              name: dHelper.getColumnRenderName(config),
              value: [config]
                .concat(infoConfigs)
                .map(config => row?.getCell(config)),
              itemStyle: this.getDataItemStyle(config, groupConfigs, row),
              ...this.getExtraSeriesRowData(row),
              ...this.getExtraSeriesDataFormat(config?.format),
            };
          }),
        }];
      }
      const flatSeries = aggregateConfigs.map(config => {
        return {
          ...this.getBarSeiesImpl(styleConfigs),
          name: dHelper.getColumnRenderName(config),
          data: chartDataSet?.map(row => {
            return {
              ...config,
              name: groupConfigs.map(row.getCell, row).join('-'),
              value: aggregateConfigs.concat(infoConfigs).map(row.getCell, row),
              itemStyle: this.getDataItemStyle(config, groupConfigs, row),
              ...this.getExtraSeriesRowData(row),
              ...this.getExtraSeriesDataFormat(config?.format),
            };
          }),
        };
      });
      return flatSeries;
    },
    // 漏斗图
    getFunnelSeries (
      styles,
      aggregateConfigs,
      groupConfigs,
      dataList,
      infoConfigs,
    ) {
      if (!groupConfigs.length) {
        const dc = dataList?.[0];
        const datas = aggregateConfigs.map(aggConfig => {
          return {
            ...aggConfig,
            value: [aggConfig]
              .concat(infoConfigs)
              .map(config => dc?.getCell(config)),
            name: dHelper.getColumnRenderName(aggConfig),
            itemStyle: this.getDataItemStyle(aggConfig, groupConfigs, dc),
            ...this.getExtraSeriesRowData(dc),
            ...this.getExtraSeriesDataFormat(aggConfig?.format),
          };
        });
        return {
          type: 'funnel',
          ...this.getLabelStyle(styles),
          labelLayout: { hideOverlap: true },
          data: this.getFunnelSeriesData(datas),
        };
      }
      const flattenedDatas = aggregateConfigs.flatMap(aggConfig => {
        const ormalizeSerieDatas = dataList.map(dc => {
          return {
            ...aggConfig,
            value: aggregateConfigs
              .concat(infoConfigs)
              .map(config => dc?.getCell(config)),
            name: groupConfigs.map(config => dc.getCell(config)).join('-'),
            itemStyle: this.getDataItemStyle(aggConfig, groupConfigs, dc),
            ...this.getExtraSeriesRowData(dc),
            ...this.getExtraSeriesDataFormat(aggConfig?.format),
          };
        });
        return ormalizeSerieDatas;
      });

      const series = {
        type: 'funnel',
        ...this.getLabelStyle(styles),
        data: this.getFunnelSeriesData(flattenedDatas),
      };
      return series;
    },
    // 进度池
    getProgressOption (dataset, config) {
      const dataConfigs = config.datas || [];
      const chartDataSet = dHelper.transformToDataSet(
        dataset.rows,
        dataset.columns,
        dataConfigs,
      );
      const category = chartDataSet.map((dc) => {
        return { ...this.getExtraSeriesRowData(dc).rowData }
      })
      const datas = [];
      const total = 100
      const barData = []
      const yData = []
      const colors = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#469f4b', '#96bfff', '#604f70', '#fb7293', '#ff9f7f', '#ffdb5c', '#67e0e3', '#32c5e9', '#37a2da']
      category.map((o) => {
        datas.push(o.value)
        barData.push(total)
        yData.push(o.name)
      })
      return {
        xAxis: [
          {
            show: false,
          }
        ],
        yAxis: [
          {
            data: yData
          },
          {
            data: datas
          },
          {
            data: [],
          }
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: datas,
            itemStyle: {
              normal: {
                color: function (params) {
                  const num = colors.length;
                  return {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#0F1F45',
                      },
                      {
                        offset: 1,
                        color: colors[params.dataIndex % num],
                      },
                    ],
                  };
                },
              }
            },
            z: 2,
            animation: true,
            animationEasing: 'cubicOut'
          },
          {
            type: 'scatter',
            yAxisIndex: 0,
            symbol: 'rect',
            data: datas,
            z: 2
          },
          {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            data: barData,
            z: 0
          },
        ]
      }
    },
    // 温度计
    getThermometerOption (dataset) {
      const TP_value = dataset.rows && dataset.rows[0] ? dataset.rows[0][0] : 0;
      const kd = [];
      const Gradient = [];
      let leftColor = '';
      let showValue = '';
      const boxPosition = [65, 0];
      let TP_txt = ''
      const warnTp = this.vmIframe?.contentWindow?.warnTp || 20

      // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
      for (let i = 0, len = 135; i <= len; i++) {
        if (i < 10 || i > 130) {
          kd.push('')
        } else {
          if ((i - 10) % 20 === 0) {
            kd.push('-3');
          } else if ((i - 10) % 4 === 0) {
            kd.push('-1');
          } else {
            kd.push('');
          }
        }

      }
      //中间线的渐变色和文本内容
      if (TP_value > warnTp) {
        TP_txt = '温度偏高';
        Gradient.push({
          offset: 0,
          color: '#93FE94'
        }, {
          offset: 0.5,
          color: '#E4D225'
        }, {
          offset: 1,
          color: '#E01F28'
        })
      } else if (TP_value > -warnTp) {
        TP_txt = '温度正常';
        Gradient.push({
          offset: 0,
          color: '#93FE94'
        }, {
          offset: 1,
          color: '#E4D225'
        })
      } else {
        TP_txt = '温度偏低';
        Gradient.push({
          offset: 1,
          color: '#93FE94'
        })
      }
      if (TP_value > 62) {
        showValue = 62
      } else {
        if (TP_value < -60) {
          showValue = -60
        } else {
          showValue = TP_value
        }
      }
      if (TP_value < -10) {
        boxPosition = [65, -120];
      }
      leftColor = Gradient[Gradient.length - 1].color;
      return {
        yAxis: [{
          data: []
        }, {
        }, {
          type: 'category',
          data: ['', '', '', '', '', '', '', '', '', '', ''],
        }],
        xAxis: [{
          show: false,
          min: -10,
          max: 80,
          data: []
        }, {
          show: false,
          min: -10,
          max: 80,
          data: []
        }, {
          show: false,
          min: -10,
          max: 80,
          data: []
        }, {
          show: false,
          min: -5,
          max: 80,

        }],
        series: [{
          name: '条',
          type: 'bar',
          xAxisIndex: 0,
          data: [{
            value: (showValue + 70),
            label: {
              normal: {
                position: boxPosition,
                formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                rich: {
                  back: {
                    color: leftColor
                  },
                  unit: {
                    color: leftColor
                  },
                  downTxt: {
                  }
                }
              }
            }
          }],
          itemStyle: {
            normal: {
              color: new this.context.window.echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
            }
          },
          z: 2
        }, {
          name: '白框',
          data: [134],
          type: 'bar',
          z: 1
        }, {
          name: '外框',
          type: 'bar',
          data: [135],
          xAxisIndex: 2,
          z: 0
        }, {
          name: '圆',
          type: 'scatter',
          data: [0],
          z: 2
        }, {
          name: '白圆',
          type: 'scatter',
          data: [0],
          z: 1
        }, {
          name: '外圆',
          type: 'scatter',
          data: [0],
          z: 0
        }, {
          name: '刻度',
          type: 'bar',
          yAxisIndex: 0,
          xAxisIndex: 3,
          data: kd,
          label: {
            normal: {
              formatter: function (params) {
                if (params.dataIndex > 130 || params.dataIndex < 10) {
                  return '';
                } else {
                  if ((params.dataIndex - 10) % 20 === 0) {
                    return params.dataIndex - 70;
                  } else {
                    return '';
                  }
                }
              }
            }
          },
          z: 0
        }]
      };
    },
    // 地图
    getMapOption (chartDataSet, groupConfigs, aggregateConfigs, sizeConfigs, styleConfigs, infoConfigs) {
      return {
        geo: {
          map: 'china',
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#142957',
              borderColor: '#0692a4'
            },
            emphasis: {
              areaColor: '#0b1c2d'
            }
          }
        },
        series: [
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                width: 0,
                curveness: 0.2
              }
            }
          }
        ]
      }
    },
    getFunnelSeriesData (seriesData) {
      const _calculateConversionAndArrivalRatio = (data, index) => {
        if (index) {
          data.conversion = util.formatPercent(
            (data.value?.[0] / seriesData[index - 1].value?.[0]) * 100,
          );
          data.arrival = util.formatPercent(
            (data.value?.[0] / seriesData[0].value?.[0]) * 100,
          );
        }
        return data;
      };

      return seriesData.map(_calculateConversionAndArrivalRatio);
    },
    getBarSeiesImpl (styleConfigs) {
      return {
        type: 'pie',
        ...this.getLabelStyle(styleConfigs)
      };
    },
    getExtraSeriesRowData (data) {
      return {
        rowData: data?.convertToCaseSensitiveObject(),
      };
    },
    getExtraSeriesDataFormat (format) {
      return { format }
    },
    getDataItemStyle (
      config,
      colorConfigs,
      row,
    ) {
      const colorConfig = colorConfigs?.[0];
      const columnColor = config?.color?.start;
      if (colorConfig) {
        const colorKey = row?.getCell(colorConfig);
        const itemStyleColor = colorConfigs[0]?.color?.colors?.find(
          c => c.key === colorKey,
        );

        return {
          color: itemStyleColor?.value,
        };
      } else if (columnColor) {
        return {
          color: columnColor,
        };
      }
    },
    getTooltip (style, aggConfigs) {
      const [prefix, suffix] = dHelper.getStyles(style, ['gauge'], ['prefix', 'suffix']);
      return {
        formatter: ({ data }) => {
          return `${data.name} : ${prefix}${toFormattedValue(
            data.value,
            aggConfigs[0].format,
          )}${suffix}`;
        },
      };
    },
    getTooltipFormmater (
      styleConfigs,
      groupConfigs,
      aggregateConfigs,
      infoConfigs,
      chartDataSet,
    ) {
      return seriesParams => {
        let tooltipParam = Array.isArray(seriesParams) ? seriesParams[0] : seriesParams
        if (tooltipParam.componentType !== 'series') {
          return tooltipParam.name;
        }
        const { data, value, percent, seriesName, seriesType } = tooltipParam;
        if (/^(gauge)$/.test(seriesType)) {
          return `${data.name || seriesName} :${dHelper.toFormattedValue(
            data.value,
            aggregateConfigs[0].format,
          )}`;
        }
        if (!groupConfigs?.length) {
          const tooltip = [data]
            .concat(infoConfigs)
            .map((config, index) => {
              return dHelper.valueFormatter(config, value?.[index])
            });
          tooltip[0] += '(' + percent + '%)';
          return tooltip.join('<br />');
        }
        const infoTotal = infoConfigs.map(info => {
          let total = 0;
          chartDataSet.forEach(row => {
            total += Number((row).getCell(info));
          });
          return total;
        });
        let tooltip = []
        if (/^(bar|line|scatter)$/.test(seriesType)) {
          const aggConfigName = tooltipParam?.data?.name || tooltipParam?.seriesName;
          const row = tooltipParam?.data?.rowData || {};
          tooltip = []
            .concat(groupConfigs || [])
            .concat(
              aggregateConfigs.filter(agg => dHelper.getColumnRenderName(agg) === aggConfigName) ||
              [],
            )
            .map(config => {
              return dHelper.valueFormatter(config, row?.[chartDataSet.getFieldOriginKey(config)])
            }
            );
        } else {
          const { data } = seriesParams;
          tooltip = !!groupConfigs?.length
            ? [
              `${groupConfigs?.map(gc => dHelper.getColumnRenderName(gc)).join('-')}: ${seriesParams?.name
              }`,
            ]
            : [];
          const aggTooltips = !!groupConfigs?.length
            ? this.getSeriesTooltips4Scatter(
              [seriesParams],
              aggregateConfigs.concat(infoConfigs),
            )
            : this.getSeriesTooltips4Scatter([seriesParams], [data].concat(infoConfigs));
          tooltip = tooltip.concat(aggTooltips);
        }
        return tooltip.join('<br />');
      };
    },
    getSeriesTooltips4Scatter (
      params,
      tooltipItemConfigs,
      start,
    ) {
      const dataValues = params?.[0]?.value;
      return tooltipItemConfigs.map((config, index) =>
        dHelper.valueFormatter(config, dataValues?.[!!start ? start + index : index]),
      );
    },
    getLabelStyle (styles) {
      const formatter = this.getLabelFormatter(styles);
      return {
        label: {
          formatter,
        },
        labelLayout: { hideOverlap: true },
      };
    },
    getLabelFormatter (styles) {
      return params => {
        const { name, value, percent, data } = params;
        const formattedValue = dHelper.toFormattedValue(Array.isArray(value) ? (value?.[0]) : value, data.format);
        const labels = [];
        const label = name ? `${name}: ${formattedValue}` : formattedValue
        labels.push(label);
        return labels.join('\n');
      };
    },
    getGaugeDetail (styleConfigs, aggConfig) {
      return {
        formatter: value => {
          return `${dHelper.toFormattedValue(value || 0, aggConfig.format)}`
        }
      };
    },
    getChartStyle (styles) {
      const [chartType, chartPlugins, autoToolTip] = dHelper.getStyles(
        styles,
        ['chart'],
        ['chartType', 'chartPlugins', 'autoToolTip'],
      );
      return { chartType, chartPlugins, autoToolTip };
    },
    getBorder (styles) {
      const [borderType, borderColor, borderBackgroundColor] = dHelper.getStyles(
        styles,
        ['border'],
        ['borderType', 'borderColor', 'borderBackgroundColor'],
      );
      return { borderType, borderColor: borderColor ? JSON.parse(borderColor) : [], borderBackgroundColor };
    },
    getDecorate (styles) {
      const [decorateType, decorateColor, decorateSize, decoratePosition] = dHelper.getStyles(
        styles,
        ['decorate'],
        ['decorateType', 'decorateColor', 'decorateSize', 'decoratePosition'],
      );
      return { decorateType, decorateColor: decorateColor ? JSON.parse(decorateColor) : [], decorateSize, decoratePosition };
    },
    removeDataField (data) {
      if (this.currentChartType === 'thermometer') {
        return data
      }
      return util.removeDataField(data)
    },
    saveCustomOption (userOption) {
      try {
        const { options } = this
        const vmOption = this.removeDataField(this.getVmOption(userOption))
        const newOptions = this.getOptions(options.dataset, options.config, false, vmOption)
        const plugins = util.getChartPlugins()
        util.beautifyCode()
        newOptions.onChange({ option: userOption.replace(/\r|\n/gm, ''), plugins })
        this.chartOption = newOptions
        this.autoToolTip = this.getChartStyle()
        console.log(this.chartOption, JSON.stringify(this.chartOption))
      } catch (e) {
        console.error(e, '===e')
        this.chart.showTip(e + '')
      }

    },
    destoryVmOption () {
      return new Promise((resolve) => {
        const iframe = this.vmIframe
        if (!iframe) {
          return resolve()
        }
        iframe.src = 'javascript:void(0)';
        try {
          iframe?.contentWindow?.document.write('');
          iframe?.contentWindow?.document.clear();
        } catch (e) {
          resolve()
          console.error(e, '--')
        }
        setTimeout(() => {
          iframe?.parentNode?.removeChild(iframe)
          resolve()
        }, 10)
      })
    },
    getVmOption (option) {
      let iframe = this.context.document.getElementById('dvVmOptionIframe')
      if (!iframe) {
        iframe = this.context.document.createElement('iframe')
        iframe.id = 'dvVmOptionIframe'
        iframe.style.display = 'none'
        this.context.document.body.appendChild(iframe)
      }
      iframe.contentWindow.dataset = this.options.dataset
      iframe.contentWindow.echarts = window.echarts
      iframe.contentWindow.myChart = this.chart?.$chart
      iframe.contentWindow.tools = this.context.window.tools
      iframe.contentWindow.eval(option.indexOf('option') < 0 ? `option=${option}` : option)
      this.vmIframe = iframe
      return iframe.contentWindow.option
    },
    async loadChartPlugins (plugins) {
      if (!plugins) {
        this.onReady = true
        return
      }
      const pluginsArr = plugins.split(',')
      const { document } = this.context
      for (let i = 0, j = pluginsArr.length; i < j; i++) {
        await util.loadJs(pluginsArr[i], pluginsArr[i].split('/').pop().replace('.js', ''), document)
      }
      this.onReady = true
    },
    getTemplate () {
      return `
      <div ref="dvWrapper" class="dv-chart-wrapper">
        <compnent :is="borderStyle.borderType" :color="borderStyle.borderColor" :backgroundColor="borderStyle.borderBackgroundColor" v-if="borderStyle.borderType">
          <div id="dv-chart" ref="chart" style="width:100%;height:100%"></div>
        </compnent>
        <div id="dv-chart" ref="chart" style="width:100%;height:100%" v-else></div>
        <compnent :is="decorate.decorateType" :color="decorate.decorateColor" v-if="decorate.decorateType" class="dv-decorate" :style="decorateStyle" style="position:absolute;z-index:2"></compnent>
        <div class="dv-tip-wrapper error" ref="dvTipWrapper" :class="[tipMsg?'on':'']" @mouseenter="onTipMouseEnter" @mouseleave="onTipMouseLeave">{{tipMsg}}</div>
      </div>
      `;
    },
  };
}