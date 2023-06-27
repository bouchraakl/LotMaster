<template>
  <!-- Edit Conductor Form -->
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <!-- Title -->
    <p class="title-pages">Edit : Conductor</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <!-- Conductor Name Input -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="name" class="form-label">Conductor Name</label>
            <input class="form-control" id="name" style="width: 300px" v-model="condutorNome" />
          </div>
          <!-- Conductor CPF Input -->
          <div class="d-flex flex-column">
            <label for="cpf" class="form-label">Conductor CPF</label>
            <input class="form-control" id="cpf" style="width: 300px" v-model="condutorCPF" />
          </div>
        </div>
        <!-- Conductor Phone Input -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="phone" class="form-label">Conductor Phone</label>
            <input class="form-control" id="phone" style="width: 300px" v-model="condutorPhone" />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Update Driver</button>
          <button type="button" @click="cancelEdit">Cancel</button>
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
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

export default defineComponent({
  data() {
    return {
      editedcondutor: new Condutor(), // Holds the edited conductor object
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
      condutorNome: "", // Holds the value of conductor name input
      condutorCPF: "", // Holds the value of conductor CPF input
      condutorPhone: "", // Holds the value of conductor phone input
    };
  },
  computed: {
    condutorClient() {
      return new CondutorClient(); // Returns a new instance of the ConductorClient
    },
  },
  mounted() {
    this.fetchDriver(); // Fetches the driver details when the component is mounted
  },
  methods: {
    async submitForm() {
      // Validation checks
      if (!this.condutorNome) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Driver name cannot be null.";
        return;
      }

      if (!this.condutorCPF) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Driver CPF cannot be null.";
        return;
      }

      if (!this.condutorPhone) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Driver Phone cannot be null.";
        return;
      }

      // Update the edited conductor object with input values
      this.editedcondutor.nome = this.condutorNome;
      this.editedcondutor.cpf = this.condutorCPF;
      this.editedcondutor.telefone = this.condutorPhone;

      try {
        this.editedcondutor.id = Number(this.$route.params.editConductorId); // Get the ID of the conductor being edited
        await this.condutorClient.update(this.editedcondutor); // Update the conductor using the ConductorClient

        // Set success message
        this.errorMessage.status = "success";
        this.errorMessage.message = "Driver edited successfully";
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
    async fetchDriver() {
      const editdDriverId = Number(this.$route.params.editConductorId); // Get the ID of the conductor being edited

      if (!isNaN(editdDriverId)) {
        try {
          const response = await this.condutorClient.findById(editdDriverId); // Fetch the conductor details by ID
          this.condutorNome = response.nome;
          this.condutorCPF = response.cpf;
          this.condutorPhone = response.telefone;
          this.editedcondutor = response; // Set the edited conductor object to the fetched response
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Invalid editdDriverId parameter");
      }
    },
    cancelEdit() {
      this.$router.push("/access-conductor"); // Cancel the edit and navigate to the conductor access page
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
