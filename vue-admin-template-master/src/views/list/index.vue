<template>
  <div class="app-container">
    <div class="user">
      用户名:&nbsp;<el-input
        v-model="tradeRecordData.phone"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      等级:&nbsp;<el-select v-model="tradeRecordData.lv">
        <!-- <el-option label="请选择等级" value=""/> -->
        <el-option label="白银会员" value="0"/>
        <el-option label="黄金会员" value="1"/>
        <el-option label="钻石会员" value="2"/>
        <!-- <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/> -->
      </el-select>
      <el-button type="primary" style="margin-left:20px;" @click="selectUserInfo">搜索</el-button>
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
            <span style="color:blue;cursor:pointer" @click="resetPwd(scope.row.id)">重置密码</span>
            <span style="color:blue;cursor:pointer" @click="modifyLv(scope.row.id)">修改等级</span>
            <span v-show="scope.row.lv !== '3'" style="color:blue;cursor:pointer" @click="rechargeAmount(scope.row.id)">充值</span>
            <!--<span style="color:blue;cursor:pointer" @click="paymentGoodsOrder(scope.row.id)">付款</span>
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
    <!--添加重置密码弹出框-->
    <el-dialog :visible.sync="centerDialogVisible" @close="closeDialog">
      <el-form ref="userMsg" :model="userMsg" :rules="userMsgrules" auto-complete="on" label-position="left" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="userMsg.pwd" type="password" auto-complete="on"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="userMsg.checkPass" type="password" auto-complete="on"/>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加修改等级弹出框-->
    <el-dialog :visible.sync="gradeDialogVisible" @close="gradecloseDialog">
      等级:&nbsp;<el-select v-model="lvform.lv">
        <el-option label="白银会员" value="0"/>
        <el-option label="黄金会员" value="1"/>
        <el-option label="钻石会员" value="2"/>
      </el-select>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="gradesubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 充值弹窗 -->
    <el-dialog :visible.sync="rechargeDialogVisible" @close="rechargecloseDialog">
      输入金额:&nbsp;<el-input
        v-model="rechargeform.money"
        style="width:200px;margin-right:30px;"/>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="rechargesubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import API from '@/utils/api'
import { getLoginData } from '@/utils/auth'
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
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userMsg.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      num: '',
      userMsg: {
        pwd: '',
        uid: '',
        checkPass: ''
      },
      userMsgrules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      centerDialogVisible: false,
      gradeDialogVisible: false,
      rechargeDialogVisible: false,
      total: 0,
      tradeRecordData: {
        phone: '',
        lv: '0',
        current: 1,
        size: 10
      },
      lvform: {
        lv: '',
        uid: ''
      },
      rechargeform: {
        money: '',
        uid: ''
      },
      // value: '1',
      tableData: [
      ],
      Msg: {
        name: '',
        id: '',
        monery: '',
        lv: ''
      }
    }
  },
  created() {
  },
  mounted() {
    this.selectUserInfo() // 页面进来第一次加载用户列表数据
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      API.getUserInfo(this.Msg).then(res => {
        if (res.code === 200) {
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
    // 店家×号，清空输入内容
    closeDialog() {
      this.$refs['userMsg'].resetFields()
      this.userMsg.pwd = ''
      this.userMsg.uid = ''
      this.userMsg.checkPass = ''
    },
    gradecloseDialog() {
      this.lvform.lv = 0
    },
    rechargecloseDialog() {
      this.rechargeform.money = ''
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
            console.log(ele)
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
    // 点击确定修改密码
    submitForm() {
      this.$refs['userMsg'].resetFields()
      this.centerDialogVisible = false
      API.resetPwd(this.userMsg).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.selectUserInfo()
          console.log(res.data)
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
    resetPwd(id) {
      this.centerDialogVisible = true
      this.userMsg.uid = id
    },
    // 点击修改等级确定按钮
    modifyLv(id) {
      this.gradeDialogVisible = true
      this.lvform.uid = id
    },
    // 点击确定修改等级
    gradesubmit() {
      this.gradeDialogVisible = false
      API.modifyLv(this.lvform).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectUserInfo()
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
    // 点击充值
    rechargeAmount(id) {
      this.rechargeDialogVisible = true
      this.rechargeform.uid = id
    },
    rechargesubmit() {
      this.rechargeDialogVisible = false
      API.rechargeAmount(this.rechargeform).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectUserInfo()
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
