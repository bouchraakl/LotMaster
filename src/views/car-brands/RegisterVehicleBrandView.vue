<template>
  <div
    class="access-content d-flex flex-column align-items-start justify-content-start"
  >
    <p class="title-pages">Register : Vehicle Brand</p>
    <div class="form-application d-flex flex-column custom-section">
      <form
        class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3"
        @submit.prevent="submitForm"
      >
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="brand" class="form-label">Vehicle Brand Name</label>
            <input
              class="form-control"
              id="brand"
              style="width: 300px"
              v-model="brand.nome"
            />
          </div>
        </div>
                <!-- Error Message -->
                <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Register Vehicle Brand</button>
          <router-link to="/access-vehicleBrand" class="router"
            ><button>Access Vehicle Brands</button></router-link>
          <p
            :class="[
              'error-message',
              errorMessage.status === 'success'
                ? 'text-success'
                : 'text-danger',
            ]"
          >
            {{ errorMessage.message }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { MarcaClient } from "@/client/marca.client";
import { Marca } from "@/model/marca";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      brand: new Marca(),
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
    };
  },
  computed: {
    brandClient() {
      return new MarcaClient();
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.brandClient.save(this.brand);
        const data = response;
        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Vehicle Brand registered successfully";
      } catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join("");
        } else {
          this.errorMessage.message = "An error occurred during registration.";
        }
      }
    },
  },
});
</script>

<style scoped>
.moveBtn {
  width: 258px;
  height: 37px;
  border-radius: 5px;
  border: none;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 15px;
  background: #b5c2c9;
  color: #f3f3f3;
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
