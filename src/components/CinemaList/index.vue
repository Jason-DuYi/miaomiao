<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <div>
        <ul>
          <li v-for="item in cinemaList" :key="item.id">
            <div>
              <span>{{ item.nm }}</span>
              <span class="q"> <span class="price">22.9</span> 元起 </span>
            </div>
            <div class="address">
              <span>{{ item.addr }}</span>
              <span>{{ item.distance }}</span>
            </div>
            <div class="card">
              <div
                v-for="(num, key) in item.tag"
                :key="key"
                v-if="num === 1"
                :class="key | classCard"
              >
                {{ key | keycard }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinemaList: [],
      isLoading: true,
      preCityId: -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if (this.preCityId === cityId) {
      return;
    }
    this.axios.get("/api/cinemaList?cityId=" + cityId).then(res => {
      console.log(res);
      let msg = res.data.msg;
      if (msg === "ok") {
        this.cinemaList = res.data.data.cinemas;
        this.isLoading = false;
        this.preCityId = cityId;
      }
    });
  },
  //设置局部过滤器
  filters: {
    keycard(key) {
      let card = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "小吃" },
        { key: "snack", value: "折扣卡" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
    classCard(key) {
      let card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    }
  }
};
</script>

<style scope>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}

.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}

.cinema_body div {
  margin-bottom: 10px;
}

.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}

.cinema_body .price {
  font-size: 18px;
}

.cinema_body .address {
  font-size: 13px;
  color: #666;
}

.cinema_body .address span:nth-of-type(2) {
  float: right;
}

.cinema_body .card {
  display: flex;
}

.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}

.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}

.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
