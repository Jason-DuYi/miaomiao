<template>
  <div id="main">
    <Heared title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movies/city" class="city_name">
          <span>{{ $store.state.city.nm }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movies/nowplaying" class="hot_item active">正在热映</router-link>
          <router-link tag="div" to="/movies/commingsoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movies/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <TabBar />
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
import Heared from "../components/Heared";
import TabBar from "../components/TabBar";
import { messageBox } from "../components/Js";
export default {
  components: {
    Heared,
    TabBar
  },
  mounted() {
    this.axios.get("/api/getLocation").then(res => {
      var nm = res.data.data.nm;
      var id = res.data.data.id;
      if (this.$store.state.city.nm == nm) {
        return;
      }
      setTimeout(() => {
        messageBox({
          title: "定位",
          position: nm,
          cancel: "取消",
          ok: "切换城市",
          handToCancel() {
            console.log(1);
          },
          handToOk() {
            window.localStorage.setItem("nm", nm);
            window.localStorage.setItem("id", id);
            window.location.reload();
          }
        });
      }, 3000);
    });
  }
};
</script>

<style scoped>
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}

.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}

.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}

.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}

.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}

.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}

.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>
