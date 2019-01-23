//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '选择地址',
        address1: '',
        address2: '',
    },

    /* lifetime */
    onLoad() {
        app.event.on('select-address', this.updateAddress1)
    },
    onUnload() {
        app.event.off('select-address', this.updateAddress1)
        app.event.off('select-address', this.updateAddress2)
    },

    /* handler */
    updateAddress1(address) {
        this.setData({
            address1: address,
        })
    },
    updateAddress2(address) {
        this.setData({
            address2: address,
        })
    },

    /* event */
    // 跳转到选择地址页
    goSelectAddress() {
        wx.navigateTo({
            url: '../address/address'
        })
    },
    // 注册事件监听1
    registerListen1() {
        app.event.on('select-address', this.updateAddress1, this)
        wx.showToast({
            title: '选择地址监听事件1已注册',
            icon: 'none',
        })
    },
    // 移除事件监听1
    removeListen1() {
        app.event.off('select-address', this.updateAddress1)
        wx.showToast({
            title: '选择地址监听事件1已移除',
            icon: 'none',
        })
    },
    // 注册事件监听2
    registerListen2() {
        app.event.on('select-address', this.updateAddress2, this)
        wx.showToast({
            title: '选择地址监听事件2已注册',
            icon: 'none',
        })
    },
    // 移除事件监听2
    removeListen2() {
        app.event.off('select-address', this.updateAddress2)
        wx.showToast({
            title: '选择地址监听事件2已移除',
            icon: 'none',
        })
    },
})
