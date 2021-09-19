<template>
  <main id="app">
    <Header></Header>
    <section class="">
      <router-view></router-view>
    </section>
    <Footer></Footer>
  </main>
</template>

<script lang="ts">
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Header, Footer },
});
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
