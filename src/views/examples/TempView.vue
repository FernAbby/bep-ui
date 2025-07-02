<template>
  <div class="container">
    <button @click="copyToClipboard('click点击测试复制')">点击测试</button>
    <br />
    <br />
    <br />
    <!-- <div @click="testLongPress($event)">测试长按</div> -->
    <button id="button" @touchend="handleTouchEnd">长按测试</button>
    <br />
    <br />
    <div>长按时长：{{ duration }} 秒</div>
    <br />
    <form>
      <textarea v-model="value" rows="8" style="width: 300px" />
      <textarea id="copyContent" />
    </form>
  </div>
</template>
<script>
  import useClipboard from 'vue-clipboard3'
  let startTime
  let copyedContent = ''
  const events = []
  const { toClipboard } = useClipboard()
  export default {
    name: 'Test',
    data() {
      return {
        value: '',
        duration: 0
      }
    },
    onMounted() {},
    methods: {
      longPress(element, callback, options = {}) {
        const config = {
          duration: 700,
          preventDefault: true,
          stopPropagation: false,
          vibrate: 0, // 设置为0禁用振动
          ...options
        }

        let pressTimer = null
        let isLongPress = false
        let startTime = 0
        let startX = 0
        let startY = 0
        let vibrationRequested = false

        // 处理振动（仅在用户手势中同步调用）
        const triggerVibration = () => {
          if (config.vibrate > 0 && 'vibrate' in navigator) {
            try {
              // 必须在用户手势事件中同步调用
              navigator.vibrate(config.vibrate)
            } catch (e) {
              console.warn('Vibration failed:', e)
            }
          }
        }

        // 开始计时
        const handleStart = (e) => {
          // 获取初始触摸位置
          if (e.touches) {
            startX = e.touches[0].clientX
            startY = e.touches[0].clientY
          }

          if (config.preventDefault && e.cancelable) {
            e.preventDefault()
          }
          if (config.stopPropagation) {
            e.stopPropagation()
          }

          isLongPress = false
          startTime = Date.now()
          vibrationRequested = false

          if (typeof config.start === 'function') {
            config.start(e)
          }

          pressTimer = setTimeout(() => {
            isLongPress = true

            // 标记需要振动（但还不能立即执行）
            vibrationRequested = true

            callback(e)
          }, config.duration)
        }

        // 处理移动事件
        const handleMove = (e) => {
          if (!e.touches || !pressTimer) return

          const currentX = e.touches[0].clientX
          const currentY = e.touches[0].clientY
          const diffX = Math.abs(currentX - startX)
          const diffY = Math.abs(currentY - startY)

          if (diffX > 10 || diffY > 10) {
            clearTimeout(pressTimer)
            pressTimer = null
            isLongPress = false
            vibrationRequested = false

            if (typeof config.cancel === 'function') {
              config.cancel(e, { duration: Date.now() - startTime })
            }
          }
        }

        // 结束处理（在这里触发振动）
        const handleEnd = (e) => {
          const endTime = Date.now()
          const duration = endTime - startTime

          if (pressTimer) {
            clearTimeout(pressTimer)
            pressTimer = null
          }

          // 如果长按成功且需要振动
          if (isLongPress && vibrationRequested) {
            triggerVibration()
          }

          if (typeof config.end === 'function') {
            config.end(e, { duration, isLongPress })
          }

          if (!isLongPress && typeof config.cancel === 'function') {
            config.cancel(e, { duration })
          }

          if (isLongPress && e.cancelable) {
            if (config.preventDefault) e.preventDefault()
            if (config.stopPropagation) e.stopPropagation()
          }

          isLongPress = false
          vibrationRequested = false
        }

        // 添加事件监听
        const addListeners = () => {
          // 触摸事件
          element.addEventListener('touchstart', handleStart, { passive: false })
          element.addEventListener('touchend', handleEnd)
          element.addEventListener('touchcancel', handleEnd)
          element.addEventListener('touchmove', handleMove, { passive: true })

          // 鼠标事件
          element.addEventListener('mousedown', handleStart)
          element.addEventListener('mouseup', handleEnd)
          element.addEventListener('mouseleave', handleEnd)
        }

        // 移除事件监听
        const removeListeners = () => {
          element.removeEventListener('touchstart', handleStart)
          element.removeEventListener('touchend', handleEnd)
          element.removeEventListener('touchcancel', handleEnd)
          element.removeEventListener('touchmove', handleMove)

          element.removeEventListener('mousedown', handleStart)
          element.removeEventListener('mouseup', handleEnd)
          element.removeEventListener('mouseleave', handleEnd)

          if (pressTimer) {
            clearTimeout(pressTimer)
            pressTimer = null
          }
        }

        addListeners()

        return removeListeners
      },
      copyToClipboard(text = '在 touchend 里测试测试长按长按长按长按', type = 'end') {
        // 创建一个临时myEle元素
        // const myEle = document.createElement('textarea')
        const myEle = document.getElementById('copyContent')
        myEle.value = text // 初始为空
        myEle.contentEditable = 'true'
        myEle.readOnly = false

        // 使其不可见
        myEle.style.position = 'fixed'
        myEle.style.opacity = 0

        // 添加到DOM中
        document.body.appendChild(myEle)

        // 选中文本
        myEle.focus()
        myEle.select()
        myEle.setSelectionRange(0, myEle.value.length)
        // alert(document.getSelection())
        const success = document.execCommand('copy')
        if (success) {
          copyedContent = text
          alert(`${type} 复制成功`)
        } else {
          // if (type === 'end') {
          alert(`${type} 复制失败`)
          // }
        }
        // document.body.removeChild(myEle)
      },
      testLongPress(event) {
        const ele = event.target
        console.log(ele)
        // this.copyToClipboard('测试长按长按长按长按')
        this.longPress(ele, (e) => {
          console.log('触发长按方法', e)
          this.copyToClipboard('2222测试长按长按长按长按')
        })
      },
      handleClick(e) {
        events.push('click')
        this.copyToClipboard(undefined, 'click')
      },
      handleStartTouch(event) {
        events.push('start')
        event.preventDefault()
        startTime = performance.now()
        // this.copyToClipboard('在 touchend 里测试测试长按长按长按长按')
        console.log('startTime ---->', startTime)
        this.copyToClipboard(undefined, 'start')
      },
      handleTouchEnd(event) {
        event.preventDefault()
        events.push('end')
        // event.stopPropagation()
        const endTime = performance.now()
        console.log('duration ---->', (endTime - startTime) / 1000)
        this.duration = (endTime - startTime) / 1000
        // // 快速抬起手指成功复制（类似点击事件），长按会复制失败
        console.log('抬起')
        // if (this.duration ) {
        //
        // }
        toClipboard('在 touchend 里测试测试长按长按长按长按')
          .then((result) => {
            alert(JSON.stringify(result))
          })
          .catch((e) => {
            alert(e.message)
          })
        // this.copyToClipboard(undefined, 'end')
        // requestAnimationFrame(() => {
        //   const button = document.getElementById('button')
        //   // const clickEvent = new MouseEvent('click', {
        //   //   bubbles: true,
        //   //   cancelable: true
        //   // })
        //   // button.dispatchEvent(clickEvent)
        //   button.click()
        // })
      },
      moniCopy(type) {
        const button = document.createElement('button')
        button.style.width = 0
        button.style.height = 0
        button.addEventListener('click', (e) => {
          this.copyToClipboard('在 touchend 里测试测试长按长按长按长按', type)
        })
        button.click()
      },
      handleContent(e) {
        e.preventDefault()
      }
    }
  }
</script>
<style lang="scss">
  button {
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    user-select: none;
    -webkit-user-select: none;

    &:active {
      background: rgba(19, 213, 149, 0.3);
    }
  }
  .container {
    user-select: none;
    -webkit-user-select: none;
    padding: 50px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #copyContent {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  #trigger {
    width: 0;
    height: 0;
  }
</style>
