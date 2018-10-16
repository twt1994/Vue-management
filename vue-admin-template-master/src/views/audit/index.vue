
<template>
  <div class="audit-container">
    <el-form ref="tradeRecordForm" :model="tradeRecordForm" label-width="80px" @keyup.enter.native="selectExamineList">
      <el-form-item label="关键字">
        <el-input v-model="tradeRecordForm.keyword"/>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="tradeRecordForm.orderNumber"/>
      </el-form-item>
      <el-form-item label="ASIN">
        <el-input v-model="tradeRecordForm.asin"/>
      </el-form-item>
      <el-form-item label="站点">
        <el-select v-model="tradeRecordForm.site" placeholder="请选择站点">
          <el-option label="全部" value=""/>
          <el-option label="美国" value="美国"/>
          <el-option label="加拿大" value="加拿大"/>
          <el-option label="墨西哥" value="墨西哥"/>
          <el-option label="英国" value="英国"/>
          <el-option label="法国" value="法国"/>
          <el-option label="西班牙" value="西班牙"/>
          <el-option label="德国" value="德国"/>
          <el-option label="意大利" value="意大利"/>
          <el-option label="日本" value="日本"/>
          <el-option label="澳大利亚" value="澳大利亚"/>
        </el-select>
      </el-form-item>
      <el-button style="margin-left:20px;" type="primary" @click="selectExamineList">查询</el-button>
    </el-form>
    <!--选项卡-->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="-1">所有订单</el-menu-item>
      <el-menu-item index="1">待审核</el-menu-item>
      <el-menu-item index="2">交易成功 </el-menu-item>
      <el-menu-item index="3">驳回 </el-menu-item>
      <!--<el-menu-item index="4">用户取消订单 </el-menu-item>-->
    </el-menu>
    <!--表格-->
    <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
      <el-table-column prop="orderNumber" label="">
        <template slot-scope="scope">
          <input type="checkbox" @change="changeChose(scope.row.id,$event)" >
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="订单编号"/>
      <el-table-column prop="site" label="站点"/>
      <el-table-column prop="asin" label="ASIN"/>
      <el-table-column prop="totalPrice" label="总价"/>
      <el-table-column prop="networkNumber" label="官网单号">
        <template slot-scope="scope">
          <span>{{ scope.row.networkNumber?scope.row.networkNumber:'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.state == -1">全部 </span> -->
          <span v-if="scope.row.state == 1">待审核 </span>
          <span v-if="scope.row.state == 2">审核成功</span>
          <span v-if="scope.row.state == 3">驳回</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 2 ||scope.row.state == 3"style="color:blue;cursor:pointer" @click="selectById(scope.row.id)">查看</span>
          <span v-if="scope.row.state == 1" style="color:blue;cursor:pointer" @click="adoptGoodsOrder(scope.row.id,0)">通过</span>
          <<<<<<< HEAD
          <span v-if="scope.row.state == 2" style="color:blue;cursor:pointer" @click="modifyLogistics(scope.row.id,scope.row.networkNumber,scope.row.logisticsNumber)">修改订单</span>
          =======
          >>>>>>> 77f7d518e8e452c6a91d3765e930f57f536fe320
          <span v-if="scope.row.state == 2 ||scope.row.state == 1" style="color:blue;cursor:pointer" @click="rejectGoodsOrder(scope.row.id)">驳回</span>

        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top:40px;margin-left:30px;" @click="adoptGoodsOrder(multipleSelection,1)">批量通过订单</el-button>
    <el-pagination :current-page="tradeRecordForm.current" :page-sizes="[30, 50, 100, 200]" :page-size="tradeRecordForm.size" class="pagination" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    <!-- 驳回弹窗 -->
    <el-dialog :visible.sync="rejectVisible" @close="rejectDialog">
      输入驳回原因:&nbsp;<el-input
        v-model="rejectform.msg"
        style="width:500px;margin-right:30px;"/>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="rejectsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改物流单号弹窗 -->
    <el-dialog :visible.sync="numberVisible" @close="numberDialog">
      官网单号:&nbsp;<el-input
        v-model="numberform.networkNumber"
        style="width:500px;"/>
      物流单号:&nbsp;<el-input
        v-model="numberform.logisticsNumber"
        style="width:500px;"/>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="numbersubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹窗 -->
    <el-dialog :visible.sync="lookDialogVisible" @close="lookcloseDialog">
      <el-form ref="addJson">
        <el-form-item :label-width="formLabelWidth" prop="orderNumber" label="订单编号:">
          <span>{{ detailData.orderNumber }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="site" label="站点:">
          <span>{{ detailData.site }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="ASIN:">
          <span>{{ detailData.asin }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="原价($):">
          <span>{{ detailData.price }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="汇率:">
          <span>{{ detailData.exchangeRate }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="佣金费:">
          <span>{{ detailData.commission }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="totalPrice" label="总价:">
          <span>{{ detailData.totalPrice }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="networkNumber" label="官网单号:">
          <span>{{ detailData.networkNumber?detailData.networkNumber:'-' }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="logisticsNumber" label="物流单号:">
          <span>{{ detailData.logisticsNumber?detailData.logisticsNumber:'-' }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="状态:">
          <span v-if="detailData.state == -1">全部</span>
          <span v-if="detailData.state == 0">待付款</span>
          <span v-if="detailData.state == 1">待审核 </span>
          <span v-if="detailData.state == 2">交易成功</span>
          <span v-if="detailData.state == 3">驳回</span>
          <span v-if="detailData.state == 4">用户取消订单</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="ASIN" label="创建时间:">
          <span>{{ detailData.createTime }}</span>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" prop="reject" label="驳回原因:">
          <span>{{ detailData.reject?detailData.reject:'-' }}</span>
        </el-form-item>

      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="looksubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/utils/api'
import store from '@/store'
import { getLoginData } from '@/utils/auth'
export default {
  data() {
    return {
      tradeRecordForm: {
        state: '-1',
        keyword: '',
        orderNumber: '',
        asin: '',
        uid: '',
        site: '',
        current: 1,
        size: 10
      },
      activeIndex: '-1',
      total: 0,
      detailData: {},
      multipleSelection: [],
      tableData: [],
      rejectVisible: false,
      lookDialogVisible: false,
      numberVisible: false,
      lookform: {
        id: ''
      },
      formLabelWidth: '80px',
      rejectform: {
        id: '',
        msg: ''
      },
      numberform: {
        id: '',
        networkNumber: '',
        logisticsNumber: ''
      }
    }
  },
  mounted() {
    this.selectExamineList()
  },
  methods: {
    // 选项卡
    handleSelect(key, keyPath) {
      this.tradeRecordForm.state = key
      this.selectExamineList()
    },
    selectExamineList() {
      const loginData = JSON.parse(getLoginData())
      this.tradeRecordForm.uid = loginData.id
      API.selectExamineList(this.tradeRecordForm).then(res => {
        if (res.code == 200) {
          this.total = res.data.total
          this.tableData = res.data.records
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
      })
    },
    // 审核商品通过
    adoptGoodsOrder(param, state) {
      var arr = []
      if (state == 0) {
        var obj = { 'id': param }
        console.log(obj, 1111111111111)
        arr.push(obj)
      } else {
        arr = param
      }
      API.adoptGoodsOrder(JSON.stringify(arr)).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: '付款成功',
            type: 'success'
          })
          this.selectExamineList()
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    rejectDialog() {
      this.rejectform.msg = ''
    },
    rejectGoodsOrder(id) {
      this.rejectVisible = true
      this.rejectform.id = id
    },
    // 驳回商品
    rejectsubmit() {
      this.rejectVisible = false
      API.rejectGoodsOrder(this.rejectform).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectExamineList()
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
    // 修改订单
    modifyLogistics(id, networkNumber, logisticsNumber) {
      this.numberform.id = id
      this.numberform.networkNumber = networkNumber
      this.numberform.logisticsNumber = logisticsNumbe
    },
    numbersubmit(id, networkNumber, logisticsNumber) {
      this.numberVisible = false
      // this.numberform.id=id
      // this.numberform.networkNumber=networkNumber
      // this.numberform.logisticsNumber=logisticsNumber
      API.modifyLogistics(this.numberform).then(res => {
        if (res.code === 200) {
          // this.detailData = res.data
          // this.numberform.networkNumber =res.data.records.networkNumber;
          //  this.numberform.logisticsNumber=res.data.records.logisticsNumber;
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectExamineList()
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
    numberDialog() {
      // this.numberVisible=false;
    },
    // 查看
    lookcloseDialog() {
    },
    looksubmit() {
      this.lookDialogVisible = false
    },
    selectById(id) {
      this.lookDialogVisible = true
      this.lookform.id = id
      API.selectById(this.lookform).then(res => {
        if (res.code === 200) {
          this.detailData = res.data
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          console.log(res.data)
          this.selectExamineList()
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
    // 点击选中某一条数据
    changeChose(id, e) {
      const param = { 'id': id }
      if (e.target.checked) {
        this.multipleSelection.push(param)
      } else {
        this.multipleSelection.splice(this.multipleSelection.indexOf(id), 1)
      }
    },
    // 点击页码跳转
    handleCurrentChange(val) {
      this.tradeRecordForm.current = val
      this.selectExamineList()
    },
    // 改变当前显示条数
    handleSizeChange(val) {
      this.tradeRecordForm.size = val
      this.selectExamineList()
    }
  }
}
</script>

<style scoped>
	.audit-container {
		margin-top: 20px;
	}
	.audit-container .el-form-item {
		width: 300px;
		display: inline-block;
	}
	.audit-container .el-form-item__content {
		width: 220px;
	}
	.audit-container .el-select {
		width: 100%;
	}
	.audit-container .el-table td,
	.audit-container .el-table th.is-leaf {
		text-align: center;
	}
	.pagination {
		float: right;
		margin-top: 40px;
	}
</style>
