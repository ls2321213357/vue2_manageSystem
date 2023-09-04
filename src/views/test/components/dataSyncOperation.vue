<template>
  <div class="dataSyncOption">
    <div class="dataSyncOptionTop">
      <span>路口名称:</span>
      <el-input
        v-model="searchLoadName"
        style="width: 500px"
        placeholder="请输入名称"
        clearable
      />
      <el-button type="primary" @click="searchHandler">查询</el-button>
    </div>
    <div class="dataSyncOptionTopBtn">
      <el-button type="primary" @click="addSyncLoadHandler">路口添加</el-button>
      <el-button type="primary" @click="syncHandler">同步</el-button>
      <el-button type="primary" @click="syncAllHandler">全部同步</el-button>
      <el-button type="primary" @click="deleteHandler">删除</el-button>
      <el-button type="primary" @click="deleteAllHandler">全部删除</el-button>
    </div>
    <div :style="heightObj" class="dataSyncOptionFooter">
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
          <el-table-column prop="name" label="项目名称" align="center" />
          <el-table-column prop="name" label="路口名称" align="center" />
          <el-table-column
            prop="province"
            label="全息路口平台"
            align="center"
          />
          <el-table-column prop="city" label="信控平台" align="center" />
          <el-table-column prop="address" label="路口类型转换" align="center" />
          <el-table-column width="300" label="同步进度" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="scope.row.percentage"
              />
            </template>
          </el-table-column>
          <el-table-column label="同步反馈" width="100">
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
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                @click="lookItemHandler(scope.row)"
                type="text"
                size="small"
              >
                预览
              </el-button>
              <el-button
                @click="editItemHandler(scope.row)"
                type="text"
                size="small"
              >
                编辑
              </el-button>
              <el-button
                @click="deleteItemHandler(scope.row)"
                type="text"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-dialog title="预览" :visible.sync="lookDialog" width="30%">
      <el-collapse @change="detailHandleChange">
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
    <el-dialog title="详情" :visible.sync="detailDialog" width="30%">
      <div v-for="(item, index) in 4" :key="index" style="margin-top: 10px">
        这是一段信息
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dataSyncOperation',
  data() {
    return {
      searchLoadName: '', //路口名称
      lookDialog: false, //预览窗口
      detailDialog: false, //详情窗口
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
    //搜索操作
    searchHandler() {
      console.log(this.searchLoadName);
    },
    //添加路口信息
    addSyncLoadHandler() {
      console.log('添加');
    },
    //同步
    syncHandler() {
      console.log('同步');
    },
    //全部同步
    syncAllHandler() {
      console.log('全部同步');
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
      this.detailDialog = true;
    },
    editItemHandler(row) {
      console.log(row);
    },
    //单行删除
    deleteItemHandler(row) {
      console.log(row);
    },
    //预览操作
    lookItemHandler(row) {
      console.log(row);
      this.lookDialog = true;
    },
    detailHandleChange(val) {
      console.log(val);
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
.dataSyncOption {
  width: 100%;
  .dataSyncOptionTop {
    width: 700px;
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dataSyncOptionTopBtn {
    width: 500px;
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dataSyncOptionFooter {
    width: 100%;
    background: white;
    margin-top: 10px;
    .dataSyncOptionFooterTop {
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dataSyncOptionFooterTopLeft {
        margin-left: 10px;
      }
      .dataSyncOptionFooterTopRight {
        margin-right: 10px;
      }
    }
    .tabDiv {
      width: 99%;
      margin-left: 0.5%;
    }
  }
}
</style>
