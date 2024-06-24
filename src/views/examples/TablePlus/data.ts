import { uuidv4 } from '@gadgets/uid'

export const generateDataSource = (length = 50) => {
  return new Array(length).fill(0, 0).map((item, index) => {
    return {
      id: uuidv4(),
      name: `张三 ${index + 1}`,
      sex: index % 2 === 0 ? '男' : '女',
      mobile: '18888888888',
      class: '3年级2班',
      address: '成都市高新区天府二街世豪广场'
    }
  })
}

export const getDataSource = (length = 50) => {
  return Promise.resolve(generateDataSource(length))
}
