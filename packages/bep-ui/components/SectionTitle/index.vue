<template>
  <div :class="rootCls">
    <span class="section-title__bar" :style="styles"></span>
    <span><slot /></span>
  </div>
</template>
<script lang="ts" setup>
  import { classnames } from 'biz-gadgets'
  import { computed } from 'vue'
  const props = defineProps({
    rootClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  })
  const rootCls = computed(() => classnames('section-title', props.rootClass))
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
      margin-right: 10px;
      background-color: var(--primary-color);
    }
  }
</style>
