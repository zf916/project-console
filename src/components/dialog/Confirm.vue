<template>
<el-dialog class="confirm-dialog" :title="dialog.params.title" :visible.sync="visible" width="30%" center>
  <span>{{dialog.params.text}}</span>
  <span class="txt-right" slot="footer">
    <el-button @click="cancel" size="mini">取 消</el-button>
    <el-button @click="confirm" size="mini" type="primary">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  name: "confirm-dialog",

  props: {
    dialog: Object
  },

  data() {
    return {
      visible: true
    };
  },

  methods: {
    confirm() {
      this.dialog.type = undefined;
      this.dialog.promise.resolve(true);
    },

    cancel() {
      this.dialog.type = undefined;
      this.dialog.promise.reject(false);
    }
  }
};
</script>

