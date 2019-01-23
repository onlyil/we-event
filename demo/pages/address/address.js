const app = getApp()

Page({
    data: {
      addressList: ['西湖区', '江干区', '滨江区'],
    },

    // lifetime
    onLoad: function () {},

    // event
    selectAddress(e) {
        const { address } = e.currentTarget.dataset
        app.event.emit('select-address', address)
        wx.navigateBack()
    },
})
