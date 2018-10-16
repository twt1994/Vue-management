<template>
  <div class="helpCointer">
    <div class="edit">
      <Tinymce ref="editor" :height="500" v-model="formLabelAlign.msg" />
    </div>
    <el-button style="margin-top:30px;" type="primary" @click="submit">提交</el-button>
  </div>
</template>
<script>
import API from '@/utils/api'
import Tinymce from '@/components/Tinymce' // 调用编辑器
export default {
  components: {
    // 使用编辑器
    Tinymce
  },
  data() {
    return {
      formLabelAlign: {
        id: '',
        type: 'day',
        msg: ''
      }
    }
  },
  mounted(){
    //  this.modifyHelpConfig()
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.Tinymce
    }
  },
  methods:{
    modifyHelpConfig() {
      API.modifyHelpConfig(this.formLabelAlign).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          // this.formLabelAlign.msg=''
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
           this.formLabelAlign.msg=''
        }else{
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
    submit(){
         this.modifyHelpConfig()
        //  this.formLabelAlign.msg=''
    }
  }
}
</script>
<style>
	.helpCointer{
		padding-left:30px;
		/*text-align:center;*/
	}
	.helpCointer .edit{
		width:80%;
		margin-top:60px;

	}
	.helpCointer .editor-custom-btn-container{
		top:3px;
	}
</style>
