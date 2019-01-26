## Introduction

- 基于发布订阅模式的小程序页面通信机制，降低页面耦合度
- 类似 Vue 的 api

## Usage

### 引入模块

在 `app.js` 中引入该模块，将其实例挂在 `app` 下

``` javascript
//app.js
const WeEvent = require('./utils/we-event.js')

App({
    // ...
    event: new WeEvent(),
    // ...
})
```

### 发布事件

在页面中获取 `app` 对象，即拿到 `event` 事件对象
使用`emit` 派发事件

``` javascript
const app = getApp()

Page({
    // ...
    someMethod() {
        app.event.emit('some-event', arg)
    },
    // ...
})
```

### 订阅事件

使用 `on` 订阅事件，注意在 `onUnload` 中移除事件监听

``` javascript
const app = getApp()

Page({
    onLoad() {
        app.event.on('some-event', this.updateState, this)
    },
    onUnload() {
        app.event.off('some-event', this.updateState)
    },
    updateState(arg) {
        // ...
    },
})
```

## API

- event.on(event, callback, context)
  - `{sting} event`
  - `{Function} callback`
  - `{object} context` 为当前页面 `page` 对象，传 `this`即可
- event.off([event, callback])
  - `{string} event`
  - `{Function} callback`
- event.emit(event, [...args])
  - `{string} event`
  - `{arguments list} [...args]`
