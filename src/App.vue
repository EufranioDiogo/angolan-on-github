<template>
  <div id="app">
    <Header></Header>
    <div class="container content-container">
      <router-view></router-view>
    </div>

    <footer class="main-footer">
      <div class="content">
        <a
          href="https://github.com/AngoDev"
          target="blank"
          title="AndoDev - Comunidade de Programadores Angolanos"
        >
          <img src="/static/angodev.png" alt="AngoDev" />
        </a>
        <p>
          angolans-on-github is fully open source released under the
          <a href="https://github.com/flowck/angolan-on-github/README.md"
            >MIT License</a
          >. You can
          <a href="https://github.com/flowck/angolan-on-github"
            >contribute from here.</a
          >
        </p>
        <p>
          Built with <span class="heart">❤</span> by
          <a href="https://github.com/flowck" title="Hi there, it's me"
            >Firmino Changani</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Header from "@/components/header/header.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Header },
});
</script>

<style lang="scss">
@import "@primer/css/core/index.scss";
@import "./assets/styles/main.scss";
/* Header */
.main-header {
  width: 50%;
  margin: 0 auto;
  padding: 20px 0;
  text-align: center;
}

/* Footer */
.main-footer {
  width: 100%;
  padding: 40px 0;
  margin-top: 20px;
  text-align: center;
  background-color: #34495e;
}

.main-footer p,
.main-footer a {
  color: #fff;
}

.main-footer a {
  text-decoration: underline;
}

/* Animate the heart */
.heart {
  animation: infinite 1s heartBeat;
}

@keyframes heartBeat {
  from {
    color: red;
  }
  to {
    color: pink;
  }
}
</style>
