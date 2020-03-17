<template>
  <div id="main">
      <Heared title="我的喵喵"/>
      <Login />
      <TabBar />
  </div>
</template>

<script>
import Heared from '../components/Heared'
import TabBar from '../components/TabBar'
import Login from '../components/Login'
export default {
  name:'mine',
  components:{
    Heared,
    TabBar,
    Login
  }
}
</script>

<style>

</style>