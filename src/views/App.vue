<template>
    <router-view></router-view>
</template>
<script>
import dialog from "comp/dialog";
import login from "views/Login";
export default {
  name: "root",
  components: {
    ...dialog
  },
  data() {
    return {

    }
  },
  computed: {},
  methods: {}
};
</script>
