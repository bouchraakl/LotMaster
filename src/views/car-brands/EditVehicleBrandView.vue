<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Displaying the title of the edit page -->
    <p class="title-pages">Edit: {{ brandName }}</p>
    <div class="form-application d-flex flex-column custom-section">
      <!-- Form for editing the vehicle brand -->
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="brand" class="form-label">Vehicle Brand Name</label>
            <input class="form-control" id="brand" style="width: 300px" v-model="brandName" />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <!-- Button to update the vehicle brand -->
          <button type="submit">Update Vehicle Brand</button>
          <!-- Button to cancel the editing -->
          <button type="button" @click="cancelEdit">Cancel</button>
          <!-- Displaying success or error message -->
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
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
      editedBrand: new Marca(),
      brandName: "",
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
  mounted() {
    // Fetch the brand details when the component is mounted
    this.fetchBrand();
  },
  methods: {
    async submitForm() {
      // Method to submit the form and update the brand
      if (!this.brandName) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Brand name cannot be null.";
        return;
      }

      // Update the brand name in the editedBrand object
      this.editedBrand.nome = this.brandName;

      try {
        this.editedBrand.id = Number(this.$route.params.editBrandId);
        await this.brandClient.update(this.editedBrand);

        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Brand edited successfully";
      } catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join(", ");
        } else {
          this.errorMessage.message = "An error occurred during updating.";
        }
      }
    },

    async fetchBrand() {
      // Fetch the brand details based on the editBrandId parameter
      const editBrandId = Number(this.$route.params.editBrandId);

      if (!isNaN(editBrandId)) {
        try {
          const response = await this.brandClient.findById(editBrandId);
          this.brandName = response.nome;
          this.editedBrand = response; // Populate the editedBrand object
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Invalid editBrandIds parameter");
      }
    },

    cancelEdit() {
      // Method to cancel the editing and navigate back to the vehicle brand page
      this.$router.push("/access-vehicleBrand");
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
