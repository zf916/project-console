
<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    .main-anal-audit
        width 100%
        height 100%
        .form-content
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)
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
    .main-anal-audit
        .form-content
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item  label="录入日期" prop="startTime">
                    <el-date-picker v-model="ruleForm.startTime" size="small" type="date" placeholder="录入日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item  label="至" prop="endTime">
                    <el-date-picker v-model="ruleForm.endTime" size="small" type="date" placeholder="录入日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item label="肛拭状态" prop="state" style="width:50%">
                    <el-checkbox-group v-model="ruleForm.state">
                        <el-checkbox label="3">合格</el-checkbox>
                        <el-checkbox label="4">不合格</el-checkbox>
                        <el-checkbox label="2">待化验</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="体检状态" prop="bookingState">
                    <el-select v-model="ruleForm.bookingState" size="small" placeholder="请选择">
                        <el-option v-for="item in bookingStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                    span.msg 共选择了 200 个肛拭采样结果
                </el-form-item>
            </el-form>
            <el-table stripe ref="multipleTable" :data="items" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="value" label="姓名"></el-table-column>
                <el-table-column prop="value" label="体检编号"></el-table-column>
                <el-table-column prop="value" label="采样单位"></el-table-column>
                <el-table-column prop="value" label="身份证号"></el-table-column>
                <el-table-column prop="value" label="年龄"></el-table-column>
                <el-table-column prop="value" label="性别"></el-table-column>
                <el-table-column prop="value" label="录入时间"></el-table-column>
                <el-table-column prop="value" label="肛拭结果"></el-table-column>
                <el-table-column prop="value" label="肛拭结果详情"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="handleStatus(scope)">查看</el-button>
                        <el-button class="tb-btn" size="mini" @click="handleStatus(scope)">修改</el-button>
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
            bookingStateList: this.$store.state.status.bookingState,
            multipleSelection:[],
            item: {
                value: '测试数据',
                menu: 'exam'
            },
            ruleForm:{
                reportCode: '',
                startTime: '',	
                endTime: '',	
                bookingstate: '',
                state: []
            },
            items: [],
            total: 1, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        // 载入完成后执行
        this.handleSearch()
    },
    methods: {
        // 查询
        handleSearch() {
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            )
        },
        // 获取列表
        handleList(params=this.ruleForm) {
            // 获取肛试送检列表
            this.$post('/examinationManage/resultAnalsList', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.items = data
                this.total = data.length
            }).catch(err => this.$message.error(err.msg))
        },
        // 全选
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
        // 分页
        handleSizeChange(val) {
            this.limit = val;
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            );
        },
        // 分页
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
        // 重置搜索
        resetForm(formName) {
            this.ruleForm = {
                reportCode: '',
                startTime: '',	
                endTime: '',	
                bookingstate: '',
                state: ''
            }
        }
    }
}
</script>



