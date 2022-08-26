## 参赛者

杨芝

## 参赛作品

- 水位图
- 滚动排名柱状图
- 滚动表格

整体效果一览

![all](https://cdn.nlark.com/yuque/0/2022/gif/138070/1648567616216-b821c478-b065-445c-9fd3-03469293c23d.gif)

## 开发与使用

本作品为标准图表插件，在源码和服务中都可以直接引入

### 1. 开发

将 `y-scrollRankBar.js`、`y-scrollTable.js`、`y-waterLineChart.js` 文件拷贝到源码的 `public/custom-chart-plugins` 路径下即可

### 2. 在 datart 服务中使用

将 `y-scrollRankBar.js`、`y-scrollTable.js`、`y-waterLineChart.js` 文件拷贝到 datart 服务的 `static/custom-chart-plugins` 路径下即可直接使用

### 3. 使用说明

**水位图**

![1-1](https://cdn.nlark.com/yuque/0/2022/gif/138070/1648365829943-2723cd3e-51b4-4548-97cd-4bc8bbe1962d.gif)

![1-2](https://cdn.nlark.com/yuque/0/2022/png/138070/1648564323239-10b5246f-1b01-478c-b562-35bf0048b8c1.png)

这个有像官方的 翻牌器的功能， 或者其他平台的 指标卡。

非常明显的 显示一个 指标。很适合展示 一个百分比的 图形展示。比如当前 cup 使用率。 内存的使用率 ，或者产品良品率，损坏率等。

它有很多的配置项

图形形状

- 圆形
- 方形
- 圆角方形

水波颜色，和透明度。  
还可以 根据得到数值显示不同的颜色，例如显示当前的电池电量我们可以这样配

较大值 80，较小值 30  
较大值颜色 绿色，较小值颜色 红色， 中间值颜色 黄色

value >=80 呈现绿色。  
80 > value >30 呈现黄色  
30 > value 呈现红色

{value}% 可以配置他的单位

**滚动排名柱状图**

![2-1](https://cdn.nlark.com/yuque/0/2022/gif/138070/1648566593572-759c8dec-3619-462f-80d0-acc2718568c7.gif)

![2-2](https://cdn.nlark.com/yuque/0/2022/png/138070/1648565735590-07ce76d8-29fa-435f-acbf-d98d9e05fb57.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0)

这个图表可以对 获取到的数据进行排名 并且滚动显示

数据要求 维度数量 1，指标数量 1

滚动速度可以配置 例如 1000ms

当前页显示的条数可以设置 例如 显示 10 行

图标的 条形图颜色， 和项目数据文字颜色 也可以配置。

**滚动表格**

![3-1](https://cdn.nlark.com/yuque/0/2022/gif/138070/1648650560139-fb1fe82c-98b3-43d3-aadc-6cbb24c9e61d.gif)

![3-2](https://cdn.nlark.com/yuque/0/2022/png/138070/1648649748685-f779da7d-760f-4f9f-9158-c9aaa804dc9b.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0)

| 属性         | 说明         | 类型          | 可选值             | 默认值    |
| ------------ | ------------ | ------------- | ------------------ | --------- |
| header       | 表头数据     | Array<String> | ---                | []        |
| data         | 表数据       | Array<Array>  | ---                | []        |
| rowNum       | 表行数       | Number        | ---                | 5         |
| headerBGC    | 表头背景色   | String        | ---                | '#00BAFF' |
| oddRowBGC    | 奇数行背景色 | String        | ---                | '#003B51' |
| evenRowBGC   | 偶数行背景色 | String        | ---                | #0A2732   |
| waitTime     | 轮播时间间隔 | (ms) Number   | ---                | 2000      |
| headerHeight | 表头高度     | Number        | ---                | 35        |
| columnWidth  | 列宽度       | Array<Number> | [1]                | []        |
| align        | 列对齐方式   | Array<String> | [2]                | []        |
| index        | 显示行号     | Boolean       | true \| false      | false     |
| indexHeader  | 行号表头     | String        | -                  | '#'       |
| carousel     | 轮播方式     | String        | 'single' \| 'page' | 'single'  |
| hoverPause   | 悬浮暂停轮播 | Boolean       | ---                | true      |
