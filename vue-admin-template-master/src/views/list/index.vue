<template>
  <div class="app-container">
    <div class="user">
      用户名:&nbsp;<el-input
        v-model="tradeRecordData.phone"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      等级:&nbsp;<el-select v-model="tradeRecordData.lv">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" style="margin-left:20px;">搜索</el-button>
    </div>
    <div class="table" style="margin-top:30px">
      <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
        <el-table-column prop="id" label="用户编号"/>
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="money" label="用户余额"/>
        <el-table-column prop="lv" label="用户等级"/>
        <!-- <el-table-column prop="networkNumber" label="用户积分"/> -->
        <el-table-column prop="createTime" label="注册时间"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span style="color:blue;cursor:pointer" @click="resetPwd(scope.row)">重置密码</span>
            <span style="color:blue;cursor:pointer" @click="detail(scope.row)">修改等级</span>
            <!-- <span style="color:blue;cursor:pointer" @click="detail(scope.row)">查看</span>
            <span style="color:blue;cursor:pointer" @click="paymentGoodsOrder(scope.row.id)">付款</span>
            <span style="color:blue;cursor:pointer" @click="cancelOrder(scope.row.orderNumber)">取消订单</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:50px;text-align: right;">
      <el-pagination
        :current-page="tradeRecordData.current"
        :page-sizes="[30, 50, 100, 200]"
        :page-size="tradeRecordData.size"
        :total="total"
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--添加的弹出框-->
    <el-dialog
      :visible.sync="centerDialogVisible">
      <el-form ref="userMsg" :model="userMsg" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pid">
          <el-input v-model="userMsg.pid" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="userMsg.checkPass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userMsg')">确定</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import API from '@/utils/api'
import { isvalidUsername } from '@/utils/validate'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userMsg.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userMsg: {
        pwd: '',
        uid: '',
        checkPass: ''
      },
      rules2: {
        pid: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      centerDialogVisible: false,
      total: 0,
      tradeRecordData: {
        phone: '1',
        lv: '0',
        current: 1,
        size: 10
      },
      options: [
        {
          value: '0',
          label: '白银会员'
        },
        {
          value: '1',
          label: '黄金会员'
        },
        {
          value: '2',
          label: '钻石会员'
        }
      ],
      value: '1',
      tableData: [
      ]
    }
  },
  created() {
  },
  mounted() {
    this.selectUserInfo() // 页面进来第一次加载用户列表数据
  },
  methods: {
    //  submitForm() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (!valid) {
    //       return
    //     }
    //   },
    submitForm(userMsg) {
      this.$refs[userMsg].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 用户列表数据
    selectUserInfo() {
      API.selectUserInfo(this.tradeRecordData).then(res => {
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
    // 重置密码操作
    resetPwd() {
      this.centerDialogVisible = true
      API.resetPwd(this.userMsg).then(res => {
        if (res.code === 200) {
          // this.centerDialogVisible = true
          console.log(res.data)
          // this.userMsg.name = res.data.name
          // this.userMsg.id = res.data.id
          // this.userMsg.money = res.data.money + '元'
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
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleLook(index, row) {
      console.log(index, row)
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
