<template>
  <div class="app-container">
    <div class="user">
      关键字:&nbsp;<el-input
        v-model = "form.keyword"
        clearable
        style="width:200px;margin-right:30px;"/>
      订单编号:&nbsp;<el-input
        v-model = "form.orderNumber"
        clearable
        style="width:200px;margin-right:30px;"/>
      ASIN:&nbsp;<el-input
        v-model = "form.asin"
        clearable
        style="width:200px;margin-right:30px;"/>
      站点:&nbsp;<el-select v-model="form.site">
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
      <el-button type="primary" style="margin-left:30px;" @click="selectGoodsOrder">搜索</el-button>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="-1">全部</el-menu-item>
      <el-menu-item index="0">待付款</el-menu-item>
      <el-menu-item index="1">待审核 </el-menu-item>
      <el-menu-item index="2">交易成功 </el-menu-item>
      <el-menu-item index="3">驳回 </el-menu-item>
    </el-menu>
    <el-table :data="tableData" style="width:100%;border-right:1px solid #eee;">
      <el-table-column prop="orderNumber" label="订单编号"/>
      <el-table-column prop="site" label="站点"/>
      <el-table-column prop="asin" label="ASIN"/>
      <el-table-column prop="totalPrice" label="总价"/>
      <el-table-column prop="networkNumber" label="官网单号"/>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state == -1">全部</span>
          <span v-if="scope.row.state == 0">待付款</span>
          <span v-if="scope.row.state == 1">待审核 </span>
          <span v-if="scope.row.state == 2">交易成功</span>
          <span v-if="scope.row.state == 3">驳回</span>
          <!-- <span v-if="scope.row.state == 4">用户取消订单</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="color:blue;cursor:pointer" @click="selectById(scope.row.id)">查看</span>
        </template>
      </el-table-column>
    </el-table>
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
export default {
  data() {
    return {
      form: {
        keyword: '',
        current: 1,
        size: 10,
        orderNumber: '',
        asin: '',
        uid: '6',
        site: '',
        state: '-1',
        startTime: ''
      },
      detailData: {},
      formLabelWidth: '80px',
      lookDialogVisible: false,
      activeIndex: '-1',
      options: [
        // {
        //   value: '全部',
        //   label: '全部'
        // },
        // {
        //   value: '美国',
        //   label: '美国'
        // },
        // {
        //   value: '加拿大',
        //   label: '加拿大'
        // },
        // {
        //   value: '墨西哥',
        //   label: '墨西哥'
        // },
        // {
        //   value: '英国',
        //   label: '英国'
        // },
        // {
        //   value: '法国',
        //   label: '法国'
        // },
        // {
        //   value: '西班牙',
        //   label: '西班牙'
        // },
        // {
        //   value: '德国',
        //   label: '德国'
        // },
        // {
        //   value: '意大利',
        //   label: '意大利'
        // },
        // {
        //   value: '日本',
        //   label: '日本'
        // },
        // {
        //   value: '澳大利亚',
        //   label: '澳大利亚'
        // }
      ],
      lookform: {
        id: ''
      },
      // value: '1',
      total: 0,
      tableData: [

      ]
    }
  },
  mounted() {
    this.selectGoodsOrder()
  },
  methods: {
    // 后台交易记录查看
    selectGoodsOrder() {
      API.selectGoodsOrder(this.form).then(res => {
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
          this.selectGoodsOrder()
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
    handleSelect(key, keyPath) {
      this.form.state = key
      this.selectGoodsOrder()
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

