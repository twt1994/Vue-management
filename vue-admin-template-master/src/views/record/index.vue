<template>
  <div class="app-container">
    <div class="user">
      订单编号:&nbsp;<el-input
        v-model = "orderNum"
        clearable
        style="width:200px;margin-right:30px;"/>
      ASIN:&nbsp;<el-input
        v-model = "number"
        clearable
        style="width:200px;margin-right:30px;"/>
      站点:&nbsp;<el-select v-model="value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" style="margin-left:30px;">搜索</el-button>
    </div>
    <el-tabs type="border-card" style="margin-top:25px;" @tab-click="handleClick">
      <el-tab-pane name="0" label="所有订单(162)">
        <div class="table" style="margin-top:20px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="订单编号" width="180" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="站点" width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.country }}</span>
              </template>
            </el-table-column>
            <el-table-column label="ASIN" width="150" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ASIN }}</span>
              </template>
            </el-table-column>
            <el-table-column label="总价" width="150" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.allmoney }}</span>
              </template>
            </el-table-column>
            <el-table-column label="物流单号" width="150" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.logistics }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane name="1" label="待付款(16)"/>
      <el-tab-pane name="2" label="待审核(16)"/>
      <el-tab-pane name="3" label="交易成功(65)"/>
      <el-tab-pane name="4" label="驳回(65)"/>
    </el-tabs>
    <div class="block" style="margin-top:50px;text-align: right;">
      <el-pagination
        :current-page="currentPage4"
          @size-change="handleSizeChange"
        :page-sizes="[100, 200, 300, 400]"
          @current-change="handleCurrentChange"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage4: 4,
      orderNum: '',
      number: '',
      options: [
        {
          value: '1',
          label: '全部'
        },
        {
          value: '2',
          label: '美国'
        },
        {
          value: '3',
          label: '澳大利亚'
        }
      ],
      value: '1',
      tableData: [
        {
          number: '201809202319164687',
          country: '美国',
          ASIN: 'B06Y298SZ4',
          allmoney: '18294元',
          logistics: '2615615615116',
          status: '状态',
          date: '2018-9-22 11:41:16'
        },
        {
          number: '201809202319164687',
          country: '美国',
          ASIN: 'B06Y298SZ4',
          allmoney: '18294元',
          logistics: '2615615615116',
          status: '状态',
          date: '2018-9-22 11:41:16'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

