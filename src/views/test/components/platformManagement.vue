<template>
  <div class="platformManage">
    <div class="platformManageTop">
      <el-form
        ref="form"
        class="platform"
        :model="searchObj"
        label-width="80px"
      >
        <el-form-item label="平台类别">
          <el-select v-model="searchObj.region">
            <el-option label="信控平台" value="1"></el-option>
            <el-option label="全息路口平台" value="2"></el-option>
            <el-option label="大数据平台" value="3"></el-option>
            <el-option label="AOM平台" value="4"></el-option>
            <el-option label="全部" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input
            v-model="searchObj.name"
            style="width: 350px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="platformManageTopBtn">
            <el-button type="primary" @click="searchHandler">查询</el-button>
            <el-button type="primary" @click="addSyncLoadHandler">
              添加
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div :style="heightObj" class="platformManageFooter">
      <el-tabs>
        <el-tab-pane label="全息路口平台">
          <div class="tabDiv">
            <el-table
              ref="tabledata"
              :stripe="true"
              :highlight-current-row="true"
              :data="tableData"
              :height="tableMaxHeight"
              size="small"
            >
              <el-table-column prop="name" label="名称" align="center" />
              <el-table-column
                prop="name"
                label="路口配置服务地址"
                align="center"
              />
              <el-table-column
                prop="province"
                label="设备资源服务地址"
                align="center"
              />
              <el-table-column
                prop="city"
                label="设备状态服务地址"
                align="center"
              />
              <el-table-column
                prop="address"
                label="token地址"
                align="center"
              />
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="editRoadHandle(scope.row)"
                    type="text"
                    size="small"
                  >
                    编辑
                  </el-button>
                  <el-button
                    @click="deleteHandler(scope.row)"
                    type="text"
                    size="small"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="信控平台">
          <div class="control-container">111</div>
        </el-tab-pane>
        <el-tab-pane label="AOM平台">
          <div class="AOM-container">
            <el-form
              :model="AOMForm"
              ref="AOMForm"
              label-width="280px"
              label-position="left"
            >
              <el-form-item label="数据上报" prop="dataReport">
                <el-radio-group v-model="AOMForm.dataReport">
                  <el-radio label="启用"></el-radio>
                  <el-radio label="关闭"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="重启主控板" prop="controlBoard">
                <el-radio-group v-model="AOMForm.controlBoard">
                  <el-radio label="允许"></el-radio>
                  <el-radio label="关闭"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="路口配置服务器地址" prop="name">
                <el-input v-model="AOMForm.name"></el-input>
              </el-form-item>
              <el-form-item label="数据上报周期" prop="name">
                <el-input v-model="AOMForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="AOM-btn">
                  <el-button type="primary" @click="AOMSaveHandler">
                    确定
                  </el-button>
                  <el-button type="primary" plain @click="AOMCancelHandler">
                    取消
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="(isEdit ? '编辑' : '添加') + '全息路口平台信息'"
      :visible.sync="roadDialog"
      :show-close="false"
    >
      <el-form
        :model="roadDialogForm"
        label-position="top"
        ref="roadDialogForm"
        class="roadDialogForm"
      >
        <el-form-item label="项目名称" prop="region">
          <el-select v-model="roadDialogForm.region">
            <el-option label="张家口项目" value="1"></el-option>
            <el-option label="唐山开平项目" value="2"></el-option>
            <el-option label="北京通州项目" value="3"></el-option>
            <el-option label="南沙项目" value="4"></el-option>
          </el-select>
        </el-form-item>
        <div class="roadDialogType" prop="region2">
          <el-form-item label="平台类型" label-width="120px">
            <el-select v-model="roadDialogForm.region2">
              <el-option label="全息路口平台" value="1"></el-option>
              <el-option label="信控平台" value="2"></el-option>
              <el-option label="AOM平台" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="resource">
            <el-radio-group v-model="roadDialogForm.resource">
              <el-radio label="商用地址"></el-radio>
              <el-radio label="测试地址"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="路口配置服务器地址" prop="name">
          <el-input v-model="roadDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备资源服务地址" prop="name">
          <el-input v-model="roadDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备状态服务地址" prop="name">
          <el-input v-model="roadDialogForm.name"></el-input>
        </el-form-item>
        <div class="roadDialogType">
          <el-form-item label="设备状态同步" prop="resource">
            <el-radio-group v-model="roadDialogForm.resource">
              <el-radio label="启用"></el-radio>
              <el-radio label="停用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备状态同步周期" prop="name">
            <el-input v-model="roadDialogForm.name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="token地址" prop="name">
          <el-input v-model="roadDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="roadDialogForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRoadDialog">取 消</el-button>
        <el-button type="primary" @click="submitRoadDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dataSyncOperation',
  data() {
    return {
      //查询参数
      searchObj: {
        name: '',
        region: '5',
      },
      ////全息路口参数
      isEdit: false,
      roadDialog: false,
      roadDialogForm: {
        name: '',
        region: '1',
        region2: '1',
        resource: '',
        desc: '',
      },

      //aom表单数据
      AOMForm: {
        dataReport: '',
        controlBoard: '',
        name: '',
      },
      tableData: [
        {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      heightObj: {
        height: '',
      },
      tableMaxHeight: null,
    };
  },
  mounted() {
    window.addEventListener('resize', this.getHeight1);
    this.getHeight1();
    // this.getDataList();
  },
  methods: {
    //搜索操作
    searchHandler() {
      console.log(this.searchLoadName);
    },
    ////全息路口部分的方法
    //获取
    async getLoadDataList() {
      try {
        // const res = await getOperationDataList()
      } catch (e) {
        console.log(e);
      }
    },
    //添加路口信息
    addSyncLoadHandler() {
      console.log('添加');
      this.isEdit = false;
      this.roadDialog = true;
      console.log(this.$refs);
    },
    //编辑路口信息
    editRoadHandle(row) {
      console.log(row);
      this.isEdit = true;
      this.roadDialog = true;
    },
    //路口弹窗取消
    cancelRoadDialog() {
      this.$refs.roadDialogForm.resetFields();
      this.roadDialog = false;
    },
    //路口弹出确定
    submitRoadDialog() {
      this.$refs.roadDialogForm.resetFields();
      this.roadDialog = false;
    },
    //删除
    deleteHandler() {
      console.log('删除');
    },
    ////aom部分的方法
    //保存
    AOMSaveHandler() {
      console.log(1);
    },
    AOMCancelHandler() {
      this.$refs.AOMForm.resetFields();
    },
    getHeight1() {
      this.heightObj.height = window.innerHeight - 196 + 'px';
      this.tableMaxHeight = window.innerHeight - 338 + 'px';
    },
    handleSelectionChange(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped lang="less">
.platformManage {
  width: 100%;
  .platformManageTop {
    font-weight: 700;
    .platform {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .platformManageTopBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .platformManageFooter {
    width: 100%;
    background: white;
    margin-top: 10px;
    /deep/ .el-tabs__item {
      width: 240px;
      text-align: center;
    }
    .platformManageFooterTop {
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .platformManageFooterTopLeft {
        margin-left: 10px;
      }
      .platformManageFooterTopRight {
        margin-right: 10px;
      }
    }
    .tabDiv {
      width: 99%;
      margin-left: 0.5%;
    }
  }
  .AOM-container {
    width: 70%;
    .el-form {
      width: 80%;
    }
  }
  .roadDialogType {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /deep/ .el-dialog {
    max-width: 675px;
    max-height: 712px;
    overflow: auto;
    .el-dialog__header {
      background-color: rgb(56, 123, 252) !important;
      .el-dialog__title {
        color: #fff !important;
      }
    }
    .el-dialog__footer {
      text-align: center !important;
    }
    .roadDialogForm {
      width: 80%;
      .el-form-item {
        height: 55px;
        margin-bottom: 10px;
        .el-form-item__label {
          height: 26px;
          margin-bottom: 5px;
        }
        input {
          height: 28px;
        }
      }
    }
  }
}
</style>
