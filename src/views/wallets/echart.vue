<template>
  <div ref="chartRef" style="width: 100%; height: 90%"></div>
</template>
  
  <script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useRoute } from "vue-router";
import { authorizationDetails } from "@/api/wallets";
import router from "@/router";
import { ElMessage } from "element-plus";

const route = useRoute();

let address = "";
const query = route.query.address;
if (query !== undefined) {
  // 路由参数中有地址
  address = query as string;
} else {
  ElMessage.error("請先選擇地址");
  router.push({ path: "/wallet" });
}

// 创建一个 ref 来引用图表的 DOM 容器
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const Details = async () => {
  if (address) {
    const res = await authorizationDetails(address);
    console.log("res", res.data.json);
    const xData = res.data.json.timeline.map((time: string | number | Date) => {
      const date = new Date(time);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    });
    console.log("xData", xData.length);
    const usdtBalance = res.data.json.authorized_amounts;
    const usdtAuthorized = res.data.json.balances;
    // 初始化图表
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value);
      chartInstance.setOption({
        title: {
          text: "",
        },
        xAxis: {
          type: "category",
          data: xData, // X轴数据：授权时间
          boundaryGap: false,
          axisLine: {
            onZero: true, // X 轴的线会与 Y 轴的 0 刻度线对齐
          },
          axisTick: {
            show: false, // 不显示轴上的刻度
            alignWithLabel: true, // 使刻度线和标签对齐
          },
          axisLabel: {
            // interval: 0, // 强制显示所有标签
            // rotate: 45, // 旋转标签，避免重叠
            fontSize: 10, // 可调整字体大小
          },
        },
        yAxis: {
          type: "value",
          name: "", // Y轴名称
          axisLine: {
            show: true, // 显示轴线
          },
          splitLine: {
            show: false, // 显示网格线
          },
        },
        legend: {
          data: ["授權數額", "錢包餘額"],
        },
        series: [
          {
            name: "授權數額",
            type: "line",
            data: usdtAuthorized, // 授权额度数据
            smooth: true, // 线条平滑
            itemStyle: {
              color: "#404b7c", // 线条颜色
            },
          },
          {
            name: "錢包餘額",
            type: "line",
            data: usdtBalance, // 余额数据
            smooth: true,
            itemStyle: {
              color: "#005efe",
            },
          },
        ],
      });
    }
  }
};
// 挂载和销毁生命周期钩子
onMounted(() => {
  Details();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose();
});

// 监听窗口调整大小
const resizeChart = () => {
  chartInstance?.resize();
};
</script>
  
  <style scoped>
/* 添加样式，确保图表的容器有宽高 */
</style>
  