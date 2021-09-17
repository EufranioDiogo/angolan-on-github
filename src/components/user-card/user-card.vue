<template>
  <article class="user-card Box">
    <div class="Box-header d-flex flex-items-center">
      <img
        :alt="user.name"
        :src="user.avatar_url"
        class="user-card__avatar avatar"
      />
    </div>
    <div class="Box-body">
      <router-link :to="{ name: 'Profile', params: { username: user.login } }">
        @{{ user.login }}
      </router-link>
    </div>
  </article>
</template>

<script lang="ts">
import { User } from "@/interfaces/user";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "UserCard",
  props: {
    user: { type: Object as PropType<User> },
  },
  setup() {
    console.log("hello");
  },
});
</script>

<style lang="scss" scoped>
@import "@primer/css/avatars/index.scss";

.user-card {
  &__avatar {
    width: 100%;
  }
}
</style>
