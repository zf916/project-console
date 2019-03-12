<style lang="stylus">
    .main-role
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

        .submit-btn
            border-radius 4px
    .el-popover
        .pover-btn
            width 60px
            border-radius 4px
    .el-button--text
        color #606266
    .el-button--text:hover,
    .el-button--text:focus
        color #00c6ae
</style>

<template lang="pug">
    .main-role
        .form-content
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                     <el-input v-model="ruleForm.roleName" size="small" placeholder="角色名称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                    <el-button type="primary" size="small" @click="handleEdit">新增</el-button>
                </el-form-item>
            </el-form>
            <el-table stripe :data="items" style="width: 100%">
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="node" label="角色说明"></el-table-column>
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
                <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
                    <el-form-item label="角色名称" prop="value" style="width:100%">
                        <el-input v-model="item.roleName" size="small" placeholder="角色名称" style="width:180px"></el-input>
                    </el-form-item>

                    <el-form-item  label="备 注" prop="value" style="width:100%">
                        <el-input v-model="item.node" placeholder="备 注" style="width:220px"></el-input>
                    </el-form-item>
                   
                    <el-table stripe :data="menuItems" style="width: 100%">
                        <el-table-column prop="name" label="一级菜单" width="120">
                            <template slot-scope="scope">
                                <input type="checkbox" :checked="scope.row.checked" value="scope.row.name" @change="scope.row.checked = !scope.row.checked" /> {{ scope.row.name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="nodeson" label="二级菜单">
                            <template slot-scope="scope">
                                span(v-for="item in scope.row.nodeson" style="margin-right:10px")
                                    <input type="checkbox" :checked="item.checked" value="item.name" @change="item.checked = !item.checked"/> {{ item.name }}
                            </template>
                        </el-table-column>
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
            ruleForm:{
                roleName: ''
            },
            item: {},
            title: '',
            items:[],
            menuItems: [],
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
        // 获取所有菜单
        this.handleMenu()
    },
    methods: {
        handleList(params=this.ruleForm) {
            // 获取角色列表
            this.$get('/role/list', params).then(data => {
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
        // 
        handleMenu() {
            this.$get('/node/rolelist', {}).then(data => {
                data.forEach(el => {
                    el.checked = false
                    if(el.nodeson.length > 0) {
                        el.nodeson.forEach(child => {
                            child.checked = false
                        })
                    }
                })

                this.menuItems = data
            }).catch(err => this.$message.error(err.msg))
        },
        // 弹框
        handleEdit(row) {
            if(row.roleCode) {
                // 点击编辑
                this.item = Object.assign({},row)
                let allMenu = Object.assign([],this.menuItems)
                let nodeMenu = this.item.nodeJson && this.item.nodeJson.length > 0 ? JSON.parse(this.item.nodeJson) : []

                allMenu.forEach(el => {
                    if(nodeMenu.indexOf(el.name) > -1) {
                        el.checked = true
                    }

                    el.nodeson.forEach(elChild => {
                        if(nodeMenu.indexOf(elChild.name) > -1) {
                            elChild.checked = true
                        }
                    })
                })

                // this.menuItems.forEach(el => {
                //     let checked = false
                //     nodeMenu.forEach(item => {
                //         if(el.name == item.name) {
                //             checked = true
                //             item.nodeson.forEach(elChild => {
                //                 let childMenu = el.nodeson.filter(child => {
                //                     return child.name == elChild.name;
                //                 })
                //                 childMenu.checked = true
                //             })
                //         }
                //     })

                //     el.checked = checked
                //     allMenu.push(el)
                // })
                
                this.menuItems = allMenu
                this.title = '编辑'
            } else {
                // 点击新增
                this.item = {}
                this.title = '新增'
            }
            this.dialog = true
        },
        // 提交保存
        handleSubmit() {
            if(this.item.roleCode) {
                // 提交编辑
                let params = this.item
                this.$post('/role/edit', params).then(data => {
                    this.saveSuccess()
                }).catch(err => this.$message.error(err.msg))
            } else {
                // 提交新增

                // old
                // let menus = []
                // this.menuItems.forEach(el => {
                //     let childMenu = []
                //     el.nodeson.forEach(child => {
                //         if(child.checked) {
                //             childMenu.push(child)
                //         }
                //     })

                //     let item = {
                //         code: el.code,
                //         name: el.name,
                //         checked: el.checked,
                //         nodeson: childMenu
                //     }

                //     if(el.checked) {
                //         menus.push(item)
                //     }
                // })
                let menus = []
                this.menuItems.forEach(el => {
                    if(el.checked) {
                        menus.push(el.name)
                    }
                  
                    el.nodeson.forEach(child => {
                        if(child.checked) {
                            menus.push(child.name)
                        }
                    })
                })
               
                let params = this.item
                params.nodeJson = JSON.stringify(menus)
                this.$post('/role/add', params).then(data => {
                    this.saveSuccess()
                }).catch(err => this.$message.error(err.msg))
            }
        },

        // 删除
        handleDelete(scope) {
            scope.row.visible = false
            this.$delete('/role/del/' + scope.row.roleCode,{}).then(data => {
                this.$message.success('删除成功')
                
                this.handleSearch()
            }).catch(err => this.$message.error(err.msg))
        },

        // 关闭弹框
        handleClose() {
            let _self = this
            this.dialog = false
            setTimeout(function() {
                _self.menuItems = []
                _self.handleMenu()
            },100)
        },

        // 保存回调
        saveSuccess() {
            this.$message.success('保存成功')
            this.handleClose()
            this.handleSearch()
            this.item = {}
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
        }
    }
}
</script>


