// pages/shopcar/shopcar.js
var formatDate = require('../../utils/util.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList: [],
        totalPrice: 0,
        isHasGoods: false,
        allSelectedStatus: true,
        tuijianList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var shopData = wx.getStorageSync("shopCarList");
        this.setData({
            shopList: shopData
        })
        const tuijianList = app.globalData.indexPro[0].proData;
        console.log(tuijianList)
        this.setData({
            tuijianList
        })
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
        var shopData = wx.getStorageSync("shopCarList");
        shopData = !shopData ? [] : shopData;
        if (shopData.length != 0) {
            this.setData({
                isHasGoods: true
            })
        }else{
            this.setData({
                isHasGoods: false
            })
        }
        shopData.forEach(function(value) {
            value.isCheck = true;
        })
        this.setData({
            shopList: shopData
        })
        this.calc();
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

    },
    // 减少商品
    carReduce: function(event) {
        var index = event.target.dataset.index;
        //this指向 page对象
        var num = this.data.shopList[index].proCount;
        num--;
        if (num <= 1) {
            num = 1;
        }
        var obj = {};
        var key = "shopList[" + index + "].proCount";
        obj[key] = num;
        this.setData(obj);
        wx.setStorageSync("shopCarList", this.data.shopList);
        this.calc();
    },

    // 增加商品
    carAdd: function(event) {
        var index = event.target.dataset.index;
        var num = this.data.shopList[index].proCount;
        num++;
        var obj = {};
        var key = "shopList[" + index + "].proCount";
        obj[key] = num;
        this.setData(obj);
        wx.setStorageSync("shopCarList", this.data.shopList);
        this.calc();
    },
    // 删除商品
    carDel: function(event) {
        var index = event.target.dataset.index;
        console.log(index)
        // var currentGoods = this.data.shopList.splice(index, 1)[0];
        // this.setData({
        //     carList: this.data.carList
        // })
        var _this = this;
        wx.showModal({
            // title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击')
                    var currentGoods = _this.data.shopList.splice(index, 1)[0];
                    _this.setData({
                        shopList: _this.data.shopList
                    })
                    var localshopcartData = wx.getStorageSync('shopCarList');

                    for (var i = 0; i < localshopcartData.length; i++) {
                        if (currentGoods.proId == localshopcartData[i].proId) {
                            localshopcartData.splice(i, 1);
                            break;
                        }
                    }
                    wx.setStorageSync('shopCarList', localshopcartData);
                    wx.showToast({
                        title: '成功删除',
                        icon: 'success',
                        duration: 1000
                    })
                    if (_this.data.shopList.length == 0) {
                        _this.setData({
                            isHasGoods: false
                        })
                    }
                    _this.calc();
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })

    },
    //单选
    simpleSelected(e) {
        var index = e.target.dataset.alpha;
        var isCheck = this.data.shopList[index].isCheck;
        this.data.shopList[index].isCheck = !isCheck;
        this.setData({
            shopList: this.data.shopList
        })
        //计算总价
        this.calc();
        if (isCheck) {
            //如果上一次勾选, 则点击后为没有勾选
            this.setData({
                allSelectedStatus: false
            })
        } else {
            for (var i = 0; i < this.data.shopList.length; i++) {
                //如果存在一个没有勾选的复选框
                if (!this.data.shopList[i].isCheck) {
                    this.setData({
                        allSelectedStatus: false
                    })
                    return;
                }
            }
            //如果不存在没有勾选复选框
            this.setData({
                allSelectedStatus: true
            })

        }
    },
    //全选
    allSelected() {
        for (var i = 0; i < this.data.shopList.length; i++) {
            this.data.shopList[i].isCheck = !this.data.allSelectedStatus;
        }
        this.setData({
            shopList: this.data.shopList
        })
        this.setData({
            allSelectedStatus: !this.data.allSelectedStatus
        })
        // 未选中
        var notSelectPrice = 0;
        //根据全选，计算总价
        if (this.data.allSelectedStatus) {
            this.calc();
        } else {
            this.setData({
                totalPrice: notSelectPrice.toFixed(2)
            })
        }
    },
    //计算总价格
    calc() {
        // console.log("触发计算函数")
        var totalPri = 0;
            this.data.shopList.forEach((function (v) {
                if (v.isCheck) {
                    totalPri += (v.proPrice * v.proCount);
                }
            }).bind(this));
        this.setData({
            totalPrice: totalPri.toFixed(2)
        })
    },
    // 下单
    toPay: function() {
        var orderInfo = {};

        //订单商品列表
        orderInfo.goods = [];

        //保存商品
        var goodsIds = [];

        //商品字段信息
        var keys = ['proId', 'proName', 'proImage', 'proPrice','proCount', 'addTime'];

        this.data.shopList.forEach(function(v) {
            if (v.isCheck) {
                var o = {};

                for (var i = 0; i < keys.length; i++) {
                    o[keys[i]] = v[keys[i]];
                }

                orderInfo.goods.push(o);
                goodsIds.push(v.proId);
            }
        })

        if (orderInfo.goods.length == 0) {
            //如果没有商品
            wx.showToast({
                title: '请选择商品',
                icon: 'none',
                duration: 2000
            })

            return;
        }

        var time = new Date();

        //额外添加其他进行加密
        orderInfo.orderId = 'wx' + time.getTime();

        orderInfo.orderTime = formatDate(time);

        orderInfo.total = this.data.totalPrice;

        //获取订单数据
        var orderData = wx.getStorageSync('order');

        orderData = !orderData ? [] : orderData;

        orderData.unshift(orderInfo);

        //保存订单数据
        wx.setStorageSync('order', orderData);

        //移除购车商品
        var shopcartData = wx.getStorageSync('shopCartList');
        for (var j = 0; j < shopcartData.length; j++) {
            if (goodsIds.length == 0) {
                break;
            }
            var index = goodsIds.indexOf(shopcartData[j].goodsId);
            goodsIds.splice(index, 1);
            shopcartData.splice(index, 1);
            j--;
        }
        wx.setStorageSync('shopCartList', shopcartData);
        // if (shopcartData.length == 0) {
        //     this.setData({
        //         isHasGoods: false
        //     })
        // }
        wx.navigateTo({
            url: '../../pages/pay/pay'
        })
    },
    //跳转详情
    previewDetail: function(e) {
        wx.navigateTo({
            url: '../../pages/spdetail/spdetail?productId=' + e.currentTarget.dataset.goodsid
        })
    },
    gohome(){
        wx.switchTab({
            url: '../../pages/index/index'
        })
    }
})