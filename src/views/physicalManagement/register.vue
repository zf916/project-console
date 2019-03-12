<style lang="stylus">
    .main-register
        width 100%
        height 100%

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
        flex-center()
            display flex
            align-items center
            justify-content  center
        .action-group
            width 100%
            height 244px
            background #ffffff
            border solid #E7E7E1 1px
            border-radius(4px)
            padding 0 20px 20px 20px

            .action-title
                height 100px
                line-height 100px
                margin-bottom 30px
                font-weight bold
                border-bottom solid #E7E7E1 1px
                .lg 
                    base-font(20px)
                .sm
                    base-font(16px)
                    margin-left 5px
            .base-btn 
                width 100px
                height 32px
                color #00C6AE
                text-center(32px)
                border solid #00C6AE 1px
                border-radius(4px)
                background none
                margin-right 30px
        .info-detail
            width 100%
            background #ffffff
            border solid #E7E7E1 1px
            border-radius(4px)
            padding 0 20px 60px 20px
            margin-top 20px
            display flex

            .info-img,
            .info-msg,
            .info-pre
                height 100%
                .title 
                    height 60px
                    line-height 60px
                    base-font(16px)
                    font-weight bold
                 .content
                    height 312px
            .info-img
                width 216px
                .content
                    width 100%
                    height 312px
                    color #D3D3D3
                    text-align center
                    border-right solid #E7E7E1 1px
                    .img-box
                        width 147px
                        height 176px
                        margin 0 auto
                        border solid #E4E4E4 1px
                        background #ffffff
                        padding 5px
                        img 
                            width 100%
                            height 100%
            .info-msg
                .title 
                    margin-left 20px
                .content
                    border-right solid #E7E7E1 1px
                    padding 0 20px
            .info-pre
                flex 1
                .title 
                    margin-left 20px
                .content
                    width 100%
                    height 312px
                    color #D3D3D3
            .info-msg,
            .info-pre
                .el-form-item
                    margin-bottom 8px
            .order-null
                width 100%
                height 100%
                flex-center()
                        
