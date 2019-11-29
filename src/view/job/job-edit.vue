<template>
  <div>
    <Form class="mt20 mb100" ref="formCustom" :model="formData" :rules="formRule" :label-width="120">
      <FormItem label="标题：" prop="Title">
        <Input class="w300" type="text" v-model="formData.Title"></Input>
      </FormItem>
      <FormItem label="厂发工资：" prop="SalaryByFactory">
        <Input class="w150" type="text" v-model.number="formData.SalaryByFactory">
          <span slot="append">元/时</span>
        </Input>
      </FormItem>
      <FormItem label="岗位环境图片：" prop="Images">
        <image-upload :defaultImages="formData.Images" @onUploadChange="onUploadChange"></image-upload>
      </FormItem>
      <FormItem label="综合月薪：" prop="TotalSalary">
        <Input class="w150" type="text" v-model="formData.TotalSalary">
          <span slot="append">元</span>
        </Input>
      </FormItem>
      <FormItem label="关键词：" prop="KeyWords">
        <CheckboxGroup class="w900" v-model="formData.KeyWordsList">
          <Checkbox v-for="item in jobKeyWordsList" :key="item.Id" :label="item.Name"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="补贴描述：" prop="Allowance">
        <vue-editor style="background: #fff;" class="w900" v-model="formData.Allowance" />
      </FormItem>
      <FormItem label="薪酬福利：" prop="SalaryDesc">
        <vue-editor style="background: #fff;" class="w900" v-model="formData.SalaryDesc" />
      </FormItem>
      <FormItem label="录用条件：" prop="EmployCondition">
        <vue-editor style="background: #fff;" class="w900" v-model="formData.EmployCondition" />
      </FormItem>
      <FormItem label="岗位介绍：" prop="JobDesc">
        <vue-editor style="background: #fff;" class="w900" v-model="formData.JobDesc" />
      </FormItem>
      <FormItem label="公司名称：" prop="CompanyName">
        <Input class="w300" type="text" v-model="formData.CompanyName"></Input>
      </FormItem>
      <FormItem label="公司地址：" prop="CompanyAddress">
        <Input class="w300" type="text" v-model="formData.CompanyAddress"></Input>
      </FormItem>
      <FormItem label="公司描述：" prop="CompanyDesc">
        <vue-editor style="background: #fff;" class="w900" v-model="formData.CompanyDesc" />
      </FormItem>
    </Form>
    <div class="btn-box">
      <Button type="primary" icon="md-checkmark" class="mr20" @click="save()">保存并发布</Button>
      <Button type="warning" icon="md-close" @click="cancel()">取消</Button>
    </div>
  </div>
</template>
<script>
import {
  updateJob,
  getJobInfo,
  getJobKeyWordsList,
  addJobKeyWords
} from '@/api/job'
import imageUpload from '@/components/image-upload'
export default {
  components: {
    imageUpload
  },
  data () {
    return {
      loading: false,
      jobKeyWordsList: [],
      imageList: [],
      formData: {
        Id: '',
        Title: '',
        SalaryByFactory: '',
        Images: [],
        Allowance: '',
        SalaryDesc: '',
        EmployCondition: '',
        JobDesc: '',
        CompanyDesc: '',
        KeyWords: '',
        KeyWordsList: [],
        TotalSalary: '',
        CompanyName: '',
        CompanyAddress: ''
      },
      formRule: {
        Title: [
          { required: true, trigger: 'blur', message: '标题不能为空' }
        ],
        SalaryByFactory: [
          { required: true, type: 'number', trigger: 'blur', message: '厂发工资不能为空' }
        ],
        // Images: [
        //   { required: true, trigger: "blur", message: "岗位环境图片不能为空" }
        // ],
        Allowance: [
          { required: true, trigger: 'blur', message: '补贴描述不能为空' }
        ],
        SalaryDesc: [
          { required: true, trigger: 'blur', message: '薪酬福利不能为空' }
        ],
        EmployCondition: [
          { required: true, trigger: 'blur', message: '录用条件不能为空' }
        ],
        JobDesc: [
          { required: true, trigger: 'blur', message: '岗位介绍不能为空' }
        ],
        CompanyDesc: [
          { required: true, trigger: 'blur', message: '公司描述不能为空' }
        ],
        KeyWordsList: [
          { required: true, type: 'array', min: 1, message: '关键词不能为空', trigger: 'change' }
        ],
        TotalSalary: [
          { required: true, trigger: 'blur', message: '综合月薪不能为空' }
        ],
        CompanyName: [
          { required: true, trigger: 'blur', message: '公司名称不能为空' }
        ],
        CompanyAddress: [
          { required: true, trigger: 'blur', message: '公司地址不能为空' }
        ]
      }
    }
  },
  computed: {
    jobId () {
      return this.$route.query.id
    }
  },
  methods: {
    // 上传图片
    onUploadChange (data) {
      let images = []
      data.forEach(item => {
        images.push(item.name)
      })
      this.formData.Images = images
    },
    // 获取岗位关键词列表
    getJobKeyWordsList () {
      getJobKeyWordsList({
        PageIndex: 1,
        PageSize: 100
      }).then(res => {
        this.jobKeyWordsList = res.Data
      })
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
      this.$refs['formCustom'].validate(valid => {
        if (valid) {
          if (this.formData.Images.length == 0) {
            this.$Notice.warning({
              title: '岗位环境图片不能为空'
            })
            return
          }
          this.formData.KeyWords = this.formData.KeyWordsList.join(',')
          updateJob(this.formData).then(res => {
            this.$Notice.success({ title: '岗位新增成功' })
            this.$router.push({
              name: 'jobManage'
            })
          })
        }
      })
    },
    // 取消
    cancel () {
      this.$router.push({
        name: 'jobManage'
      })
    }
  },
  mounted () {
    this.getJobInfo()
    this.getJobKeyWordsList()
  }
}
</script>
