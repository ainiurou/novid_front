<script setup lang="ts">
import bg from '@/assets/2.png'
import { useNovidStore } from '@/stores'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import '@/assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'

const novidStore = useNovidStore()

// 初始化折线图
const initLine = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  charts.setOption({
    backgroundColor: '#223651',
    tooltip:{
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: novidStore.cityDetail.map((v) => {
        return v.city
      }),
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },

    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      }
    },
    series: [
      {
        data: novidStore.cityDetail.map((v) => {
          return v.nowConfirm
        }),
        label: {
          show: true,
        },
        type: 'line',
        smooth: true,
      },
    ],
  })
}

//初始化饼状图
const initPie = () => {
  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  const data = novidStore.cityDetail
  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold',
          },
        },
        data: data.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm,
          }
        }),
      },
    ],
  })
}

// 初始化地图加载
const initCharts = () => {
  const { areaTree, chinaAdd, chinaTotal } = novidStore.list.diseaseh5Shelf
  const city = areaTree[0].children
  novidStore.item = city[0].children
  const data = city.map((c) => {
    return {
      name: c.name,
      value: geoCoordMap[c.name].concat(c.total.nowConfirm),
      children: c.children,
    }
  })
  console.log(city)

  const charts = echarts.init(document.getElementById('china') as HTMLElement)

  charts.setOption({
    // backgroundColor: 'black',
    geo: {
      map: 'china',
      aspectScale: 0.8,
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      itemStyle: {
        //normal: {
        areaColor: {
          type: 'linear-gradient',
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#152E6E', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0673AD', // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: '#0f5d9d',
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        //},
      },
      emphasis: {
        areaColor: '#0f5d9d',
      },

      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)',
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: '#009cc9',
            },
            //},
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: 'map',
        // selectedMode: 'multiple',
        map: 'china',
        aspectScale: 0.8,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '100%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 10,
        },
        itemStyle: {
          //normal: {
          areaColor: '#0c3653',
          borderColor: '#1cccff',
          borderWidth: 1.8,
          //},
        },
        emphasis: {
          areaColor: '#56b1da',
          label: {
            show: true,
            color: '#fff',
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          //normal: {
          show: true,
          formatter: (value: any) => {
            return value.value[2]
          },

          //}
        },

        itemStyle: {
          //normal: {
          color: '#D8BC37', //标志颜色
          //}
        },
        data: data,
      },
    ],
  })
  charts.on('click', (e) => {
    novidStore.item  = e.data.children 
  })
}

onMounted(async () => {
  await novidStore.getlist()
  initCharts()
  initPie()
  initLine()
})
</script>

<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.localConfirmH5 }}</div>
          <div>
            {{ novidStore.chinaTotal.localConfirm }}
          </div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.nowConfirm }}</div>
          <div>
            {{ novidStore.chinaTotal.nowConfirm }}
          </div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.confirm }}</div>
          <div>
            {{ novidStore.chinaTotal.confirm }}
          </div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.noInfect }}</div>
          <div>
            {{ novidStore.chinaTotal.noInfect }}
          </div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.importedCase }}</div>
          <div>
            {{ novidStore.chinaTotal.importedCase }}
          </div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ novidStore.chinaAdd.dead }}</div>
          <div>
            {{ novidStore.chinaTotal.dead }}
          </div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div class="box-center" id="china"></div>
    <div class="box-right" style="color: white">
      <table border="1" cellspacing="0" class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <TransitionGroup enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="{ name, today, total } in novidStore.item" :key="name">
            <td align="center">{{ name }}</td>
            <td align="center">{{ today.confirm }}</td>
            <td align="center">{{ total.confirm }}</td>
            <td align="center">{{ total.heal }}</td>
            <td align="center">{{ total.dead }}</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<style lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  overflow: hidden;
  height: 100%;
}
.box {
  display: flex;
  height: 100%;
  &-left {
    width: 400px;
    margin: 5px 0 0 5px;
    &-pie {
      border-radius: 30px;
      height: 350px;
      margin-top: 10px;
    }
    &-line {
      height: 280px;
      margin-top: 6px;
    }
    &-card {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      section {
        background-color: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div:nth-child(2) {
          font-weight: bold;
          font-size: 20px;
          margin: 10px 0;
          color: @itemColor;
        }
      }
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}

.table {
  background-color: black;
  width: 100%;
  margin-top: 10px;
  tr {
    th {
      padding: 2px;
      white-space: nowrap;
    }
    td {
      padding: 2px 3px;
      width: 100%;
      white-space: nowrap;
    }
  }
}
</style>
