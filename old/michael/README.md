## 参赛者

michael

## 参赛作品

- 折线区域图
- 箱线图
- 子弹图
- 轮播条形图
- 分组表
- 多维条形图
- 可下钻地图
- 多维柱状图
- 扩展组件路径图
- 世界地图
- 热力图
- 水球图
- 带背景色的柱状图
- 立体柱状图
- 极坐标条形图
- 进度条
- 基础雷达图
- 轨迹图
- 半圆玫瑰图
- 旭日图
- 矩形树图
- 左右对比条形图

## 开发与使用

本作品对源码做了二次开发，需要按照以下说明进行开发和使用

### 1. 开发

- 需要在 `package.json` 中加入以下依赖项

  ```json
  {
    "echarts-liquidfill": "^3.1.0"
  }
  ```

- 将 `michaelCharts` 目录拷贝到 `frontend/src/app/components/ChartGraph` 路径下
- 将 `PluginChartLoader.ts` 替换 `frontend/src/app/models/PluginChartLoader.ts` 文件
- `npm install`
- `npm start`

### 2. 在 datart 服务中使用

正常打包前端工程即可
