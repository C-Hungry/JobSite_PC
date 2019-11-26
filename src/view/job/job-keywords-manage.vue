<template>
  <div>
    <div class="search-box">
      <Button class="mr5" type="primary" icon="md-sync" @click="refresh()">刷新列表</Button>
      <Button type="warning" icon="md-add" @click="add()">新增关键字</Button>
    </div>
    <Table border :columns="columns" :data="userList" :loading="loading">
      <template slot-scope="{ row }" slot="action">
        <!-- <Button class="mr5" type="primary" size="small" @click="modify(row)">编辑</Button> -->
        <Poptip
          confirm
          transfer
          placement="top-end"
          title="确定要删除该关键字吗？"
          @on-ok="del(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
    <Modal
      v-model="isShowEditModal"
      :title="`新增关键字`"
      @on-ok="modifyConfirm"
      width="400px"
    >
      <Form class="mt20 pr50" ref="formCustom" :model="formData" :rules="formRule" :label-width="120">
        <FormItem label="关键字名称：" prop="Name">
          <Input type="text" v-model="formData.Name"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getJobKeyWordsList, addJobKeyWords, deleteJobKeyWords } from '@/api/job'
export default {
  data () {
    return {
      loading: false,
      isShowEditModal: false,
      param: {
        PageIndex: 1,
        PageSize: 15
      },
      formData: {
        Id: '',
        Name: '',
        RealName: '',
        Phone: ''
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: '关键字名称',
          key: 'Name'
        },
        {
          title: '使用次数',
          key: 'UseCount'
        },
        {
          title: '创建时间',
          key: 'DateAdded'
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
        Name: [{ required: true, trigger: 'blur', message: '关键字名称不能为空' }]
      }
    }
  },
  methods: {
    // 获取关键字列表
    getJobKeyWordsList () {
      this.loading = true
      getJobKeyWordsList(this.param)
        .then(res => {
          this.userList = res.Data
          this.total = res.Total
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页器
    onPageIndexChange (index) {
      this.param.PageIndex = index
      this.getJobKeyWordsList()
    },
    refresh () {
      this.param.PageIndex = 1
      this.getJobKeyWordsList()
    },
    // 新增
    add () {
      this.formData = {
        Id: '',
        Name: '',
        RealName: '',
        Phone: ''
      }
      this.$refs['formCustom'].resetFields()
      this.isShowEditModal = true
    },
    // 确定编辑
    modifyConfirm () {
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          addJobKeyWords(this.formData).then(res => {
            this.$Notice.success({ title: '关键字新增成功' })
            this.getJobKeyWordsList()
          })
        }
      })
    },
    // 删除关键字
    del (item) {
      deleteJobKeyWords({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '关键字删除成功' })
        this.getJobKeyWordsList()
      })
    }
  },
  mounted () {
    this.getJobKeyWordsList()
  }
}
</script>
