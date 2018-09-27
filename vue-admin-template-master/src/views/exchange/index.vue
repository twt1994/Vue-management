<template>
  <div class="app-container">
    <div class="box">
       美元汇率:&nbsp;<el-input
        v-model = "dollar"
        clearable
        style="width:200px;margin-right:30px;"/>
    </div>
    <div class="box1">
       日元汇率:&nbsp;<el-input
        v-model = "yen"
        clearable
        style="width:200px;margin-top:50px;"/>
    </div>
     <div class="box2">
       <el-button type="primary" style="width:150px;margin:50px 0 50px 80px;">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dollar:'5.6',
      yen:'0.036'
    }
  }
}
</script>
