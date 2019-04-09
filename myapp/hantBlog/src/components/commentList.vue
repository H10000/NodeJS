<template>
  <div>
    <div v-for="(item,index) in list" :key="index">
      <commentItem :item="item" :candel="candel" :index="index+1"/>
    </div>
  </div>
</template>
<script>
import commentItem from "@/components/commentItem.vue";
export default {
  name: "commentList",
  components: {
    commentItem
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    candel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      showDel: false,
    };
  },
  methods: {},
  mounted: function() {
    this.axios
      .get("/api/index/getCommentByID", {
        params: { blogID: this.id }
      })
      .then(response => {
        if (response.data != null) {
          this.list = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        //this.errored = true;
      })
      .finally(() => {
        // this.loading = false;
      });
  }
};
</script>
<style scoped>
</style>

