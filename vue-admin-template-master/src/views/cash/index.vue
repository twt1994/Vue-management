<template>
  <div class="app-container">
    <div class="cash">
      <div class="box">
        用户名:&nbsp;<el-input
          v-model = "userName"
          placeholder ="请输入用户名"
          clearable
          style="width:200px;margin-right:30px;"/>
        <span style="margin-left:20px;">选择时间：&nbsp;</span>&nbsp;
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
        <el-button type="primary" style="margin-left:20px;">搜索</el-button>
        <el-tabs type="border-card" style="margin-top:25px;" @tab-click="handleClick">
          <el-tab-pane name="0" label="所有(162)">
            <div class="table" style="margin-top:20px">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="用户名" width="120" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="提现金额" width="150" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cash }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="支付宝" width="150" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.zhifubao }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="收款名" width="150" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.takeName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="150" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="申请时间" width="200" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">通过</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane name="1" label="待审核(16)"/>
          <el-tab-pane name="2" label="审核通过(16)"/>
          <el-tab-pane name="3" label="驳回(65)"/>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage4: 4,
      userName: '',
      value6: '',
      tableData: [
        {
          name: '12345678901',
          cash: '16元',
          zhifubao: '156987@qq.com',
          takeName: '李四',
          status: '状态',
          date: '2018-9-22 11:41:16'
        },
        {
          name: '12345678901',
          cash: '16元',
          zhifubao: '156987@qq.com',
          takeName: '李四',
          status: '状态',
          date: '2018-9-22 11:41:16'
        },
        {
          name: '12345678901',
          cash: '16元',
          zhifubao: '156987@qq.com',
          takeName: '李四',
          status: '状态',
          date: '2018-9-22 11:41:16'
        },
        {
          name: '12345678901',
          cash: '16元',
          zhifubao: '156987@qq.com',
          takeName: '李四',
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
