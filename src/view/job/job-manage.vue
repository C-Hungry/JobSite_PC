<template>
  <div>
    <div class="search-box">
      <Input type="text" v-model="param.Keys" placeholder="请输入关键字" class="w200 mr5"></Input>
      <Button type="primary" icon="md-search" class="mr5" @click="refresh">查询</Button>
      <Button type="warning" icon="md-add" @click="add">新增岗位</Button>
    </div>
    <Table border :columns="columns" :data="userList" :loading="loading">
      <template slot-scope="{ row }" slot="title">
        {{row.Title}}<Tag class="ml5" v-if="row.IsRecommend" size="mini" color="red">推荐</Tag>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag
          class="ml5"
          size="small"
          :color="row.Status == 1 ? 'green':'red'"
        >{{ row.Status == 1 ? '已启用' : '已禁用' }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button class="mr5" type="primary" size="small" @click="modify(row)">编辑</Button>
        <Poptip
          confirm
          transfer
          placement="top-end"
          :title="row.IsRecommend == 1 ? '确定要取消推荐该岗位吗？' : '确定要推荐该岗位吗？'"
          @on-ok="recommend(row)"
        >
          <Button class="mr5" :type="row.IsRecommend == 1 ? 'warning' : 'success'" size="small">{{row.IsRecommend == 1 ? '取消推荐' : '平台推荐'}}</Button>
        </Poptip>
        <Poptip
          confirm
          transfer
          placement="top-end"
          :title="row.Status == 1 ? '确定要禁用该岗位吗？' : '确定要启用该岗位吗？'"
          @on-ok="forbid(row)"
        >
          <Button class="mr5" :type="row.Status == 1 ? 'warning' : 'success'" size="small">{{row.Status == 1 ? '禁用' : '启用'}}</Button>
        </Poptip>
        <Poptip confirm transfer placement="top-end" title="确定要删除该岗位吗？" @on-ok="del(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
  </div>
</template>
<script>
import {
  getJobList,
  addJob,
  updateJob,
  deleteJob,
  recommendJob,
  forbidJob
} from '@/api/job'
export default {
  data () {
    return {
      loading: false,
      param: {
        PageIndex: 1,
        PageSize: 10,
        Keys: ''
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: '标题',
          slot: 'title',
          minWidth: 200
        },
        {
          title: '厂发工资(元/时)',
          key: 'SalaryByFactory',
          width: 130
        },
        {
          title: '综合月薪(元)',
          key: 'TotalSalary',
          width: 110
        },
        {
          title: '公司名称',
          key: 'CompanyName',
          width: 130
        },
        {
          title: '公司地址',
          key: 'CompanyAddress',
          minWidth: 130
        },
        {
          title: '推荐次数',
          key: 'RecommendNumber',
          width: 90
        },
        {
          title: '岗位状态',
          slot: 'status',
          width: 100
        },
        {
          title: '创建人',
          key: 'UserNameAdded',
          width: 90
        },
        {
          title: '创建时间',
          key: 'DateAdded',
          width: 150
        },
        {
          title: '更新时间',
          key: 'DateModify',
          width: 150
        },
        {
          title: '操作',
          slot: 'action',
          width: 250,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    // 获取岗位列表
    getJobList () {
      this.loading = true
      getJobList(this.param)
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
      this.getJobList()
    },
    // 初始化
    refresh () {
      this.param.PageIndex = 1
      this.getJobList()
    },
    // 新增
    add () {
      this.$router.push({
        name: 'jobAdd'
      })
    },
    // 编辑
    modify (item) {
      this.$router.push({
        name: 'jobEdit',
        query: {
          id: item.Id
        }
      })
    },
    // 删除岗位
    del (item) {
      deleteJob({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '岗位删除成功' })
        this.getJobList()
      })
    },
    // 推荐/取消推荐岗位
    recommend (item) {
      recommendJob({
        Id: item.Id,
        Recommend: item.IsRecommend == 1 ? 0 : 1
      }).then(res => {
        this.$Notice.success({
          title: `${item.IsRecommend == 1 ? '取消推荐' : '推荐'}岗位成功`
        })
        this.getJobList()
      })
    },
    // 禁用/启用岗位
    forbid (item) {
      forbidJob({
        Id: item.Id,
        Status: item.Status == 1 ? 0 : 1
      }).then(res => {
        this.$Notice.success({
          title: `${item.Status == 1 ? '禁用' : '启用'}岗位成功`
        })
        this.getJobList()
      })
    }
  },
  mounted () {
    this.getJobList()
  }
}
</script>
