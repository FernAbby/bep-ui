<template>
  <div class="map-page-container">
    <div id="container"></div>
    <div class="input-card">
      <h4>下属行政区查询</h4>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">省市区</span></div>
        <select id="province" v-model="formData.province" @change="handleSelect('province')">
          <option disabled value>--请选择--</option>
          <option v-for="item in provinceList" :key="item.code" :value="item.code">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">地级市</span></div>
        <select id="city" v-model="formData.city" @change="handleSelect('city')">
          <option v-for="item in cityList" :key="item.code" :value="item.code">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">区县</span></div>
        <select id="district" v-model="formData.district" @change="handleSelect('district')">
          <option v-for="item in districtList" :key="item.code" :value="item.code">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">街道</span></div>
        <select id="street" v-model="formData.street" @change="handleSelect('street')">
          <option v-for="item in streetList" :key="item.code" :value="item.code">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="input-card input-card-download">
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">省市区</span></div>
        <select v-model="downloadChoices.level">
          <option v-for="item in Levels" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <h4>文件命名方式</h4>
      <div class="choice-group">
        <div v-for="item in namedMethods" :key="item.value" class="choice-item">
          <input v-model="downloadChoices.named" type="radio" :value="item.value" />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <h4>文件组织方式</h4>
      <div class="choice-group">
        <div v-for="item in organizeMethods" :key="item.value" class="choice-item">
          <input v-model="downloadChoices.organize" type="radio" :value="item.value" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue'
  import {
    createMap,
    fetchCityList,
    fetchDistrictList,
    fetchProvinceList,
    fetchStreetList,
    type ISearchLevel
  } from './utils'

  const Levels = [
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

  const provinceList = ref([])
  const cityList = ref([])
  const districtList = ref([])
  const streetList = ref([])
  const districtTree = []
  const formData = reactive({
    province: '',
    city: '',
    district: '',
    street: ''
  })

  const downloadChoices = reactive({
    level: '3',
    named: 'code',
    organize: 'single'
  })

  onMounted(() => {
    createMap()
    // fetchProvinceList().then((result) => {
    //   provinceList.value = result
    // })
    // fetchDistrictTree().then((results) => {
    //   console.log('results===>', results)
    // })
  })

  const handleSelect = (level: ISearchLevel) => {
    if (!formData[level]) {
      if (level === 'province') {
        formData.province = ''
        formData.city = ''
        formData.district = ''
        formData.street = ''
        cityList.value = []
        districtList.value = []
        streetList.value = []
        return
      }
      if (level === 'city') {
        formData.district = ''
        formData.street = ''
        districtList.value = []
        streetList.value = []
        return
      }
      if (level === 'district') {
        formData.street = ''
        streetList.value = []
        return
      }
    }
    if (level === 'province') {
      fetchCityList(formData[level]).then((result) => {
        cityList.value = result
      })
    } else if (level === 'city') {
      fetchDistrictList(formData[level]).then((result) => {
        console.log('district===>', result)
        districtList.value = result
      })
    } else {
      fetchStreetList(formData[level]).then((result) => {
        console.log('street===>', result)
        streetList.value = result
      })
    }
  }
</script>
<style scoped>
  .map-page-container {
    width: 100%;
    min-height: 200px;
    height: 100%;
    position: relative;

    #container {
      width: 100%;
      height: 100%;
    }

    .input-card {
      top: 5rem;
      bottom: unset;
    }

    .input-card-download {
      top: 25rem;
      bottom: unset;

      .choice-group {
        text-rendering: optimizeLegibility;
        color: var(--color-text);
        font-size: 13px;
        font-weight: 300;
        margin-bottom: 10px;

        .choice-item {
          display: flex;
          align-items: center;
          height: 24px;

          * {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
              Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
              'Noto Color Emoji';
            line-height: 1.5;
            font-weight: 300;
            color: #111213;
          }
        }
      }
    }

    select {
      font-size: 1rem;
      color: #495057;
    }
  }
</style>
