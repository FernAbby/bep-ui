<template>
  <div class="standard-page-layout">
    <div class="standard-page-layout__nav">
      <RouterLink to="/examples">概览</RouterLink>
      <RouterLink to="/examples/form-plus">表单</RouterLink>
    </div>
    <div class="standard-page-layout__content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>
<style lang="scss">
  .standard-page-layout {
    display: flex;

    .standard-page-layout__nav {
      width: 180px;
      height: 100vh;
      border-right: 1px solid var(--color-border);

      > a {
        display: block;
        height: 34px;
        line-height: 34px;
        padding: 0 14px;
        font-size: 13px;
      }
    }

    .standard-page-layout__content {
      flex: 1;
      width: 0;
      padding: 10px;
    }
  }
</style>