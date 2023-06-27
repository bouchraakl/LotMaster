<template>
  <div class="container main-content d-flex flex-column align-items-start">
    <div class="header">
      <div class="title">Reports</div>
      <div class="subtitle">Generate a report from below :</div>
    </div>
    <form class="form-app d-flex align-items-start gap-5 mt-4">
      <div class="d-flex flex-column gap-2">
        <label for="from_date">From</label>
        <input type="datetime-local" class="form-control" id="from_date" style="width: 300px" />
      </div>
      <div class="d-flex flex-column gap-2">
        <label for="to_date">To</label>
        <input type="datetime-local" class="form-control" id="to_date" style="width: 300px" />
      </div>
    </form>
    <div class="nav d-flex flex-column gap-2 mt-5">
      <button>Occupancy Report</button>
      <button>Revenue Report</button>
      <button>Duration of Stay Report</button>
    </div>
  </div>
</template>

<script lang="ts">
import { PDFDocument, rgb } from 'pdf-lib';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'ReportsView',
  components: {

  },
  data() {
    return {};
  },
  methods: {

  },
});
</script>


<style scoped>
.title {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
}

.subtitle {
  font-size: 16px;
  color: #777;
}

.nav button {
  text-decoration: none;
  background-color: #B5C2C9;
  color: #200E32;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  width: 40vw;
}

.nav button:hover {
  background-color: #4483c3;
  color: #fff;
}
</style>

