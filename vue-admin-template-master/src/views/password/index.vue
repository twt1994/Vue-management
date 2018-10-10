<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules2" auto-complete="on" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPwd" style="width:300px;">
        <el-input v-model="ruleForm.oldPwd" type="password" auto-complete="on" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" style="width:300px;">
        <el-input v-model="ruleForm.newPwd" type="password" auto-complete="on" />
      </el-form-item>
      <el-form-item label="确认密码" prop="newpass" style="width:300px;">
        <el-input v-model="ruleForm.newpass" type="password" auto-complete="on" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="modifyPassword">提交</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from '@/utils/api'
import { removeToken } from '@/utils/auth'
import { isvalidUsername } from '@/utils/validate'
// import router from './router'
// let vm
export default {
  directives: {
    focus: {

      inserted: function(el) {
        el.focus()
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value, 12314)
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        // if (this.ruleForm.oldPwd !== '') {
        //   this.$refs.ruleForm.validateField('oldPwd')
        // }
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请入新密码'))
      } else {
        // if (this.ruleForm.newPwd !== '') {
        //   this.$refs.ruleForm.validateField('newPwd')
        // }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认新密码'))
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        newpass: ''
      },
      rules2: {
        oldPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        newpass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // vm = this
  },
  methods: {
    modifyPassword() {
      this.$refs.ruleForm.validate(valid => {
        console.log(this.$refs.ruleForm)
        if (!valid) {
          return
        //   alert('submit!')
        // } else {
        //   console.log('error submit!!')
        //   return false
        }
      })
      API.modifyPassword(this.ruleForm).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          removeToken()
          this.$router.push('/login')
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        // this.loading = false
      })
    }
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
</style>