</style>
<template lang="pug">
    .main-register
        .tabs
            .per-tab(v-bind:class="index == 1 ? 'on':''" @click="handleIndex(1)") 个人体检 
            .com-tab(v-bind:class="index == 2 ? 'on':''" @click="handleIndex(2)") 公司体检
        .form-content

        .action-group
            .action-title
                span.lg 输入/读取身份证
                span.sm （如果读取有误，请手动输入身份证信息）
            .action-info
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="办证日期" prop="value">
                        <el-date-picker v-model="dataTime" type="date" size="small" placeholder="办证日期" :disabled="true"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="操作人员" prop="value">
                        <el-input v-model="userName" size="small" placeholder="操作人员" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="办证单位" prop="value">
                        <el-input v-model="clientName" size="small" placeholder="办证单位" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="80px">
                    <el-form-item>
                        <el-button type="primary" size="small" class="base-btn" @click="handleReadCard">
                            <i class="el-icon-mobile-phone"/>
                            <span>读卡</span>
                        </el-button>
                        //- <el-button type="primary" size="small" class="base-btn">
                        //-     <i class="el-icon-printer"/>
                        //-     <span>打印</span>
                        //- </el-button>
                        <el-button type="primary" size="small" class="base-btn" @click="handleRegister">
                            <i class="el-icon-edit-outline"/>
                            <span>登记审核</span>
                        </el-button>
                        <el-button type="primary" size="small" class="base-btn" @click="handleCancel">
                            <i class="el-icon-circle-close-outline"/>
                            <span>取消</span>
                        </el-button>
                    </el-form-item>
                </el-form>
        .info-detail
            .info-img
                .title 照片
                .content
                    //- div
                    //-     <i class="el-icon-warning"/>
                    //- div 暂无信息
                    .img-box
                        img(v-if="idCard.img" :src="'data:image/png;base64,' + idCard.img")
                        <null v-else></null>
            .info-msg
                .title 身份证信息
                .content
                    <el-form ref="ruleForm" :inline="true" label-width="80px">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="idCard.name" size="small" placeholder="姓名"></el-input>
                        </el-form-item>

                        <el-form-item label="年龄" prop="Age">
                            <el-input v-model="idCard.Age" size="small" placeholder="年龄"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="80px">
                        <el-form-item label="性别" prop="Sex">
                            <el-radio v-model="idCard.Sex" label="男">男</el-radio>
                            <el-radio v-model="idCard.Sex" label="女">女</el-radio>
                        </el-form-item>

                        <el-form-item label="体检编号" prop="value" style="float:right">
                            <el-input v-model="idCard.value" size="small" placeholder="体检编号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="80px">
                        <el-form-item label="身份证号" prop="userNumber">
                            <el-input v-model="idCard.userNumber" size="small" placeholder="身份证号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="80px">
                        <el-form-item label="有效日期" prop="idCardStartTime"> 
                            <el-input v-model="idCard.idCardStartTime" size="small" placeholder="有效日期"></el-input>
                            //- <el-date-picker v-model="idCard.EffectedDate" size="small" type="date" placeholder="有效日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="至"  prop="idCardEndTime">
                            <el-input v-model="idCard.idCardEndTime" size="small" placeholder="有效日期"></el-input>
                            //- <el-date-picker v-model="idCard.ExpiredDate" size="small" type="date" placeholder="有效日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="80px">
                        <el-form-item label="工种名称" prop="value">
                            <el-select v-model="orderManage.professionId" size="small" placeholder="工种名称" @change="handleSetName">
                                <el-option v-for="item in workList" :key="item.professionId" :label="item.professionName" :value="item.professionId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="检查内容" prop="value">
                            <el-select v-model="orderManage.bookingTypeCode" size="small" placeholder="检查内容" @change="handleGetBookingProject" v-bind:disabled="orderManage.orderCode?true:false">
                                <el-option v-for="item in bookingTypeList" :key="item.code" :label="item.label" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="80px">
                        <el-form-item label="检查项目" prop="checkGroup">
                            <el-checkbox v-for="item in bookingProjectList" :key="item.bookingItemName" v-model="checked" :label="item.bookingItemName" disabled></el-checkbox>
                        </el-form-item>
                    </el-form>
            .info-pre
                .title 预约信息
                .content
                    .order-personal(v-if="index == 1 && orderManage.orderCode")
                        <el-form :model="orderManage" label-width="80px" >
                            <el-form-item label="姓名" prop="value">
                                <el-input v-model="orderManage.userName" size="small" placeholder="姓名" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="预约编号" prop="value">
                                <el-input v-model="orderManage.orderCode" size="small" placeholder="预约编号" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="value">
                                <el-input v-model="idCard.userNumber" size="small" placeholder="身份证号" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form :inline="true" label-width="80px">
                                <el-form-item label="预约时间" prop="value">
                                    <el-date-picker v-model="orderManage.bookingSharTime" size="small" type="date" placeholder="预约时间" style="width: 100%;" value-format="yyyy-MM-dd" :disabled="true"></el-date-picker>
                                </el-form-item>
                                //- <el-form-item label="预约时段" prop="value">
                                //-     <el-date-picker v-model="orderManage.bookingSharTime" size="small" type="date" placeholder="预约时间" style="width: 100%;" value-format="yyyy-MM-dd" :disabled="true"></el-date-picker>
                                //- </el-form-item>
                            </el-form>
                            <el-form-item label="公司名称" prop="unitName">
                                <el-input v-model="orderManage.unitName" size="small" placeholder="公司名称" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    <null v-else-if="index == 1"></null>
                    <el-form :model="orderManage" label-width="80px" v-if="index == 2">
                        <el-form-item label="公司名称" prop="value">
                            <el-select v-model="companyKeyword" size="small" filterable placeholder="请输入关键词">
                                <el-option v-for="item in companyList" :key="item.applyOrderId" :label="item.bookingUnit" :value="item.bookingUnit"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="已登记" prop="bookingCounted">
                            <el-input v-model="orderManage.bookingCounted" size="small" placeholder="已登记" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="未登记" prop="bookingCountbf">
                            <el-input v-model="orderManage.bookingCountbf" size="small" placeholder="未登记" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="unitName">
                            <el-input v-model="orderManage.unitName" size="small" placeholder="联系人" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="unitPhone">
                            <el-input v-model="orderManage.unitPhone" size="small" placeholder="联系方式" :disabled="true"></el-input>
                        </el-form-item>
                    </el-form>
