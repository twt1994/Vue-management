<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户姓名：{{ userMsg.name }}</div>
    <!-- <div class="dashboard-text">用户ID：{{ userMsg.id }}</div> -->
    <div class="dashboard-text">用户余额：{{ userMsg.money }}</div>
  </div>
</template>

<script>
import API from '@/utils/api'
export default {
  name: 'Dashboard',
  data() {
    return {
      userMsg: {
        name: '',
        id: '',
        monery: ''
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      API.getUserInfo(this.userMsg).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.userMsg.name = res.data.name
          this.userMsg.id = res.data.id
          this.userMsg.money = res.data.money + '元'
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
