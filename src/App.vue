<template>
  <side-bar-comp></side-bar-comp>
  <router-view />
</template>

<script lang="ts">
import SideBarComp from './components/SideBarComp.vue';

export default {
  name: 'App',
  components: {
    SideBarComp
  }
}
</script>

<style lang="scss">
// General Styles Applied 

@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap');

#app {
  display: flex;
  width: 100%;
  height: 100vh;
}

button,
.button {
  background: #B5C2C9;
  border: none;
  height: 40px;
  width: 200px;
  border-radius: 5px;
  font-family: 'ABeeZee';
  font-style: normal;
  font-weight: 300;
  font-size: 17px;
  color: #FFFFFF;
  filter: drop-shadow(0px 4px 4px rgba(50, 50, 71, 0.08)) drop-shadow(0px 4px 8px rgba(50, 50, 71, 0.06));
}

.main-content,
.access-content {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 1rem;
  flex: 1;
}

.access-content {
  margin-top: 20px;
  margin-right: 1rem;
}

.title-pages {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  color: #000000;
}

// Access Tables Style
table {
  width: 100%;
}

th {
  text-align: center;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #959595;
}

td {
  text-align: center;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #212020;
}

// Search Bar Style

.search-container {
  margin-right: 30px;
}

.search-input {
  position: relative;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 50px;
  width: 300px;
  height: 36px;
  font-size: 16px;
  background: #F5F5F5;
}

.search-input:focus {
  outline: none;
  border-color: #aaa;
}

.search-input::placeholder {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.408px;
  color: #3C3C43;
}

.search-container {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 38%;
  right: 1rem;
  transform: translateY(-50%);
  color: #888;
}

.router {
  text-decoration: none;
  font-size: 25px;
  margin-left: auto;
  align-self: end;
  margin-right: 25px;
  cursor: pointer;
  margin-top: 5px;
  color: #000;
}
</style>
