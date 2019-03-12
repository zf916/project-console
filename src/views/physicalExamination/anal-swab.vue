
<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    .main-anal
        width 100%
        height 100%
        .form-content,
        .tab-item2
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)
        .form-content
            margin-top 16px

        .check-group
             border-top 1px #EBEBEB solid
             padding-top 20px
             .msg
                color #333333
                font-size 14px
                margin-left 15px
</style>

<template lang="pug">
    .main-anal
        .tabs
            .per-tab(v-bind:class="index == 0 ? 'on':''" @click="handleIndex(0)") 肛拭录入 
            .com-tab(v-bind:class="index == 1 ? 'on':''" @click="handleIndex(1)") 肛拭送检
        .tab-item1(v-if="index == 0")
            <check-card :item="item"></check-card>
            .form-content
                <el-table stripe :data="items" style="width: 100%">
                    <el-table-column prop="userName" label="姓名"></el-table-column>
                    <el-table-column prop="reportCode" label="体检编号"></el-table-column>
                    <el-table-column prop="idnumber" label="身份证号"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="createTime" label="录入时间"></el-table-column>
                    <el-table-column prop="state" label="肛拭状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state == 1">待检验</span>
                            <span v-if="scope.row.state == 2">合格</span>
                            <span v-if="scope.row.state == 3">不合格</span>
                        </template> 
                    </el-table-column>
                </el-table>
                <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        .tab-item2(v-if="index == 1")
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item  label="录入日期" prop="startTime">
                    <el-date-picker v-model="ruleForm.startTime" size="small" type="date" placeholder="录入日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item  label="至" prop="endTime">
                    <el-date-picker v-model="ruleForm.endTime" size="small" type="date" placeholder="录入日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item label="体检状态" prop="bookingstate">
                    <el-select v-model="ruleForm.bookingstate" size="small" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待检验" value="1"></el-option>
                        <el-option label="合格" value="2"></el-option>
                        <el-option label="不合格" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="体检编号" prop="reportCode">
                    <el-input v-model="ruleForm.reportCode" size="small" placeholder="体检编号"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                    <el-button type="primary" size="small" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px" class="check-group">
                <el-form-item>
                    <el-button type="primary" size="small" @click="resetForm('ruleForm')">送检</el-button>
                    <el-button type="primary" size="small" @click="toggleSelection">全选</el-button>
                    <span class="msg">共选择了 200 个肛拭采样</span>
                </el-form-item>
            </el-form>
            <el-table stripe ref="multipleTable" :data="items" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="reportCode" label="体检编号"></el-table-column>
                <el-table-column prop="idnumber" label="身份证号"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="createTime" label="录入时间"></el-table-column>
                <el-table-column prop="state" label="肛拭状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state == 1">待检验</span>
                        <span v-if="scope.row.state == 2">待化验</span>
                        <span v-if="scope.row.state == 3">合格</span>
                        <span v-if="scope.row.state == 4">不合格</span>
                    </template> 
                </el-table-column>
            </el-table>
            <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
</template>
<script>
import CheckCard from "comp/card/CheckCard"
import qs from 'qs'
export default {
    components: {
      CheckCard
    },
    data() {
        return {
            index: 0,
            check: false,
            multipleSelection:[],
            item: {
                value: '测试数据',
                menu: 'exam'
            },
            ruleForm:{
                reportCode: '',
                startTime: '',	
                endTime: '',	
                bookingstate: ''
            },
            items: [],
            total: 1, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        this.handleSearch()
    },
    methods: {
        handleIndex(index) {
            this.index = index
        },
        
        handleSearch() {
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            )
        },
        
        handleList(params=this.ruleForm) {
            // 获取肛试送检列表
            this.$post('/examination/AnalsList', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.items = data
                this.total = data.length
            }).catch(err => this.$message.error(err.msg))
        },

        toggleSelection() {
            this.check = !this.check

            if (this.check) {
                this.items.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
     
        submitForm(formName) {
            this.$message.success('查询')
        },

        handleSizeChange(val) {
            this.limit = val;
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            );
        },

        handleCurrentChange(val) {
            let { limit } = this;
            this.page = limit * (val - 1);
            this.currentPage = val;
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            )
        },

        resetForm(formName) {
            this.ruleForm = {
                reportCode: '',
                startTime: '',	
                endTime: '',	
                bookingstate: ''
            }
            this.handleSearch()
        }
    },
}
</script>



