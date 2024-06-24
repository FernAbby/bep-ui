<template>
  <div class="input-card input-card-download">
    <h4>下载省市区数据</h4>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text">省市区</span></div>
      <select v-model="downloadChoices.level">
        <option v-for="item in levels" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </div>
    <div class="module">
      <h4>文件组织方式</h4>
      <div class="choice-group">
        <div v-for="item in organizeMethods" :key="item.value" class="choice-item">
          <input v-model="downloadChoices.organize" type="radio" :value="item.value" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="module">
      <h4>文件命名方式</h4>
      <div class="choice-group">
        <div v-for="item in namedMethods" :key="item.value" class="choice-item">
          <input v-model="downloadChoices.named" type="radio" :value="item.value" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <button class="download-button">下载省市区 JSON 数据</button>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'

  const levels = [
    {
      value: '1',
      label: '省份'
    },
    {
      value: '2',
      label: '城市'
    },
    {
      value: '3',
      label: '地区'
    }
    // {
    //   value: '4',
    //   label: '街道'
    // }
  ]
  const namedMethods = [
    {
      value: 'code',
      label: '按地域行政编码命名'
    },
    {
      value: 'name',
      label: '按地域名称命名'
    }
  ]
  const organizeMethods = [
    {
      value: 'single',
      label: '单文件'
    },
    {
      value: 'multiple',
      label: '多文件'
    }
  ]

  const districtTree = []
  const downloadChoices = reactive({
    level: '3',
    named: 'code',
    organize: 'single'
  })
</script>
<style lang="scss" scoped>
  .input-card-download {
    top: 22rem !important;
    left: 18rem !important;
    right: unset !important;
    bottom: unset !important;

    select {
      font-size: 1rem;
      color: #495057;
    }

    @mixin fontFamily {
      font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
    }

    @mixin fontStyle {
      @include fontFamily;
      line-height: 1.5;
      font-weight: 300;
      color: #111213;
    }

    .module {
      padding-top: 10px;

      h4 {
        font-size: 12px;
      }
    }

    .choice-group {
      text-rendering: optimizeLegibility;
      color: var(--color-text);
      font-size: 13px;
      font-weight: 300;

      .choice-item {
        display: flex;
        align-items: center;
        height: 24px;

        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(44, 62, 80, 0.7);
          // @include fontStyle;
        }
      }
    }

    .download-button {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      background-color: #e9ecef;
      color: #495057;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
      margin-top: 10px;

      @include fontStyle;
    }
  }
</style>
