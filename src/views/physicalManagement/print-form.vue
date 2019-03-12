<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments

    .main-form
        .form-content
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)
</style>

<template lang="pug">
    .main-form
        <check-card :item="item"></check-card>
        .form-content
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="ruleForm.userName" size="small" placeholder="姓名"></el-input>
                </el-form-item>

                <el-form-item label="身份证号" prop="userNumber">
                    <el-input v-model="ruleForm.userNumber" size="small" placeholder="身份证号"></el-input>
                </el-form-item>

                <el-form-item label="体检状态" prop="bookingState">
                    <el-select v-model="ruleForm.bookingState" size="small" placeholder="请选择">
                        <el-option v-for="item in bookingStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table stripe :data="items" style="width: 100%" highlight-current-row @current-change="handleCurrentRow">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="reportcode" label="体检编号"></el-table-column>
                <el-table-column prop="idnumber" label="身份证" width="180"></el-table-column>
                <el-table-column prop="bookingstate" label="体检状态">
                    //- (1.已登记/已审核，2.体检中，3.已失效，4.未通过，5.已通过，6.已发证)
                    <template slot-scope="scope">
                        <span v-if="scope.row.bookingstate == 1">已登记/已审核</span>
                        <span v-if="scope.row.bookingstate == 2">体检中</span>
                        <span v-if="scope.row.bookingstate == 3">已失效</span>
                        <span v-if="scope.row.bookingstate == 4">未通过</span>
                        <span v-if="scope.row.bookingstate == 5">已通过</span>
                        <span v-if="scope.row.bookingstate == 6">已发证</span>
                    </template>
                </el-table-column>
                <el-table-column prop="lastmodifiedTime" label="更新时间" width="180"></el-table-column>
                <el-table-column prop="professionName" label="工种名称" width="180"></el-table-column>
                <el-table-column prop="signs" label="体征状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.signs == 1 ? '待检查' :  (scope.row.signs == 2 ? '合格' : '不合格') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ray" label="胸透状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.signs == 1 ? '待检查' :  (scope.row.signs == 2 ? '合格' : '不合格') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="anals" label="肛拭状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.signs == 1 ? '待检查' :  (scope.row.signs == 2 ? '待检查' : (scope.row.signs == 3 ? '合格' : '不合格')) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="blood" label="血检状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.signs == 1 ? '待检查' :  (scope.row.signs == 2 ? '待检查' : (scope.row.signs == 3 ? '合格' : '不合格')) }}</span>
                    </template> 
                </el-table-column>
                <el-table-column label="操作"  width="180">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="handlePrint(scope)">打印登记表</el-button>
                        <el-button class="tb-btn" size="mini" @click="handlePrint(scope)">打印体检单</el-button>
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
            item: {},
            ruleForm:{},
            items: [],
            bookingStateList: this.$store.state.status.bookingState,
            total: 0, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        this.handleSearch()
    },
    methods: {
        handlePrint(formName) {
            this.$message.success('打印')
        },

        handleList(params=this.ruleForm) {
            this.$post('/orderManage/getBookingReportList', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.items = data
                this.total = this.items.length
            }).catch(err => this.$message.error(err.msg))
        },
        
        handleSearch() {
            this.handleList(
                Object.assign(
                    { limit: this.limit, page: this.page },
                    this.ruleForm
                )
            )
        },
        
        handleCurrentRow(row) {
            let params = {
                reportCode: row.reportcode
            }
            this.$post('/orderManage/getBookingReportPersonInfo', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                let result = Object.assign({},data)
                this.$store.dispatch('healthCard/hCard',result)
            }).catch(err => this.$message.error(err.msg))
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
            this.$refs[formName].resetFields();
        }
    },
}
</script>
