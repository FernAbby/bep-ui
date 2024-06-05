<template>
  <div class="standard-page-layout">
    <div class="standard-page-layout__nav">
      <template v-for="item in menuList" :key="item.path">
        <RouterLink :to="item.path">{{ item.title }}</RouterLink>
      </template>
    </div>
    <div class="standard-page-layout__content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  const menuList = [
    {
      title: '概览',
      path: '/examples/guide'
    },
    {
      title: '表单',
      path: '/examples/form'
    },
    {
      title: '下载',
      path: '/examples/download'
    }
  ]
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