<template>
  <div class="view">
    <loading v-if="showLoadBar"></loading>
    <h1 v-show="users" class="we-are h1">
      {{ totalUsers }} software developers (organizations) based in
      <a
        href="https://en.wikipedia.org/wiki/Angola"
        title="Want to know more about Angola?"
      >
        Angola
      </a>
    </h1>

    <!-- Sorts, Orders, -->
    <div class="columns">
      <div class="column">
        <div class="filters">
          <!-- Sorts -->
          <span class="tag" @click="Sort('followers', $event.target)">
            Followers
          </span>
          <span class="tag" @click="Sort('joined', $event.target)">
            Joined date
          </span>
          <span class="tag" @click="Sort('repositories', $event.target)">
            Number of repositories
          </span>
          <!-- Orders -->
          <span
            class="tag is-dark"
            @click="Order('asc')"
            v-show="showOrdersBtn"
            title="Get results in ascending order"
          >
            Ascending
          </span>
          <span
            class="tag is-dark"
            @click="Order('desc')"
            v-show="showOrdersBtn"
            title="Get results in descending order"
          >
            Descending
          </span>
          <!-- Clear button to return to the original results -->
          <span class="tag is-warning" @click="Clear()" v-show="showOrdersBtn"
            >Clear</span
          >
        </div>
      </div>
      <!--//.column -->
      <div class="column is-one-quarter">
        <div class="field">
          <input
            type="text"
            class="form-control"
            v-model="searchTerm"
            @blur="LoadProfiles()"
            placeholder="Search by name"
            @keyup.enter="LoadProfiles()"
          />
        </div>
      </div>
    </div>

    <!-- Users box -->
    <article class="users">
      <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
    </article>

    <!-- Load More Button -->
    <div v-show="users">
      <a class="button is-info" @click="LoadMoreProfiles">Load more profiles</a>
    </div>
  </div>
</template>

<script lang="ts">
import UserCard from "@/components/user-card/user-card.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  components: { UserCard },
  data() {
    return {
      users: [],
      searchTerm: "",
      totalUsers: 0,
      pagination: 0,
      pageNumber: 1,
      showLoadBar: true,
      showOrdersBtn: false,
      sort: "",
      order: "",
    };
  },
  methods: {
    /**
     *	This method clears all sort and other options.
     */
    Clear() {
      // Show loading bar
      this.showLoadBar = true;
      // Clear selected highlight
      const t = document.querySelector(".is-success");
      if (t) {
        t.classList.remove("is-success");
      }
      // Clear filters
      this.order = "";
      this.sort = "";

      // Load profiles
      this.LoadProfiles();

      // Hide options buttons
      this.showOrdersBtn = false;
    },
    /**
     *	This method order the results by ascending or descending.
     */
    Order(orderName: string) {
      // Set the new order
      this.order = `&order=${orderName}`;
      // Call Loading Bar
      this.showLoadBar = true;
      // Make the request in the API
      this.LoadProfiles();
    },
    /**
     *	This method Sorts make a request for sorted results.
     */
    Sort(sortName: string, target: HTMLElement) {
      // Clear any background-color from previous actions
      const t = document.querySelector(".is-success");
      if (t) {
        t.classList.remove("is-success");
      }
      // Change background-color of the clicked element
      target.classList.add("is-success");
      // Show Options buttons
      this.showOrdersBtn = true;
      // Set the new sort parameter
      this.sort = sortName;
      // Call Loading Bar
      this.showLoadBar = true;
      // Make the request in the API
      this.LoadProfiles();
    },
    async LoadProfiles() {
      try {
        const options = {
          params: {
            per_page: 30,
            sort: `${this.sort}${this.order}`,
            q: `${this.searchTerm} location:Angola`,
          },
        };
        const res = await axios.get(`/search/users`, options);
        console.log(JSON.stringify(res));
        this.users = res.data.items;
        this.totalUsers = res.data.total_count;
        this.pagination = Math.round(res.data.total_count / 30) + 1;
      } catch (e) {
        console.log(e);
      }
      // Hide loading bar
      this.showLoadBar = false;
    },
    async LoadMoreProfiles() {
      // Show loading bar
      this.showLoadBar = true;
      // Condition to change pagination number
      if (this.pageNumber <= this.pagination) {
        // Increment in the number of the page to be requested on github
        this.pageNumber += 1;
        try {
          // Request the data
          const res = await axios.get(
            `/search/users?q=${this.searchTerm} location:Angola+location:luanda&per_page=30&page=${this.pageNumber}`
          );
          this.users = this.users.concat(res.data.items);
        } catch (e) {
          console.log(e);
        }
        // Hide loading bar
        this.showLoadBar = false;
      }
    },
  },
  created() {
    this.LoadProfiles();
  },
});
</script>

<style lang="scss">
.users {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
</style>
