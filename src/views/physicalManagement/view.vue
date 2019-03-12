<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments

    .main-view
        width 100%
        height 100%
        background #FFFFFF
        border-radius(4px)
        border solid #E7E7E1 1px
        padding 15px

        .tool-box
            display flex
            margin-bottom 20px
            .tool-r
                border-left solid #ECECEC 1px
                margin  20px 15px
                padding 0 20px
        .submit-btn
            border-radius 4px

        .content
            .edit-form
                display flex
                .card-img
                    padding 0 10px
                    .img-box
                        width 147px
                        height 176px
                        margin 0 auto
                        border solid #E4E4E4 1px
                        background #ffffff
                        padding 10px
                        margin-top 10px
                        img 
                            width 100%
                            height 100%
                    .card-info
                        flex 1
                .el-form-item
                    margin-bottom 10px
</style>

<template lang="pug">
    .main-view
        .tool-box
            .tool-l
                <card :item="item"></card>
            .tool-r
                <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="ruleForm.userName" size="small" placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="体检编号" prop="reportCode">
                        <el-input v-model="ruleForm.reportCode" size="small" placeholder="体检编号"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号" prop="userNumber">
                        <el-input v-model="ruleForm.userNumber" size="small" placeholder="身份证号"></el-input>
                    </el-form-item>

                    <el-form-item label="体检状态" prop="bookingState">
                        <el-select v-model="ruleForm.bookingState" size="small" placeholder="请选择">
                            <el-option v-for="item in bookingStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="审核日期" prop="startTime">
                        <el-date-picker v-model="ruleForm.startTime" size="small" type="date" placeholder="日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="至" prop="endTime">
                        <el-date-picker v-model="ruleForm.endTime" size="small" type="date" placeholder="日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="工种名称" prop="professionName">
                        <el-select v-model="ruleForm.professionName" size="small" placeholder="工种名称">
                            <el-option v-for="item in workList" :key="item.professionId" :label="item.professionName" :value="item.professionName"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
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
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button class="tb-btn" size="mini" @click="handleStatus(1,scope.row)">体检记录</el-button>
                    <el-button class="tb-btn" size="mini" @click="handleStatus(2,scope.row)">体检单</el-button>
                    <el-button class="tb-btn" size="mini" @click="handleStatus(3,scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <el-dialog :title="title" :visible.sync="dialog" width="50%" >
            .content(v-if="title == '体检记录'")
                <el-table :data="checkList" border style="width: 100%">
                    <el-table-column prop="bookingitemname" label="操作内容"></el-table-column>
                    <el-table-column prop="node" label="详情"></el-table-column>
                    <el-table-column prop="lastmodifiedTime" label="操作时间"></el-table-column>
                    <el-table-column prop="doctorname" label="操作人员"></el-table-column>
                </el-table>
            .content(v-else-if="title == '编辑'")
               .edit-form
                    .card-img
                        .img-box
                            img(src="/static/images/common/userface1.jpg")
                    .card-info
                        <el-form ref="ruleForm" :inline="true" label-width="80px">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="item.name" size="small" placeholder="姓名" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="年龄" prop="age">
                                <el-input v-model="item.age" size="small" placeholder="年龄" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" label-width="80px">
                            <el-form-item label="性别" prop="sex">
                                <el-radio v-model="item.sex" label="男" :disabled="true">男</el-radio>
                                <el-radio v-model="item.sex" label="女" :disabled="true">女</el-radio>
                            </el-form-item>

                            <el-form-item label="体检编号" prop="reportcode" style="float:right">
                                <el-input v-model="item.reportcode" size="small" placeholder="体检编号" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" label-width="80px">
                            <el-form-item label="身份证号" prop="idnumber">
                                <el-input v-model="item.idnumber" size="small" placeholder="身份证号" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" label-width="80px">
                            <el-form-item label="有效日期" prop="idCardStartTime"> 
                                <el-input v-model="item.idCardStartTime" size="small" placeholder="有效日期" :disabled="true"></el-input>
                                //- <el-date-picker v-model="idCard.EffectedDate" size="small" type="date" placeholder="有效日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="至"  prop="idCardEndTime">
                                <el-input v-model="item.idCardEndTime" size="small" placeholder="有效日期" :disabled="true"></el-input>
                                //- <el-date-picker v-model="idCard.ExpiredDate" size="small" type="date" placeholder="有效日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" label-width="80px">
                            <el-form-item label="工种名称" prop="professionName">
                                <el-select v-model="item.professionName" size="small" placeholder="工种名称">
                                    <el-option v-for="item in workList" :key="item.professionName" :label="item.professionName" :value="item.professionName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" label-width="80px">
                            <el-form-item label="检查项目">
                                <el-checkbox v-for="item in item.bookingItem" :key="item.bookingItemName" v-model="checked" :label="item.bookingItemName" disabled></el-checkbox>
                            </el-form-item>
                        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="title == '体检记录'" class="el-button submit-btn el-button--primary el-button--small" @click="handleSubmit">打印健康证</el-button>
                <el-button v-if="title == '编辑'" class="el-button submit-btn el-button--primary el-button--small" @click="handleClose">取 消</el-button>
                <el-button v-if="title == '编辑'"  class="el-button submit-btn el-button--primary el-button--small" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
import Card from "comp/card/Card"
import CheckCard from "comp/card/CheckCard"
import qs from 'qs'
export default {
    components: {
      Card,CheckCard
    },
    data() {
        return {
            // (1.已登记/已审核，2.体检中，3.已失效，4.未通过，5.已通过，6.已发证)',
            item: {},
            workList: [], // 工种名称
            bookingStateList: this.$store.state.status.bookingState,
            ruleForm:{},
            items: [],
            title: '',
            checked: true,
            dialog: false,
            total: 0, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
            checkList: [],
            checkInfo: {}
        }
    },
    mounted() {
        this.handleWorkList()
        this.handleSearch()
    },
    methods: {
        // 查询工种名称
        handleWorkList() {
            this.$get('/orderManage/getProfessionList', {}).then(data => {
                this.workList = Object.assign([],data)
            }).catch(err => this.$message.error(err.msg))
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
                this.item = data
            }).catch(err => this.$message.error(err.msg))
        },

        handleSubmit() {
            // 提交保存
            if(this.title = '体检记录') {
                this.$notify.info({
                    title: '伪代码',
                    message: '此处调用打印API'
                });
            } else if(this.title = '体检单') {
                // 查看体检单
                this.$notify.info({
                    title: '伪代码',
                    message: '此处调用打印API'
                });
                
            } else if(this.title = '编辑') {
                // 编辑
                let params = this.checkInfo

                this.$post('/orderManage/updateBookingReportPersonInfo', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                    this.item = data
                }).catch(err => this.$message.error(err.msg))
                this.handleSearch()
            }

            this.handleClose()
        },

        handleClose() {
            this.dialog = false
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
        },

        handleStatus(type,row) {
            let item = Object.assign({},row)
            if(type == 1) {
                // 查看体检单
                this.title = '体检记录'
                let params = {
                    reportCode: item.reportcode
                }
                this.$get('/orderManage/getBookingCheckList', params).then(data => {
                    this.checkList = data
                }).catch(err => this.$message.error(err.msg))
            } else if(type == 2) {
                // 查看体检单
                this.title = '体检单'
            } else {
                // 编辑
                this.title = '编辑'
                this.checkInfo = item
            }

            this.dialog = true
        }
    },
}
</script>
