<style lang="stylus">
    .main-account
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
        .el-dialog__body
            .el-form-item
                margin-bottom 10px
</style>

<template lang="pug">
    .main-account
        .form-content
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item label="姓名" prop="name">
                     <el-input v-model="ruleForm.name" size="small" placeholder="姓名"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                     <el-input v-model="ruleForm.phone" size="small" placeholder="手机号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                    <el-button type="primary" size="small" @click="handleEdit">新增</el-button>
                </el-form-item>
            </el-form>
            <el-table stripe :data="items" style="width: 100%">
                <el-table-column prop="userName" label="账号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="mail" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button class="tb-btn" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popover placement="top" width="160" v-model="scope.row.visible">
                            <p>删除后不可撤销,是否确认删除?</p>
                            <div style="text-align: right; margin-top: 10px">
                                <el-button class="pover-btn" type="primary" size="mini" @click="handleDelete(scope)">确定</el-button>
                            </div>
                            <el-button class="tb-btn" size="mini" slot="reference">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="text-align:right;margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <el-dialog :title="title" :visible.sync="dialog" width="50%">
            .content
                <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px">
                    <el-form-item label="账号" prop="value" style="width:46%">
                        <el-input v-model="item.userName" size="small" placeholder="请输入账号"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="value" style="width:46%">
                        <el-input v-model="item.password" size="small" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名" prop="value" style="width:46%">
                        <el-input v-model="item.name" size="small" placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item  label="手机" prop="value" style="width:46%">
                        <el-input v-model="item.phone" size="small" placeholder="请输入手机"></el-input>
                    </el-form-item>

                    <el-form-item  label="邮箱" prop="value" style="width:46%">
                        <el-input v-model="item.mail" size="small" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    //- <el-form-item  label="备 注" prop="value" style="width:100%">
                    //-     <el-input v-model="item.value" type="textarea" style="width: 280px"></el-input>
                    //- </el-form-item>

                    <el-table stripe :data="roleItems" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" label="选择"></el-table-column>
                        <el-table-column prop="roleName" label="角色名称"></el-table-column>
                    </el-table>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="el-button submit-btn el-button--primary el-button--small" @click="handleClose">取 消</el-button>
                <el-button  class="el-button submit-btn el-button--primary el-button--small" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            userCode: localStorage.getItem("userCode"),
            ruleForm:{
                name: '',
                phone: ''
            },
            item: {},
            title: '',
            roleItems: [],
            items:[],
            dialog: false,
            total: 10, //总条数
            limit: 10,
            page: 1, //当前页的索引
            currentPage: 1,
        }
    },
    mounted() {
        // 初始化加载列表
        this.handleSearch()
        // 获取角色列表
        this.handleGetUserList()
    },
    methods: {
        handleList(params=this.ruleForm) {
            // 获取账户列表
            params.clientCode = this.userCode
            this.$get('/client/list', params).then(data => {
                data.forEach(el => {
                    el.visible = false
                })
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

        handleGetUserList() {
            this.$get('/role/userlist', {}).then(data => {
                data.forEach(el => {
                    el.checked = false
                })
                this.roleItems = data
            }).catch(err => this.$message.error(err.msg))
        },

        handleSelectionChange(selection) {
            this.roleItems.filter(el => {
                if(el.roleName == selection[0].roleName) {
                    console.log(el)
                    el.checked = el.checked ? false : true
                }
            })
        },

        handleEdit(row) {
            if(row.userCode) {
                // 点击编辑
                this.item = Object.assign({},row)
                this.title = '编辑'
            } else {
                // 点击新增
                this.item = {}
                this.title = '新增'
                this.roleItems.forEach(el => {
                    el.checked = false
                })
            }
            this.dialog = true
        },
        handleSubmit() {
            let joleJson = this.roleItems.filter(el => {
                return el.checked
            })
            // 提交保存
            if(this.item.userCode) {
                
                // 更新
                let params = {
                    username: this.item.userName,
                    usercode: this.item.userCode,
                    mail: this.item.mail,
                    phone: this.item.phone,
                    name: this.item.name,
                    password: this.item.password,
                    joleJson: JSON.stringify(joleJson)
                }
                this.$post('/client/edit', params).then(data => {
                    this.saveSuccess()
                }).catch(err => this.$message.error(err.msg))
            } else {
                // 提交
                // let params = this.item
                let params = {
                    username: this.item.userName,
                    mail: this.item.mail,
                    phone: this.item.phone,
                    deptName: this.item.deptName,
                    password: this.item.password,
                    joleJson: JSON.stringify(joleJson)
                }
                this.$post('/client/add', params).then(data => {
                    this.saveSuccess()
                }).catch(err => this.$message.error(err.msg))
            }
            this.handleClose()
            this.handleSearch()
        },
        
        handleDelete(scope) {
            scope.row.visible = false
            this.$delete('/client/del/' + scope.row.userCode,{}).then(data => {
                this.$message.success('删除成功')
                this.handleSearch()
            }).catch(err => this.$message.error(err.msg))
        },

        saveSuccess() {
            this.$message.success('保存成功')
            this.handleClose()
            this.handleSearch()
            this.item = {}
        },

        handleClose() {
            this.dialog = false
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
        }
    },
}
</script>


