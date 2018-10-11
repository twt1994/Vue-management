<template>
  <div class="app-container">
    <div class="user">
      关键字:&nbsp;<el-input
        v-model = "form.keyword"
        clearable
        style="width:200px;margin-right:30px;"/>
      订单编号:&nbsp;<el-input
        v-model = "form.orderNumber"
        clearable
        style="width:200px;margin-right:30px;"/>
      ASIN:&nbsp;<el-input
        v-model = "form.asin"
        clearable
        style="width:200px;margin-right:30px;"/>
      站点:&nbsp;<el-select v-model="form.site">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" style="margin-left:30px;" @click="selectGoodsOrder">搜索</el-button>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="-1">全部</el-menu-item>
      <el-menu-item index="0">待付款</el-menu-item>
      <el-menu-item index="1">待审核 </el-menu-item>
      <el-menu-item index="2">交易成功 </el-menu-item>
      <el-menu-item index="3">驳回 </el-menu-item>
    </el-menu>
    <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
      <el-table-column prop="orderNumber" label="订单编号"/>
      <el-table-column prop="site" label="站点"/>
      <el-table-column prop="asin" label="ASIN"/>
      <el-table-column prop="totalPrice" label="总价"/>
      <el-table-column prop="networkNumber" label="官网单号"/>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state == -1">全部</span>
          <span v-if="scope.row.state == 0">待付款</span>
          <span v-if="scope.row.state == 1">待审核 </span>
          <span v-if="scope.row.state == 2">交易成功</span>
          <span v-if="scope.row.state == 3">驳回</span>
          <!-- <span v-if="scope.row.state == 4">用户取消订单</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="" label="操作"/>
    </el-table>
    <div class="block" style="margin-top:50px;text-align: right;">
      <el-pagination
        :current-page="form.current"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="form.size"
        :total="total"
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api'
export default {
  data() {
    return {
      form: {
        keyword: '',
        current: 1,
        size: 10,
        orderNumber: '',
        asin: '',
        uid: '6',
        site: '全部',
        state: '-1',
        startTime: ''
      },
      activeIndex: '-1',
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '美国',
          label: '美国'
        },
        {
          value: '加拿大',
          label: '加拿大'
        },
        {
          value: '墨西哥',
          label: '墨西哥'
        },
        {
          value: '英国',
          label: '英国'
        },
        {
          value: '法国',
          label: '法国'
        },
        {
          value: '西班牙',
          label: '西班牙'
        },
        {
          value: '德国',
          label: '德国'
        },
        {
          value: '意大利',
          label: '意大利'
        },
        {
          value: '日本',
          label: '日本'
        },
        {
          value: '澳大利亚',
          label: '澳大利亚'
        }
      ],
      // value: '1',
      total: 0,
      tableData: [

      ]
    }
  },
  mounted() {
    this.selectGoodsOrder()
  },
  methods: {
    // 后台交易记录查看
    selectGoodsOrder() {
      API.selectGoodsOrder(this.form).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.records
          if (this.tableData.length <= 0) {
            return
          }
          this.tableData.forEach(ele => {
            const time = new Date(ele.createTime)
            ele.createTime = time.getFullYear() + '-' +
											(time.getMonth() + 1) + '-' +
											time.getDate() + ' ' +
											time.getHours() + ':' +
											time.getMinutes() + ':' +
											time.getSeconds()
          })
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
    handleSelect(key, keyPath) {
      this.form.state = key
      this.selectGoodsOrder()
    },
    handleSizeChange(val) {
      this.form.size = val
      this.selectRecharge()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.form.size = val
      this.selectRecharge()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

