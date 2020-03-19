<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />

      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="(item, index) in hotList"
                :key="index"
                @tap="handToCity(item.nm, item.id)"
              >{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index }}</h2>
              <ul>
                <li
                  v-for="itemList in item.list"
                  :key="itemList.id"
                  @tap="handToCity(itemList.nm, itemList.id)"
                >{{ itemList.nm }}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >{{ item.index }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    };
  },
  mounted() {
    //获取vuex中的cityId
    var cityList = JSON.parse(window.localStorage.getItem("cityList"));
    var hotList = JSON.parse(window.localStorage.getItem("hotList"));
    if (cityList && hotList) {
      this.cityList = cityList;
      this.hotList = hotList;
      this.isLoading = false;
    } else {
      // 1.请求网络接口数据
      this.axios.get("/api/cityList").then(res => {
        let msg = res.data.msg;

        //判断是否请求成功
        if (msg === "ok") {
          this.isLoading = false;
          let cities = res.data.data.cities;
          //因为数据没有按照字母排序，改变数据形式
          // [{index:'A',List:[{nm:"阿城",Id:123}]}]

          var { cityList, hotList } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotList = hotList;
          //设置vuex的仓库值
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hotList", JSON.stringify(hotList));
          var cityList = window.localStorage.getItem("cityList");
          var hotList = window.localStorage.getItem("hotList");
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      //定义一个数组来放数据
      let cityList = [];
      let hotList = [];
      //添加热门城市
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push({ nm: cities[i].nm, id: cities[i].id });
        }
      }
      for (let i = 0; i < cities.length; i++) {
        //得到每个数据py中的每个首字母大写是什么
        let fistLetter = cities[i].py.substring(0, 1).toUpperCase();
        //判断是否存在
        if (toCom(fistLetter)) {
          //往数组中添加新形式
          cityList.push({
            index: fistLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //数组中已经有index值了
          for (let j = 0; j < cityList.length; j++) {
            //如果已经存在有值
            if (cityList[j].index === fistLetter) {
              //就添加剩下的数据
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      //按照A-Z的顺序排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      //判断cityList数组index中是否存在了

      function toCom(fistLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === fistLetter) {
            return false;
          }
        }
        return true;
      }

      return {
        cityList,
        hotList
      };
    },
    //根据右边的字母跳到相应的字母城市
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
    },
    //调用方法，设置缓存值
    handToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nm", nm);
      window.localStorage.setItem("id", id);
      this.$router.push("/movies/NowPlaying");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}

.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}

.city_body .city_hot {
  margin-top: 20px;
}

.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul {
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort {
}

.city_body .city_sort div {
  margin-top: 20px;
}

.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}

.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}

.city_body .city_index {
  width: 20px;
  /* height: 14; */
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
