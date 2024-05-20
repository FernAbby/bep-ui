<template>
  <div class="page-layout">
    <div class="page-layout_header">
      <div class="page-layout_header__title">
        <img class="page-layout_header__title-logo" alt="Vue logo" src="@/assets/logo.svg" />
        <span class="page-layout_header__title-text">BepUI</span>
      </div>
      <RouterLink class="nav-link" to="/">首页</RouterLink>
      <RouterLink class="nav-link" to="/examples">示例</RouterLink>
    </div>
    <div class="page-layout_content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { RouterView } from 'vue-router'
</script>
<style lang="scss">
  .page-layout {
    width: 100vw;
    height: 100vh;

    .page-layout_header {
      height: 40px;
      padding: 0 30px 0 20px;
      line-height: 34px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: 1px solid var(--color-border);

      .page-layout_header__title {
        flex: 1;
        display: flex;
        align-items: center;

        .page-layout_header__title-logo {
          width: 28px;
          height: 28px;
        }

        .page-layout_header__title-text {
          font-size: 24px;
          padding: 0 8px;
          font-weight: bold;
          display: inline-block;
        }
      }
    }

    .nav-link {
      color: hsla(160, 100%, 37%, 1);
      transition: 0.4s;
      padding: 3px 8px;
    }
  }
</style>