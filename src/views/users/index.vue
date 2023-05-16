<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item prop="studentNumber">
        <el-input
          v-model="queryParams.studentNumber"
          placeholder="学号"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" v-loading="loading">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleUpdate(scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="handleDelete(scope.row)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号" prop="studentNumber">
              <el-input v-model="form.studentNumber" placeholder="请输入学号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, update, del } from "@/api/users";
export default {
  data() {
    return {
      total: 10,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      columns: [
        {
          prop: "studentNumber",
          label: "学号",
          fixed: false,
        },
        {
          prop: "userName",
          label: "姓名",
          fixed: false,
        },
        {
          prop: "tel",
          label: "电话",
          fixed: false,
        },
        {
          prop: "role",
          label: "角色",
          fixed: false,
        },
      ],
      list: [],
      open: false,
      form: {},
      title: "",
      // 表单校验
      rules: {
        studentNumber: [
          { required: true, message: "学号不能为空", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        tel: [{ required: true, message: "电话不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志 */
    getList() {
      this.loading = true;
      list(
        this.queryParams,
        this.queryParams.pageNum,
        this.queryParams.pageSize
      ).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.pageNum = 1;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        studentNumber: "",
        userName: "",
        password: "",
        tel: "",
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = {
        ...row,
      };
      this.open = true;
      this.title = "修改用户";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            update(this.form).then((res) => {
              this.$message.success(res.message);
              this.open = false;
              this.getList();
            });
          } else {
            add(this.form).then((res) => {
              this.$message.success(res.message);
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      del({ id: row.id }).then((res) => {
        this.$message.success(res.message);
        this.handleQuery();
      });
    },
  },
};
</script>
<style lang="scss">
.app-container {
  width: 100%;
}
</style>
