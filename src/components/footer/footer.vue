<template>
  <footer class="footer p-4">
    <p>
      This project is open source under the
      <a href="https://github.com/flowck/angolans-on-github/README.md">MIT License</a>. You can contribute by forking
      the <a href="https://github.com/flowck/angolans-on-github">repository</a>.
    </p>
    <p>
      Built with <span class="footer__heart">❤</span> by
      <a href="https://github.com/flowck" title="Hi there, it's me">Firmino Changani</a>
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
});
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  background-color: #24292f;

  &,
  a {
    color: #fff;
  }

  a {
    text-decoration: underline;
  }

  &__heart {
    animation: infinite 1s heartBeat;
  }
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
