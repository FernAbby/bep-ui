<template>
  <div class="standard-page-layout">
    <div class="standard-page-layout__nav">
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children?.length">
          <RouterLink :to="item.path">{{ item.title }}</RouterLink>
        </template>
        <template v-else>
          <a class="catalog-item">
            <span>{{ item.title }}</span>
            <el-icon :size="14"><ArrowDown /></el-icon>
          </a>
          <template v-for="subItem in item.children" :key="subItem.path">
            <div class="sub-nav">
              <RouterLink :to="subItem.path">{{ subItem.title }}</RouterLink>
            </div>
          </template>
        </template>
      </template>
    </div>
    <div class="standard-page-layout__content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ArrowDown } from '@element-plus/icons-vue'
  import { RouterView } from 'vue-router'
  const menuList = [
    {
      title: '概览',
      path: '/examples/guide'
    },
    {
      title: '表单',
      path: '/examples/form',
      children: [
        {
          title: '基础单表',
          path: '/examples/form/base'
        },
        {
          title: '嵌套表单',
          path: '/examples/form/complex'
        }
      ]
    },
    {
      title: '表格',
      path: '/examples/table',
      children: [
        {
          title: '基础表格',
          path: '/examples/table/base'
        },
        {
          title: '数据表格',
          path: '/examples/table/data'
        }
      ]
    },
    {
      title: '地图',
      path: '/examples/map',
      children: [
        {
          title: '省市区级联数据',
          path: '/examples/map/area-json'
        }
      ]
    },
    {
      title: '下载',
      path: '/examples/download'
    },
    {
      title: '自定义钩子',
      path: '/examples/hooks'
    },
    {
      title: '调试',
      path: '/examples/devtool'
    }
  ]
</script>
<style lang="scss">
  @mixin router-link {
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
  .standard-page-layout {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;

    .standard-page-layout__nav {
      width: 200px;
      height: calc(100vh - 46px);
      padding: 12px;
      border-right: 1px solid var(--color-border);

      .catalog-item {
        display: flex;
        align-items: center;
        padding-right: 0;

        span {
          display: inline-block;
          flex: 1;
          width: 0;
        }
      }

      .sub-nav {
        margin-left: 20px;

        @include router-link;
      }

      @include router-link;
    }

    .standard-page-layout__content {
      flex: 1;
      width: 0;
      padding: 12px;
      overflow-y: auto;
    }
  }
</style>
