<template>
  <div class="section-title" v-bind="renderOptions">
    <span class="section-title__bar"></span>
    <span>{{ field.title }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { rendererProps } from '../../constants/rendererProps'
  const props = defineProps(rendererProps)
  const renderOptions = computed(() => {
    return props.field.renderOptions || {}
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
