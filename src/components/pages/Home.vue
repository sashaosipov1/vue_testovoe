<template>
  <div id="app">
    <div class="seacrh_container">
      <form
        class="input_container"
        action=""
        @submit.prevent="search(searchParam, sort, order, page)"
      >
        <span
          class="QCzoEc z1asCe MZy1Rb"
          style="height: 20px; line-height: 20px; width: 20px"
          ><svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            ></path></svg
        ></span>
        <input
          type="text"
          name=""
          id=""
          v-model="searchParam"
          class="search_input"
        />
        <button type="submit" id="submit-btn" class="search_btn">Найти</button>
      </form>
    </div>
    <div class="main-container" v-if="allUsers.length > 0">
      <div>
        <h2>Результаты:</h2>
      </div>

      <div style="display: flex; align-items: center; margin: 10px 0px">
        <div class="wrapper-dropdown">
          Sort by
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="followers"
                type="radio"
                name="radio_sort"
                value="followers"
                v-model="sort"
                @change="
                  saveSort(sort);
                  search(searchParam, sort, order, page);
                "
                checked
              />
              <label for="followers">Followers</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="repo"
                type="radio"
                name="radio_sort"
                value="repositories"
                v-model="sort"
                @change="
                  saveSort(sort);
                  search(searchParam, sort, order, page);
                "
              />
              <label for="repo">Repositories</label>
            </div>
          </div>
        </div>

        <div class="wrapper-dropdown">
          Order by
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="desc"
                type="radio"
                name="radio_order"
                value="desc"
                v-model="order"
                @change="
                  saveOrder(order);
                  search(searchParam, sort, order, page);
                "
                checked
              />
              <label for="desc">Desc</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="asc"
                type="radio"
                name="radio_order"
                value="asc"
                v-model="order"
                @change="
                  saveOrder(order);
                  search(searchParam, sort, order, page);
                "
              />
              <label for="asc">Asc</label>
            </div>
          </div>
        </div>
      </div>

      <div class="userlist-container">
        <div
          class="user"
          v-for="user in allUsers"
          :key="user.id"
          :style="{ 'background-image': 'url(' + user.avatar_url + ')' }"
        >
          <div class="user-info">
            <div><img class="mini-avatar" :src="user.avatar_url" alt="" /></div>
            <div style="text-align: left">
              <div>{{ user.login }}</div>
              <router-link
                :to="{ name: 'userId', params: { id: user.id, data: user } }"
                exact
                ><a target="_blank">Профиль</a></router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button
          class="btn btn-primary"
          @click="
            slide(page, 'prev');
            search(searchParam, sort, order, page);
          "
          :class="{ disabled: page <= 1 }"
        >
          Предыдущий
        </button>
        <button
          class="btn btn-primary"
          @click="
            slide(page, 'next');
            search(searchParam, sort, order, page);
          "
        >
          Следующий
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParam: this.$store.getters.getSearchInput,
      sort: this.$store.getters.getSort,
      order: this.$store.getters.getOrder,
      page: 1,
    };
  },
  name: "App",
  methods: {
    search(searchParam, sort, order, page) {
      this.$store.dispatch("saveSearchInput", { searchParam });
      this.$store.dispatch("fetchUsers", { searchParam, sort, order, page });
    },
    slide(num, arg) {
      if (arg === "prev") {
        if (num <= 1) {
          return;
        }

        return this.page--;
      }

      if (arg === "next") {
        return this.page++;
      }
    },
    saveSort(sort) {
      this.$store.dispatch("saveSort", { sort });
    },
    saveOrder(order) {
      this.$store.dispatch("saveOrder", { order });
    },
  },
  computed: {
    allUsers() {
      return this.$store.getters.getAllUsers;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.error-input {
  position: absolute;
  top: -30px;
}

/* Input */
.seacrh_container {
  width: 60%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

.input_container {
  position: relative;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  height: 50px;
  width: 450px;
  border: 1px solid black;
}

.search_input {
  display: inline-block;
  width: 350px;
  height: 40px;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 12px;
  border: none;
  border-radius: 15px;
}

.search_input:focus-visible {
  outline: none;
}

.search_btn {
  cursor: pointer;
  display: inline-block;
  background: inherit;
  border: none;
  font-size: 18px;
  margin: auto;
  border-radius: 5px;
  padding: 6px 14px;
}

.search_btn:hover {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.search_btn:focus {
  outline: none;
}

.main-container {
  width: 100%;
  max-width: 1300px;
}

.userlist-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: flex-end;
  background-size: 100% 100%;
  margin: 10px 15px;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  height: 60px;
  width: 100%;
  background-color: aliceblue;
  border-radius: 15px;
  transition: all 0.5s;
}

.user:hover .user-info {
  height: 100px;
}

.mini-avatar {
  height: 40px;
  widows: 40px;
  border-radius: 50%;
}

.wrapper-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 10px;
  background: #fff;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 1px rgba(50, 50, 50, 0.1);
  cursor: pointer;
  outline: none;
  font-weight: bold;
  color: #8aa8bd;
}

.form_toggle {
  padding-left: 10px;
  display: inline-block;
  overflow: hidden;
}
.form_toggle-item {
  display: inline-block;
}
.form_toggle-item input[type="radio"] {
  display: none;
}
.form_toggle-item label {
  display: inline-block;
  padding: 0px 15px;
  line-height: 34px;
  border: 1px solid #999;
  border-right: none;
  cursor: pointer;
  user-select: none;
}

.form_toggle .item-1 label {
  border-radius: 6px 0 0 6px;
}
.form_toggle .item-2 label {
  border-radius: 0 6px 6px 0;
  border-right: 1px solid #999;
}

/* Checked */
.form_toggle .item-1 input[type="radio"]:checked + label {
  background: #bbffbb;
}
.form_toggle .item-2 input[type="radio"]:checked + label {
  background: #bbffbb;
}

.show_more {
  max-width: 300px;
  padding: 10px;
  border-radius: 0.775rem;
  background-color: aqua;
  border: none;
  font-size: 25px;
  cursor: pointer;
}

.pagination {
  display: flex;
  align-items: center;
  margin: 10px 0px;
  justify-content: space-between;
  width: 400px;
  margin: 10px auto;
}
</style>