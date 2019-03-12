<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    text-center()
        text-align center
        line-height arguments
    base-font()
        font-size arguments
        color #333333
    box-sizing()
        -webkit-box-sizing arguments
        -moz-box-sizing arguments
        -o-box-sizing arguments
        box-sizing arguments
    .main-code
        .form-content
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)

</style>
<template lang="pug">
    .main-code
        <check-card :item="item"></check-card>
        .form-content
            <el-table stripe :data="items" style="width: 100%" highlight-current-row @current-change="handleCurrentRow">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="reportcode" label="体检编号"></el-table-column>
                <el-table-column prop="idnumber" label="身份证"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="createTime" label="审核时间"></el-table-column>
                <el-table-column prop="bookingstate" label="体检状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.bookingstate == 1">已登记/已审核</span>
                        <span v-if="scope.row.bookingstate == 2">体检中</span>
                        <span v-if="scope.row.bookingstate == 3">已失效</span>
                        <span v-if="scope.row.bookingstate == 4">未通过</span>
                        <span v-if="scope.row.bookingstate == 5">已通过</span>
                        <span v-if="scope.row.bookingstate == 6">已发证</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="handlePrint(scope)">打印条码</el-button>
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
            item: {
                menu: 'code'
            },
            items:[],
            total: 0, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        this.handleList(
            Object.assign(
                { limit: this.limit, page: this.page },
                this.ruleForm
            )
        )
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

        handleCurrentRow(row) {
            let params = {
                reportCode: row.reportcode
            }
            this.$post('/orderManage/getBookingReportPersonInfo', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.item = data
                this.item.menu = 'code'
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
    }
}
</script>
