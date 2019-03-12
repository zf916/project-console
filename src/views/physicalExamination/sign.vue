
<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    .main-sign
        width 100%
        height 100%
        .content
            display flex
            .table-main
                border solid #ECECEC 1px
                
            .main-left 
                flex-grow 5
            .main-right 
                flex-grow 7
                margin-left 20px

                .th 
                    width 25%
                .td 
                    width 30%
            .title
                color #333333
                font-size 14px
                line-height 30px
            .tr 
                height 36px
                align-content center
                display flex
                border-bottom  solid #ECECEC 1px
                
                .th,
                .td 
                    line-height 36px
                    padding 0 15px
                .th 
                    width 30%
                    text-align right 
                    border-right solid #ECECEC 1px
                    background #FAFAFA

            .node 
                height 60px
                line-height 60px
                border-bottom  none
        .form-content,
        .tab-item2
            height 100%
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)
        .form-group
            height 70%
            display flex
            justify-content center
            margin-top 16px
            .item
                height 100%
                background #ffffff
                border solid #E4E4E4 1px
                width 49%
                margin-right 1%
                padding 20px
                border-radius(4px)
                .title
                    height 35px
                    font-size 16px
                    color #333333
                    font-weight bold
                    border-bottom solid #E4E4E4 1px
                    margin-bottom 20px
                .submit-btn
                    float right 
                    border-radius(4px)
                    margin-right 20px

