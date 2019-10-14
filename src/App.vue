<template>
  <div id="app">
    <app-header></app-header>
    <div class="container" style="margin-top: 90px;">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap-minty.min.css";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>

<style>
</style>
