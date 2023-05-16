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
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { list } from "@/api/borrow";
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
        },
        {
          prop: "actuallyReturnDate",
          label: "实际归还日期",
          fixed: false,
        },
        {
          prop: "studentNumber",
          label: "借阅人学号",
          fixed: false,
        },
        {
          prop: "userName",
          label: "借阅人姓名",
          fixed: false,
        }
      ],
      list: [],
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
      list(
        {...this.queryParams,
          borrowState: 1
        },
        this.queryParams.pageNum,
        this.queryParams.pageSize,
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
  },
};
</script>
<style lang="scss">
.app-container {
  width: 100%;
}
</style>
