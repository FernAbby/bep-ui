<template>
  <div :class="rootCls">
    <span class="section-title__bar" :style="styles"></span>
    <span class="section-title__text"><slot>标题</slot></span>
  </div>
</template>
<script lang="ts" setup>
  import { classnames } from 'biz-gadgets'
  import { computed } from 'vue'
  import { ComponentSize } from 'element-plus'
  const props = defineProps({
    rootClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String as () => ComponentSize,
      default: 'small'
    }
  })
  const rootCls = computed(() =>
    classnames('section-title', props.rootClass, {
      [`section-title__${props.size}`]: Boolean(props.size)
    })
  )
  const styles = computed(() => {
    if (props.color) {
      return `background-color: ${props.color}`
    }
    return ''
  })
</script>
<style lang="scss">
  .section-title {
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 18px;
    margin-top: 10px;

    .section-title__bar {
      display: inline-block;
      width: 4px;
      height: 1em;
      margin-right: 8px;
      background-color: var(--el-color-primary);
    }

    .section-title__text {
      font-weight: 500;
      color: var(--el-text-color-regular);
    }
  }
  .section-title__large {
    font-size: 16px;

    .section-title__bar {
      width: 5px;
      height: 1em;
      margin-right: 10px;
    }
  }
</style>
