<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register : Open Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="">
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class=" d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Condutor</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList"
              placeholder="Search By Name ..." style="width: 300px;">
            <datalist id="datalistOptions">
              <option value="San Francisco"></option>
            </datalist>
          </div>
          <router-link to="/register-conductor" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Conductor</button>
          </router-link>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class=" d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList"
              placeholder="Search By lisence plate ..." style="width: 300px;">
            <datalist id="datalistOptions">
              <option value="San Francisco"></option>
            </datalist>
          </div>
          <router-link to="/register-conductor" class="align-self-end">
            <button class="moveBtn m-0">Or Register New Veichle</button>
          </router-link>
        </div>
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class=" d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input class="form-control" type="date" id="entry" style="width: 300px;">
          </div>
        </div>
        <button class="mt-3">Open Movement</button>
      </form>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      datalistId: "suggestions",
    };
  },
})

</script>

<style>
.moveBtn {
  width: 258px;
  height: 37px;
  border-radius: 5px;
  border: none;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 15px;
  background: #B5C2C9;
  color: #F3F3F3;
  margin: 0;
}

label {
  font-family: Raleway;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

}
</style>
  