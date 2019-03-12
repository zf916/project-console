
<style lang="stylus">
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    .main-blood-in
        width 100%
        height 100%
        .form-content
            padding 20px 20px 120px 20px
            margin-top 16px
            background #ffffff
            margin-top 16px
            border solid #E4E4E4 1px
            border-radius(4px)
            .form-main
                width 50%
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
                margin 40px 20px
</style>

<template lang="pug">
    .main-blood-in
        <check-card :item="item"></check-card>
        .form-content
            .title 血液检查
            .form-main
                <el-form  :inline="true" :model="ruleForm" ref="ruleForm" label-width="120px">
                    <el-form-item  label="体检结果" prop="result" style="width:100%">
                        <el-select v-model="ruleForm.result" size="small" placeholder="请选择">
                            <el-option label="合格" value="Y"></el-option>
                            <el-option label="不合格" value="N"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item v-if="ruleForm.result == 'N'" label="谷丙转氨酶" prop="alt">
                        <el-select v-model="ruleForm.alt" size="small" placeholder="请选择">
                            <el-option label="合格" value="Y"></el-option>
                            <el-option label="不合格" value="N"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="ruleForm.result == 'N'" label="医生签名" prop="userName">
                        <el-input v-model="userName" size="small" placeholder="医生签名"  style="width:180px"></el-input>
                    </el-form-item>

                    <el-form-item v-if="ruleForm.result == 'N'" label="抗HAV-IgM" prop="hav">
                        <el-select v-model="ruleForm.hav" size="small" placeholder="请选择">
                            <el-option label="合格" value="Y"></el-option>
                            <el-option label="不合格" value="N"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item v-if="ruleForm.result == 'N'" label="医生签名" prop="userName">
                        <el-input v-model="userName" size="small" placeholder="医生签名" style="width:180px"></el-input>
                    </el-form-item>

                    <el-form-item v-if="ruleForm.result == 'N'" label="抗HEV-IgG" prop="hev">
                        <el-select v-model="ruleForm.hev" size="small" placeholder="请选择">
                            <el-option label="合格" value="Y"></el-option>
                            <el-option label="不合格" value="N"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item v-if="ruleForm.result == 'N'" label="医生签名" prop="userName">
                        <el-input v-model="userName" size="small" placeholder="医生签名" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item v-if="ruleForm.result != 'N'" label="医生签名" prop="userName" style="width:100%">
                        <el-input v-model="userName" size="small" placeholder="医生签名"  style="width:180px"></el-input>
                    </el-form-item>

                    <el-form-item  label="描述" prop="node" style="width:100%">
                        <el-input v-model="ruleForm.node" type="textarea" style="width:600px"></el-input>
                    </el-form-item>

                    <el-form-item class="submit-btn">
                        <el-button type="primary" size="small" class="submit-btn" @click="submitForm('ruleForm')">提 交</el-button>
                    </el-form-item>
                </el-form>
</template>
<script>
import CheckCard from "comp/card/CheckCard";
export default {
    components: {
      CheckCard
    },
    data() {
        return {
            userName: localStorage.getItem("userName"),
            item: {
                value: '测试数据',
                menu: 'exam'
            },
            ruleForm:{
                reportCode: '',
                result: '',
                state: '',
                alt: '',
                hav: '',
                hev: '',
                node: ''
            },
        }
    },
    methods: {
        submitForm() {
            let params = this.ruleForm
            params.state = params.result == 'Y' ? 3 : 4
            this.$post('/examinationManage/resultBlood', params).then(data => {
                this.$message.success('提交成功')
                this.resetForm()
            }).catch(err => this.$message.error(err.msg))
        },

        resetForm() {
            this.ruleForm = {
                reportCode: '',
                result: '',
                state: '',
                alt: '',
                hav: '',
                hev: '',
                node: ''
            }
        }
    }
}
</script>

