<template>
  <div class="app-container">
    <div v-for="item in form" :key="item.id" class="box" style="margin:30px 0 30px 30px;">
      <span>{{ item.name }}</span>
      <input v-model ="item.value" style="width:200px;">
    </div>
    <div class="box2">
      <el-button type="primary" style="width:150px;margin:50px 0 50px 80px;" @click="oksubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api'
export default {
  name: 'Exchange',
  data() {
    return {
      form: {
      },
      list: {}
    }
  },
  mounted() {
    this.selectExchangeRate()
  },
  methods: {
    // 汇率列表
    selectExchangeRate() {
      API.selectExchangeRate(this.form).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.form = res.data
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
    },
    // 修改汇率
    modifyExchangeRate() {
      API.modifyExchangeRate(JSON.stringify(this.list)).then(res => {
        console.log(JSON.stringify(this.list))
        if (res.code === 200) {
          console.log(res.data)
          // this.form = res.data
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
    },
    oksubmit() {
      this.modifyExchangeRate()
    }
  }

}
</script>
