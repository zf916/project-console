<style lang="stylus">
    $main-color = #00C6AE
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments
    base-font()
        font-size arguments
        color #333333
    text-center()
        text-align center
        line-height arguments
    .check-card
        width 100%
        height 153px
        background #ffffff
        border solid #E7E7E1 1px
        padding 12px 25px
        border-radius(4px)
        display flex

        .el-form--inline
            height 30px
        .el-form-item
            margin-bottom 0

        .img-box
            width 79px
            height 95px
            margin 0 auto
            border solid #E4E4E4 1px
            background #ffffff
            padding 5px
            margin-top 10px
            img 
                width 100%
                height 100%
        span
            color #666666
        .-val
            display inline-block
            width 200px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
        
        .card-info
            flex 1
            margin-left 30px
            color #666666

        .card-code
            padding 0 20px
            border-left solid #E4E4E4 1px
            .title
                margin 5px
            .title,
            .el-input__inner
                base-font(16px)
                font-weight bold
            .el-form 
                line-height 25px
            .print-btn
                width 100px
                height 30px
                background $main-color
                color #ffffff
                font-size 14px
                text-center(30px)
                border-radius(4px)
                margin 15px auto
                cursor pointer
            .msg
                color #999999
                font-size 12px
                margin 15px auto
                text-align right 
</style>

<template lang="pug">
    .check-card 
        .card-img
            .img-box
                img(v-if="item.img" :src="'data:image/png;base64,' + item.img")
                img(v-else src="/static/images/common/userface1.jpg")
        .card-info
            .content
                <el-form ref="ruleForm" :inline="true" label-width="80px">
                    <el-form-item label="姓 名:" prop="name">
                        <span class="-val">{{ item.name }}</span>
                    </el-form-item>

                    <el-form-item label="性 别:" prop="sex">
                        <span class="-val">{{ item.sex }}</span>
                    </el-form-item>

                    <el-form-item label="年 龄:" prop="age">
                        <span class="-val">{{ item.age }}</span>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="体检编号:" prop="reportCode">
                        <span class="-val">{{ item.reportCode }}</span>
                    </el-form-item>

                    <el-form-item label="体检状态:" prop="bookingstate">
                        <span class="-val" v-if="item.bookingstate == 1">已登记/已审核</span>
                        <span class="-val" v-else-if="item.bookingstate == 2">体检中</span>
                        <span class="-val" v-else-if="item.bookingstate == 3">已失效</span>
                        <span class="-val" v-else-if="item.bookingstate == 4">未通过</span>
                        <span class="-val" v-else-if="item.bookingstate == 5">已通过</span>
                        <span class="-val" v-else-if="item.bookingstate == 6">已发证</span>
                        <span class="-val" v-else></span>
                    </el-form-item>

                    <el-form-item label="工种名称:" prop="professionName">
                        <span class="-val">{{item.professionName}}</span>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="身份证号:" prop="value">
                        <span class="-val">{{ item.userNumber }}</span>
                    </el-form-item>
                    <el-form-item label="审核时间:" prop="value">
                        <span class="-val">{{ item.value }}</span>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="检查项目">
                        <el-checkbox v-for="item in item.bookingItem" :key="item.bookingItemName" v-model="checked" :label="item.bookingItemName" disabled></el-checkbox>
                    </el-form-item>
                </el-form>
        .card-code
            .title 扫码或输入条码
            <el-form label-width="80px">
                <el-input v-model="item.value" size="small" placeholder="条码" class="title"></el-input>
                .for-code(v-if="item.menu == 'code'")
                    div
                        <el-checkbox v-model="item.value" label="自动打印肛拭采集标签"></el-checkbox>
                    div
                        <el-checkbox v-model="item.value" label="自动打印血液采集标签"></el-checkbox>
                .for-cert(v-if="item.menu == 'cert'")
                    .print-btn 打印健康证
                .for-exam(v-if="item.menu == 'exam'")
                    .msg 如果扫码不成功，请输入条码点击回车添加
            </el-form>
        //- .card-code
        //-     .title 扫码或输入条码
        //-     <el-form label-width="80px">
        //-         <el-input v-model="item.value" size="small" placeholder="条码" class="title"></el-input>
                
        //-     </el-form>
        //- .card-code
        //-     .title 扫码或输入条码
        //-     <el-form label-width="80px">
        //-         <el-input v-model="item.value" size="small" placeholder="条码" class="title"></el-input>
                
        //-     </el-form>
</template>
<script>
export default {
    name: 'card',
    props: {
        item: {}
    },
    data() {
        return {
            checked: true,
            // idCard: {
            //     Sex: '',
            //     Age: '',
            //     Nation: '',
            //     Born: '',
            //     Address: '',
            //     CardNo: '',
            //     IssuedAt: '',
            //     EffectedDate: '',
            //     ExpiredDate: '',
            //     SAMID: '',
            //     Pic: '',
            //     Picture: '',
            //     PictureLen: ''
            // }
        }
    },
    mounted() {
       
    }
}
</script>
