<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar icon="ios-person" size="small"/>
      {{$store.state.user.userName || '未登录'}}
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="modifyPassword">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal
      v-model="isShowEditModal"
      title="修改密码"
      @on-ok="modifyPasswordConfirm"
      width="400px"
    >
      <Form
        class="mt20 pr50"
        ref="formCustom"
        :model="formData"
        :rules="formRule"
        :label-width="120"
      >
        <FormItem label="旧密码：" prop="Password">
          <Input type="password" v-model="formData.Password"></Input>
        </FormItem>
        <FormItem label="新密码：" prop="NewPassword">
          <Input type="password" v-model="formData.NewPassword"></Input>
        </FormItem>
        <FormItem label="再次输入：" prop="NewPasswordConfirm">
          <Input type="password" v-model="formData.NewPasswordConfirm"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import { updateUserPassword } from '@/api/user'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isShowEditModal: false,
      formData: {
        Password: '',
        NewPassword: '',
        NewPasswordConfirm: ''
      },
      formRule: {
        Password: [
          { required: true, trigger: 'blur', message: '旧密码不能为空' }
        ],
        NewPassword: [
          { required: true, trigger: 'blur', message: '新密码不能为空' }
        ],
        NewPasswordConfirm: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.formData.NewPassword) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    modifyPassword () {
      this.formData = {
        Password: '',
        NewPassword: '',
        NewPasswordConfirm: ''
      }
      this.isShowEditModal = true
    },
    modifyPasswordConfirm () {
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          updateUserPassword(this.formData).then(res => {
            this.$Notice.success({ title: '密码修改成功，请重新登录' })
          })
        }
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'modifyPassword':
          this.modifyPassword()
          break
      }
    }
  }
}
</script>
