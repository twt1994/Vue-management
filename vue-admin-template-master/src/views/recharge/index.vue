<template>
  <div class="app-container">
    <div class="box">
      用户名:&nbsp;<el-input
        v-model = "userName"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      等级:&nbsp;<el-select v-model="value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <span style="margin-left:20px;">选择时间：&nbsp;</span>&nbsp;<el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-button type="primary" style="margin-left:20px;">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      value6: '',
      options: [
        {
          value: '1',
          label: '支付宝'
        },
        {
          value: '2',
          label: '微信'
        },
        {
          value: '3',
          label: '后台充值'
        }
      ],
      value: '1'
    }
  },
  watch: {

  },

  methods: {

  }
}
</script>

