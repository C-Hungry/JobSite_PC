<template>
  <div>
    <Form ref="formCustom" :model="formData" :rules="formRule" :label-width="80">
      <FormItem label="推荐奖励" prop="InviteReward">
        <Input class="w200" type="text" :disabled="loading" v-model="formData.InviteReward">
          <span slot="append">元</span>
        </Input>
      </FormItem>
      <FormItem>
        <Button
          class="w100"
          type="primary"
          :loading="loading"
          :disabled="loading"
          @click="setSystemConfig()"
        >保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { setSystemConfig, getSystemConfig } from '@/api/job'
export default {
  name: '',
  data () {
    return {
      loading: false,
      formData: {
        InviteReward: ''
      },
      formRule: {
        InviteReward: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('推荐奖励不能为空'))
              } else {
                if (!/^\d+$/.test(value)) {
                  callback(new Error('请输入非负整数'))
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
    setSystemConfig () {
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          this.loading = true
          setSystemConfig(this.formData)
            .then(res => {
              this.$Notice.success({ title: '设置成功' })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    getSystemConfig () {
      this.loading = true
      getSystemConfig({})
        .then(res => {
          this.formData.InviteReward = res.InviteReward
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.getSystemConfig()
  }
}
</script>

<style lang="less" scoped>
</style>
