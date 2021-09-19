<template>
  <header class="Header">
    <div class="Header-item">
      <router-link to="/">Angolans on Github</router-link>
    </div>
    <div class="Header-item">
      <input type="text" placeholder="Search by name" class="form-control Header-input" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
});
</script>

<style lang="scss">
@import "@primer/css/header/index.scss";
</style>
