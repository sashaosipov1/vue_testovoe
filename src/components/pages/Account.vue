<template>
  <div class="main-container">
    <div class="container">
      <div class="main-body">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="main-breadcrumb">
          <div class="breadcrumb" style="justify-content: space-between">
            <ol style="display: flex; margin-bottom: 0px;">
              <li class="breadcrumb-item">
                <router-link :to="'/'">Home</router-link>
              </li>
              <li class="breadcrumb-item">User</li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ data.login }}
              </li>
            </ol>
            <div>
              <span>Last seen </span
              >{{
                new Date(Date.parse(userData.updated_at)).getDate() +
                "." +
                new Date(Date.parse(userData.updated_at)).getMonth() +
                "." +
                new Date(Date.parse(userData.updated_at)).getFullYear()
              }}
            </div>
          </div>
        </nav>
        <!-- /Breadcrumb -->

        <div class="row gutters-sm">
          <div class="col-md-5 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    :src="data.avatar_url"
                    alt="Avatar"
                    class="rounded-circle"
                    width="150"
                  />
                  <div class="mt-3">
                    <h4>{{ data.login }}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <ul class="list-group list-group-flush">
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    flex-wrap
                  "
                >
                  <h6 class="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path
                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                      ></path></svg
                    >Website
                  </h6>
                  <span class="text-secondary"
                    ><a :href="data.html_url">{{ data.html_url }}</a></span
                  >
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    flex-wrap
                  "
                >
                  <h6 class="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-github mr-2 icon-inline"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                      ></path></svg
                    >Github
                  </h6>
                  <span class="text-secondary"
                    ><a :href="data.html_url">{{ data.login }}</a></span
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-7">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{{ userData.name }}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Repositories</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userData.public_repos }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Followers</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userData.followers }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Following</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ userData.following }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Date of registration</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{
                      new Date(Date.parse(userData.created_at)).getDate() +
                      "." +
                      new Date(Date.parse(userData.created_at)).getMonth() +
                      "." +
                      new Date(Date.parse(userData.created_at)).getFullYear()
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  async mounted() {
    this.$store.dispatch("fetchUserById", this.data);
  },
  computed: {
    userData() {
      return this.$store.getters.getUserById;
    },
  },
};
</script>

<style>
.logo-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.main-body {
  padding: 15px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
</style>