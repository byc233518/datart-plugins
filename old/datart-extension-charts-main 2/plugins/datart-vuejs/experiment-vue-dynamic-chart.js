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

import VueJSIcon from "./vuejs.svg";

export function VueDynamicChart({ dHelper }) {
  const getCode = () => {
    return `
  \`\`\`js
  import Chart from 'app/pages/ChartWorkbenchPage/models/Chart';
  import { getStyleValueByGroup } from 'app/utils/chart';
  import Config from './config';

  class VueJSChart extends Chart {
    constructor() {
      super('vue-chart', 'DEMO - VueJS Chart', 'star');
    }
  
    isISOContainer = 'vue-chart-container';
    config = Config;
    dependency = [
      'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
      'https://cdn.jsdelivr.net/npm/vue-markdown@2.2.4/dist/vue-markdown.js',
      'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
    ];
    chart: any = null;
    nodeId = 'vue';
  
    onMount(options, context): void {
      const node = context.document.createElement('div');
      node.setAttribute('id', this.nodeId);
      context.document.getElementById(options.containerId).appendChild(node);
  
      const Vue = context.window.Vue;
      Vue.use(context.window.VueMarkdown);
      this.chart = new Vue({
        el: \`#\${this.nodeId}\`,
        data: { vue: 'Hello', person: { name: 'Stephen' }, content: getCode() },
        template: this.getTemplate(),
        methods: {
          greet: function (event) {
            alert('Hello My Friends ~ this.me');
          },
        },
      });
    }
  
    onUpdated(options, context): void {
      if (!this.isMatchRequirement(options.config)) {
        return;
      }

      const name = this.getInfo(options?.config?.styles);
      this.chart.$set(this.chart.person, 'name', name);
    }
  
    onUnMount(): void {}
  
    private getInfo(styleConfigs) {
      const name = getStyleValueByGroup(styleConfigs, 'label', 'name');
      return name;
    }
    
    private getTemplate() {
      return \`
      <div class="markdown-body">
        <a-collapse :accordion="true" default-active-key="2" :bordered="false">
          <a-collapse-panel key="1" name="Welcom~">
          <p>{{ vue }} {{ person.name }} ,</p>
            <p>Welcome to VueJS Chart Demo ~ <button v-on:click="greet">Greet</button></p>
          </a-collapse-panel>
          <a-collapse-panel key="3" name="code bloks">
            <vue-markdown>
            {{content}}
            </vue-markdown>
          </a-collapse-panel>
        </a-collapse>
      </div>
      \`;
    }
  }
  \`\`\`
  `;
  };

  return {
    config: {
      styles: [
        {
          label: "label",
          key: "label",
          comType: "group",
          rows: [
            {
              label: "name",
              key: "name",
              default: "Friends",
              comType: "input",
            },
            {
              label: "font",
              key: "font",
              comType: "font",
              default: {
                fontFamily: "PingFang SC",
                fontSize: "24",
                fontWeight: "normal",
                fontStyle: "normal",
                color: "yellow",
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            label: "标签",
            name: "你的姓名",
          },
        },
        {
          lang: "en-US",
          translation: {
            label: "Label",
            name: "Your Name",
          },
        },
      ],
    },
    isISOContainer: "experiment-vue-dynamic-chart",
    dependency: [
      "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js",
      "https://cdn.jsdelivr.net/npm/vue-markdown@2.2.4/dist/vue-markdown.js",
      "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css",
    ],
    meta: {
      id: "experiment-vue-dynamic-chart",
      name: "[Experiment] VUEJS Chart",
      icon: VueJSIcon,
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },

    onMount(options, context) {
      const node = context.document.createElement("div");
      node.setAttribute("id", this.nodeId);
      context.document.getElementById(options.containerId).appendChild(node);

      const Vue = context.window.Vue;
      Vue.use(context.window.VueMarkdown);
      this.chart = new Vue({
        el: `#${this.nodeId}`,
        data: { vue: "Hello", person: { name: "Stephen" }, content: getCode() },
        template: this.getTemplate(),
        methods: {
          greet: function (event) {
            alert("Hello My Friends ~ this.me");
          },
        },
      });
    },

    onUpdated(options, context) {
      if (!this.isMatchRequirement(options.config)) {
        return;
      }

      const name = this.getInfo(options?.config?.styles);
      this.chart.$set(this.chart.person, "name", name);
    },

    onUnMount() {
      // this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      // this.chart && this.chart.resize(context);
    },

    getInfo(styleConfigs) {
      const name = dHelper.getValue(styleConfigs, ["label", "name"]);
      return name;
    },

    getTemplate() {
      return `
      <div class="markdown-body">
        <a-collapse :accordion="true" default-active-key="2" :bordered="false">
          <a-collapse-panel key="1" name="Welcom~">
            <p>{{ vue }} {{ person.name }} ,</p>
            <p>Welcome to VueJS Chart Demo ~ <button v-on:click="greet">Greet</button></p>
          </a-collapse-panel>
          <a-collapse-panel key="3" name="code bloks">
            <vue-markdown>
            {{content}}
            </vue-markdown>
          </a-collapse-panel>
        </a-collapse>
      </div>
      `;
    },
  };
}
