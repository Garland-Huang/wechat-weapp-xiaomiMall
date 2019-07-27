// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: "",
        addressInfo: {}
    },
    chooseAddress() {
        wx.chooseAddress({
            success: (res) => {
                var regionStr = res.provinceName + res.cityName + res.countyName;
                this.setData({
                    addressInfo: res,
                    region: regionStr
                })
            },
            fail: function(err) {
                console.log(err)
            }
        })
    },
    bindRegionChange: function(e) {
        this.data.addressInfo.provinceName = e.detail.value[0];
        this.data.addressInfo.cityName = e.detail.value[1];
        this.data.addressInfo.countyName = e.detail.value[2];
        this.setData({
            region: e.detail.value,
            addressInfo: this.data.addressInfo
        })
        console.log("this.data.addressInfo=====>", this.data.addressInfo);
    },
    preserveFun() {
        if (this.data.addressInfo) {
            wx.setStorageSync("address", this.data.addressInfo);
            wx.navigateTo({
                url: '../../pages/pay/pay'
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '输入收货地址不能为空',
                showCancel: false,
                confirmColor: "#FF6700"
            })
        }
    },
    inputChange(e){
        console.log(e)
        if (e.currentTarget.dataset.index == 0 ){
            this.data.addressInfo.userName = e.detail.value;
        }
        if (e.currentTarget.dataset.index == 1) {
            this.data.addressInfo.postalCode = e.detail.value;
        }
        if (e.currentTarget.dataset.index == 2) {
            this.data.addressInfo.detailInfo = e.detail.value;
        }
        console.log("this.data.addressInfo=====>", this.data.addressInfo);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})