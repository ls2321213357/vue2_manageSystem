<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户信息' : '更新用户信息'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="isShow = false">取消</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button
          icon="el-icon-search"
          circle
          type="primary"
          @click="getList(searchForm.keyword)"
        ></el-button>
      </CommonForm>
    </div>
    <CommonTable
      :tableLable="tableLable"
      :tableData="tableData"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></CommonTable>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue';
import CommonTable from '@/components/CommonTable.vue';
import { getUser } from '../../api/data';
export default {
  /* eslint-disable */
  name: 'User',
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input',
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
          ],
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date',
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input',
        },
      ],
      operateForm: {
        form: {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: '',
        },
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input',
        },
      ],
      searchForm: {
        keyword: '',
      },
      tableData: [],
      tableLable: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'sexLabel',
          label: '性别',
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200,
        },
        {
          prop: 'addr',
          label: '家庭地址',
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  components: { CommonForm, CommonTable },
  methods: {
    confirm() {
      //修改用户
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
          this.operateForm = {
            name: '',
            addr: '',
            age: '',
            birth: '',
            sex: '',
          };
        });
      } else {
        //新增用户
        this.$http.post('/user/add', this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
          this.operateForm = {
            name: '',
            addr: '',
            age: '',
            birth: '',
            sex: '',
          };
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = 'add';
    },
    editUser(row) {
      this.operateType = 'edit';
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm('此操作将永远删除该用户,确定要继续吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const id = row.id;
        this.$http
          .get('/user/delete', {
            params: { id },
          })
          .then((res) => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '删除成功',
            });
            this.getList();
          });
      });
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      //获取人员列表信息
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? '女' : '男';
          return item;
        });
        //对分页进行处理
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.manage-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
