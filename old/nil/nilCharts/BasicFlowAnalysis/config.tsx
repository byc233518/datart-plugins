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

import { ChartConfig } from 'app/types/ChartConfig';

const config: ChartConfig = {
  datas: [
    {
      label: 'dimension',
      key: 'dimension',
      type: 'group',
      limit: 1,
      required: true,
      actions: {
        NUMERIC: ['alias', 'format', 'sortable'],
        STRING: ['alias', 'format', 'sortable'],
      },
      options: {
        sortable: { backendSort: false },
      },
    },
    {
      label: 'source',
      key: 'source',
      type: 'group',
      limit: 1,
      required: true,
      options: {
        sortable: { backendSort: false },
      },
    },
    {
      label: 'target',
      key: 'target',
      type: 'group',
      limit: 1,
      required: true,
      options: {
        sortable: { backendSort: false },
      },
    },
    {
      label: 'metrics',
      key: 'metrics',
      type: 'aggregate',
      required: true,
      limit: [1, 999],
      actions: {
        NUMERIC: ['aggregate', 'alias', 'format', 'sortable'],
        STRING: ['aggregate', 'alias', 'format', 'sortable'],
      },
      options: {
        sortable: { backendSort: false },
      },
    },
    {
      label: 'filter',
      key: 'filter',
      type: 'filter',
    },
    {
      label: 'info',
      key: 'info',
      type: 'info',
    },
  ],
  styles: [
    {
      label: 'style.title',
      key: 'style',
      comType: 'group',
      rows: [
        {
          label: 'style.fill',
          key: 'fill',
          comType: 'fontColor',
        },
        {
          label: 'style.stroke',
          key: 'stroke',
          comType: 'fontColor',
        },
        {
          label: 'style.redius',
          key: 'redius',
          comType: 'inputNumber',
          default: 0,
        },
      ],
    },
    {
      label: 'size.title',
      key: 'size',
      comType: 'group',
      rows: [
        {
          label: 'size.width',
          key: 'width',
          default: 140,
          comType: 'inputNumber',
        },
        {
          label: 'size.height',
          key: 'height',
          default: 25,
          comType: 'inputNumber',
        },
      ],
    },
    {
      label: 'badge.title',
      key: 'badge',
      comType: 'group',
      rows: [
        {
          label: 'badge.position',
          key: 'position',
          default: 'left',
          comType: 'select',
          options: {
            items: [
              { label: '???', value: 'top' },
              { label: '???', value: 'bottom' },
              { label: '???', value: 'left' },
              { label: '???', value: 'right' },
            ],
          },
        }, {
          label: 'badge.fill',
          key: 'fill',
          comType: 'fontColor',
        },
      ],
    },
    {
      label: 'title.title',
      key: 'title',
      comType: 'group',
      rows: [{
        label: 'title.fill',
        key: 'fill',
        comType: 'fontColor',
      },
      {
        label: 'title.style',
        key: 'style',
        comType: 'font',
        default: {
          fontFamily: 'PingFang SC',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: 'black',
        },
      },
      ],
    },
    {
      label: 'item.title',
      key: 'item',
      comType: 'group',
      rows: [{
        label: 'item.fill',
        key: 'fill',
        comType: 'fontColor',
      },
      {
        label: 'item.text',
        key: 'text',
        comType: 'font',
        default: {
          fontFamily: 'PingFang SC',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: 'black',
        },
      },

      {
        label: 'item.value',
        key: 'value',
        comType: 'font',
        default: {
          fontFamily: 'PingFang SC',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: 'red',
        },
      },
      ],
    },
    {
      label: 'edge.title',
      key: 'edge',
      comType: 'group',
      rows: [{
        label: 'edge.stroke',
        key: 'stroke',
        comType: 'fontColor',
      },
      ],
    },

    {
      label: 'layout.title',
      key: 'layout',
      comType: 'group',
      rows: [{
        label: 'layout.rankdir',
        key: 'rankdir',
        default: 'LR',
        comType: 'select',
        options: {
          items: [
            { label: '??????', value: 'LR' },
            { label: '??????', value: 'RL' },
            { label: '??????', value: 'TB' },
            { label: '??????', value: 'BT' },
          ],
        },
      },
      {
        label: 'layout.drag',
        key: 'drag',
        default: false,
        comType: 'checkbox',
      },
      {
        label: 'layout.zoom',
        key: 'zoom',
        default: false,
        comType: 'checkbox',
      },
      {
        label: 'layout.scroll',
        key: 'scroll',
        default: false,
        comType: 'checkbox',
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
        viz: {
          palette: {
            graph: {
              names: {
                workflow: '???????????????'
              }
            }
          }
        },
        style: {
          title: '??????',
          fill: "????????????",
          stroke: "????????????",
          redius: "????????????",
          titleStyle: '??????',
          style: "??????",
          titleContainerStyle: "??????????????????",
          itemPadding: "????????????",
          itemContainerStyle: "??????????????????",
          itemText: "??????",
          itemValue: "??????",
        },
        size: {
          title: "????????????",
          width: "???(px)",
          height: "???(px)"
        },
        badge: {
          title: "??????",
          fill: "??????",
          position: "??????"
        },
        title: {
          title: "??????",
          style: "??????",
          fill: "??????",
        },
        layout: {
          title: "??????",
          rankdir: "????????????",
          drag: "??????",
          scroll: "??????",
          zoom: "??????"
        },
        item: {
          title: "????????????",
          text: "??????",
          fill: "??????",
          value: "??????"
        },
        edge: {
          title: '?????????',
          stroke: "??????",
        },
      },
    },
    {
      lang: 'en',
      translation: {
        style: {
          title: 'Style',
          fill: "Fill Color",
          stroke: "Border Color",
          redius: "Border Reduis",
          titleStyle: 'Title',
          style: "Style",
          titleContainerStyle: "Title Container Style",
          itemPadding: "Content Padding Size",
          itemContainerStyle: "Content Container Color",
          itemText: "Label",
          itemValue: "Metrics",
        },
        size: {
          title: "Node Settings",
          width: "Width(px)",
          height: "Height(px)"
        },
        badge: {
          title: "Badge",
          fill: "Color",
          position: "Posstion"
        },
        title: {
          title: "Title",
          style: "Style",
          fill: "Color",
        },
        layout: {
          title: "Layout",
          rankdir: "Layout Type",
          drag: "Drag",
          scroll: "Scroll",
          zoom: "Zoom"
        },
        item: {
          title: "Content Style",
          text: "Label",
          fill: "Color",
          value: "Metrics"
        },
        edge: {
          title: 'Edge',
          stroke: "Color",
        },
      },
    },
  ],
};

export default config;
