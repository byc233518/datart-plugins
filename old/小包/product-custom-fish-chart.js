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

function ProductCustomFishChart({ dHelper }) {
  const svgIcon = `<svg t="1647690369716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7701" width="200" height="200"><path d="M739.370667 551.808L472.192 284.586667a359.68 359.68 0 0 0-35.626667 31.274666c-88.874667 88.874667-124.074667 214.570667-105.6 377.130667 162.56 18.474667 288.256-16.725333 377.173334-105.6a359.68 359.68 0 0 0 31.232-35.626667z m24.234666-36.096c47.36-80.768 64.042667-182.570667 50.090667-305.408-122.88-13.952-224.64 2.730667-305.408 50.090667l255.317333 255.317333z m-421.205333 221.397333l-14.165333 155.861334a42.666667 42.666667 0 0 1-72.661334 26.325333L104.704 768.426667a42.666667 42.666667 0 0 1 26.325333-72.661334l155.861334-14.165333c-15.658667-166.997333 23.765333-300.117333 119.509333-395.861333 98.858667-98.858667 237.482667-137.685333 412.117333-117.845334a42.666667 42.666667 0 0 1 37.546667 37.589334c19.882667 174.634667-18.944 313.258667-117.76 412.117333-95.786667 95.744-228.906667 135.168-395.946667 119.466667z m-41.6-13.909333l-165.930667 15.061333 150.869334 150.869334 15.061333-165.973334z m422.4-392.234667a21.333333 21.333333 0 1 1-30.165333-30.165333 21.333333 21.333333 0 0 1 30.165333 30.165333z" p-id="7702"></path></svg>`;
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
          label: 'common.setting',
          key: 'setting',
          comType: 'group',
          rows: [
            {
              label: 'common.background',
              key: 'background',
              comType: 'select',
              default: '1',
              options: {
                translateItemLabel: true,
                items: [
                  { label: '@global@.bar.backgroundOne', value: '1' },
                  { label: '@global@.bar.backgroundTwo', value: '2' },
                  { label: '@global@.bar.backgroundThree', value: '3' },
                ],
              },
            },
            {
              label: 'common.speed',
              key: 'speed',
              comType: 'select',
              default: 1,
              options: {
                translateItemLabel: true,
                items: [
                  { label: '@global@.bar.slowTwo', value: 3 },
                  { label: '@global@.bar.slowOne', value: 2 },
                  { label: '@global@.bar.middle', value: 1 },
                  { label: '@global@.bar.fastOne', value: 0.5 },
                  { label: '@global@.bar.fastTwo', value: 0.25 },
                ],
              },
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
            chartName: '????????????',
            common: {
              setting: '??????',
              background: '??????',
              speed: '??????',
            },
            bar: {
              backgroundOne: '??????1',
              backgroundTwo: '??????2',
              backgroundThree: '??????3',
              slowTwo: '???2',
              slowOne: '???1',
              middle: '??????',
              fastOne: '???1',
              fastTwo: '???2',
            },
          },
        },
        {
          lang: 'en',
          translation: {
            chartName: 'ocean fish',
            common: {
              setting: 'setting',
              background: 'background',
              speed: 'speed',
            },
            bar: {
              backgroundOne: 'backgroundOne',
              backgroundTwo: 'backgroundTwo',
              backgroundThree: 'backgroundThree',
              slowTwo: 'slowTwo',
              slowOne: 'slowOne',
              middle: 'middle',
              fastOne: 'fastOne',
              fastTwo: 'fastTwo',
            },
          },
        },
      ],
    },

    isISOContainer: 'product-custom-fish-chart',
    dependency: ['https://cdn.disscode.cn/datart/pond/dumplingbao.pond.min.js'],
    meta: {
      id: 'product-custom-fish-chart',
      name: '????????????',
      icon: svgIcon,
      requirements: [
        {
          group: 1,
          aggregate: 1,
        },
      ],
    },

    onMount(options, context) {
      if (!context.document) {
        return;
      }
      this.host = context.document.getElementById(options.containerId);
      this.getOptions(context, options.dataset, options.config);
    },

    onUpdated(options, context) {
      if (!options.dataset || !options.dataset.columns || !options.config) {
        return;
      }
      while (this.host.children.length > 0) {
        this.host.removeChild(
          this.host.children[this.host.children.length - 1],
        );
      }
      this.getOptions(context, options.dataset, options.config);
    },

    onUnMount() {},

    getOptions(context, dataset, config) {
      // ?????????????????????????????????
      const dataConfigs = config.datas || [];

      // ????????????????????????
      const styleConfigs = config.styles;

      // ?????????????????????Datart?????????Helper????????????, ?????????ChartDataSet??????
      const chartDataSet = dHelper.transformToDataSet(
        dataset.rows,
        dataset.columns,
        dataConfigs,
      );

      // ??????????????????
      const bg = dHelper.getValue(styleConfigs, ['setting', 'background']);
      // ??????????????????
      const speed = dHelper.getValue(styleConfigs, ['setting', 'speed']);

      const groupConfigs = dataConfigs
        .filter(c => c.type === 'group')
        .flatMap(config => config.rows || []);
      const aggregateConfigs = dataConfigs
        .filter(c => c.type === 'aggregate')
        .flatMap(config => config.rows || []);

      const data = chartDataSet.map(row => {
        return {
          x: row.getCell(aggregateConfigs[0]),
          y: row.getCell(groupConfigs[0]),
        };
      });
      const dataField = [aggregateConfigs[0].colName, groupConfigs[0].colName];
      this.chart = new context.window.dumplingbao.Pond(this.host, {
        data: {
          swingData: data,
          swingField: dataField,
        },
        config: {
          bg: bg,
          speed: speed,
        },
        options: {},
      });
    },
  };
}
