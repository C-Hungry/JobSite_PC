<template>
  <div>
    <div class="search-box">
      <Input type="text" v-model="param.Keys" placeholder="咨询内容" class="w200 mr5"></Input>
      <Button type="primary" icon="md-search" class="mr5" @click="refresh">查询</Button>
    </div>
    <Table border :columns="columns" :data="questionList" :loading="loading">
      <template slot-scope="{ row }" slot="Status">
        <Tag v-if="row.Status == 1" color="success">未回复</Tag>
        <span v-else-if="row.Status == 2">已回复</span>
        <span v-else>已关闭</span>
      </template>
      <template slot-scope="{ row }" slot="ReplyDate">
        <span>{{row.ReplyDate && $moment(row.ReplyDate).format('YYYY-MM-DD HH:MM:SS')}}</span>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button v-if="row.Status == 1" class="mr5" type="primary" size="small" @click="reply(row)">回复</Button>
        <Poptip v-if="row.Status != 3" confirm transfer placement="top-end" title="确定要关闭该用户吗？" @on-ok="close(row)">
          <Button type="error" size="small">关闭</Button>
        </Poptip>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
    <Modal
      v-model="isShowReplyModal"
      title="回复"
      width="600px"
    >
      <Form
        class="mt20 pr30"
        ref="formCustom"
        :model="formData"
        :rules="formRule"
        :label-width="30"
      >
        <FormItem prop="Reply">
          <Input type="textarea" :rows="4" v-model="formData.Reply"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="isShowReplyModal=false">取消</Button>
        <Button type="primary" size="large" :loading="modalLoading" :disabled="modalLoading" @click="replyConfirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getQuestionList, replyQuestion, closeQuestion } from '@/api/consult'
export default {
  name: 'consult-manage',
  data () {
    return {
      loading: false,
      modalLoading: false,
      isShowReplyModal: false,
      param: {
        Keys: '',
        PageIndex: 1,
        PageSize: 10
      },
      formData: {
        Id: '',
        Reply: ''
      },
      questionList: [],
      total: 0,
      columns: [
        {
          title: '问题内容',
          key: 'Qusetion',
          minWidth: 200
        },
        {
          title: '提问人',
          key: 'NickName',
          width: 90
        },
        {
          title: '提问时间',
          key: 'DateAdded',
          width: 160
        },
        {
          title: '回复内容',
          key: 'Reply',
          minWidth: 200
        },
        {
          title: '回复人',
          key: 'ReplyUserReal',
          width: 90
        },
        {
          title: '回复时间',
          slot: 'ReplyDate',
          width: 160
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
    getQuestionList () {
      this.loading = true
      getQuestionList(this.param)
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
      this.getQuestionList()
    },
    refresh () {
      this.param.PageIndex = 1
      this.getQuestionList()
    },
    // 编辑
    reply (item) {
      this.formData = {
        Id: item.Id,
        Reply: ''
      }
      this.$refs['formCustom'].resetFields()
      this.isShowReplyModal = true
    },
    // 确定编辑
    replyConfirm () {
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          replyQuestion(this.formData).then(res => {
            this.isShowReplyModal = false
            this.$Notice.success({ title: '回复成功' })
            this.param.PageIndex = 1
            this.getQuestionList()
          }).finally(() => {
            this.modalLoading = false
          })
        }
      })
    },
    // 关闭
    close (item) {
      closeQuestion({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '关闭成功' })
        this.getQuestionList()
      })
    }
  },
  mounted () {
    this.getQuestionList()
  }
}
</script>
