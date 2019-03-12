<style lang="stylus">
    .main-certification
        border-radius()
            -webkit-border-radius arguments
            -moz-border-radius arguments
            border-radius arguments
        .form-content
            padding 20px
            margin-top 16px
            background #ffffff
            border solid #E4E4E4 1px
            border-radius(4px)

            .count
                color #333333
                font-size 14px
                .lg
                    font-size 26px
        .fr 
            float right 
</style>

<template lang="pug">
    .main-certification
        .form-content
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item label="录入日期" prop="starTime">
                    <el-date-picker v-model="ruleForm.starTime" size="small" type="date" placeholder="录入日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item label="至" prop="endTime">
                    <el-date-picker v-model="ruleForm.endTime" size="small" type="date" placeholder="录入日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleList">查询</el-button>
                    <el-button type="primary" size="small" @click="handleExport">导出Excel</el-button>
                </el-form-item>

                <el-form-item class="fr">
                    span.count 颁证人数总计：
                        span.lg {{ count }}
                        span 人
                </el-form-item>
            </el-form>
            <el-table stripe :data="items" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="value" label="证件类型"></el-table-column>
                <el-table-column prop="value" label="证件编号"></el-table-column>
                <el-table-column prop="value" label="颁证时间"></el-table-column>
                <el-table-column prop="value" label="有效期（起始）"></el-table-column>
                <el-table-column prop="value" label="持证者"></el-table-column>
                <el-table-column prop="value" label="有效期（截止）"></el-table-column>
                <el-table-column prop="value" label="年龄"></el-table-column>
                <el-table-column prop="value" label="性别"></el-table-column>
                <el-table-column prop="value" label="体检状态"></el-table-column>
            </el-table>
            <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
</template>
<script>
export default {
    data() {
        return {
            ruleForm:{
                starTime: '',
                endTime: ''
            },
            count: 670,
            items:[
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
                {value: '颁证统计表'},
            ],
            total: 10, //总条数
            limit: 10,
            offset: "", //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        // 初始化加载列表
        this.handleList()
    },
    methods: {
        handleList(params=this.ruleForm) {
            // 获取列表
            let param = JSON.parse(JSON.stringify(params))
            this.$notify.info({
                title: '伪代码',
                message: '此处调用列表API'
            });
        },
        
        handleExport() {
            this.$notify.info({
                title: '伪代码',
                message: '此处调用导出API'
            });
        },

        handleSizeChange(val) {
            this.limit = val;
            this.handleList(
                Object.assign(
                    { limit: this.limit, offset: this.offset },
                    this.ruleForm
                )
            );
        },

        handleCurrentChange(val) {
            let { limit } = this;
            this.offset = limit * (val - 1);
            this.currentPage = val;
            this.handleList(
                Object.assign(
                    { limit: this.limit, offset: this.offset },
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


