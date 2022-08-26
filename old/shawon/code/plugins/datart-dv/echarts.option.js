export default {
  line: {
    name: '折线图',
    option: {
      title: {
        text: '折线图',
        left: 'center',
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '8%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#eee'
          },
          show: true
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#eee'
          },
          show: true
        },
        splitLine: {
          show: false
        },
      },
      series: [
        {
          type: 'line',
          smooth: true
        }
      ]
    }
  },
  bar: {
    name: '柱状图',
    option: {
      title: {
        text: '柱状图',
        left: 'center',
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '8%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#eee'
          },
          show: true
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#eee'
          },
          show: true
        },
        splitLine: {
          show: false
        },
      },
      series: [
        {
          itemStyle: {
            color: {
              x: 0, y: 0, x2: 0, y2: 1,
              type: 'linear',
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: '#00BFFF',
                },
                {
                  offset: 1,
                  color: '#54FF9F',
                },
              ],
            },
          },
        }
      ]
    }
  },
  pie: {
    name: '饼图',
    option: {
      title: {
        text: '饼图',
        show: false
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: []
        }
      ]
    }
  },
  scatter: {
    name: '散点图',
    option: {
      title: {
        text: '散点图',
        left: 'center',
        show: false
      },
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [],
          type: 'scatter'
        }
      ]
    }
  },
  radar: {
    name: '雷达图',
    option: {
      title: {
        text: '雷达图',
        show: false
      },
      legend: {
        show: false
      },
      radar: {
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: []
        }
      ]
    }
  },
  gauge: {
    name: '仪表盘',
    option: {
      title: {
        text: '仪表盘',
        show: false
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            formatter: '{value}'
          },
          data: []
        }
      ]
    }
  },
  map: {
    name: '地图',
    option: {
      title: {
        text: '地图',
        show: false
      },
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
      series: []
    },
    plugins: 'https://oss.yzcstatic.com/static/datart/plugins/geoChina.js,https://oss.yzcstatic.com/static/datart/plugins/myMapSeries.js'
  },
  funnel: {
    name: '漏斗图',
    option: {
      title: {
        text: '漏斗图',
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      legend: {
        show: false
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: []
        }
      ]
    }
  },
  liquidFill: {
    name: '水球图',
    option: {
      title: {
        text: '水球图',
        show: false
      },
      legend: {
        show: false
      },
      graphic: [{
        type: 'group',
        left: 'center',
        top: '25%',
        children: [{
          type: 'text',
          z: 100,
          left: '40',
          top: 'middle',
          style: {
            fill: '#aab2fa',
            text: '统计标题',
            font: '30px Microsoft YaHei'
          }
        }]
      }],
      series: [
        {
          type: 'liquidFill',
          radius: '98%',
          center: ['50%', '50%'],
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#446bf5',
                },
                {
                  offset: 1,
                  color: '#2ca3e2',
                },
              ],
              globalCoord: false,
            },
          ],
          data: [],
          backgroundStyle: {
            borderWidth: 1,
            color: 'RGBA(51, 66, 127, 0.7)',
          },
          label: {
            color: '#fff'
          },
          outline: {
            show: false,
            borderDistance: 10,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#112165',
            },
          },
        },
      ],
    },
    plugins: 'https://oss.yzcstatic.com/static/datart/plugins/echarts-liquidfill.min.js'
  },
  progressPoll: {
    name: '进度池',
    option: {
      title: {
        text: '进度池',
        show: false
      },
      backgroundColor: '#071347',
      xAxis: [
        {
          show: false,
        }
      ],
      yAxis: [
        {
          axisTick: 'none',
          axisLine: 'none',
          offset: '2',
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '14',
            }
          },
          data: []
        },
        {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '14',
            }
          },
          data: []
        },
        {
          nameTextStyle: {
            color: '#fff',
            fontSize: '14',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [],
        }
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [],
          label: {
            normal: {
              show: false,
              position: 'right',
              textStyle: {
                color: '#fff',
                fontSize: '12',
              }
            }
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 8,
              color: function (params) {
                var num = myColor.length;
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
                      color: myColor[params.dataIndex % num],
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
          symbolSize: [2, 4],
          data: [],
          itemStyle: {
            normal: {
              barBorderRadius: 50,
              borderColor: '#E2F2FF',
              color: '#E2F2FF',
            }
          },
          z: 2
        },
        {
          name: '外框',
          type: 'bar',
          yAxisIndex: 2,
          data: [],
          barWidth: 12,
          itemStyle: {
            normal: {
              barBorderRadius: 8,
              color: 'rgba(255,255,255,0.2)'
            }
          },
          z: 0
        },

      ]
    }
  },
  thermometer: {
    name: '温度计',
    option: `
    var warnTp=20;
    var option={
      backgroundColor: '#0C2F6F',
      title: {
        text: '温度计',
        show: false
      },
      yAxis: [{
        show: false,
        data: [],
        min: 0,
        max: 135,
        axisLine: {
          show: false
        }
      }, {
        show: false,
        min: 0,
        max: 50,
      }, {
        type: 'category',
        data: ['', '', '', '', '', '', '', '', '', '', '°C'],
        position: 'left',
        offset: -80,
        axisLabel: {
          fontSize: 10,
          color: 'white'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
      }],
      series: [{
        name: '条',
        type: 'bar',
        xAxisIndex: 0,
        data: [{
          label: {
            normal: {
              show: true,
              width: 200,
              height: 100,
              rich: {
                back: {
                  align: 'center',
                  lineHeight: 50,
                  fontSize: 40,
                  fontFamily: 'digifacewide',
                },
                unit: {
                  fontFamily: '微软雅黑',
                  fontSize: 15,
                  lineHeight: 50,
                },
                downTxt: {
                  lineHeight: 50,
                  fontSize: 25,
                  align: 'center',
                  color: '#fff'
                }
              }
            }
          }
        }],
        barWidth: 18,
        itemStyle: {
        },
        z: 2
      }, {
        name: '白框',
        type: 'bar',
        xAxisIndex: 1,
        barGap: '-100%',
        data: [134],
        barWidth: 28,
        itemStyle: {
          normal: {
            color: '#0C2E6D',
            barBorderRadius: 50,
          }
        },
        z: 1
      }, {
        name: '外框',
        type: 'bar',
        xAxisIndex: 2,
        barGap: '-100%',
        data: [135],
        barWidth: 38,
        itemStyle: {
          normal: {
            color: '#4577BA',
            barBorderRadius: 50,
          }
        },
        z: 0
      }, {
        name: '圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 0,
        symbolSize: 48,
        itemStyle: {
          normal: {
            color: '#93FE94',
            opacity: 1,
          }
        },
        z: 2
      }, {
        name: '白圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 1,
        symbolSize: 60,
        itemStyle: {
          normal: {
            color: '#0C2E6D',
            opacity: 1,
          }
        },
        z: 1
      }, {
        name: '外圆',
        type: 'scatter',
        hoverAnimation: false,
        data: [0],
        xAxisIndex: 2,
        symbolSize: 70,
        itemStyle: {
          normal: {
            color: '#4577BA',
            opacity: 1,
          }
        },
        z: 0
      }, {
        name: '刻度',
        type: 'bar',
        yAxisIndex: 0,
        xAxisIndex: 3,
        label: {
          normal: {
            show: true,
            position: 'left',
            distance: 10,
            color: 'white',
            fontSize: 14,
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
        barGap: '-100%',
        barWidth: 1,
        itemStyle: {
          normal: {
            color: 'white',
            barBorderRadius: 120,
          }
        },
        z: 0
      }]
    }`
  }
}