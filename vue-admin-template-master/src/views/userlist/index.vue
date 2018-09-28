<template>
  <div>用户列表</div>
</template>
<script>
	import API from '@/utils/api'
	
	export default{
		data(){
			return{
				tradeRecordData:{
					state:-1,
					keyword:'',
					orderNumber:'',
					asin:'',
					uid:'',
					site:'',
					current:1,
					size:10,
				},
				dataForm:{
					phone:'15738662980',
					lv:'1',
					current:1,
					size:10
					
				}
			}
		},
		mounted(){
      console.log(1111111)
			this.selectGoodsOrder()
		},
		methods:{
			selectGoodsOrder(){
				API.selectGoodsOrder(this.tradeRecordData).then(res => {
					
				})
			}
			// selectUserInfo(){
			// 	API.selectUserInfo(this.dataForm).then(res => {
					
			// 	})
			// },
		}
	}
</script>
<style>

</style>
