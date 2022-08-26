/*
 * @Descripttion: 工具类
 * @Author: shawon.xiao
 * @Date: 2022-03-20 15:37:21
 * @LastEditors: shawon.xiao
 */
export default {
  editOptionValue: '',
  init: function (options, context) {
    this.editMode = 'edit'
    this.mcontext = context
    this.env = options.widgetSpecialConfig?.env
    const dvChartStyle = `
    .dv-chart-wrapper{width:100%;height:100%;position:relative;}
    .dv-editor-wrapper{margin-left:-50px;height:400px;width:calc(100% + 50px);box-shadow:0 0 10px rgba(0,0,0,.12)}
    .dv-editor-wrapper.max{position:fixed;left:50%;top:50%;background:#fff;width:50% !important;height:50% !important;}
    .dv-editor{width:100%;height:calc(100% - 20px)}
    .dv-editor-tools{background:#eee;width:100%;display:flex;align-items:center;justify-content: flex-end;padding-left: 10px;}
    .dv-editor-tools .btn {padding:5px 8px;}
    .dv-editor-wrapper.edit-mode{position:fixed;width:581px;top:145px;left:67px;z-index:200;height:calc(100% - 165px)}
    .btn-save{cursor:pointer; border: none;background: #67c23a;color: #fff;font-size:12px;}
    .btn-save:hover{background: #58b729;}
    .btn-format {font-size: 12px;color:#666;margin-right: 10px}
    .btn-format svg {width: 15px;height: 15px;color: #999;display: inline-block;vertical-align: middle;}
    .kLGcuu{padding-right:0 !important;}
    .ant-row.ant-form-item{flex-direction: row !important;margin-bottom:5px;}
    .datart-config-panel .ant-collapse-content > .ant-collapse-content-box{padding-top:0 !important;}
    .dv-opt-lnk{color:#1B9AEE;margin-right: auto;margin-left:20px;}
    .dv-opt-lnk:hover{text-direction:underline;}
     `
    const style = `
    .dv-tip-wrapper {position: fixed;top:0;left:0;width:100%;padding: 8px 20px;transition: all .2s linear;transform: translateY(-100%);font-size: 14px;}
    .dv-tip-wrapper.error{color:#fff;background: rgba(245, 108, 108,.98);}
    .dv-tip-wrapper.on{transform: translateY(0);}
    `
    this.addStyle(document.getElementsByTagName("head")[0], style, 'dv-style')
    if (this.env === 'workbench') {
      this.addStyle(parent.document.getElementsByTagName("head")[0], dvChartStyle, 'dv-chart-style')
      this.initView()
    }
  },
  initView() {
    if (parent.document.getElementById('btnSaveOption')) {
      return
    }
    const self = this
    // fix 获取指定tabset
    const tabSetDom = parent.document.querySelector('[data-layout-path="/ts1/t0"] div:nth-child(2)')
    let tabDom = tabSetDom.children
    const cNKqjZDom1 = tabDom[2]
    const cNKqjZDom2 = tabDom[3]
    cNKqjZDom1.querySelectorAll('.ant-collapse-item')[1].style.display = 'none'
    if (cNKqjZDom1.querySelectorAll('.ant-collapse-header')[0].getAttribute('aria-expanded') === 'false') {
      cNKqjZDom1.querySelectorAll('.ant-collapse-header')[0].click()
      cNKqjZDom2.querySelectorAll('.ant-collapse-header')[0].click()
    }

    // 扩展插件
    cNKqjZDom1.querySelectorAll('.chart-config-item-layout')[1].innerHTML = `<div class="ant-row ant-form-item sc-iCfMLu ejLifI" style="row-gap: 0px;"><div class="ant-col ant-form-item-label"><label class="ant-form-item-no-colon" title="扩展插件">扩展插件</label></div><div class="ant-col ant-form-item-control"><div class="ant-form-item-control-input"><div class="ant-form-item-control-input-content"><input type="text" placeholder="扩展插件JS路径，多个逗号隔开" class="ant-input datart-ant-input" id="chartPluginsInput" value="" style="font-size:12px;" /></div></div></div></div>`

    //编辑器
    cNKqjZDom1.querySelectorAll('.chart-config-item-layout')[3].querySelectorAll('.ant-form-item-control-input')[0].parentNode.parentNode.innerHTML = '<div class="dv-editor-wrapper"><div class="dv-editor-tools"><a class="dv-opt-lnk" href="https://echarts.apache.org/zh/option.html#title" target="_blank">配置手册</a><a class="btn-format" id="btnMode" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg><span class="txt">编辑模式</span></a><button class="btn btn-save" id="btnSaveOption">保存预览</button></div><div class="dv-editor" id="dv-option-edit"></div></div>'

    this.btnSaveOption = parent.document.getElementById('btnSaveOption')
    this.btnMode = parent.document.getElementById('btnMode')
    this.btnSaveOption.addEventListener('click', function () {
      self.mcontext && self.mcontext.saveCustomOption(self.editor.getValue())
    })

    this.tabsets = parent.document.querySelectorAll('.flexlayout__tab')
    this.splitters = parent.document.querySelectorAll('.flexlayout__splitter')
    this.btnModeText = parent.document.querySelector('#btnMode .txt')
    this.editWrapper = parent.document.querySelector('.dv-editor-wrapper')
    this.tabsetWidth = '256px'
    this.initLayoutView(false)
    this.btnMode.addEventListener('click', function () {
      self.initLayoutView(self.editMode === 'normal')
      setTimeout(function () {
        self.editor.resize()
      })
    })
  },
  initLayoutView(editMode) {
    try {
      const { tabsets, splitters, btnModeText } = this
      if (!editMode) {
        this.removeClass(this.editWrapper, 'edit-mode')
        tabsets[0].style.width = this.tabsetWidth
        tabsets[1].style.left = this.tabsetWidth
        tabsets[1].style.width = (616 - parseInt(this.tabsetWidth)) + 'px'
        splitters[0].style.display = 'block'
        splitters[1].style.display = 'block'
        this.editMode = 'normal'
        btnModeText.innerHTML = '编辑模式'
      } else {
        this.addClass(this.editWrapper, 'edit-mode')
        this.tabsetWidth = tabsets[0].style.width
        tabsets[0].style.width = '0px'
        tabsets[1].style.left = '0px'
        tabsets[1].style.width = '616px'
        splitters[0].style.display = 'none'
        splitters[1].style.display = 'none'
        this.editMode = 'edit'
        btnModeText.innerHTML = '标准模式'
      }
    } catch (e) {
    }
  },
  initEditor: function () {
    if (this.editor) {
      return
    }
    const editEl = parent.document.getElementById('dv-option-edit')
    this.editor = parent.window.ace.edit(editEl,
      {
        mode: "ace/mode/javascript",
        selectionStyle: "text",
      });
    this.editor.setOptions({
      tabSize: 2,
    })
  },
  setChartPlugins: function (val) {
    parent.document.getElementById('chartPluginsInput').value = val
  },
  getChartPlugins: function () {
    return parent.document.getElementById('chartPluginsInput').value
  },
  setEditorValue: function (value) {
    this.editor.setValue(value)
    this.beautifyCode()
  },
  beautifyCode: function () {
    var beautify = parent.window.ace.require("ace/ext/beautify")
    beautify.beautify(this.editor.session)
  },
  addClass: function (elem, cls) {
    if (!elem) {
      return
    }
    if (!this.hasClass(elem, cls)) {
      elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
  },
  removeClass: function (elem, cls) {
    if (!elem) {
      return
    }
    if (this.hasClass(elem, cls)) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  },
  hasClass: function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
  },
  addStyle: function (el, styleText, id) {
    if (parent.document.getElementById(id)) {
      return
    }
    const style = parent.document.createElement('style')
    style.id = id
    style.appendChild(parent.document.createTextNode(styleText))
    el.appendChild(style)
  },
  removeStyle: function (id, target) {
    const style = target.getElementById(id)
    style?.parentNode?.removeChild(style)
  },
  removeDataField: function (obj, keys = 'data') {
    const self = this
    if (Array.isArray(obj)) {
      obj.forEach(function (item) {
        self.removeDataField(item, keys)
      });
    }
    else if (typeof obj === 'object') {
      Object.getOwnPropertyNames(obj).forEach(function (key) {
        if (keys.indexOf(key) !== -1) delete obj[key];
        else self.removeDataField(obj[key], keys);
      });
    }
    return obj
  },
  formatPercent: function (per) {
    const perStr = per + '';
    return perStr.length - (perStr.indexOf('.') + 1) > 2
      ? per.toFixed(2)
      : perStr;
  },
  uuid: function () {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
  },
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  isArray: function (arr) {
    return Array.isArray(arr)
  },
  loadJs: function (url, id, target) {
    return new Promise((resolve) => {
      if (target.getElementById(id)) {
        return resolve()
      }
      const script = target.createElement('script')
      script.id = id
      script.onload = () => {
        resolve()
      }
      script.src = url;
      target.getElementsByTagName('head')[0].appendChild(script)
    })
  },
  isPlainObject: function (obj) {
    return obj ? obj.constructor === Object : false
  },
  each: function (obj, iterate, context) {
    if (obj) {
      return (Array.isArray(obj) ? this.arrayEach : this.objectEach)(obj, iterate, context)
    }
    return obj
  },
  hasOwnProp: function (obj, key) {
    return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false
  },
  arrayEach: function (list, iterate, context) {
    if (list) {
      if (list.forEach) {
        list.forEach(iterate, context)
      } else {
        for (var index = 0, len = list.length; index < len; index++) {
          iterate.call(context, list[index], index, list)
        }
      }
    }
  },
  objectEach: function (obj, iterate, context) {
    if (obj) {
      for (var key in obj) {
        if ((obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false)) {
          iterate.call(context, obj[key], key, obj)
        }
      }
    }
  },
  toRawType: function (value) {
    const _toString = Object.prototype.toString
    return _toString.call(value).slice(8, -1)
  },
  handleMerge: function (target, source) {
    const self = this
    if ((this.toRawType(target) === 'Object' && this.toRawType(source) === 'Object') || (Array.isArray(target) && Array.isArray(source))) {
      this.each(source, function (obj, key) {
        target[key] = self.handleMerge(target[key], obj)
      })
      return target
    }
    return source
  },
  deepMerge: function (target) {
    if (!target) {
      target = {}
    }
    const args = arguments
    const len = args.length
    for (var source, index = 1; index < len; index++) {
      source = args[index]
      if (source) {
        this.handleMerge(target, source)
      }
    }
    return target
  },
  obj2str: function (o) {
    if (!o) {
      return 'false'
    }
    let r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
      if (!o.sort) {
        for (var i in o)
          r.push(i + ":" + this.obj2str(o[i]));
        if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
          r.push("toString:" + o.toString.toString());
        }
        r = "{" + r.join() + "}"
      } else {
        for (let i = 0; i < o.length; i++)
          r.push(this.obj2str(o[i]))
        r = "[" + r.join() + "]"
      }
      return r;
    }
    return o.toString();
  },
  adaptationDv: function () {
    const dVNjXY = document.querySelector('.sc-dVNjXY ')
    const nw = parseInt(dVNjXY.style.width)
    const nh = parseInt(dVNjXY.style.height)
    const w = window.innerWidth;
    const h = window.innerHeight;
    let left, top, scale;
    if (w / h > nw / nh) {
      scale = h / nh;
      top = 0;
      left = (w - nw * scale) / 2;
    } else {
      scale = w / nw;
      left = 0;
      top = (h - nh * scale) / 2;
    }
    dVNjXY.setAttribute('style', `transform:scale(${scale});left:${left}px;top:${top}px;width:${nw}px;height:${nh}px`);
  }
}