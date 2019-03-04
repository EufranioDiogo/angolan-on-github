<template>
	<div class="view">
		<loading v-if="showLoadBar"></loading>
		<h1
			v-show="users"
			class="we-are title is-4"
		>
			We are {{ totalUsers }} developers and organizations based in
			<a 
				href="https://en.wikipedia.org/wiki/Angola"
				title="Want to know more about Angola?"
			>
				Angola
			</a>
			🙌 👏.
		</h1>

		<!-- Sorts, Orders, -->
		<div class="columns">
			<div class="column">
				<div class="filters">
					<!-- Sorts -->
					<span class="tag" @click="Sort('followers', $event.target)">Followers</span>
					<span class="tag" @click="Sort('joined', $event.target)">Joined date</span>
					<span class="tag" @click="Sort('repositories', $event.target)">
						Number of repositories
					</span>
					<!-- Orders -->
					<span class="tag is-dark" @click="Order('asc')" title="Get results in ascending order" v-show="showOrdersBtn">Ascending</span>
					<span class="tag is-dark" @click="Order('desc')" title="Get results in descending order" v-show="showOrdersBtn">Descending</span>
					<!-- Clear button to return to the original results -->
					<span class="tag is-warning" @click="Clear()" v-show="showOrdersBtn">Clear</span>
				</div>
			</div>
			<!--//.column -->
			<div class="column is-one-quarter">
				<div class="field">
					<input
						type="text"
						v-model="searchTerm"
						v-on:keyup.enter="LoadProfiles()"
						v-on:blur="LoadProfiles()"
						placeholder="Search by name"
						class="input"
					>
				</div>
			</div>
		</div>

		<!-- Users box -->
		<article class="users">
			<div class="user card" v-for="user in users" :key="user.id">
				<!-- Profile Photo -->
				<div class="card-image">
					<figure class="image is4by3">
						<router-link
							:to="{ name: 'Profile', params: { username: user.login } }"
							:title="'Open ' + user.login + '`s profile'"
						>
							<img :src="user.avatar_url" :alt="user.login">
						</router-link>
					</figure>
				</div>

				<!-- Profile Information -->
				<div class="card-content">
					<!-- Name -->
					<h1 class="title is-4">
						<a :href="user.html_url">
							@{{ user.login }}
						</a>
					</h1>
				</div>
			</div>
		</article>

		<!-- Load More Button -->
		<div v-show="users">
			<a class="button is-info" @click="LoadMoreProfiles">Load more profiles</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				users: [],
				searchTerm: '',
				totalUsers: 0,
				pagination: 0,
				pageNumber: 1,
				showLoadBar: true,
				showOrdersBtn: false,
				sort: '',
				order: '',
			};
		},
		created() {
			this.TotalUsers();
			this.LoadProfiles();
		},
		methods: {
			/**
			*	This method clears all sort and other options.
			*/
			Clear() {
				// Show loading bar
				this.showLoadBar = true;
				// Clear selected highlight
				const t = document.querySelector('.is-success');
				if (t) {
					t.classList.remove('is-success');
				}
				// Clear filters
				this.order = '';
				this.sort = '';

				// Load profiles
				this.LoadProfiles();

				// Hide options buttons
				this.showOrdersBtn = false;
			},
			/**
			*	This method order the results by ascending or descending.
			*/
			Order(orderName) {
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
			Sort(sortName, target) {
				// Clear any background-color from previous actions
				const t = document.querySelector('.is-success');
				if (t) {
					t.classList.remove('is-success');
				}
				// Change background-color of the clicked element
				target.classList.add('is-success');
				// Show Options buttons
				this.showOrdersBtn = true;
				// Set the new sort parameter
				this.sort = sortName;
				// Call Loading Bar
				this.showLoadBar = true;
				// Make the request in the API
				this.LoadProfiles();
			},
			/**
			*	TotalUsers: This method get the total users matching Angola in their profiles
			*/
			TotalUsers() {
				this.$http.get(
					'https://api.github.com/search/users?q=location:Angola+location:luanda',
				)
					.then(
						(users) => {
							const data = JSON.parse(users.bodyText);
							this.totalUsers = data.total_count;
						},
					);
			},
			/**
			*	This method is responsible to load user's profiles.
			*/
			LoadProfiles() {
				this.$http.get(
					`https://api.github.com/search/users?q=${this.searchTerm} location:Angola+location:luanda&sort=${this.sort}${this.order}&per_page=30`,
				)
				.then(
					(users) => {
						const data = JSON.parse(users.bodyText);
						// Pagination is the result of total users found devided by
						// the number of users listed per request which is 30
						this.pagination = Math.round(data.total_count / 30) + 1;
						// Store all the users found
						this.users = data.items;
						// Hide loading bar
						this.showLoadBar = false;
					},
					(err) => {
						console.log(err);
					},
				);
			},
			/**
			*	This method request more profiles and add the result to an existent array of users
			*   loaded before.
			*/
			LoadMoreProfiles() {
				/*
				*	This method fecth more users from Github API
				*/

				// Show loading bar
				this.showLoadBar = true;

				// Condition to change pagination number
				if (this.pageNumber <= this.pagination) {
					// Increment in the number of the page to be requested on github
					this.pageNumber += 1;

					// Request the data
					this.$http.get(
						`https://api.github.com/search/users?q=${this.searchTerm} location:Angola+location:luanda&per_page=30&page=${this.pageNumber}`,
					)
					.then(
						(users) => {
							// Parse the raw data as JSON format
							const data = JSON.parse(users.bodyText);
							// Concatenate the fetched results with a existing array
							this.users = this.users.concat(data.items);
							// Hide loading bar
							this.showLoadBar = false;
						},
						(err) => {
							console.log(err);
						},
					);
				}
			},
		},
	};
</script>

<style>
.we-are{
	font-size: 30px;
	font-weight: bold;
	color: #00d1b2;
	text-align: center;
}

.users{
	overflow: auto;
}

.users .user{
	width: 25%;
	min-height: 250px;
	float: left;
	margin-bottom: 15px;
}

.users .user .title{
	font-size: 20px;
}

.users .user .card-content{
	padding: 10px;
}

/* Filters */
.filters{
	margin-bottom: 20px;
}

.filters .tag{
	cursor: pointer;
}
</style>
