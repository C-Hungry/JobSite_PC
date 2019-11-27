<template>
  <div>
    <Form class="mt20 mb100" ref="formCustom" :label-width="120">
      <FormItem label="顶部banner：" prop="Images">
        <image-upload :defaultImages="formData.TopBanner" @onUploadChange="onTopBannerUploadChange"></image-upload>
      </FormItem>
      <FormItem label="分类图标：" prop="Images">
        <image-upload :defaultImages="formData.CategoryIcons" @onUploadChange="onCategoryIconsUploadChange"></image-upload>
      </FormItem>
      <FormItem label="中间banner：" prop="Images">
        <image-upload :defaultImages="formData.CenterBanner" @onUploadChange="onCenterBannerUploadChange"></image-upload>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" :disabled="loading" icon="md-checkmark" class="mr20" @click="save()">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {
  h5HomeSet,
  getH5HomeInfo
} from '@/api/website'
import imageUpload from '@/components/image-upload'
export default {
  components: {
    imageUpload
  },
  data () {
    return {
      loading: false,
      formData: {
        TopBanner: [],
        CategoryIcons: [],
        CenterBanner: []
      }
    }
  },
  methods: {
    // 顶部banner
    onTopBannerUploadChange (data) {
      let images = []
      data.forEach(item => {
        images.push(item.name)
      })
      this.formData.TopBanner = images
    },
    // 分类图标
    onCategoryIconsUploadChange (data) {
      let images = []
      data.forEach(item => {
        images.push(item.name)
      })
      this.formData.CategoryIcons = images
    },
    // 中间banner
    onCenterBannerUploadChange (data) {
      let images = []
      data.forEach(item => {
        images.push(item.name)
      })
      this.formData.CenterBanner = images
    },
    // 获取岗位详情
    getJobInfo () {
      getJobInfo({ Id: this.jobId }).then(data => {
        this.formData = data
        this.formData.Images = data.Images || []
        this.formData.KeyWordsList = this.formData.KeyWords.split(',')
      })
    },
    // 保存并发布
    save () {
      if (this.formData.TopBanner.length == 0) {
        this.$Notice.warning({
          title: '顶部banner不能为空'
        })
        return
      }
      if (this.formData.CategoryIcons.length == 0) {
        this.$Notice.warning({
          title: '分类图标不能为空'
        })
        return
      }
      if (this.formData.CenterBanner.length == 0) {
        this.$Notice.warning({
          title: '中间banner不能为空'
        })
        return
      }
      let data = {
        TopBanner: this.formData.TopBanner.join(','),
        CategoryIcons: this.formData.CategoryIcons.join(','),
        CenterBanner: this.formData.CenterBanner.join(',')
      }
      this.loading = true
      h5HomeSet(data).then(res => {
        this.$Notice.success({ title: 'H5首页设置成功' })
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted () {
  }
}
</script>
