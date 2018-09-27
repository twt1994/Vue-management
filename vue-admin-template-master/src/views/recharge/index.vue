<template>
  <div class="app-container">
    <div class="box">
      用户名:&nbsp;<el-input
        v-model = "userName"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      等级:&nbsp;<el-select v-model="value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <span style="margin-left:20px;">选择时间：&nbsp;</span>&nbsp;
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator=" 至 "
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-button type="primary" style="margin-left:20px;">搜索</el-button>
    </div>
    <div class="table" style="margin-top:30px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.recharge }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户余额" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值方式" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.way }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" min-width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:50px;text-align: right;">
      <div style="display: inherit;text-align: left;">总充值金额：1185元</div>
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
      userName: '',
      value6: '',
      options: [
        {
          value: '1',
          label: '支付宝'
        },
        {
          value: '2',
          label: '微信'
        },
        {
          value: '3',
          label: '后台充值'
        }
      ],
      value: '1',
      tableData: [{
        name: '12345678901',
        recharge: '16元',
        balance: '200元',
        way: '支付宝',
        user: 'admin',
        date: '2018-9-22 11:41:16'
      },
      {
        name: '12345678901',
        recharge: '16元',
        balance: '200元',
        way: '支付宝',
        user: 'admin',
        date: '2018-9-22 11:41:16'
      }
      ]
    }
  },
  watch: {

  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

