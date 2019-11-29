<template>
  <div>
    <div class="search-box">
      <Button class="mr5" type="primary" icon="md-sync" @click="refresh()">刷新列表</Button>
      <Button type="warning" icon="md-add" @click="add()">新增用户</Button>
    </div>
    <Table border :columns="columns" :data="userList" :loading="loading">
      <template slot-scope="{ row }" slot="action">
        <Button class="mr5" type="primary" size="small" @click="modify(row)">编辑</Button>
        <Poptip v-if="$store.getters.isAdmin" confirm transfer placement="top-end" title="确定要重置该用户的密码吗？" @on-ok="resetUserPassword(row)">
          <Button class="mr5" type="warning" size="small">重置密码</Button>
        </Poptip>
        <Poptip confirm transfer placement="top-end" title="确定要删除该用户吗？" @on-ok="del(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
    <Modal
      v-model="isShowEditModal"
      :title="`${modalType == 'add' ? '新增' : '编辑'}用户`"
      width="400px"
    >
      <Form
        class="mt20 pr50"
        ref="formCustom"
        :model="formData"
        :rules="formRule"
        :label-width="120"
      >
        <FormItem v-if="modalType == 'add'" label="用户名：" prop="UserName">
          <Input type="text" v-model="formData.UserName"></Input>
        </FormItem>
        <FormItem label="真实姓名：" prop="RealName">
          <Input type="text" v-model="formData.RealName"></Input>
        </FormItem>
        <FormItem label="手机号码：" prop="Phone">
          <Input type="text" v-model="formData.Phone"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" @click="isShowEditModal=false">确定</Button>
        <Button type="primary" size="large" :loading="modalLoading" :disabled="modalLoading" @click="modifyConfirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getUserList, addUser, updateUser, deleteUser, resetUserPassword } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      modalLoading: false,
      isShowEditModal: false,
      modalType: 'add',
      param: {
        PageIndex: 1,
        PageSize: 10
      },
      formData: {
        Id: '',
        UserName: '',
        RealName: '',
        Phone: ''
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: '用户名',
          key: 'UserName'
        },
        {
          title: '真实姓名',
          key: 'RealName'
        },
        {
          title: '手机号码',
          key: 'Phone'
        },
        {
          title: '创建时间',
          key: 'DateAdded'
        },
        {
          title: '更新时间',
          key: 'DateModify'
        },
        {
          title: '操作',
          slot: 'action',
          width: this.$store.getters.isAdmin ? 220 : 150,
          fixed: 'right',
          align: 'center'
        }
      ],
      formRule: {
        UserName: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        RealName: [
          { required: true, trigger: 'blur', message: '真实姓名不能为空' }
        ],
        Phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('手机号码不能为空'))
              } else {
                if (!/^1\d{10}$/.test(value)) {
                  callback(new Error('手机号码格式正确'))
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    getUserList () {
      this.loading = true
      getUserList(this.param)
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
      this.getUserList()
    },
    refresh () {
      this.param.PageIndex = 1
      this.getUserList()
    },
    // 新增
    add () {
      this.formData = {
        Id: '',
        UserName: '',
        RealName: '',
        Phone: ''
      }
      this.modalType = 'add'
      this.$refs['formCustom'].resetFields()
      this.isShowEditModal = true
    },
    // 编辑
    modify (item) {
      this.formData = {
        Id: item.Id,
        UserName: item.UserName,
        RealName: item.RealName,
        Phone: item.Phone
      }
      this.modalType = 'update'
      this.$refs['formCustom'].resetFields()
      this.isShowEditModal = true
    },
    // 确定编辑
    modifyConfirm () {
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          this.modalLoading = true
          if (this.modalType == 'update') {
            updateUser(this.formData).then(res => {
              this.isShowEditModal = false
              this.$Notice.success({ title: '用户编辑成功' })
              this.param.PageIndex = 1
              this.getUserList()
            }).finally(() => {
              this.modalLoading = false
            })
          } else {
            addUser(this.formData).then(res => {
              this.isShowEditModal = false
              this.$Notice.success({ title: '用户新增成功' })
              this.getUserList()
            }).finally(() => {
              this.modalLoading = false
            })
          }
        }
      })
    },
    // 删除用户
    del (item) {
      deleteUser({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '用户删除成功' })
        this.getUserList()
      })
    },
    // 重置密码
    resetUserPassword (item) {
      resetUserPassword({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: '重置密码成功' })
        this.getUserList()
      })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>
