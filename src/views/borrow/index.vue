<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item prop="title">
        <el-input
          v-model="queryParams.bookName"
          placeholder="图书名称"
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
    <!-- <el-row :gutter="10" class="mb8">
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
    </el-row> -->
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
            @click.native.prevent="handleReturn(scope.row)"
            type="text"
            size="small"
          >
            归还
          </el-button>
          <!-- <el-button
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
          </el-button> -->
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
            <el-form-item label="图书名称" prop="bookName">
              <el-input v-model="form.bookName" placeholder="请输入图书名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图书编号" prop="bookNo">
              <el-input v-model="form.bookNo" placeholder="请输入图书编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出版社" prop="bookPublisher">
              <el-input
                v-model="form.bookPublisher"
                placeholder="请输入出版社"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图书总数量" prop="bookCount">
              <el-input
                v-model="form.bookCount"
                placeholder="请输入图书总数量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="bookAuthor">
              <el-input v-model="form.bookAuthor" placeholder="请输入作者" />
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
import { list, returnBook } from "@/api/borrow";
import { mapState } from "vuex";
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
          prop: "bookName",
          label: "图书名称",
          fixed: false,
        },
        {
          prop: "borrowDate",
          label: "借阅日期",
          fixed: false,
        },
        {
          prop: "returnDate",
          label: "预计归还日期",
          fixed: false,
        }
      ],
      list: [],
      open: false,
      form: {},
      title: "",
      // 表单校验
      rules: {
        bookName: [
          { required: true, message: "图书名称不能为空", trigger: "blur" },
        ],
        bookType: [
          { required: true, message: "图书类型不能为空", trigger: "change" },
        ],
        bookNo: [
          { required: true, message: "图书编号不能为空", trigger: "blur" },
        ],
        bookPublisher: [
          { required: true, message: "出版社不能为空", trigger: "blur" },
        ],
        bookCount: [
          { required: true, message: "图书总数量不能为空", trigger: "blur" },
        ],
        bookAuthor: [
          { required: true, message: "作者不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState({
      role: (state) => state.user.role,
      userId: (state) => state.user.userInfo.id,
    }),
  },
  methods: {
    /** 查询借阅列表 */
    getList() {
      this.loading = true;
      if (this.role === "student") {
        this.queryParams.userId = this.userId;
      }
      list(
        { ...this.queryParams, borrowState: 0 },
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
        bookName: "",
        bookType: "",
        bookNo: "",
        bookPublisher: "",
        bookCount: "",
        bookAuthor: "",
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加图书";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = { ...row };
      this.open = true;
      this.title = "修改图书";
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

    handleReturn(row) {
      const { bookId, id } = row;
      returnBook({
        bookId,
        id,
        userId: this.userId,
      }).then((res) => {
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
