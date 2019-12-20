<template>
  <div>
    <div class="search-box">
      <Input type="text" v-model="param.Keys" placeholder="昵称/手机号/姓名" class="w200 mr5"></Input>
      <RadioGroup class="mr5" @on-change="getCashOutList" v-model="param.Status" type="button">
        <Radio :label="0">全部</Radio>
        <Radio :label="1">已申请</Radio>
        <Radio :label="2">已打款</Radio>
        <Radio :label="3">已拒绝</Radio>
      </RadioGroup>
      <Button type="primary" icon="md-search" class="mr5" @click="refresh">查询</Button>
    </div>
    <Table border :columns="columns" :data="questionList" :loading="loading">
      <template slot-scope="{ row }" slot="Status">
        <Tag v-if="row.Status == 1" color="success">已申请</Tag>
        <span v-else-if="row.Status == 2">已打款</span>
        <span v-else>已拒绝</span>
      </template>
      <template slot-scope="{ row }" slot="NickName">
        <span>{{row.RealName || row.NickName}}</span>
      </template>
      <template slot-scope="{ row }" slot="ConfirmDate">
        <span>{{row.ConfirmDate && $moment(row.ConfirmDate).format('YYYY-MM-DD HH:MM:SS')}}</span>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Poptip v-if="row.Status == 1" confirm transfer placement="top-end" title="确定要关闭该用户吗？" @on-ok="confirmCashOut(row)">
          <Button type="primary" size="small">确认已打款</Button>
        </Poptip>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
  </div>
</template>
<script>
import { getCashOutList, confirmCashOut } from '@/api/cash'
export default {
  name: 'cash-manage',
  data () {
    return {
      loading: false,
      param: {
        Keys: '', // 昵称 手机号 姓名
        Status: '', // 0全部 1已申请2已打款3已拒绝
        PageIndex: 1,
        PageSize: 10
      },
      formData: {
        Id: ''
      },
      questionList: [],
      total: 0,
      columns: [
        {
          title: '申请人',
          slot: 'NickName'
        },
        {
          title: '提款金额',
          key: 'Money'
        },
        {
          title: '申请时间',
          key: 'DateAdded'
        },
        {
          title: '确认人',
          key: 'UserNameConfirm'
        },
        {
          title: '确认时间',
          slot: 'ConfirmDate'
        },
        {
          title: '状态',
          slot: 'Status',
          width: 100
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          fixed: 'right',
          align: 'center'
        }
      ],
      formRule: {
        Reply: [
          { required: true, trigger: 'blur', message: '回复内容不能为空' }
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    getCashOutList () {
      this.loading = true
      getCashOutList(this.param)
        .then(res => {
          this.questionList = res.Data
          this.total = res.TotalRows
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页器
    onPageIndexChange (index) {
      this.param.PageIndex = index
      this.getCashOutList()
    },
    refresh () {
      this.param.PageIndex = 1
      this.getCashOutList()
    },
    // 确定编辑
    confirmCashOut (item) {
      confirmCashOut({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '操作成功' })
        this.param.PageIndex = 1
        this.getCashOutList()
      })
    }
  },
  mounted () {
    this.getCashOutList()
  }
}
</script>
