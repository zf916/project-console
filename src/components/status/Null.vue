<style lang="stylus">
    flex-center()
        display flex
        align-items center
        justify-content  center
    .null 
        width 100%
        height 100%
        text-align center
        flex-center()
        .msg 
            text-align center
            font-size 14px
            color #999999
            margin 10px auto
</style>

<template lang="pug">
    .null
        div
            img(src="/static/images/common/tips_img_no.png")
            div.msg 暂无信息
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>

