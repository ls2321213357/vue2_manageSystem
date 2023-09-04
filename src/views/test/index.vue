<template>
  <div class="syncContent">
    <div :style="obj" class="dataSync">
      <div class="dataSyncContent">
        <div class="dataSyncContentL">
          <div
            @click="activeName = 'dataSyncOperation'"
            :class="activeName === 'dataSyncOperation' ? 'isActive' : ''"
          >
            数据同步操作
          </div>
          <el-menu @open="handleOpen">
            <el-submenu
              index="1"
              :class="activeName === 'platformManagement' ? 'isActive' : ''"
            >
              <template slot="title">
                <span>平台管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1">张家口项目</el-menu-item>
                <el-menu-item index="2">唐山开平项目</el-menu-item>
                <el-menu-item index="3">北京通州项目</el-menu-item>
                <el-menu-item index="4">南沙项目</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <div
            @click="activeName = 'log'"
            :class="activeName === 'log' ? 'isActive' : ''"
          >
            数据同步日志
          </div>
        </div>
        <div class="dataSyncContentR">
          <dataSyncOperation
            v-if="activeName === 'dataSyncOperation'"
            ref="dataSyncOperation"
          />
          <platformManagement
            v-if="activeName === 'platformManagement'"
            ref="platformManagement"
            :table-max-height="tableMaxHeight"
          />
          <log
            v-if="activeName === 'log'"
            ref="log"
            :table-max-height="tableMaxHeight"
          />
        </div>
      </div>
    </div>

    <!--    <el-container>-->
    <!--      <el-aside id="sideBox" width="297px">-->
    <!--        <el-input size="small" placeholder="路口名称" v-model="filterText" class="input-with-select"-->
    <!--                  @keyup.enter.native="searchTree">-->
    <!--          <el-button slot="append" icon="el-icon-search" @click="searchTree">-->
    <!--          </el-button>-->
    <!--        </el-input>-->
    <!--        <el-row :gutter="10" style="margin-top: 10px;margin-bottom: 10px">-->
    <!--          <el-col :span="12">-->
    <!--            <div>-->
    <!--              <el-select size="mini" style="width: 100%;" v-model="intersectionType" slot="prepend" placeholder="请选择"-->
    <!--                         @change="getTree()">-->
    <!--                <el-option label="全部路口" :value="0"></el-option>-->
    <!--                <el-option v-for="item in crossroadType" :key="item.value" :label="item.label"-->
    <!--                           :value="item.value"></el-option>-->
    <!--              </el-select>-->
    <!--            </div>-->
    <!--          </el-col>-->
    <!--          <el-col :span="12">-->
    <!--            <div>-->
    <!--              <el-select size="mini" style="width: 100%" v-model="parkState" slot="prepend" placeholder="请选择"-->
    <!--                         @change="getTree()">-->
    <!--                <el-option label="全部状态" :value="0"></el-option>-->
    <!--                <el-option v-for="item in engineeringStageList" :key="item.value" :label="item.label"-->
    <!--                           :value="item.value">-->
    <!--                </el-option>-->
    <!--              </el-select>-->
    <!--            </div>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--        <el-tree :data="data" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree"-->
    <!--                 :default-expand-all="true" node-key="guid" accordion highlight-current ref="tree" show-checkbox>-->
    <!--          <div slot-scope="{ node, data }" style="width: 100%; ">-->
    <!--                        <span>-->
    <!--                            <span>{{ data.name }}</span>-->
    <!--                            <span v-if="data.level === 3">-->
    <!--                                <span-->
    <!--                                  style="display:none"> {{ data.district = node.parent.data.name }} {{ $forceUpdate() }}</span>-->
    <!--                                <span>{{ crossTypeName(data.type) }}</span>-->
    <!--                            </span>-->
    <!--                        </span>-->
    <!--          </div>-->
    <!--        </el-tree>-->
    <!--        <div style="text-align: center">-->
    <!--          <el-button size="mini" type="primary" @click="reset" plain>重置</el-button>-->
    <!--          <el-button size="mini" type="primary" @click="addPlan">添加</el-button>-->
    <!--        </div>-->
    <!--      </el-aside>-->
    <!--      <el-main>-->
    <!--        <div class="t">路口数据同步</div>-->
    <!--        <el-row>-->
    <!--          <el-col :span="6">-->
    <!--            <el-input size="mini" placeholder="路口名称" v-model="searchName" class="input-with-select"-->
    <!--                      @keyup.enter.native="searchTable">-->
    <!--              <i slot="suffix" class="el-input__icon el-icon-search"></i>-->
    <!--            </el-input>-->
    <!--          </el-col>-->
    <!--          <el-col :offset="6" style="text-align:right" :span="12">-->
    <!--            <el-button size="mini" type="primary" plain @click="goLog">数据同步日志</el-button>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--        <el-row class="handleSync">-->
    <!--          <el-col :span="20">-->
    <!--            <span>共{{ syncData.length }}条，已选择{{ selectionData.length }}条</span>-->
    <!--            <span style="margin-left:42px; margin-right: 15px">同步至</span>-->
    <!--            <el-select size="mini" v-model="environment">-->
    <!--              <el-option :value="0" label="Tro预发布环境"></el-option>-->
    <!--              <el-option :value="1" label="Tro商用环境"></el-option>-->
    <!--            </el-select>-->
    <!--            <el-button size="mini" style="margin-left:5px" type="primary" @click="pushSync(true,false)">数据同步-->
    <!--            </el-button>-->
    <!--          </el-col>-->
    <!--          <el-col style="text-align:right" :span="4">-->
    <!--            <el-button size="mini" type="primary" plain @click="pushSync(true,true)">预览</el-button>-->
    <!--            <el-button size="mini" type="primary" plain @click="deleteSync(true)">删除</el-button>-->
    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--        <el-table ref="syncTabel" :key="key" :data="syncData" :stripe="true" size="small"-->
    <!--                  :header-cell-style="{background:'#FAFAFA'}" height="calc(100vh - 345px)"-->
    <!--                  @selection-change="tableSelect">-->
    <!--          <el-table-column type="selection" width="55"/>-->
    <!--          <el-table-column label="路口名称" property="name" show-overflow-tooltip/>-->
    <!--          <el-table-column label="城市区域" property="district" show-overflow-tooltip/>-->
    <!--          <el-table-column label="路口类型" property="type" show-overflow-tooltip>-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{ crossTypeName(scope.row.type) }}</span>-->

    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="路口状态" property="intersectionState" :formatter="getState" show-overflow-tooltip/>-->
    <!--          <el-table-column label="同步进度" property="progress" show-overflow-tooltip>-->
    <!--            <template slot-scope="scope">-->
    <!--              <el-progress text-inside :show-text="false" :percentage="scope.row.progress"-->
    <!--                           :color="colors"></el-progress>-->
    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="操作" width="95">-->
    <!--            <template slot-scope="scope">-->
    <!--              <el-button type="text" @click="pushSync(false,true,scope.row.guid)">预览</el-button>-->
    <!--              <el-button type="text" @click="deleteSync(false,scope.row)">删除</el-button>-->
    <!--            </template>-->
    <!--          </el-table-column>-->

    <!--        </el-table>-->
    <!--      </el-main>-->
    <!--      <el-aside class="verify">-->
    <!--        <div class="t">{{ verifyTitle }}</div>-->
    <!--        <div v-for="(item,i) in verifyData" :key="i">-->
    <!--          {{ item.intersectionName }}{{ item.message }}-->
    <!--        </div>-->
    <!--      </el-aside>-->
    <!--    </el-container>-->
  </div>
