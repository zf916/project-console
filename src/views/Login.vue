<style lang="stylus">
    .main
        width 100%
        height 100%
        background url('../../static/images/common/login_bg.jpg')
        background-size 100% 100%

        border-radius()
            -webkit-border-radius arguments
            -moz-border-radius arguments
            border-radius arguments
        position-absolute()
            position absolute
            left arguments
            top arguments
        box-sizing()
            -webkit-box-sizing arguments
            -moz-box-sizing arguments
            -o-box-sizing arguments
            box-sizing arguments
        .login-box
            width 300px
            height 430px
            margin -215px -150px 
            position-absolute(50%)
            .login-icon
                position relative
                width 100px
                height 100px
                border-radius(50%)
                border 5px solid #fff
                margin -50px 100px
                box-shadow 0 0 30px #009688
                z-index 99
                img 
                    width 100%
            .login-form
                width 300px
                height 260px
                box-sizing(border-box)
                background #ffffff
                border-radius(5px)
                box-shadow 0 0 50px #009688
                padding 70px 15px 0 
            .submit
                width 270px
                height 38px
                line-height 38px
                margin 15px 0
                background-color #009688
                color #fff
                white-space nowrap
                text-align center
                font-size 14px
                border none
                border-radius 2px
                cursor pointer
</style>

<template lang="pug">
    .main
        .login-box
            .login-icon
                img(src="/static/images/common/face.jpg")
            .login-form
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username" placeholder="请输入用户名">
                        <el-input v-model="ruleForm.username" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                        .submit(@click="submit('ruleForm')") 登陆
                    //- <el-input style="margin-bottom: 15px;" v-model="admin.userName" placeholder="请输入用户名"></el-input>
                    //- <el-input v-model="admin.password" show-password placeholder="请输入密码"></el-input>
                </el-form>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    beforeMount(){
        // if(localStorage.getItem('token')){
        //     this.$router.replace('/alertsaudit');
        // };
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('/client/login', this.ruleForm).then(data => {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });

                        this.setLocal(data)
                        this.$router.replace('/home');
                    }).catch(err => this.$message.error(err.msg || '账号或密码错误'))
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        setLocal(data) {
            Object.keys(data).forEach(el => {
                localStorage.setItem(el,data[el]);
            })
        }
    }
}
</script>
