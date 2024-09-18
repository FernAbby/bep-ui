<template>
  <el-upload
    list-type="picture-card"
    accept=".jpeg,.png,.jpg"
    :headers="headers"
    :before-upload="handleBeforeUpload"
    v-bind="renderOptions"
    v-model:file-list="fileList"
    :disabled="disabled"
  >
  </el-upload>
  <el-image-viewer
    v-if="previewVisible"
    :url-list="imageList"
    :z-index="100"
    :hide-on-click-modal="true"
    :initial-index="currentIndex"
  />
</template>
<script lang="ts" setup>
  import { omit, propsToCamel } from 'biz-gadgets'
  import { ElMessage } from 'element-plus'
  import type { UploadUserFile, UploadRawFile } from 'element-plus'
  import { computed, ref } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'

  const headers = {
    authorization: localStorage.getItem('token') || undefined
  }

  defineOptions({
    inheritAttrs: false
  })
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(rendererProps)

  const previewVisible = ref(false)
  const currentIndex = ref(0)

  const fileList = computed({
    get: () => props.modelValue as UploadUserFile[] | undefined,
    set: (value) => {
      emits('update:modelValue', value)
    }
  })

  const imageList = computed(() => {
    const images: string[] = []
    fileList.value.forEach((item) => {
      const url = (item.response as { url: string })?.url
      if (url) {
        images.push(url)
      }
    })
    return images
  })

  const renderProps = computed(() => {
    if (props.field.renderOptions) {
      return propsToCamel(props.field.renderOptions)
    }
    return {}
  })

  const renderOptions = computed(() => omit(renderProps.value, ['limitSize']))

  const limitSize = computed(() => {
    return renderProps.value['limitSize'] || 2
  })

  const handleBeforeUpload = async (rawFile: UploadRawFile) => {
    if (rawFile.size / 1024 / 1024 > limitSize.value) {
      ElMessage.error(`图片大小超出${limitSize.value}MB!`)
      return false
    }
    return true
  }
</script>
