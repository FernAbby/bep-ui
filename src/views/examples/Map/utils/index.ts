// 不在script内引入地图的时候可以用mapLoader加载
export function mapLoader(): Promise<AMap> {
  if (!window._AMapSecurityConfig) {
    window._AMapSecurityConfig = {
      securityJsCode: '2914a0072cedd9c01c06e512b5c593a2'
    }
  }
  return AMapLoader.load({
    key: 'a9f5f443e5070d34c243ba444a8d1667', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.DistrictSearch'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
}

// 创建地图示例
export function createMap() {
  // 创建地图实例
  const map = new AMap.Map('container', {
    zoom: 13,
    center: [116.39, 39.92],
    resizeEnable: true
  })

  // 创建点覆盖物
  const marker = new AMap.Marker({
    position: new AMap.LngLat(116.39, 39.92),
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    offset: new AMap.Pixel(-13, -30)
  })
  map.add(marker)

  // 创建信息窗体
  const infoWindow = new AMap.InfoWindow({
    isCustom: true, // 使用自定义窗体
    content: '<div class="cus_info_window">HELLO,AMAP!</div>', // 信息窗体的内容可以是任意 html 片段
    offset: new AMap.Pixel(16, -45)
  })
  const onMarkerClick = function (e) {
    infoWindow.open(map, e.target.getPosition()) // 打开信息窗体
    // e.target 就是被点击的 Marker
  }

  marker.on('click', onMarkerClick) // 绑定 click 事件

  const lineArr = [
    [116.368904, 39.913423],
    [116.382122, 39.901176],
    [116.387271, 39.912501],
    [116.398258, 39.9046]
  ]
  const polyline = new AMap.Polyline({
    path: lineArr, // 设置线覆盖物路径
    strokeColor: '#3366FF', // 线颜色
    strokeWeight: 3, // 线宽
    strokeStyle: 'solid' // 线样式
  })
  map.add(polyline)
}

export type ISearchLevel = 'country' | 'province' | 'city' | 'district' | 'street'
export interface IDistrictItem {
  code: string
  name: string
  children?: IDistrictItem[]
}

export function formatDistrictData(data = []): IDistrictItem[] {
  return data
    .map((item) => ({
      code: item.adcode,
      name: item.name
    }))
    .sort((a, b) => a.code - b.code)
}

// 查询所有省份列表
export function fetchProvinceList(level = 1): Promise<IDistrictItem[]> {
  return new Promise((resolve) => {
    const districtSearch = new AMap.DistrictSearch({
      level: 'country', // 关键字对应的行政区级别，country 表示国家
      subdistrict: 1 // 显示下级行政区级数，1表示返回下一级行政区
      // extensions: 'all' // 返回行政区边界坐标组等具体信息
    })
    // 搜索所有省、直辖市信息
    districtSearch.search('中国', function (status, result) {
      // status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      // 查询成功时，result 即为对应的行政区信息
      if (status == 'complete') {
        const provinces = formatDistrictData(result.districtList[0].districtList)
        if (level > 1) {
          provinces.forEach(async (item) => {
            item.children = await fetchCityList(item.code, level)
          })
        }
        resolve(provinces)
      } else {
        console.error(status, result)
        resolve([])
      }
    })
  })
}

// 查询省份下城市列表
export function fetchCityList(provinceCode: string, level = 2): IDistrictItem[] {
  return new Promise((resolve) => {
    const districtSearch = new AMap.DistrictSearch({
      level: 'province', // 关键字对应的行政区级别，country 表示国家
      subdistrict: 1 // 显示下级行政区级数，1表示返回下一级行政区
      // extensions: 'all' // 返回行政区边界坐标组等具体信息
    })
    // 搜索所有省、直辖市信息
    districtSearch.search(provinceCode, function (status, result) {
      // status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      // 查询成功时，result 即为对应的行政区信息
      if (status == 'complete') {
        const cityList = formatDistrictData(result.districtList[0].districtList)
        if (level > 2) {
          cityList.forEach(async (item) => {
            item.children = await fetchDistrictList(item.code, level)
          })
        }
        resolve(cityList)
      } else {
        console.error(status, result)
        resolve([])
      }
    })
  })
}

// 获取城市区列表
export function fetchDistrictList(cityCode: string, level = 3): IDistrictItem[] {
  return new Promise((resolve) => {
    const districtSearch = new AMap.DistrictSearch({
      level: 'city', // 关键字对应的行政区级别，country 表示国家
      subdistrict: 1 // 显示下级行政区级数，1表示返回下一级行政区
      // extensions: 'all' // 返回行政区边界坐标组等具体信息
    })
    // 搜索所有省、直辖市信息
    districtSearch.search(cityCode, function (status, result) {
      // status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      // 查询成功时，result 即为对应的行政区信息
      if (status == 'complete') {
        const districtList = formatDistrictData(result.districtList[0].districtList)
        if (level > 3) {
          districtList.forEach(async (item) => {
            item.children = await fetchStreetList(item.code)
          })
        }
        resolve(districtList)
      } else {
        console.error(status, result)
        resolve([])
      }
    })
  })
}

// 获取街道信息
export function fetchStreetList(districtCode: string): IDistrictItem[] {
  return new Promise((resolve) => {
    const districtSearch = new AMap.DistrictSearch({
      level: 'district', // 关键字对应的行政区级别，country 表示国家
      subdistrict: 1 // 显示下级行政区级数，1表示返回下一级行政区
      // extensions: 'all' // 返回行政区边界坐标组等具体信息
    })
    // 搜索所有省、直辖市信息
    districtSearch.search(districtCode, function (status, result) {
      // status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
      // 查询成功时，result 即为对应的行政区信息
      if (status == 'complete') {
        console.log('fetchStreetList====>', result.districtList[0].districtList)
        resolve(
          result.districtList[0].districtList.map((item) => ({
            code: item.name,
            name: item.name
          }))
        )
      } else {
        console.error(status, result)
        resolve([])
      }
    })
  })
}
// 查询行政区树形结构列表
export function fetchDistrictTree(level = 3): Promise<IDistrictItem[]> {
  return fetchProvinceList(level)
}
