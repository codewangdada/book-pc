<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item prop="bookName">
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
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="'admin'"
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
            v-hasPermi="'student'"
            @click.native.prevent="handleBorrow(scope.row)"
            type="text"
            size="small"
          >
            借阅
          </el-button>
          <el-button
            v-hasPermi="'admin'"
            @click.native.prevent="handleUpdate(scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            v-hasPermi="'admin'"
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
            <el-form-item label="图书名称" prop="bookName">
              <el-input v-model="form.bookName" placeholder="请输入图书名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图书类型" prop="bookTypeId">
              <el-select
                v-model="form.bookTypeId"
                placeholder="请选择"
                @change="handleBookChange"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.bookType"
                  :value="item.id"
                >
                </el-option>
              </el-select>
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

    <!-- 借阅对话框 -->
    <el-dialog title="借阅" :visible.sync="borrowOpen" width="600px">
      <el-form
        ref="borrowForm"
        :model="borrowForm"
        :rules="borrowRules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="图书名称" prop="bookName">
              <el-input
                v-model="borrowForm.bookName"
                placeholder="请输入图书名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计归还日期" prop="returnDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="borrowForm.returnDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBorrowForm">确 定</el-button>
        <el-button @click="borrowCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, update, del } from "@/api/books";
import { list as types } from "@/api/types";
import { borrow } from "@/api/borrow";
export default {
  data() {
    return {
      typeList: [],
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
          prop: "bookType",
          label: "图书类型",
          fixed: false,
        },
        {
          prop: "bookNo",
          label: "图书编号",
          fixed: false,
        },
        {
          prop: "bookPublisher",
          label: "出版社",
          fixed: false,
        },
        {
          prop: "bookCount",
          label: "图书总数量",
          fixed: false,
        },
        {
          prop: "borrowCount",
          label: "借阅数量",
          fixed: false,
        },
        {
          prop: "restCount",
          label: "剩余数量",
          fixed: false,
        },
        {
          prop: "bookAuthor",
          label: "作者",
          fixed: false,
        },
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
      borrowOpen: false,
      borrowForm: {},
      borrowRules: {
        returnDate: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  created() {
    this.getTypeList();
    this.getList();
  },
  methods: {
    handleBookChange(v) {
      this.form.bookType = this.typeList.find((item) => item.id === v).bookType;
    },
    getTypeList() {
      types().then((res) => {
        this.typeList = res.data.records;
      });
    },
    /** 查询图书列表 */
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
        bookName: "",
        bookTypeId: "",
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

    handleBorrow(row) {
      const { bookName, id } = row;
      this.borrowForm = {
        bookName,
        bookId: id,
        userId: this.$store.state.user.userInfo.id,
      };
      this.borrowOpen = true;
    },

    submitBorrowForm() {
      this.$refs["borrowForm"].validate((valid) => {
        if (valid) {
          borrow(this.borrowForm).then((res) => {
            this.$message.success(res.message);
            this.borrowOpen = false;
            this.getList();
          });
        }
      });
    },

    borrowCancel() {
      this.borrowOpen = false;
    },
  },
};
</script>
<style lang="scss">
.app-container {
  width: 100%;
}
</style>
