<template>
  <div class="app-container">
    <div class="box" style="display:flex;margin-top:30px;">
      <span style="margin-top:10px;">用户名:&nbsp;&nbsp;</span>
      <el-input
        v-model = "form.uname"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      <el-form ref="form" :model="form" label-width="80px" style="display:flex;">
        <el-form-item label="开始时间">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" @change="selectPutForward"/>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" @change="selectPutForward"/>
        </el-form-item>
        <el-button type="primary" style="margin-bottom:22px;margin-left:30px;" @click="selectPutForward">搜索</el-button>
      </el-form>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">充值成功</el-menu-item>
      <el-menu-item index="1">待审核</el-menu-item>
      <el-menu-item index="2">审核通过 </el-menu-item>
      <el-menu-item index="3">驳回 </el-menu-item>
    </el-menu>
    <div class="table" style="margin-top:30px">
      <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
        <el-table-column label="用户名" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.uname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付宝" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.alipay }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="收款名" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.alipayname }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="状态" min-width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" style="margin-left: 10px">待审核</span>
            <span v-if="scope.row.status == 2" style="margin-left: 10px">审核通过</span>
            <span v-if="scope.row.status == 3" style="margin-left: 10px">驳回</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="isshow" prop="type" label="操作">
          <template slot-scope="scope">
            <span style="color:blue;cursor:pointer" @click="putForwardAdopt(scope.row.id)">通过</span>
            <span style="color:blue;cursor:pointer" @click="putForwardReject(scope.row.id)">驳回</span>
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
    <!-- 驳回弹窗 -->
    <el-dialog :visible.sync="rejectVisible" @close="rejectDialog">
      输入驳回原因:&nbsp;<el-input
        v-model="rejectform.msg"
        style="width:500px;margin-right:30px;"/>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="rejectsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import API from '@/utils/api'
export default {
  data() {
    return {
      form: {
        current: 1,
        size: 10,
        id: '',
        uname: '',
        status: '0',
        startTime: '2018-7-30 00:00:00',
        endTime: '2018-9-30 00:00:00'
      },
      passform: {
        id: ''
      },
      rejectform: {
        id: '',
        msg: ''
      },
      rejectVisible: false,
      activeIndex: '0',
      tableData: [
      ],
      total: 0,
      isshow: true
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

    this.selectPutForward()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.form.status = key
      if (this.form.status === '1') {
        this.isshow = true
      } else {
        this.isshow = false
      }
      this.selectPutForward()
    },
    selectPutForward() {
      API.selectPutForward(this.form).then(res => {
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
    // 提现申请通过，后台
    putForwardAdopt(id) {
      this.passform.id = id
      API.putForwardAdopt(this.passform).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectPutForward()
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
    rejectDialog() {
      this.rejectform.msg = ''
    },
    putForwardReject(id) {
      this.rejectVisible = true
      this.rejectform.id = id
    },
    rejectsubmit() {
      this.rejectVisible = false
      API.putForwardReject(this.rejectform).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectPutForward()
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
    // 改变当前显示条数
    handleSizeChange(val) {
      this.form.size = val
      this.selectPutForward()
      console.log(`每页 ${val} 条`)
    },
    // 点击页码跳转
    handleCurrentChange(val) {
      this.form.size = val
      this.selectPutForward()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
