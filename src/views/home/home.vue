<template lang="pug">
    .main-home
        <el-alert :title="title" type="success"></el-alert>
</template>
<script>
export default {
    data() {
        return {
            title: ''
        }
    },
    mounted() {
        let dt = new Date()
        let month = dt.getMonth() + 1 < 10 ? ('0' + (dt.getMonth() + 1).toString()) : (dt.getMonth() + 1)
        let day =  dt.getDate() < 10 ? ('0' + dt.getDate().toString()) : dt.getDate()
        let str = " 星期" + "日一二三四五六".charAt(new Date().getDay());
        this.title = '下午好！ 欢迎使用预约体检控制台。当前时间为： ' + dt.getFullYear() + '年' + month + '月' + day + '日'
            + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) + ':'  + (dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds()) + str
        console.log(this.title)
    }
}
</script>
