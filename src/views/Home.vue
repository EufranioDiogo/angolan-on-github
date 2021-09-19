<template>
  <div class="view">
    <!-- Users list -->
    <section class="users">
      <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
    </section>

    <!-- Load More Button -->
    <div class="view__load-more" v-if="users.length">
      <button class="btn" type="button" @click="LoadMoreProfiles">Load more profiles</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import UserCard from "@/components/user-card/user-card.vue";

export default defineComponent({
  name: "Home",
  components: { UserCard },
  data() {
    return {};
  },
  computed: {
    ...mapState("usersModule", ["users"]),
  },
  methods: {
    ...mapActions("usersModule", ["getUsers"]),
  },
  created() {
    this.getUsers();
  },
});
</script>

<style lang="scss">
.users {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.view__load-more {
  margin-top: 20px;
}
</style>
