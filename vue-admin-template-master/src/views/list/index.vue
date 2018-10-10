<template>
  <div class="app-container">
    <div class="user">
      用户名:&nbsp;<el-input
        v-model = "tradeRecordData.phone"
        placeholder ="请输入用户名"
        clearable
        style="width:200px;margin-right:30px;"/>
      等级:&nbsp;<el-select v-model="tradeRecordData.lv">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" style="margin-left:20px;">搜索</el-button>
    </div>
    <div class="table" style="margin-top:30px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户编号" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.numbner }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户余额" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户等级" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户剩余积分" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.points }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改等级</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">充值</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleLook(scope.$index, scope.row)">交易记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:50px;text-align: right;">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
	import { setToken } from '@/utils/auth'
	import API from '@/utils/api'

export default {
  data() {
    return {
      tradeRecordData: {
        phone: 15038232374,
        lv:'',
        current:'',
        size:''
      },
      // userName: '',
      phone: 15038232374,
      currentPage4: 1,
      options: [
        {
          value: '1',
          label: '白银会员'
        },
        {
          value: '2',
          label: '黄金会员'
        },
        {
          value: '3',
          label: '钻石会员'
        }
      ],
      value: '1',
      tableData: [{
        numbner: '1',
        name: '12345678901',
        money: '16元',
        grade: '白银等级',
        points: '36',
        date: '2018-9-22 11:41:16'
      },
      {
        numbner: '2',
        name: '12345678901',
        money: '16元',
        grade: '白银等级',
        points: '36',
        date: '2018-9-22 11:41:16'
      },
      {
        numbner: '3',
        name: '12345678901',
        money: '16元',
        grade: '白银等级',
        points: '36',
        date: '2018-9-22 11:41:16'
      },
      {
        numbner: '4',
        name: '12345678901',
        money: '16元',
        grade: '白银等级',
        points: '36',
        date: '2018-9-22 11:41:16'
      }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getList() // 页面进来第一次加载用户列表数据
  },
  methods: {
    // 用户列表数据
    getList(){
				API.getList(this.tradeRecordData).then(res => {
					
				})
			},
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleLook(index, row) {
      console.log(index, row)
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
