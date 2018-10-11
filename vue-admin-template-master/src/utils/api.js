import request from '@/utils/request'
const API = {
  // 登录 成功
  handleLogin: (data) => {
    return request({
      url: '/userInfo/login',
      method: 'post',
      data: data
    })
  },
  // 汇率列表
  selectExchangeRate: () => {
    return request({
      url: '/exchangeRate/selectExchangeRate  ',
      method: 'post',
      data: {}
      //          load:true
    })
  },
  // 修改汇率
  modifyExchangeRate: (data) => {
    return request({
      url: '/exchangeRate/modifyExchangeRate ',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 充值列表/后台
  selectRecharge: (data) => {
    return request({
      url: '/rechargeRecord/selectRecharge',
      method: 'post',
      data: data
      //          load:true /rechargeRecord/selectRecharge
    })
  },
  // 充值/提现记录
  selectRechargeRecord: (data) => {
    return request({
      url: '/rechargeRecord/selectRechargeRecord',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 提现列表
  selectPutForward: (data) => {
    return request({
      url: '/rechargeRecord/selectPutForward ',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 查看交易记录/前台/后台
  selectGoodsOrder: (data) => {
    return request({
      url: '/goodsOrder/selectGoodsOrder',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 用户列表
  selectUserInfo: (data) => {
    return request({
      url: '/userInfo/selectUserInfo',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 获取用户信息 成功
  getUserInfo: (data) => {
    return request({
      url: '/userInfo/getUserInfo',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 修改密码 成功
  modifyPassword: (data) => {
    return request({
      url: '/userInfo/modifyPassword ',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 找回密码 成功
  retrievePwd: (data) => {
    return request({
      url: '/userInfo/retrievePwd  ',
      method: 'post',
      data: data
      //          load:true
    })
  },
  // 添加任务 成功
  addGoodsOrder: (data) => {
    return request({
      url: '/goodsOrder/addGoodsOrder   ',
      method: 'post',
      data: data
    //          load:true
    })
  },
  // 查看帮助前台；
  getHelpConfig: (data) => {
    return request({
      url: '/helpConfig/getHelpConfig',
      method: 'post',
      data: data
    //          load:true
    })
  },
  // 修改帮助/后台
  modifyHelpConfig: (data) => {
    return request({
      url: '/helpConfig/modifyHelpConfig    ',
      method: 'post',
      data: data
    //          load:true
    })
  },
  // 上传文件/后台
  uploadingFile: (data) => {
    return request({
      url: '/helpConfig/uploadingFile',
      method: 'post',
      data: data
    //          load:true
    })
  }

}

export default API
