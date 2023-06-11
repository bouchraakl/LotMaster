<template>
  <div class="d-flex flex-wrap justify-content-center custom-style">
    <div v-for="box in boxes" :key="box.id" class="box" @click="navigateToPage(box.route)">
      <div class="box-content d-flex flex-column justify-content-start align-items-start">
        <div class="box-text-top">{{ getBoxTextTop(box.name) }}</div>
        <div class="box-text-bottom">{{ getBoxTextBottom(box.name) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-style {
  margin-top: 30px;
}

.box {
  width: 257px;
  height: 237px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  cursor: pointer;
  background: #3C3C43;
  border-radius: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
}

.box-content {
  padding: 10px;
  padding-left: 20px;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #D9D9D9;
}

.box-text-top {
  text-align: center;
}

.box-text-bottom {
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.box-enter {
  animation: fadeIn 0.5s ease;
  opacity: 0;
}

.box-leave-to {
  opacity: 0;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLinkProps } from 'vue-router';

export default defineComponent({
  data() {
    return {
      boxes: [
        { id: 1, name: 'Open Movements', route: '/access-movement' },
        { id: 2, name: 'Closed Movements', route: '/access-closemovement' },
        { id: 3, name: 'Vehicle Brands', route: '/access-vehicleBrand' },
        { id: 4, name: 'Vehicle Models', route: '/access-vehicleModel' },
        { id: 5, name: 'Vehicles', route: '/access-vehicle' },
        { id: 6, name: 'Conductors', route: '/access-conductor' },
      ],
    };
  },
  methods: {
    navigateToPage(route: string): void {
      this.$router.push(route);
      console.log('Navigating to', route);
    },
    getBoxTextTop(name: string): string {
      const parts = name.split(' ');
      return parts[0]; // Retrieves the first word from the name
    },
    getBoxTextBottom(name: string): string {
      const parts = name.split(' ');
      return parts.slice(1).join(' '); // Retrieves the remaining words and joins them with a space
    },
  },
});
</script>
