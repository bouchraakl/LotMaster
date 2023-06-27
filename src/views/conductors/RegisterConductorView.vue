<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Page title -->
    <p class="title-pages">Register : Conductor</p>

    <div class="form-application d-flex flex-column custom-section">
      <!-- Registration form -->
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <!-- Conductor Name field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="name" class="form-label">Conductor Name</label>
            <input class="form-control" id="name" style="width: 300px" v-model="condutor.nome" />
          </div>

          <!-- Conductor CPF field -->
          <div class="d-flex flex-column">
            <label for="cpf" class="form-label">Conductor CPF</label>
            <input class="form-control" id="cpf" style="width: 300px" v-model="condutor.cpf" />
          </div>
        </div>

        <!-- Conductor Phone field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="phone" class="form-label">Conductor Phone</label>
            <input class="form-control" id="phone" style="width: 300px" v-model="condutor.telefone" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Register Driver</button>
          <router-link to="/access-conductor" class="m-0">
            <button>Access Drivers</button>
          </router-link>
          <p :class="[
            'error-message',
            errorMessage.status === 'success' ? 'text-success' : 'text-danger',
          ]">
            {{ errorMessage.message }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { CondutorClient } from "@/client/condutor.client";
import { Condutor } from "@/model/condutor";
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import { parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';

export default defineComponent({
  data() {
    return {
      condutor: new Condutor(), // Create a new instance of the Condutor model for storing form data
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
    };
  },
  computed: {
    condutorClient() {
      return new CondutorClient(); // Create a new instance of the CondutorClient for making API requests
    },
    formattedCPF(): string {
      const cpf = this.condutor.cpf;
      if (cpf && cpf.length === 11) {
        return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); // Format the CPF with dots and hyphen
      }
      return cpf;
    },
    formattedPhone(): boolean {
      const phone = this.condutor.telefone;
      const parsedNumber = parsePhoneNumberFromString(phone); // Parse the phone number using libphonenumber-js
      return parsedNumber ? isValidNumber(parsedNumber.number.toString(), parsedNumber.country) : false; // Check if the parsed number is valid
    },
  },
  methods: {
    async submitForm() {
      if (!this.condutor.cpf) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Please enter the driver's CPF."; // Show an error message if CPF is not entered
        return;
      }

      try {
        this.condutor.cpf = this.formattedCPF; // Assign the formatted CPF before sending the request
        const response = await this.condutorClient.save(this.condutor); // Send the form data to the server using the CondutorClient
        const data = response;
        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Conductor registered successfully";
      } catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join(""); // Display the error message received from the server
        } else {
          this.errorMessage.message = "An error occurred during registration."; // Show a generic error message if no specific error message is available
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
