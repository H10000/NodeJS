<template>
  <div class="container" v-if="isVisual">
    <div class="main1">
      <div class="title">Hant</div>
      <div class="left isPC">
        <div class="shouye">首页</div>
        <div class="sousuo">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="xiewenzhang">
          <el-button type="primary" icon="el-icon-document">写文章</el-button>
        </div>
      </div>
      <div class="left isPhone">
        <el-dropdown style="font-size:20px;">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-menu"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>搜索</el-dropdown-item>
            <el-dropdown-item>写文章</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right">
        <div v-if="isDengLu">Hant</div>
        <div v-else>
          <div class="denglu">登录</div>
          <div class="zhuce">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var top = 0;
export default {
  name: "Top",
  props: {
    isDengLu: Boolean
  },
  data() {
    return {
      isVisual: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      var h = document.documentElement.scrollTop;
      if (h > top) {
        if (h > 100) {
          this.isVisual = false;
        }
      } else {
        this.isVisual = true;
      }
      top = h;
    }
  }
};
</script>
<style scoped>
div {
  display: inline-block;
}
.container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  position: fixed;
  left: 0px;
  top: 0px;
}
@media screen and (min-width: 990px) {
  .main1 {
    width: 990px;
    margin: 0 auto;
  }
  .isPC {
    display: block;
  }
  .isPhone {
    display: none;
  }
}
@media screen and (max-width: 990px) {
  .main1 {
    width: 100%;
    margin: 0 auto;
  }
  .isPC {
    display: none;
  }
  .isPhone {
    display: block;
  }
}
.title {
  color: #409eff;
  font-size: 28px;
  text-align: left;
  float: left;
  margin-left: 10px;
}
.right {
  color: #409eff;
  font-size: 16px;
  text-align: right;
  float: right;
}
.zhuce {
  margin-left: 10px;
  margin-right: 10px;
}
.shouye {
  margin-left: 30px;
  font-size: 16px;
}
.sousuo {
  margin-left: 30px;
}
.xiewenzhang {
  margin-left: 30px;
}
.left {
  margin-left: 30px;
  float: left;
}
</style>

