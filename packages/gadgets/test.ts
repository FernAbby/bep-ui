const obj = { name: 'abby', career: 'it' }
Object.defineProperty(obj, 'age', {
  value: 'forever 18',
  enumerable: false
})
Object.prototype.protoProp1 = function () {
  console.log('proto')
}
Object.prototype.protoProp2 = 2

console.log('For In : ')
for (const a in obj) console.log(a)
