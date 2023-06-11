<template>
  <div class="d-flex flex-column align-items-center p-4 bg-light h-100 sidebar" style="width: 200px;">
    <div class="d-flex align-items-center justify-content-center mb-md-0 me-md-auto link-dark text-decoration-none"
      style="width: 100%;">
      <span class="logo">LOTMASTER</span>
    </div>
    <hr class="w-100">
    <ul class="nav nav-pills flex-column justify-content-start align-items-start gap-4 pt-4 no-bullets">
      <li class="nav-item d-flex justify-content-center align-items-center custom-li" :class="{ 'active': activeLink === 'dashboard' }"
        @click="activeLink = 'dashboard'">
        <i class="bi bi-grid-1x2" width="16" height="16"></i>
        <router-link to="/" class="custom-link text-decoration-none">Dashboard</router-link>
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center custom-li" :class="{ 'active': activeLink === 'register' }"
        @click="activeLink = 'register'">
        <i class="bi bi-clipboard-plus" width="16" height="16"></i>
        <router-link to="/register" class="custom-link text-decoration-none">Register</router-link>
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center custom-li" :class="{ 'active': activeLink === 'access' }" @click="activeLink = 'access'">
        <i class="bi bi-box-arrow-up-right" width="16" height="16"></i>
        <router-link to="/access" class="custom-link text-decoration-none">Access</router-link>
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center custom-li" :class="{ 'active': activeLink === 'controle' }"
        @click="activeLink = 'controle'">
        <i class="bi bi-toggles" width="16" height="16"></i>
        <router-link to="/controle" class="custom-link text-decoration-none">Controle</router-link>
      </li>
    </ul>
    <hr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBarComp',
  data() {
    return {
      activeLink: 'dashboard' // Set the initial active link here
    };
  },
  created() {
    this.setActiveLink();
  },
  methods: {
    setActiveLink() {
      // Get the current URL
      const currentURL = window.location.href;

      // Check if the URL contains a specific string and set the active link accordingly
      if (currentURL.includes('register')) {
        this.activeLink = 'register';
      } else if (currentURL.includes('access')) {
        this.activeLink = 'access';
      } else if (currentURL.includes('controle')) {
        this.activeLink = 'controle';
      } else {
        this.activeLink = 'dashboard';
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  height: 100%;
}

.no-bullets {
  list-style: none;
}

.logo {
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 1.3rem;
}

.bi {
  margin-right: 10px;
}

.custom-link {
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
}

a {
  color: #000;
}

.nav-pills .custom-li{
  width: 160px;
height: 40px;
}

.nav-pills .custom-li.active {
  background-color: black;
  border-radius: 24px;
  /* Set the background color of custom-li when custom-link is active */
}

.nav-pills .custom-li.active i {
  color: #fff;
}

.nav-pills .custom-li.active .custom-link {
  color: #fff;
}
</style>

