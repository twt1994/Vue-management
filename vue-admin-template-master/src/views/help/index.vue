<template>
  <div class="helpCointer">
    <div class="edit">
      <Tinymce ref="editor" :height="500" v-model="formLabelAlign.content" />
    </div>
    <el-button style="margin-top:30px;" type="primary">提交</el-button>
  </div>
</template>
<script>
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
        content: ''
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.Tinymce
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
