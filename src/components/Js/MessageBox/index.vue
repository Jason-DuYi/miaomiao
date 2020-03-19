<template>
  <div id="MessageBox">
    <h3>{{title}}</h3>
    <p>{{position}}</p>
    <div>
      <div @touchstart="handToCancel">{{cancel}}</div>
      <div @touchstart="handToOk">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#MessageBox {
  width: 200px;
  height: 120px;
  border: 1px #ccc solid;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -50px;
  border-radius: 4px;
  box-shadow: 3px 3px 3px 3px #ccc;
}
#MessageBox h3 {
  text-align: center;
  line-height: 40px;
  font-size: 22px;
}
#MessageBox p {
  text-align: center;
  line-height: 40px;
}
#MessageBox > div {
  display: flex;
  border-top: 1px #ccc solid;
}
#MessageBox > div div {
  flex: 1;
  text-align: center;
  line-height: 40px;
  border-right: 1px #ccc solid;
}
#MessageBox > div div:last-child {
  border: none;
}
</style>
