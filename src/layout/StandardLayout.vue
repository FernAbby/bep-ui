<template>
  <div class="standard-page-layout">
    <div class="standard-page-layout__nav">
      <RouterLink to="/examples/guide">概览</RouterLink>
      <RouterLink to="/examples/form">表单</RouterLink>
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
    box-sizing: border-box;

    .standard-page-layout__nav {
      width: 200px;
      height: calc(100vh - 46px);
      padding: 12px;
      border-right: 1px solid var(--color-border);

      > a {
        display: block;
        height: 34px;
        line-height: 34px;
        padding: 0 14px;
        font-size: 13px;
        border-radius: 4px;
        color: hsla(210, 4%, 40%, 1);
      }

      > a.router-link-active {
        color: hsla(160, 100%, 37%, 1);
        background-color: hsla(160, 100%, 37%, 0.18) !important;
      }

      > a:hover {
        color: hsla(160, 100%, 37%, 0.8);
        background-color: transparent;
      }
    }

    .standard-page-layout__content {
      flex: 1;
      width: 0;
      padding: 10px;
    }
  }
</style>