</template>

<script>
// import { showMessage } from '@/utils/showMessage';
// import { getNormalTime } from '@/utils/functionList';
// import { CityTree, SearchIntersection } from '@/api/BaseOperate/erv';
// import { DataSync } from '@/api/OpenApi';
// import { crossroadType, engineeringStageList } from '@/utils/variableList';
import dataSyncOperation from './components/dataSyncOperation.vue';
import platformManagement from './components/platformManagement.vue';
import log from './components/log.vue';
export default {
  name: 'testCom',
  components: {
    dataSyncOperation,
    platformManagement,
    log,
  },
  props: {},
  watch: {
    filterText(val) {
      if (val.length == 0) {
        this.$refs.tree.filter(val);
      }
    },
    searchName(val) {
      this.syncData = this.tempSyncData.filter((item) => {
        if (item.name.indexOf(val) > -1) {
          return item;
        }
      });
    },
  },
  data() {
    return {
      obj: {
        height: '',
      },
      activeName: 'dataSyncOperation', //左侧表单的记录信息
      tableMaxHeight: null,
      verifyTitle: '数据校验信息',
      searchName: '',
      verifyData: [], //校验信息
      previewList: [], //预览数据
      preview: false, //同步数据预览是否展示
      environment: 0,
      tempSyncData: [],
      syncData: [],
      activeNames: '',
      selectionData: [],
      data: [],
      filterText: '',
      parkState: 0, //路口状态
      intersectionType: 0, // 路口类型
      cityGuid: '',
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      key: Math.random(),
      colors: [
        { color: '#409eff', percentage: 0 },
        { color: '#409eff', percentage: 70 },
        { color: '#f56c6c', percentage: 91 },
        { color: '#67c23a', percentage: 100 },
      ],
      //标签表单
      menuList: [
        {
          value: 'dataSyncOperation',
          label: '数据同步操作',
        },
        {
          value: 'erv',
          label: '平台管理',
          childList: [{ value: 'zjk', label: '张家口项目' }],
        },
        {
          value: 'pole',
          label: '数据同步日志',
        },
      ],
    };
  },
  created() {
    // this.getTree();
  },

  mounted() {
    this.getHeight();
  },

  methods: {
    //获取页面高度
    getHeight() {
      this.obj.height = window.innerHeight - 80 + 'px';
      this.tableMaxHeight = window.innerHeight - 210 + 'px';
    },
    handleOpen() {
      this.activeName = 'platformManagement';
    },
    getState(row, column, cellValue) {
      switch (cellValue) {
        case 1:
          return '施工';
        case 2:
          return '测试';
        case 3:
          return '商用';
        default:
          return '';
      }
    },
    // getTitle(item) {
    //   // 00环形交叉口 11匝道、出入口 21路段(只有二个方向的路口） 31T形路口 32Y形路口 33错位下形路口 34错位Y形路口 41十字形路口 42斜交路口 51多路路口 99其他
    //   let tempfeature = '';
    //   switch (item.feature) {
    //     case '00':
    //       tempfeature = '环形交叉口';
    //       break;
    //     case '11':
    //       tempfeature = '匝道、出入口';
    //       break;
    //     case '21':
    //       tempfeature = '路段(只有二个方向的路口）';
    //       break;
    //     case '31':
    //       tempfeature = 'T形路口';
    //       break;
    //     case '32':
    //       tempfeature = 'Y形路口';
    //       break;
    //     case '33':
    //       tempfeature = '错位下形路口';
    //       break;
    //     case '34':
    //       tempfeature = '错位Y形路口';
    //       break;
    //     case '41':
    //       tempfeature = '十字形路口';
    //       break;
    //     case '42':
    //       tempfeature = '斜交路口';
    //       break;
    //     case '51':
    //       tempfeature = '多路路口';
    //       break;
    //     default:
    //       tempfeature = '其他';
    //       break;
    //   }
    //   return `${item.name}-${tempfeature}`;
    // },
    reset() {
      this.filterText = '';
      this.intersectionType = 0;
      this.parkState = 0;
      this.getTree();
    },

    // crossTypeName(val) {
    //   if (typeof val === 'number' && val < 11) {
    //     return crossroadType[val - 1].label;
    //   } else {
    //     return '';
    //   }
    // },

    // filterNode(value, data, node) {
    //   if (this.filterText === '') return true;
    //   for (var i = 0; i < value.length; i++) {
    //     const if_one = data.guid.indexOf(value[i].guid) !== -1;
    //     const if_two =
    //       node.parent &&
    //       node.parent.data &&
    //       node.parent.data.guid &&
    //       node.parent.data.guid.indexOf(value[i].guid) !== -1;
    //     const if_three =
    //       node.parent &&
    //       node.parent.parent &&
    //       node.parent.parent.data &&
    //       node.parent.parent.data.guid &&
    //       node.parent.parent.data.guid.indexOf(value[i].guid) !== -1;
    //     // let if_four =
    //     //     node.parent &&
    //     //     node.parent.parent &&
    //     //     node.parent.parent.parent &&
    //     //     node.parent.parent.data &&
    //     //     node.parent.parent.data.name &&
    //     //     node.parent.parent.parent.data &&
    //     //     node.parent.parent.parent.data.name &&
    //     //     node.parent.parent.parent.data.name.indexOf(value) !== -1
    //     let result_one = false;
    //     let result_two = false;
    //     let result_three = false;
    //     // let result_four = false
    //     if (node.level === 1) {
    //       result_one = if_one;
    //     } else if (node.level === 2) {
    //       result_two = if_one || if_two;
    //     } else if (node.level === 3) {
    //       result_three = if_one || if_two || if_three;
    //     } else if (node.level === 4) {
    //       // result_four = if_one || if_two || if_three || if_four
    //     }
    //     if (result_one || result_two || result_three) {
    //       return result_one || result_two || result_three; // || result_four
    //     }
    //   }
    // },
    // getTree() {
    //   // 获取停车场树数据
    //   this.data = [];
    //   CityTree({
    //     usageState: Number(this.parkState),
    //     type: Number(this.intersectionType),
    //   }).then((response) => {
    //     this.data.push(response.data.data);
    //   });
    // },
    // searchTree() {
    //   // if (this.filterText.length < 3) return
    //   // this.parkState = 0;
    //   // this.intersectionType = 0;
    //   let params = Object.assign({});
    //   params.pageIndex = 1;
    //   params.pageSize = 100;
    //   params.params = {
    //     content: this.filterText,
    //     intersectionType: this.intersectionType,
    //     intersectionStage: this.parkState,
    //   };
    //   SearchIntersection(params).then((response) => {
    //     // if (response.data.resultList.length > 0) {
    //     this.$refs.tree.filter(response.data.data);
    //     // }
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.syncContent {
  padding: 0 20px 0 20px;

  height: calc(100vh - 100px);
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
    }
  }
}

