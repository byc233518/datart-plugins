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



function EchartsBoxplot({ dHelper }) {
  // const svgIcon = `<svg t="1639279486808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4028" width="16" height="16"><path d="M25.6 537.1392a25.6 25.6 0 1 1 0-51.2h141.1072a25.6 25.6 0 0 0 24.5248-18.2272l118.1184-393.7792a51.2 51.2 0 0 1 98.0992 0L665.6 934.4l118.1184-393.728a76.8 76.8 0 0 1 73.5744-54.784H998.4a25.6 25.6 0 1 1 0 51.2h-141.1072a25.6 25.6 0 0 0-24.5248 18.2272l-118.1184 393.7792a51.2 51.2 0 0 1-98.0992 0L358.4 88.6272 240.2816 482.4064a76.8 76.8 0 0 1-73.5744 54.784H25.6z"  p-id="4029"></path></svg>`;
  const svgIcon = `<svg t="1645432576154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1490" width="128" height="128"><path d="M1014.869333 182.755556h-59.448889a9.159111 9.159111 0 0 0-9.130666 9.130666v283.448889H841.102222V274.176a9.159111 9.159111 0 0 0-9.130666-9.130667H192a9.159111 9.159111 0 0 0-9.130667 9.130667v201.159111H77.710222V191.886222a9.159111 9.159111 0 0 0-9.130666-9.130666H9.102222A9.159111 9.159111 0 0 0 0 191.886222v640c0 5.034667 4.124444 9.159111 9.130667 9.159111h59.448889a9.159111 9.159111 0 0 0 9.130666-9.159111v-278.840889H182.897778v196.551111c0 5.034667 4.096 9.159111 9.130666 9.159112h640a9.159111 9.159111 0 0 0 9.130667-9.159112v-196.551111h105.159111v278.840889c0 5.034667 4.124444 9.159111 9.130667 9.159111h59.448889a9.159111 9.159111 0 0 0 9.130666-9.159111v-640a9.159111 9.159111 0 0 0-9.130666-9.130666zM265.102222 347.306667h100.579556v329.130666H265.130667V347.335111zM758.897778 676.465778h-320V347.335111h320v329.130667z" p-id="1491"></path></svg>`;

  return {
    config: {
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
      ],
      styles: [
        {
          label: 'label.title',
          key: 'label',
          comType: 'group',
          rows: [
            {
              label: 'label.showLabel',
              key: 'showLabel',
              default: false,
              comType: 'checkbox',
            },
            {
              label: 'label.position',
              key: 'position',
              comType: 'select',
              default: 'top',
              options: {
                items: [
                  { label: '上', value: 'top' },
                  { label: '左', value: 'left' },
                  { label: '右', value: 'right' },
                  { label: '下', value: 'bottom' },
                  { label: '内', value: 'inside' },
                  { label: '内左', value: 'insideLeft' },
                  { label: '内右', value: 'insideRight' },
                  { label: '内上', value: 'insideTop' },
                  { label: '内下', value: 'insideBottom' },
                  { label: '内左上', value: 'insideTopLeft' },
                  { label: '内左下', value: 'insideBottomLeft' },
                  { label: '内右上', value: 'insideTopRight' },
                  { label: '内右下', value: 'insideBottomRight' },
                ],
              },
            },

            {
              label: 'viz.palette.style.font',
              key: 'font',
              comType: 'font',
              default: {
                fontFamily: 'PingFang SC',
                fontSize: '12',
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'black',
              },
            },
          ],
        },
        {
          label: 'legend.title',
          key: 'legend',
          comType: 'group',
          rows: [
            {
              label: 'legend.showLegend',
              key: 'showLegend',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'legend.type',
              key: 'type',
              comType: 'select',
              options: {
                items: [
                  { label: '普通', value: 'plain' },
                  { label: '滚动', value: 'scroll' },
                ],
              },
            },
            {
              label: 'legend.selectAll',
              key: 'selectAll',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'legend.position',
              key: 'position',
              comType: 'select',
              default: 'right',
              options: {
                items: [
                  { label: '右', value: 'right' },
                  { label: '上', value: 'top' },
                  { label: '下', value: 'bottom' },
                  { label: '左', value: 'left' },
                ],
              },
            },
            {
              label: 'viz.palette.style.font',
              key: 'font',
              comType: 'font',
              default: {
                fontFamily: 'PingFang SC',
                fontSize: '12',
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'black',
              },
            },
          ],
        },
        {
          label: 'xAxis.title',
          key: 'xAxis',
          comType: 'group',
          rows: [
            {
              label: 'common.showAxis',
              key: 'showAxis',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'common.inverseAxis',
              key: 'inverseAxis',
              comType: 'checkbox',
            },
            {
              label: 'common.lineStyle',
              key: 'lineStyle',
              comType: 'line',
              default: {
                type: 'dashed',
                width: 1,
                color: 'black',
              },
            },
            {
              label: 'common.showLabel',
              key: 'showLabel',
              default: true,
              comType: 'checkbox',
              options: [],
            },
            {
              label: 'viz.palette.style.font',
              key: 'font',
              comType: 'font',
              default: {
                fontFamily: 'PingFang SC',
                fontSize: '12',
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'black',
              },
            },
            {
              label: 'common.rotate',
              key: 'rotate',
              default: 0,
              comType: 'inputNumber',
            },
            {
              label: 'common.showInterval',
              key: 'showInterval',
              default: false,
              comType: 'checkbox',
            },
            {
              label: 'common.interval',
              key: 'interval',
              default: 0,
              comType: 'inputNumber',
            },
          ],
        },
        {
          label: 'yAxis.title',
          key: 'yAxis',
          comType: 'group',
          rows: [
            {
              label: 'common.showAxis',
              key: 'showAxis',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'common.inverseAxis',
              key: 'inverseAxis',
              default: false,
              comType: 'checkbox',
            },
            {
              label: 'common.lineStyle',
              key: 'lineStyle',
              comType: 'line',
              default: {
                type: 'dashed',
                width: 1,
                color: 'black',
              },
            },
            {
              label: 'common.showLabel',
              key: 'showLabel',
              default: true,
              comType: 'checkbox',
              options: [],
            },
            {
              label: 'viz.palette.style.font',
              key: 'font',
              comType: 'font',
              default: {
                fontFamily: 'PingFang SC',
                fontSize: '12',
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'black',
              },
            },
            {
              label: 'common.showTitleAndUnit',
              key: 'showTitleAndUnit',
              default: true,
              comType: 'checkbox',
              options: [],
            },
            {
              label: 'common.unitFont',
              key: 'unitFont',
              comType: 'font',
              default: {
                fontFamily: 'PingFang SC',
                fontSize: '12',
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'black',
              },
            },
            {
              label: 'common.nameLocation',
              key: 'nameLocation',
              default: 'center',
              comType: 'select',
              options: {
                items: [
                  { label: '开始', value: 'start' },
                  { label: '结束', value: 'end' },
                  { label: '中间', value: 'center' },
                ],
              },
            },
            {
              label: 'common.nameRotate',
              key: 'nameRotate',
              default: 90,
              comType: 'inputNumber',
            },
            {
              label: 'common.nameGap',
              key: 'nameGap',
              default: 60,
              comType: 'inputNumber',
            },
            {
              label: 'common.min',
              key: 'min',
              comType: 'inputNumber',
            },
            {
              label: 'common.max',
              key: 'max',
              comType: 'inputNumber',
            },
          ],
        },
        {
          label: 'splitLine.title',
          key: 'splitLine',
          comType: 'group',
          rows: [
            {
              label: 'splitLine.showHorizonLine',
              key: 'showHorizonLine',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'common.lineStyle',
              key: 'horizonLineStyle',
              comType: 'line',
              default: {
                type: 'dashed',
                width: 1,
                color: 'grey',
              },
            },
            {
              label: 'splitLine.showVerticalLine',
              key: 'showVerticalLine',
              default: false,
              comType: 'checkbox',
            },
            {
              label: 'common.lineStyle',
              key: 'verticalLineStyle',
              comType: 'line',
              default: {
                type: 'dashed',
                width: 1,
                color: 'grey',
              },
            },
          ],
        },
        {
          label: 'viz.palette.style.margin.title',
          key: 'margin',
          comType: 'group',
          rows: [
            {
              label: 'viz.palette.style.margin.containLabel',
              key: 'containLabel',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'viz.palette.style.margin.left',
              key: 'marginLeft',
              default: '5%',
              comType: 'marginWidth',
            },
            {
              label: 'viz.palette.style.margin.right',
              key: 'marginRight',
              default: '5%',
              comType: 'marginWidth',
            },
            {
              label: 'viz.palette.style.margin.top',
              key: 'marginTop',
              default: '5%',
              comType: 'marginWidth',
            },
            {
              label: 'viz.palette.style.margin.bottom',
              key: 'marginBottom',
              default: '5%',
              comType: 'marginWidth',
            },
          ],
        },
      ],
      settings: [
        {
          label: 'viz.palette.setting.paging.title',
          key: 'paging',
          comType: 'group',
          rows: [
            {
              label: 'viz.palette.setting.paging.pageSize',
              key: 'pageSize',
              default: 1000,
              comType: 'inputNumber',
              options: {
                needRefresh: true,
                step: 1,
                min: 0,
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: 'zh-CN',
          translation: {
            chartName: '[Experiment] 用户自定义折线图',
            common: {
              showAxis: '显示坐标轴',
              inverseAxis: '反转坐标轴',
              lineStyle: '线条样式',
              borderType: '边框线条类型',
              borderWidth: '边框线条宽度',
              borderColor: '边框线条颜色',
              backgroundColor: '背景颜色',
              showLabel: '显示标签',
              unitFont: '刻度字体',
              rotate: '旋转角度',
              position: '位置',
              showInterval: '显示刻度',
              interval: '刻度间隔',
              showTitleAndUnit: '显示标题和刻度',
              nameLocation: '标题位置',
              nameRotate: '标题旋转',
              nameGap: '标题与轴线距离',
              min: '最小值',
              max: '最大值',
            },
            label: {
              title: '标签',
              showLabel: '显示标签',
              position: '位置',
            },
            legend: {
              title: '图例',
              showLegend: '显示图例',
              type: '图例类型',
              selectAll: '图例全选',
              position: '图例位置',
            },
            data: {
              color: '颜色',
              colorize: '配色',
            },
            graph: {
              title: '折线图',
              smooth: '平滑',
              step: '阶梯',
            },
            xAxis: {
              title: 'X轴',
            },
            yAxis: {
              title: 'Y轴',
            },
            splitLine: {
              title: '分割线',
              showHorizonLine: '显示横向分割线',
              showVerticalLine: '显示纵向分割线',
            },
            reference: {
              title: '参考线',
              open: '点击参考线配置',
            },
          },
        },
        {
          lang: 'en-US',
          translation: {
            chartName: '[Experiment] Custom Line Chart',
            common: {
              showAxis: 'Show Axis',
              inverseAxis: 'Inverse Axis',
              lineStyle: 'Line Style',
              borderType: 'Border Type',
              borderWidth: 'Border Width',
              borderColor: 'Border Color',
              backgroundColor: 'Background Color',
              showLabel: 'Show Label',
              unitFont: 'Unit Font',
              rotate: 'Rotate',
              position: 'Position',
              showInterval: 'Show Interval',
              interval: 'Interval',
              showTitleAndUnit: 'Show Title and Unit',
              nameLocation: 'Name Location',
              nameRotate: 'Name Rotate',
              nameGap: 'Name Gap',
              min: 'Min',
              max: 'Max',
            },
            label: {
              title: 'Label',
              showLabel: 'Show Label',
              position: 'Position',
            },
            legend: {
              title: 'Legend',
              showLegend: 'Show Legend',
              type: 'Type',
              selectAll: 'Select All',
              position: 'Position',
            },
            data: {
              color: 'Color',
              colorize: 'Colorize',
            },
            graph: {
              title: 'Graph',
              smooth: 'Smooth',
              step: 'Step',
            },
            xAxis: {
              title: 'X Axis',
            },
            yAxis: {
              title: 'Y Axis',
            },
            splitLine: {
              title: 'Split Line',
              showHorizonLine: 'Show Horizontal Line',
              showVerticalLine: 'Show Vertical Line',
            },
            reference: {
              title: 'Reference',
              open: 'Open',
            },
          },
        },
      ],
    },
    isISOContainer: 'echarts-v5',
    dependency: ['https://lib.baomitu.com/echarts/5.0.2/echarts.min.js', 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'],
    meta: {
      id: 'experiment-echarts-boxplot',
      name: 'Echarts-箱线图',
      icon: svgIcon,
      requirements: [
        {
          group: 2,
          aggregate: 1,
        },
      ],
    },

    onMount(options, context) {

      if ('echarts' in context.window) {
        this.chart = context.window.echarts.init(
          context.document.getElementById(options.containerId),
          'default',
        );
      }
    },

    onUpdated(props) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart?.clear();
        return;
      }
      const newOptions = this.getOptions(props.dataset, props.config);
      this.chart?.setOption(Object.assign({}, newOptions), true);
    },

    onUnMount() {
      this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      this.chart && this.chart.resize(context);
    },

    getYAxis(styles, yAxisColumns) {
      const [
        showAxis,
        inverse,
        lineStyle,
        showLabel,
        font,
        showTitleAndUnit,
        unitFont,
        nameLocation,
        nameGap,
        nameRotate,
        min,
        max,
      ] = dHelper.getStyles(
        styles,
        ['yAxis'],
        [
          'showAxis',
          'inverseAxis',
          'lineStyle',
          'showLabel',
          'font',
          'showTitleAndUnit',
          'unitFont',
          'nameLocation',
          'nameGap',
          'nameRotate',
          'min',
          'max',
        ],
      );
      const name = showTitleAndUnit
        ? yAxisColumns.map(c => c.name).join(' / ')
        : null;
      const [showHorizonLine, horizonLineStyle] = dHelper.getStyles(
        styles,
        ['splitLine'],
        ['showHorizonLine', 'horizonLineStyle'],
      );

      return {
        type: 'value',
        name,
        nameLocation,
        nameGap,
        nameRotate,
        inverse,
        min,
        max,
        axisLabel: dHelper.getAxisLabel(showLabel, font),
        axisLine: dHelper.getAxisLine(showAxis, lineStyle),
        axisTick: dHelper.getAxisTick(showLabel, lineStyle),
        nameTextStyle: dHelper.getNameTextStyle(
          unitFont?.fontFamily,
          unitFont?.fontSize,
          unitFont?.color,
        ),
        splitLine: dHelper.getSplitLine(showHorizonLine, horizonLineStyle),
      };
    },

    // getXAxis(styles, xAxisColumns) {
    //   const axisColumnInfo = xAxisColumns[0];
    //   const [
    //     showAxis,
    //     inverse,
    //     lineStyle,
    //     showLabel,
    //     font,
    //     rotate,
    //     showInterval,
    //     interval,
    //   ] = dHelper.getStyles(
    //     styles,
    //     ['xAxis'],
    //     [
    //       'showAxis',
    //       'inverseAxis',
    //       'lineStyle',
    //       'showLabel',
    //       'font',
    //       'rotate',
    //       'showInterval',
    //       'interval',
    //     ],
    //   );
    //   const [showVerticalLine, verticalLineStyle] = dHelper.getStyles(
    //     styles,
    //     ['splitLine'],
    //     ['showVerticalLine', 'verticalLineStyle'],
    //   );

    //   return {
    //     ...axisColumnInfo,
    //     inverse,
    //     axisLabel: dHelper.getAxisLabel(
    //       showLabel,
    //       font,
    //       showInterval ? interval : null,
    //       rotate,
    //     ),
    //     axisLine: dHelper.getAxisLine(showAxis, lineStyle),
    //     axisTick: dHelper.getAxisTick(showLabel, lineStyle),
    //     splitLine: dHelper.getSplitLine(showVerticalLine, verticalLineStyle),
    //   };
    // },

    getLegendStyle(styles, seriesNames) {
      const [show, type, font, legendPos, selectAll] = dHelper.getStyles(
        styles,
        ['legend'],
        ['showLegend', 'type', 'font', 'position', 'selectAll'],
      );
      let positions = {};
      let orient = {};

      switch (legendPos) {
        case 'top':
          orient = 'horizontal';
          positions = { top: 8, left: 8, right: 8, height: 32 };
          break;
        case 'bottom':
          orient = 'horizontal';
          positions = { bottom: 8, left: 8, right: 8, height: 32 };
          break;
        case 'left':
          orient = 'vertical';
          positions = { left: 8, top: 16, bottom: 24, width: 96 };
          break;
        default:
          orient = 'vertical';
          positions = { right: 8, top: 16, bottom: 24, width: 96 };
          break;
      }
      const selected = seriesNames.reduce(
        (obj, name) => ({
          ...obj,
          [name]: selectAll,
        }),
        {},
      );

      return {
        ...positions,
        show,
        type,
        orient,
        selected,
        data: seriesNames,
        textStyle: font,
      };
    },
    getLabelStyle(styles) {
      const [show, position, font] = dHelper.getStyles(
        styles,
        ['label'],
        ['showLabel', 'position', 'font'],
      );
      return { label: { show, position, ...font } };
    },

    getSeriesStyle(styles) {
      const [smooth, step] = dHelper.getStyles(
        styles,
        ['graph'],
        ['smooth', 'step'],
      );
      return { smooth, step };
    },
    getOptions(dataset, config) {
      // const styleConfigs = config.styles;
      // const dataConfigs = config.datas || [];
      // const groupConfigs = dataConfigs
      //   .filter(c => c.type === 'group')
      //   .flatMap(config => config.rows || []);
      // const aggregateConfigs = dataConfigs
      //   .filter(c => c.type === 'aggregate')
      //   .flatMap(config => config.rows || []);

      // const chartDataSet = dHelper.transformToDataSet(
      //   dataset.rows,
      //   dataset.columns,
      //   dataConfigs,
      // );

      


      // var xAxisColumns = groupConfigs.map(config => {
      //   return {
      //     type: 'category',
      //     // boundaryGap: false,
      //     tooltip: { show: true },
      //     data: chartDataSet.map(row => row.getCell(config)),
      //   };
      // });
      // const yAxisColumns = aggregateConfigs.map((config, index) => {
      //   return {
      //     name: dHelper.getColumnRenderName(config),
      //     type: 'value',
      //     ...this.getLabelStyle(styleConfigs),
      //     ...this.getSeriesStyle(styleConfigs),
      //   };
      // });

      // const { min, max } = dHelper.getDataColumnMaxAndMin2(
      //   chartDataSet,
      //   aggregateConfigs[0],
      // );

      // xAxisColumns[0].data = _.uniq(xAxisColumns[0].data)

      // let source = []
      // xAxisColumns[0].data.forEach(x => {
      //   let sourceItem = []
      //   xAxisColumns[1].data.forEach(y => {
      //     let cur = dataset.rows.filter(o => o[1] === x && o[2] === y)
      //     sourceItem.push(cur && cur[0] ? cur[0][0] : 0)
      //   })
      //   source.push(sourceItem)
      // })


      return {
        dataset: [
          {
            source: [
              [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
              [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
              [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
              [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
              [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
            ]
          },
          // {
          //   // prettier-ignore
          //   source: source
          // },
          {
            transform: {
              type: 'boxplot',
              // config: { itemNameFormatter: 'expr {value}' }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',

        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            datasetIndex: 1
          },
          {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2
          }
        ]
      }
    },
  };
}
