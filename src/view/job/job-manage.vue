<template>
  <div>
    <div class="search-box">
      <Input type="text" v-model="param.Keys" placeholder="请输入关键字" class="w200 mr5"></Input>
      <Button type="primary" icon="md-search" class="mr5" @click="refresh()">查询</Button>
      <Button type="warning" icon="md-add" @click="add()">新增岗位</Button>
    </div>
    <Table border :columns="columns" :data="userList" :loading="loading">
      <template slot-scope="{ row }" slot="title">
        {{row.Title}}
        <Tag class="ml5" v-if="row.IsRecommend" size="small" color="red">推荐</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button class="mr5" type="primary" size="small" @click="modify(row)">编辑</Button>
        <Poptip confirm transfer placement="top-end" title="确定要删除该岗位吗？" @on-ok="del(row)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
        <!-- <Button type="error" size="small" @click="del(row)">删除</Button> -->
      </template>
    </Table>
    <Page class="mt15 fr" :total="total" :current="param.PageIndex" @on-change="onPageIndexChange"></Page>
    <Modal
      v-model="isShowEditModal"
      :title="`${modalType == 'add' ? '新增' : '编辑'}岗位`"
      @on-ok="modifyConfirm"
      width="400px"
    >
      <Form
        class="mt20 pr50"
        ref="formCustom"
        :model="formData"
        :rules="formRule"
        :label-width="120"
      >
        <FormItem v-if="modalType == 'add'" label="岗位名：" prop="UserName">
          <Input type="text" v-model="formData.UserName"></Input>
        </FormItem>
        <FormItem label="真实姓名：" prop="RealName">
          <Input type="text" v-model="formData.RealName"></Input>
        </FormItem>
        <FormItem label="手机号码：" prop="Phone">
          <Input type="text" v-model="formData.Phone"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getJobList, addJob, updateJob, deleteJob } from "@/api/job";
export default {
  data() {
    return {
      loading: false,
      isShowEditModal: false,
      modalType: "add",
      param: {
        PageIndex: 1,
        PageSize: 15,
        Keys: ""
      },
      formData: {
        Id: "",
        UserName: "",
        RealName: "",
        Phone: ""
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: "标题",
          slot: "title",
          minWidth: 100
        },
        {
          title: "厂发工资(元/时)",
          key: "SalaryByFactory",
          width: 130
        },
        {
          title: "综合月薪(元)",
          key: "TotalSalary",
          width: 110
        },
        {
          title: "公司名称",
          key: "CompanyName",
          width: 130
        },
        {
          title: "录用条件",
          key: "EmployCondition",
          minWidth: 130
        },
        {
          title: "推荐次数",
          key: "RecommendNumber",
          width: 90
        },
        {
          title: "岗位状态",
          key: "Status",
          width: 90
        },
        {
          title: "创建人",
          key: "UserNameAdded",
          width: 90
        },
        {
          title: "创建时间",
          key: "DateAdded",
          width: 150
        },
        {
          title: "更新时间",
          key: "DateModify",
          width: 150
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      formRule: {
        UserName: [
          { required: true, trigger: "blur", message: "岗位名不能为空" }
        ],
        RealName: [
          { required: true, trigger: "blur", message: "真实姓名不能为空" }
        ],
        Phone: [
          { required: true, trigger: "blur", message: "手机号码不能为空" }
        ]
      }
    };
  },
  methods: {
    // 获取岗位列表
    getJobList() {
      this.loading = true;
      getJobList(this.param)
        .then(res => {
          this.userList = res.Data;
          this.total = res.Total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 分页器
    onPageIndexChange(index) {
      this.param.PageIndex = index;
      this.getJobList();
    },
    refresh() {
      this.param.PageIndex = 1;
      this.getJobList();
    },
    // 新增
    add() {
      this.formData = {
        Id: "",
        UserName: "",
        RealName: "",
        Phone: ""
      };
      this.modalType = "add";
      this.$refs["formCustom"].resetFields();
      this.isShowEditModal = true;
    },
    // 编辑
    modify(item) {
      this.formData = {
        Id: item.Id,
        UserName: item.UserName,
        RealName: item.RealName,
        Phone: item.Phone
      };
      this.modalType = "update";
      this.$refs["formCustom"].resetFields();
      this.isShowEditModal = true;
    },
    // 确定编辑
    modifyConfirm() {
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          if (this.modalType == "update") {
            updateJob(this.formData).then(res => {
              this.$Notice.success({ title: "岗位编辑成功" });
              this.param.PageIndex = 1;
              this.getJobList();
            });
          } else {
            addJob(this.formData).then(res => {
              this.$Notice.success({ title: "岗位新增成功" });
              this.getJobList();
            });
          }
        }
      });
    },
    // 删除岗位
    del(item) {
      deleteJob({ Id: item.Id }).then(res => {
        this.$Notice.success({ title: "岗位删除成功" });
        this.getJobList();
      });
    }
  },
  mounted() {
    this.getJobList();
  }
};
</script>
