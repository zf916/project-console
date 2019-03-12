<style lang="stylus">
    $main-color = #00C6AE
    box-sizing()
        -webkit-box-sizing arguments
        -moz-box-sizing arguments
        -o-box-sizing arguments
        box-sizing arguments
    .card
        width 434px
        height 183px
        padding 20px 13px
        box-sizing(border-box)
        .card-title
            color #000000
            font-size 16px
            font-weight bold
            text-align center
        .card-detail
            width 100%
            display flex
            margin-top 15px
            align-items center
            justify-content center
        .card-img
            width 66px
            height 82px
            img 
                width 100%
                height 100%
        .card-form
            flex 1
            height 82px
            color #666666
            margin-left 15px
            .form-group
                margin-bottom 8px
                font-size 14px
                .m-harf 
                    display inline-block
                    width 50%
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis

</style>

<template lang="pug">
    .card 
        .card-title 湖北省从业人员预防性健康检查合格证明
        .card-detail
            .card-img
                img(v-if="item.img" :src="'data:image/png;base64,' + item.img")
                img(v-else src="/static/images/common/userface1.jpg")
            .card-form
                .form-group
                    span 身份证号：{{ item.userNumber }}
                .form-group
                    span 编 号：{{ item.reportCode }}
                .form-group
                    span.m-harf 姓 名：{{ item.name }}
                    span.m-harf 性 别：{{ item.sex }}
                .form-group
                    span.m-harf 年 龄：{{ item.age }}
                        span(v-if="item.age") 岁
                    span.m-harf 工 种：{{ item.professionName }}
                .form-group
                    span 体检日期：{{ item.createTime }}
                .form-group
                    span 有效期止：{{ item.reportEndTime }}
            
</template>
<script>
export default {
    name: 'card',
    props: {
        item: {
            userNumber: '',
            reportCode: '',
            name: '',
            sex: '',
            age: '',
            createTime: '',
            value: '???'
        }
    },
    data() {
        return {
           
        }
    },
    mounted() {
    }
}
</script>
