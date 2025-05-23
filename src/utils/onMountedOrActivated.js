// ==== onMountedOrActivated  hook====
import { nextTick, onMounted, onActivated } from 'vue'
export function onMountedOrActivated (hook) {
  let mounted
  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}