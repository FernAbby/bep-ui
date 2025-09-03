import { onUnmounted, ref, watch, WatchStopHandle } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IFormPlusProps, IFormPlusRef } from '../types'

function useFormPlus(formPlusProps: IFormPlusProps) {
  const formPlusRef = ref<IFormPlusRef>()
  const elFormRef = ref<FormInstance>(null)
  let stopWatcher: WatchStopHandle

  function register(formPlusInstance: IFormPlusRef, formInstance: FormInstance) {
    onUnmounted(() => {
      formPlusRef.value = null
    })

    if (formPlusInstance === formPlusRef.value) return

    formPlusRef.value = formPlusInstance
    elFormRef.value = formInstance

    if (formPlusProps) {
      console.log('formPlusProps ===>', formPlusProps)
      // formPlusInstance.setProps(formPlusProps)
    }

    stopWatcher?.()

    stopWatcher = watch(
      () => formPlusProps,
      () => {
        if (formPlusProps) {
          // formPlusInstance.setProps(formPlusProps)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  return { register, formPlusRef, elFormRef }
}

export default useFormPlus
