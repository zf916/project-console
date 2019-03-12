<template lang="pug">
    .main-order
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" size="small" placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item  label="日期" prop="time">
                <el-date-picker v-model="ruleForm.time" size="small" type="date" placeholder="日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="订单状态" prop="state">
                <el-select v-model="ruleForm.state" size="small" placeholder="请选择状态">
                    <el-option label="已签到" :value="1"></el-option>
                    <el-option label="已预约" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="items" style="width: 100%">
            <el-table-column prop="timeSharing" label="订单号"></el-table-column>
            <el-table-column prop="AMPM" label="姓名"></el-table-column>
            <el-table-column prop="workStart" label="身份证"></el-table-column>
            <el-table-column prop="workEnd" label="时间段"></el-table-column>
            <el-table-column prop="intevalTime" label="预约日期"></el-table-column>
            <el-table-column prop="totalCount" label="预约时间段"></el-table-column>
            <el-table-column prop="timeSharCount" label="申请日期"></el-table-column>
            <el-table-column prop="timeSharCount" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleStatus(scope)">签到</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                time: '',
                state: '',
            },
            total: 1, //总条数
            limit: 10,
            offset: "", //当前页的索引
            currentPage: 1,
            pickerOption: {
                start: '00:00',
                step: '00:15',
                end: '23:45'
            },
            items:[{
                timeSharing:'222222222222',
                AMPM:'222222222222',
                workStart:'222222222222',
                workEnd:'222222222222',
                intevalTime:'222222222222',
                totalCount:'222222222222',
                timeSharCount:'222222222222',
            }]
        }
    },
    methods: {
        submitForm(formName) {
            this.$message.success('查询')
        },

        handleList(params=this.ruleForm) {
            let param = JSON.parse(JSON.stringify(params))
            console.log(param)
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
        },

        handleStatus() {
            this.$message.success('签到成功或失败')
        }
    },
}
</script>
