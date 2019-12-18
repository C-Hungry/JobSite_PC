<template>
  <div>
    <div class="search-box">
      <Input type="text" v-model="param.Keys" placeholder="昵称/姓名/电话号码" class="w200 mr5"></Input>
      <Button type="primary" icon="md-search" class="mr5" @click="refresh">查询</Button>
      <Button type="info" icon="md-download" @click="exportWechatUserList">导出</Button>
    </div>
    <Table border :columns="columns" :data="userList" :loading="loading">
      <template slot-scope="{ row }" slot="Sex">
        <span>{{row.Sex == 1 ? '男' : '女'}}</span>
      </template>
      <template slot-scope="{ row }" slot="Province">
        <span>{{row.Province + row.City}}</span>
      </template>
      <template slot-scope="{ row }" slot="BirthDay">
        <span>{{row.BirthDay && $moment(row.BirthDay).format('YYYY-MM-DD')}}</span>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
  </div>
</template>
<script>
import { getWechatUserList, exportWechatUserList } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      param: {
        Keys: '',
        PageIndex: 1,
        PageSize: 10
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: '昵称',
          key: 'NickName'
        },
        {
          title: '真实姓名',
          key: 'RealName',
          width: 90
        },
        {
          title: '手机号码',
          key: 'Phone',
          width: 120
        },
        {
          title: 'OpenId',
          key: 'OpenId'
        },
        {
          title: '性别',
          slot: 'Sex',
          width: 70
        },
        {
          title: '省份城市',
          slot: 'Province'
        },
        {
          title: '出生日期',
          slot: 'BirthDay'
        },
        {
          title: '兴趣爱好',
          key: 'Favorite'
        },
        {
          title: '邀请人',
          key: 'InviteUser'
        },
        {
          title: '创建时间',
          key: 'DateAdded'
        },
        {
          title: '更新时间',
          key: 'DateModify'
        }
      ]
    }
  },
  methods: {
    // 获取用户列表
    getWechatUserList () {
      this.loading = true
      getWechatUserList(this.param)
        .then(res => {
          this.userList = res.Data
          this.total = res.TotalRows
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页器
    onPageIndexChange (index) {
      this.param.PageIndex = index
      this.getWechatUserList()
    },
    refresh () {
      this.param.PageIndex = 1
      this.getWechatUserList()
    },
    // 导出
    exportWechatUserList () {
      exportWechatUserList().then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getWechatUserList()
  }
}
</script>