</style>
<template lang="pug">
    .main-sign
        .tabs
            .per-tab(v-bind:class="index == 0 ? 'on':''" @click="handleIndex(0)") 体征录入 
            .com-tab(v-bind:class="index == 1 ? 'on':''" @click="handleIndex(1)") 体检列表
        .tab-item1(v-if="index == 0")
            <check-card :item="cardItem"></check-card>
            .form-group
                .item
                    .title 既往病史
                    <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                        <el-form-item  label="肝炎" prop="hepatitis" style="width: 100%;">
                            <el-select v-model="previousEntity.hepatitis" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="痢疾" prop="dysentery" v-bind:style="previousEntity.dysentery == 'Y' ? 'width: 100%' : ''">
                            <el-select v-model="previousEntity.dysentery" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="患病时间" prop="dysenteryTime" v-if="previousEntity.dysentery == 'N'">
                            <el-date-picker v-model="previousEntity.dysenteryTime" size="small" type="date" placeholder="录入日期" style="width: 200px;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>

                        <el-form-item  label="伤寒" prop="typhoid" style="width: 100%;">
                            <el-select v-model="previousEntity.typhoid" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="肺 结 核" prop="phtisis" style="width: 100%;">
                            <el-select v-model="previousEntity.phtisis" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="皮 肤 病" prop="dermatosis" v-bind:style="previousEntity.dermatosis == 'Y' ? 'width: 100%' : ''">
                            <el-select v-model="previousEntity.dermatosis" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="患病时间" prop="dermatosisTime" v-if="previousEntity.dermatosis == 'N'">
                            <el-date-picker v-model="previousEntity.dermatosisTime" size="small" type="date" placeholder="录入日期" style="width: 200px;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        
                        <el-form-item  label="其 它" prop="node">
                            <el-input v-model="previousEntity.node" type="textarea" style="width:600px"></el-input>
                        </el-form-item>

                        <el-form-item class="submit-btn">
                            <el-button type="primary" size="small" class="submit-btn" @click="handlePrevious">提 交</el-button>
                        </el-form-item>
                    </el-form>
                .item
                    .title 体征
                    <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="110px">
                        <el-form-item  label="心" prop="heart">
                            <el-select v-model="signEntity.heart" size="small" placeholder="请选择">
                                <el-option label="合格" value="Y"></el-option>
                                <el-option label="不合格" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="肝" prop="liver">
                            <el-select v-model="signEntity.liver" size="small" placeholder="请选择">
                                <el-option label="合格" value="Y"></el-option>
                                <el-option label="不合格" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="脾" prop="spleen">
                            <el-select v-model="signEntity.spleen" size="small" placeholder="请选择">
                                <el-option label="合格" value="Y"></el-option>
                                <el-option label="不合格" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="肺" prop="lung">
                            <el-select v-model="signEntity.lung" size="small" placeholder="请选择">
                                <el-option label="合格" value="Y"></el-option>
                                <el-option label="不合格" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="手癣" prop="handtinea">
                            <el-select v-model="signEntity.handtinea" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="指甲癣" prop="fingernailtinea">
                            <el-select v-model="signEntity.fingernailtinea" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="银屑病" prop="psoriasis">
                            <el-select v-model="signEntity.psoriasis" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="手部湿疹" prop="handeczema">
                            <el-select v-model="signEntity.handeczema" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="渗出性皮肤病" prop="exudative">
                            <el-select v-model="signEntity.exudative" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  label="化脓性皮肤病" prop="fester">
                            <el-select v-model="signEntity.fester" size="small" placeholder="请选择">
                                <el-option label="无" value="Y"></el-option>
                                <el-option label="有" value="N"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="其 它" prop="node">
                            <el-input v-model="signEntity.node" type="textarea" style="width:600px"></el-input>
                        </el-form-item>

                        <el-form-item class="submit-btn">
                            <el-button type="primary" size="small" class="submit-btn" @click="handleSubmitSign">提 交</el-button>
                        </el-form-item>
                    </el-form>
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
            <el-table stripe :data="items" style="width: 100%">
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="reportCode" label="体检编号"></el-table-column>
                <el-table-column prop="idnumber" label="身份证号"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="createTime" label="录入时间"></el-table-column>
                <el-table-column prop="state" label="体征状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state == 1">待检验</span>
                        <span v-if="scope.row.state == 2">合格</span>
                        <span v-if="scope.row.state == 3">不合格</span>
                    </template> 
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="handleView(scope)">查看</el-button>
                        <el-button class="tb-btn" size="mini">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <el-dialog title="查看详情" :visible.sync="dialogView" width="50%">
            .content
                .main-left 
                    .title 既往病史
                    .table-main
                        .tr 
                            .th 肝炎
                            .td
                                span(v-if="viewItem.hepatitis == 'Y'") 无
                                span(v-if="viewItem.hepatitis == 'N'") 有 无
                        .tr 
                            .th 痢疾
                            .td 
                                span(v-if="viewItem.dysentery == 'Y'") 无
                                span(v-if="viewItem.dysentery == 'N'") 有
                        .tr 
                            .th 伤寒
                            .td 
                                span(v-if="viewItem.typhoid == 'Y'") 无
                                span(v-if="viewItem.typhoid == 'N'") 有
                        .tr 
                            .th 肺结核
                            .td 
                                span(v-if="viewItem.phtisis == 'Y'") 无
                                span(v-if="viewItem.phtisis == 'N'") 有
                        .tr 
                            .th 皮肤病
                            .td 
                                span(v-if="viewItem.dermatosis == 'Y'") 无
                                span(v-if="viewItem.dermatosis == 'N'") 有
                        .tr.node  
                            .th 其它
                            .td {{ viewItem.node }}
                .main-right
                    .title 体征
                    .table-main
                        .tr 
                            .th 心
                            .td 
                                span(v-if="viewItem2.heart == 'Y'") 合格
                                span(v-if="viewItem2.heart == 'N'") 不合格
                            .th 手癣
                            .td 
                                span(v-if="viewItem2.handtinea == 'Y'") 无
                                span(v-if="viewItem2.handtinea == 'N'") 有
                        .tr 
                            .th 肝
                            .td 
                                span(v-if="viewItem2.liver == 'Y'") 合格
                                span(v-if="viewItem2.liver == 'N'") 不合格
                            .th 指甲癣
                            .td 
                                span(v-if="viewItem2.fingernailtinea == 'Y'") 无
                                span(v-if="viewItem2.fingernailtinea == 'N'") 有
                        .tr 
                            .th 脾
                            .td 
                                span(v-if="viewItem2.lung == 'Y'") 合格
                                span(v-if="viewItem2.lung == 'N'") 不合格
                            .th 手部湿疹
                            .td 
                                span(v-if="viewItem2.handeczema == 'Y'") 无
                                span(v-if="viewItem2.handeczema == 'N'") 有
                        .tr 
                            .th 肺
                            .td 
                                span(v-if="viewItem2.dermatosis == 'Y'") 合格
                                span(v-if="viewItem2.dermatosis == 'N'") 不合格
                            .th 银屑病
                            .td 
                                span(v-if="viewItem2.psoriasis == 'Y'") 无
                                span(v-if="viewItem2.psoriasis == 'N'") 有
                        .tr 
                            .th /
                            .td /
                            .th 渗出性皮肤病
                            .td 
                                span(v-if="viewItem2.exudative == 'Y'") 无
                                span(v-if="viewItem2.exudative == 'N'") 有
                        .tr 
                            .th /
                            .td /
                            .th 化脓性皮肤病
                            .td 
                                span(v-if="viewItem2.fester == 'Y'") 无
                                span(v-if="viewItem2.fester == 'N'") 有
                        .tr.node  
                            .th 医生签名
                            .td {{ userName }}
                        .tr.node
                            .th 其它
                            .td 
                                span(v-if="viewItem2.node == 'Y'") 无
                                span(v-if="viewItem2.node == 'N'") 有
            <span slot="footer" class="dialog-footer">
                <el-button class="el-button submit-btn el-button--primary el-button--small" @click="handleClose">确定</el-button>
            </span>
        </el-dialog>
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
            userName: localStorage.getItem("userName"),
            cardItem: {
                value: '测试数据',
                menu: 'exam'
            },
            item: {},
            ruleForm:{
                reportCode: '',
                startTime: '',	
                endTime: '',	
                bookingstate: ''
            },
            previousEntity: {},
            signEntity: {},
            viewItem: {},
            viewItem2: {},
            items: [],
            dialogView: false,
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

        // 提交体征
        handlePrevious() {
            let state = 2 // 1 待检查 2 合格 3不合格
            Object.keys(this.previousEntity).forEach(el =>{
                if(this.previousEntity[el] == 'N') {
                    state = 3
                    return
                }
            })

            let params = {
                reportCode: '111',
                state: state,
            }

            this.$post('/examination/addPrevious', Object.assign(params,this.previousEntity)).then(data => {
                this.$message.success('提交成功')
                this.previousEntity = {}
            }).catch(err => this.$message.error(err.msg))
        },

        // 提交体征
        handleSubmitSign() {
            let state = 2 // 1 待检查 2 合格 3不合格
            Object.keys(this.signEntity).forEach(el =>{
                if(this.signEntity[el] == 'N') {
                    state = 3
                    return
                }
            })

            let params = {
                reportCode: '111',
                state: state,
            }

            this.$post('/examination/addSigns', Object.assign(params,this.signEntity)).then(data => {
                this.$message.success('提交成功')
                this.signEntity = {}
            }).catch(err => this.$message.error(err.msg))
        },

        handleList(params=this.ruleForm) {
            // 获取角色列表
            this.$post('/examination/getSignsList', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.items = data
                this.total = data.length
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

        // 查看详情
        handleView(scope) {
            this.dialogView = true
            let params = {
                reportCode: scope.row.reportCode
            }

            this.$get('/examination/getPrevious',params).then(data => {
                this.viewItem = data
            }).catch(err => this.$message.error(err.msg))

            this.$get('/examination/getSigns',params).then(data => {
                this.viewItem2 = data
            }).catch(err => this.$message.error(err.msg))
        },

        handleClose() {
            this.dialogView = false
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
    }
}
</script>