</template>
<script>
import Null from "comp/status/Null"
import qs from 'qs'
export default {
    components: {
        Null
    },
    data() {
        return {
            userName: localStorage.getItem("userName"),
            clientName: localStorage.getItem("clientName"),
            dataTime: new Date(),
            workList: [], // 工种名称
            companyForm: {},
            companyKeyword: '',
            companyList: [],
            restaurants: [],
            orderManage: {
                bookingFlag: 1,
            },
            bookingTypeList: [{ label: '从业人员', code: "1" },{ label: '老年人体检', code: "2" }],
            bookingProjectList: [],
            // defaultImg: 'this.src="' + require('../../../static/images/common/userface1.jpg') + '"',
            index: 1, // 1.个人 2.团体
            idCard: {
                name: '',
                userNumber: '',
                idCardStartTime: '',
                idCardEndTime: ''
            },
            checked: true,
            checkGroup: [{
                code: true,
                label: '体征'
            },{
                code: 1,
                label: '胸透'
            },{
                code: 2,
                label: '肛拭'
            },{
                code: 3,
                label: '血液'
            }],
            admin: {
                value: '123123'
            }
        }
    },
    mounted() {
        this.handleWorkList()
        this.handleConpany()
    },
    methods: {
        // 查询工种名称
        handleWorkList() {
            this.$get('/orderManage/getProfessionList', {}).then(data => {
                this.workList = Object.assign([],data)
            }).catch(err => this.$message.error(err.msg))
        },

        // 读取身份证
        handleReadCard() {
            this.$store.dispatch('card/cardItem',true)
            this.idCard = Object.assign({},this.$store.state.card.cardItem)
            
            if(this.index == 1) {
                // 查询个人预约信息
                this.handleGetOrder()
            }
        },

        // 查询预约信息
        handleGetOrder() {
            let params = {
                userNumber: this.idCard.userNumber
                // userNumber: '130406198703210334'
            }
            this.$get('/orderManage/getUserInfoByNumber', params).then(data => {
                this.orderManage = Object.assign({},data)
                this.orderManage.bookingTypeCode = data.bookingTypeCode ? data.bookingTypeCode : "1"
                this.handleGetBookingProject()
            }).catch(err => this.$message.error(err.msg))
        },

        // 查询体检项目
        handleGetBookingProject() {
            let params = {
                bookingTypeCode: this.orderManage.bookingTypeCode || "1"
            }

            this.$get('/orderManage/getBookingProject', params).then(data => {
                this.bookingProjectList = Object.assign({},data)
            }).catch(err => this.$message.error(err.msg))
        },

        // 查询公司
        handleConpany() {
            setTimeout(() => {
                let params = {
                    bookingUnit: ''
                }
                this.$get('/orderManage/getCompanyOrderInfo', params).then(data => {
                    this.companyList = Object.assign([],data)
                }).catch(err => this.$message.error(err.msg))
            }, 1000)
        },

        // 登记审核
        handleRegister() {
            let params = Object.assign(this.orderManage,this.idCard)
            params.bookingFlag = this.index
            params.bookingType = parseInt(params.bookingTypeCode)

            this.$post('/orderManage/addBookingReport',qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
                this.$message.success('登记保存成功')
                this.resetForm();
            }).catch(err => this.$message.error(err.msg))
        },

        //选择公司 获取公司预约信息
        handleChange() {
            this.orderManage = Object.assign(this.orderManage,this.companyList.filter(this.createFilter(this.companyKeyword))[0])
            this.orderManage.bookingCountbf = this.orderManage.bookingCount - this.orderManage.bookingCounted
        },

        handleSetName(str) {
            this.orderManage = Object.assign(this.orderManage,this.workList.filter(this.workFilter(str))[0])
        },

        // 切换个人或公司
        handleIndex(index) {
            this.index = index
            
            if(index == 1) {
                this.handleGetBookingProject()
                this.$nextTick(() => {
                    this.orderManage.bookingTypeCode = "1"
                    this.orderManage.bookingFlag = 2
                })
            } else {
                this.bookingProjectList = []
                this.orderManage.bookingTypeCode = ""
                this.orderManage.bookingFlag = 1
            }

            this.resetForm()
        },
        
        // 工种列表筛选
        workFilter(str) {
            return (item) => {
                return (item.professionId === str)
            }
        },
        
        // 公司列表筛选
        createFilter(str) {
            return (item) => {
                return (item.bookingUnit.toLowerCase().indexOf(str.toLowerCase()) === 0)
            }
        },

        // 取消登记
        handleCancel() {
            this.$store.dispatch('card/cardItem',false)
            this.idCard = {}
            this.resetForm()
            return true
        },

        resetForm() {
            this.orderManage = {}
            this.companyKeyword = ""
        }
    }
}
</script>
