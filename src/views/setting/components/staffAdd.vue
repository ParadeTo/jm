<template>
  <div>
    <el-dialog title="添加员工" :visible="dialogVisible" width="440px" @close="cancel">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style="width: 300px; margin-left:20px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 195px;" v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="identity">
          <el-input style="width: 195px;" v-model="formModel.identity" />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input style="width: 80px;" v-model="formModel.smsCode" />
          <el-button type="primary" v-waves @click="getCaptcha">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <role-select v-model="formModel.roleId" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button type="primary" @click="confirm" :loading="loading">确定</el-button>
        <el-button @click="cancel">返回</el-button>
      </div>
      <!-- <el-form
          ref="dataForm"
          :rules="rules"
          :model="formModel"
          label-position="right"
          label-width="100px"
          style='width: 300px; margin-left:20px;'
        >
          <el-form-item label="设置权限" prop="phone">
            <el-select clearable style="width: 130px" v-model="formModel.cashier" placeholder="请选择权限">
              <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button type="primary" @click="complete" :loading="loading">完成</el-button>
          <el-button @click="cancel">返回</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import { addMember } from "@/api/ma/user";
import { genVercode } from "@/api/ma/user";

export default {
  props: ["dialogVisible"],
  data() {
    return {
      loading: false,
      formModel: {
        identity: "",
        smsCode: "",
        roleId: "",
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: ["blur", "change"] }
        ],
        smsCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        identity: [
          {
            required: true,
            // message: "请输入手机号",
            validator: (rule, value, callback) => {
              if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
                callback(new Error("请输入正确的手机号"))
              } else {
                callback()
              }
            },
            trigger: ["blur"]
          }
        ]
        // : [{ required: true, message: '请输入手机号', trigger: 'change' }]
        // category: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // parent: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      },
      forFields: [
        {
          key: "name",
          label: "名称"
        },
        {
          key: "category",
          label: "所属类目"
        },
        {
          key: "parent",
          label: "上级名称"
        }
      ],
      categoryList: [
        {
          key: 0,
          label: "全部"
        }
      ],
      treeList: [
        {
          key: "1",
          label: "日用百货",
          level: 0
        },
        {
          key: "2",
          label: "衣物清洁",
          level: 1
        },
        {
          key: "3",
          label: "洗涤液",
          level: 2
        }
      ]
    };
  },

  methods: {
    async getCaptcha() {
      try {
        await this.$refs.dataForm.validateField('identity')
        genVercode(this.formModel.identity)
      } catch (e) {
        console.log(e)
      }
    },
    setInVisible(type) {
      this.$emit("close", type);
    },
    cancel() {
      this.setInVisible("cancel");
    },
    confirm() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          addMember(this.formModel);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.setInVisible("confirm");
    }
  }
};
</script>

