<template>
  <div class="app-container">
    <div class="box" style="display:flex;">
      <span style="margin-top:10px;">用户名:&nbsp;&nbsp;</span>
      <el-input
        v-model = "form.uname"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      <span style="margin-top:10px;">充值方式:&nbsp;&nbsp;</span>
      <el-select v-model="form.type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-form ref="form" :model="form" label-width="80px" style="display:flex;">
        <el-form-item label="开始时间">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" @change="selectRecharge"/>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" @change="selectRecharge"/>
        </el-form-item>
        <el-button type="primary" style="margin-bottom:22px;margin-left:30px;" @click="selectRecharge">搜索</el-button>
      </el-form>
    </div>
    <div class="table" style="margin-top:30px">
      <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
        <el-table-column label="用户名" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.uname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户余额" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值方式" min-width="150" align="center">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.type }}</span> -->
            <span v-if="scope.row.type == 1" style="margin-left: 10px">支付宝充值</span>
            <span v-if="scope.row.type == 2" style="margin-left: 10px">微信充值</span>
            <span v-if="scope.row.type == 3" style="margin-left: 10px">后台充值</span>
            <!-- <span v-if="scope.row.type == 4">提现</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作人" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.operation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
// import { getLoginData } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        current: 1,
        size: 10,
        id: '',
        uname: '',
        type: '1',
        startTime: '2018-7-30 00:00:00',
        endTime: '2018-9-30 00:00:00'
      },
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
      total: 0,
      value: '1',
      tableData: [
      ]
    }
  },
  mounted() {
    // 一个月前
    const nowdate1 = new Date()
    nowdate1.setMonth(nowdate1.getMonth() - 1)
    const y1 = nowdate1.getFullYear()
    const m1 = nowdate1.getMonth() + 1
    const d1 = nowdate1.getDate()
    const h1 = nowdate1.getHours()
    const min1 = nowdate1.getMinutes()
    const s1 = nowdate1.getSeconds()
    this.form.startTime = y1 + '-' + m1 + '-' + d1 + ' ' + h1 + ':' + min1 + ':' + s1
    // 一个月后
    const nowdate2 = new Date()
    //			nowdate2.setMonth(nowdate2.getMonth()+1);
    const y2 = nowdate2.getFullYear()
    const m2 = nowdate2.getMonth() + 1
    const d2 = nowdate2.getDate()
    const h2 = nowdate2.getHours()
    const min2 = nowdate2.getMinutes()
    const s2 = nowdate2.getSeconds()
    this.form.endTime = y2 + '-' + m2 + '-' + d2 + ' ' + h2 + ':' + min2 + ':' + s2

    this.selectRecharge()
  },

  methods: {
    // 充值记录列表
    selectRecharge() {
      // const loginData = JSON.parse(getLoginData())
      // 			console.log(loginData)
      // this.form.id = loginData.id
      // this.form.uname = loginData.name
      API.selectRecharge(this.form).then(res => {
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
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 改变当前显示条数
    handleSizeChange(val) {
      this.form.size = val
      this.selectRecharge()
      console.log(`每页 ${val} 条`)
    },
    // 点击页码跳转
    handleCurrentChange(val) {
      this.form.size = val
      this.selectRecharge()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