#sideBox {
  width: 297px;
  background-color: white;
  padding: 10px;
}

.filter-tree {
  overflow: auto;
  font-size: 14px;
  width: 100%;
  height: calc(100vh - 255px);
  margin-bottom: 10px;
}

.el-main {
  margin: 0 20px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: white;
}

.t {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}

.handleSync {
  font-size: 14px;
  padding: 22px 20px;
  margin: 24px 0;
  background: rgba(38, 110, 253, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.verify {
  padding: 30px;
  background-color: white;
  height: calc(100vh - 115px);
}
.isActive {
  background-color: #266efd;
  // background-color: #409eff;
  color: white;
  font-weight: 700;
}
.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;

  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }
}
.dataSync {
  padding: 0px 0.5% 10px 0.5%;
  overflow-y: scroll;
  .dataSyncHeartd {
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #606266;
    cursor: text;
    font-weight: 400 !important;
    .clickSp {
      cursor: pointer;
      color: black;
    }
  }

  .dataSyncContent {
    display: flex;
    // max-height: calc(100vh - 120px);
    // overflow-y: auto;
    /* overflow-x:hidden; */
  }
}
.dataSync::-webkit-scrollbar {
  display: none;
}
.dataSyncContentL {
  width: 150px;
  margin-right: 16px;
  font-size: 14px;
  color: #000000;
  background-color: white;
  cursor: pointer;
  div {
    line-height: 64px;
    padding-left: 24px;
  }
  .isActive {
    background-color: #266efd;
    color: white;
  }
}
.sColumn .cell {
  padding: 0;
}
.copylink {
  cursor: pointer;
}
.dataSyncContentR {
  width: calc(100vw - 155px);
  // height: calc(100vh - 97px);
  background: white;
  padding: 32px 44px 20px 40px;
}
.el-table-column--selection .cell {
  padding-left: 10px;
}
/deep/ .el-submenu__title:hover {
  background-color: transparent !important;
}
/deep/ .el-submenu {
  .el-menu-item {
    min-width: 100px;
    padding: 0 0;
  }
}
</style>
