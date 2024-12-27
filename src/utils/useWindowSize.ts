import { ref, onMounted, onUnmounted } from 'vue';

// 封装组合式函数
export function useWindowSize() {
    const width = ref(window.innerWidth); // 当前窗口宽度
    const height = ref(window.innerHeight); // 当前窗口高度

    // 事件处理函数
    const updateSize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    onMounted(() => {
        window.addEventListener('resize', updateSize); // 添加监听器
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateSize); // 移除监听器
    });

    return { width, height };
}
