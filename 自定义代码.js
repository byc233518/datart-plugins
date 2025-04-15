// 自定义代码组件
function CustomCode({ dHelper }) {
  const svgIcon = `<svg t="1736157002885" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1486" width="200" height="200"><path d="M438.4 849.1l222.7-646.7c0.2-0.5 0.3-1.1 0.4-1.6L438.4 849.1z" opacity=".224" p-id="1487"></path><path d="M661.2 168.7h-67.5c-3.4 0-6.5 2.2-7.6 5.4L354.7 846c-0.3 0.8-0.4 1.7-0.4 2.6 0 4.4 3.6 8 8 8h67.8c3.4 0 6.5-2.2 7.6-5.4l0.7-2.1 223.1-648.3 7.4-21.4c0.3-0.8 0.4-1.7 0.4-2.6-0.1-4.5-3.6-8.1-8.1-8.1zM954.6 502.1c-0.8-1-1.7-1.9-2.7-2.7l-219-171.3c-3.5-2.7-8.5-2.1-11.2 1.4-1.1 1.4-1.7 3.1-1.7 4.9v81.3c0 2.5 1.1 4.8 3.1 6.3l115 90-115 90c-1.9 1.5-3.1 3.8-3.1 6.3v81.3c0 4.4 3.6 8 8 8 1.8 0 3.5-0.6 4.9-1.7l219-171.3c6.9-5.4 8.2-15.5 2.7-22.5zM291.1 328.1l-219 171.3c-1 0.8-1.9 1.7-2.7 2.7-5.4 7-4.2 17 2.7 22.5l219 171.3c1.4 1.1 3.1 1.7 4.9 1.7 4.4 0 8-3.6 8-8v-81.3c0-2.5-1.1-4.8-3.1-6.3l-115-90 115-90c1.9-1.5 3.1-3.8 3.1-6.3v-81.3c0-1.8-0.6-3.5-1.7-4.9-2.7-3.5-7.7-4.1-11.2-1.4z" p-id="1488"></path></svg>`;

  return {
    config: {
      datas: [
        {
          label: 'dimension',
          key: 'dimension',
          type: 'group',
        },
        {
          label: 'metrics',
          key: 'metrics',
          type: 'aggregate',
        },
      ],
      styles: [
        {
          label: "HTML",
          key: "html",
          default: "<div class='custom-code'></div>",
          comType: "text",
        },
        // {
        //   label: "JavaScript",
        //   key: "js",
        //   default: "return { message: 'Hello, World!' };",
        //   comType: "input",
        // },
        {
          label: "CSS",
          key: "css",
          default: ".custom-code { color: red; }",
          comType: "text",
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
    isISOContainer: "custom-code",
    dependency: [
      '/custom-chart-plugins/libs/vue@2.6.14.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    meta: {
      id: "custom-code",
      name: "自定义代码",
      icon: svgIcon,
      requirements: [],
    },

    onMount(options, context) {
      console.log('onMount options', options)
      console.log('onMount context', context)
      const container = context.document.createElement("div");
      container.setAttribute("id", this.nodeId);
      context.document.getElementById(options.containerId).appendChild(container);
      const Vue = context.window.Vue;
      
      this.chart = new Vue({
        el: `#${this.nodeId}`,
        data() {
          return {
            resData: { name: 'John Doe' }, // 初始化数据
          };
        },
        computed: {
          // 动态生成 HTML 内容，确保动态数据被正确解析
          // dynamicHtml() {
          //   return `<p>Hello, <strong>{{ resData.name }}</strong>!</p>`;
          // },
        },
        template: options.config.styles.find(s => s.key === 'html').value, // 使用 v-html 渲染动态内容
        mounted() {
          const iframeDocument = context.document;
          const style = options.config.styles.find(s => s.key === 'css').value;
          const styleTag = iframeDocument.createElement('style');
          styleTag.setAttribute('type', 'text/css');
          styleTag.textContent = style;
          iframeDocument.head.appendChild(styleTag);
        },
      });
    },

    onUpdated(options, context) {
      if (!this.chart) return;

      console.log('onUpdated options', options)
      console.log('onUpdated context', context)

      

      const cols = options.dataset.columns
      const { rows } = options.dataset

      const data = dHelper.transformToObjectArray(rows, cols);

      console.log('data', data)

      this.chart.$set(this.chart, 'resData', data)

      // 强制 Vue 更新
      this.chart.$forceUpdate();
    },

    onUnMount() {
      this.chart && this.chart.$destroy();
      this.chart = null;
    },

    onResize(options, context) {
      // Optionally handle resize logic
    },
  };
}

