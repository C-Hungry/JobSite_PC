<template>
  <div>
    <div class="upload-list" v-for="item in uploadList">
      <img :src="item.url" />
      <div class="upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="10240"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="actionUrl"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="查看图片" v-model="visible">
      <img
        :src="imgName"
        v-if="visible"
        style="width: 100%"
      />
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    defaultImages: {
      type: Array,
      default () {
        return []
      }
    },
    maxLength: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  computed: {
    baseUrl () {
      return this.$config.baseUrl.pro
    },
    actionUrl () {
      return this.$config.baseUrl.pro + '/api/UploadFile/UploadImage'
    }
  },
  watch: {
    defaultImages: {
      deep: true,
      handler (newVal) {
        newVal = newVal || []
        let list = []
        newVal.length && newVal.forEach(item => {
          list.push({
            name: item,
            url: item
          })
        })
        this.uploadList = list
      }
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.uploadList.splice(fileList.indexOf(file), 1)
      this.$emit('onUploadChange', this.uploadList)
    },
    handleSuccess (res, file) {
      if (res.Data && res.Data.length) {
        this.uploadList.push({
          name: res.Data[0],
          url: res.Data[0]
        })
        this.$emit('onUploadChange', this.uploadList)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({ title: '图片格式不正确，目前仅支持jpg，jpeg，png' })
    },
    handleMaxSize (file) {
      this.$Notice.warning({ title: '图片太大了，上传图片不能超过10M' })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.maxLength
      if (!check) {
        this.$Notice.warning({ title: `最多支持上传${this.maxLength}张图片` })
      }
      return check
    }
  },
  mounted () {

  }
}
</script>
<style>
.upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.upload-list img {
  width: 100%;
  height: 100%;
}
.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.upload-list:hover .upload-list-cover {
  display: block;
}
.upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
