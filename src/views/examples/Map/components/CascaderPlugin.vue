<template>
  <div class="input-card">
    <h4>下属行政区查询</h4>
    <div v-for="level in levels" :key="level" class="input-item">
      <div class="input-item-prepend">
        <span class="input-item-text">{{ levelOptions[level] }}</span>
      </div>
      <select :id="level" v-model="formData[level]" @change="handleSelect(level)">
        <option v-if="level === 'province'" disabled value>--请选择--</option>
        <option v-for="item in provinceList" :key="item.code" :value="item.code">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { fetchCityList, fetchDistrictList, fetchStreetList } from '@/views/examples/map/utils'
  import type { IDistrictItem, ISearchLevel } from '@/views/examples/map/utils'

  const levelOptions = {
    province: '省市区',
    city: '地级市',
    district: '区县',
    street: '街道'
  }
  const levels = Object.keys(levelOptions) as (keyof typeof levelOptions)[]

  const provinceList = ref<IDistrictItem[]>([])
  const cityList = ref([])
  const districtList = ref([])
  const streetList = ref([])
  const formData = reactive<Record<string, any>>({
    province: '',
    city: '',
    district: '',
    street: ''
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
<style lang="scss" scoped>
  .input-card {
    top: 5rem !important;
    left: 18rem !important;
    right: unset !important;
    bottom: unset !important;
  }

  select {
    font-size: 1rem;
    color: #495057;
  }
</style>
