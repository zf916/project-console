<template lang="pug">
    .main-source
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="80px">
            <el-form-item  label="号源日期" prop="timeSharing">
                <el-date-picker v-model="ruleForm.timeSharing" size="small" type="date" placeholder="号源日期" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="号源时段" prop="AMPM">
                <el-select v-model="ruleForm.AMPM" size="small" placeholder="请选择状态">
                    <el-option label="上午" :value="1"></el-option>
                    <el-option label="下午" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="开始时间" prop="workStart">
                <el-time-select v-model="ruleForm.workStart" size="small" :picker-options="pickerOption" placeholder="选择时间">
                </el-time-select>
            </el-form-item>

            <el-form-item label="结束时间"  prop="workEnd">
                <el-time-select v-model="ruleForm.workEnd" size="small" :picker-options="pickerOption" placeholder="选择时间">
                </el-time-select>
            </el-form-item>

            <el-form-item label="间隔分钟" prop="intevalTime">
                <el-select v-model="ruleForm.intevalTime" size="small" placeholder="间隔分钟">
                    <el-option label="30分钟" :value="30"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时段号数" prop="totalCount">
                <el-input v-model="ruleForm.totalCount" size="small" placeholder="时段号数"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="items" style="width: 100%">
            <el-table-column prop="timeSharing" label="预约日期"></el-table-column>
            <el-table-column prop="AMPM" label="时段"></el-table-column>
            <el-table-column prop="workStart" label="开始时间"></el-table-column>
            <el-table-column prop="workEnd" label="结束时间"></el-table-column>
            <el-table-column prop="intevalTime" label="时间间隔"></el-table-column>
            <el-table-column prop="totalCount" label="号源总数"></el-table-column>
            <el-table-column prop="timeSharCount" label="分配号段"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleDelete(scope)">删除</el-button>
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
                timeSharing: '',
                AMPM: '',
                intevalTime: '',
                workStart: '',
                workEnd: '',
                totalCount: ''
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
            rules: {
                timeSharing: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                AMPM: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                intevalTime: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                workStart: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                workEnd: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                totalCount: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            items:[{
                timeSharing:'1',
                AMPM:'1',
                workStart:'1',
                workEnd:'1',
                intevalTime:'1',
                totalCount:'1',
                timeSharCount:'1',
            }]
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.$message.success('新增成功或失败')
                   this.resetForm(formName);
                } else {
                    return false;
                }
            });
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

        handleDelete() {
            this.$message.success('删除成功或失败')
        }
    },
}
</script>
