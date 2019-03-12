
<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    .main-xrays
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
            .title
                height 35px
                font-size 16px
                color #333333
                font-weight bold
                border-bottom solid #E4E4E4 1px
                margin-bottom 20px
</style>

<template lang="pug">
    .main-xrays
        .tabs
            .per-tab(v-bind:class="index == 0 ? 'on':''" @click="handleIndex(0)") 胸透录入 
            .com-tab(v-bind:class="index == 1 ? 'on':''" @click="handleIndex(1)") 体检列表
        .tab-item1(v-if="index == 0")
            <check-card :item="item"></check-card>
            .form-content
                .title X线胸透或胸部拍片
                <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
                    <el-form-item  label="结 果" prop="state">
                        <el-select v-model="xRayItem.state" size="small" placeholder="请选择">
                            <el-option label="合格" :value="2"></el-option>
                            <el-option label="不合格" :value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  label="其 它" prop="node">
                        <el-input v-model="xRayItem.node" type="textarea" style="width:600px"></el-input>
                    </el-form-item>

                    <el-form-item label="医生签名" prop="userName">
                        <el-input v-model="userName" size="small" placeholder="医生签名"  style="width:180px"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="small" @click="handleSave">提 交</el-button>
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
                <el-table-column prop="state" label="胸透状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state == 1">待检验</span>
                        <span v-if="scope.row.state == 2">合格</span>
                        <span v-if="scope.row.state == 3">不合格</span>
                    </template> 
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="submitForm(scope)">查看</el-button>
                        <el-button class="tb-btn" size="mini" @click="submitForm(scope)">修改</el-button>
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
            userName: localStorage.getItem("userName"),
            item: {
                value: '测试数据',
                state:  2, // 1 待检查 2 合格 3不合格
                menu: 'exam'
            },
            xRayItem: {
                state: '',
                node: '',
                reportCode: '87987987987897',
                raytitile: 'X线胸透或胸部拍片'
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

        handleSave() {
            let params = this.xRayItem
            params.result = params.state

            this.$post('/examination/addRay',params).then(data => {
                this.$message.success('提交成功')
                this.xRayItem = {}
            }).catch(err => this.$message.error(err.msg))
        },

        submitForm(formName) {
            this.$message.success('提交')
        },
        
        handleList(params=this.ruleForm) {
            // 获取角色列表
            this.$post('/examination/getRayList', qs.stringify(params),{'Content-Type':'application/x-www-form-urlencoded'}).then(data => {
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

