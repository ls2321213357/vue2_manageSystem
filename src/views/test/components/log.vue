<template>
  <div class="dataSyncLog">
    <div class="dataSyncLogTop">
      <el-form ref="form" class="logForm" :model="searchObj" label-width="80px">
        <el-form-item label="项目名称:">
          <el-input
            v-model="searchObj.name"
            placeholder="请输入项目名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="路口名称:">
          <el-input
            v-model="searchObj.name"
            placeholder="请输入路口名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据类型:">
          <el-select v-model="searchObj.region" placeholder="请选择活动区域">
            <el-option label="数据基础数据" value="1"></el-option>
            <el-option label="路口设备资源数据" value="2"></el-option>
            <el-option label="路口设备状态数据" value="3"></el-option>
            <el-option label="路口类型转换" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人:">
          <el-input
            v-model="searchObj.name"
            placeholder="请输入项目名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="同步结果:">
          <el-select v-model="searchObj.result" placeholder="请选择活动区域">
            <el-option label="全部" value="3"></el-option>
            <el-option label="成功" value="1"></el-option>
            <el-option label="失败" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="searchObj.dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="dataSyncLogTopBtn">
            <el-button type="primary" @click="searchHandler">查询</el-button>
            <el-button type="primary" @click="resetHandler">重置</el-button>
            <el-button type="primary" @click="detailHandler">删除</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div :style="heightObj" class="dataSyncLogFooter">
      <div class="tabDiv">
        <el-table
          ref="tabledata"
          :stripe="true"
          :highlight-current-row="true"
          :data="tableData"
          :height="tableMaxHeight"
          size="small"
          @selection-change="handleSelectionChange"
          @select-all="selectAll"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="项目名称"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            label="路口名称"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="province"
            label="数据类型"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="city"
            label="源平台"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="address"
            label="目标平台"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            align="center"
            label="操作人"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            align="center"
            label="操作时间"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            align="center"
            label="同步耗时"
            show-overflow-tooltip
          />
          <el-table-column
            prop="name"
            align="center"
            label="同步结果"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="detailHandle(scope.row)"
                type="text"
                size="small"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="备注"
            show-overflow-tooltip
          />
        </el-table>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
          <div>
            在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          </div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dataSyncOperation',
  data() {
    return {
      dialogVisible: false,
      activeNames: ['1'],
      //搜索的参数
      searchObj: {
        name: '',
        region: '1',
        dateValue: '',
        result: '3',
      },
      percentage: 0, //下载进度
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
      objH: {
        height: '',
      },
      objH1: {
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
    handleChange(val) {
      console.log(val);
    },
    //搜索操作
    searchHandler() {
      console.log(111);
    },
    resetHandler() {
      console.log(22);
    },
    detailHandler() {
      console.log(33);
    },
    //删除
    deleteHandler() {
      console.log('删除');
    },
    //全部删除
    deleteAllHandler() {
      console.log('全部删除');
    },
    //全选操作
    selectAll(value) {
      console.log(value);
    },
    //详情操作
    detailHandle(row) {
      console.log(row);
      this.dialogVisible = true;
    },
    getHeight1() {
      this.heightObj.height = window.innerHeight - 196 + 'px';
      this.objH.height = window.innerHeight - 478 + 'px';
      // this.objH.height = window.innerHeight - 550 + "px";
      this.objH1.height = window.innerHeight - 200 + 'px';
      this.tableMaxHeight = window.innerHeight - 338 + 'px';
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    //获取
    async getDataList() {
      try {
        // const res = await getOperationDataList()
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped lang="less">
.dataSyncLog {
  width: 100%;
  .dataSyncLogTop {
    .logForm {
      font-weight: 700;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
  .dataSyncLogTopBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dataSyncLogFooter {
    // width: 100%;
    background: white;
    margin-top: 10px;
    .dataSyncLogFooterTop {
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dataSyncLogFooterTopLeft {
        margin-left: 10px;
      }
      .dataSyncLogFooterTopRight {
        margin-right: 10px;
      }
    }
    .tabDiv {
      width: 99%;
      margin-left: 0.5%;
    }
  }
  /deep/ .el-range-separator {
    width: 10%;
  }
  /deep/ .el-dialog {
    max-width: 475px;
    max-height: 812px;
    overflow: auto;
  }
}
</style>
