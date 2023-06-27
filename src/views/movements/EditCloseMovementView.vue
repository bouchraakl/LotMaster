<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Edit : Close Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">
        <!-- Associated Condutor Input -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Condutor</label>
            <input class="form-control" list="datalistOptionsCondutor" id="exampleDataList"
              placeholder="Search By CPF ..." style="width: 300px" v-model="moveCPF" />
            <datalist id="datalistOptionsCondutor">
              <option v-for="option in datalistOptionsCondutor" :value="option"></option>
            </datalist>
          </div>
        </div>
        <!-- Associated Vehicle Input -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>
            <input class="form-control" list="datalistOptionsVeiculo" id="exampleDataList"
              placeholder="Search By lisence plate ..." style="width: 300px" v-model="movePlaca" />
            <datalist id="datalistOptionsVeiculo">
              <option v-for="option in datalistOptionsVeiculo" :value="option"></option>
            </datalist>
          </div>
        </div>
        <!-- Entry and Exit Date Inputs -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>
            <input class="form-control" type="datetime-local" id="entry" style="width: 300px" v-model="moveEntrada" />
          </div>
          <div class="d-flex flex-column">
            <label for="exit" class="form-label">Exit Date</label>
            <input class="form-control" type="datetime-local" id="exit" style="width: 300px" v-model="moveSaida" />
          </div>
        </div>
        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Update Movement</button>
          <button type="button" @click="cancelEdit">Cancel</button>
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">{{
            errorMessage.message }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script lang="ts">
// Importing necessary modules and classes
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { CondutorClient } from "@/client/condutor.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Condutor } from "@/model/condutor";
import { Movimentacao } from "@/model/movimentacao";
import { defineComponent } from "vue";
import { Veiculo } from "@/model/veiculo";

export default defineComponent({
  data() {
    return {
      // Data properties for the component
      move: new Movimentacao(),
      datalistOptionsCondutor: [] as string[],
      datalistOptionsVeiculo: [] as string[],
      moves: [] as Movimentacao[],
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "",
      },
      moveCPF: "",
      movePlaca: "",
      moveEntrada: new Date(),
      moveSaida: new Date(),
    };
  },
  computed: {
    // Computed property for the MovimentacaoClient instance
    moveClient() {
      return new MovimentacaoClient();
    },
  },
  async mounted() {
    try {
      // Fetching necessary data on component mount
      await this.fetchItems();

      const veiculoClient = new VeiculoClient();
      const condutorClient = new CondutorClient();

      // Fetching all Veiculo and Condutor data
      const modelData = await veiculoClient.findAll();
      const modelData2 = await condutorClient.findAll();

      // Storing options for datalist elements
      this.datalistOptionsVeiculo = modelData.map((car) => car.placa);
      this.datalistOptionsCondutor = modelData2.map((condutor) => condutor.cpf);
    } catch (error) {
      // Error handling if data fetching fails
      console.error("Failed to fetch veiculo data:", this.datalistOptionsVeiculo);
      console.error("Failed to fetch condutor data:", this.datalistOptionsCondutor);
    }
  },
  methods: {
    async submitForm() {
      // Form submission method

      // Validating form input
      if (!this.moveCPF) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "CPF cannot be null.";
        return;
      }

      if (!this.movePlaca) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Placa cannot be null.";
        return;
      }

      if (!this.moveEntrada) {
        this.errorMessage.status = "error";
        this.errorMessage.message = "Entry Date cannot be null.";
        return;
      }

      // Logging form input values
      console.log(this.moveCPF);
      console.log(this.movePlaca);
      console.log(this.moveEntrada);
      console.log(this.moveSaida);

      // Assigning form input values to the move object
      this.move.condutor.cpf = this.moveCPF;
      this.move.veiculo.placa = this.movePlaca;
      this.move.entrada = this.moveEntrada;
      this.move.saida = this.moveSaida;

      try {
        console.log(this.move);

        this.move.id = Number(this.$route.params.editCloseId);

        // Fetching Condutor and Veiculo IDs
        const conductorIdfetched = await this.fetchCondutorId();
        const vehicleIdfetched = await this.fetchVeiculoId();

        if (conductorIdfetched && vehicleIdfetched) {
          // Updating the move using the MovimentacaoClient
          await this.moveClient.update(this.move);

          // Set success message
          this.errorMessage.status = "success";
          this.errorMessage.message = "Movement edited successfully";
        } else {
          if (!conductorIdfetched) {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Conductor CPF not found.";
          } else if (!vehicleIdfetched) {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Vehicle plate not found.";
          } else {
            this.errorMessage.status = "error";
            this.errorMessage.message = "Vehicle plate and Conductor CPF are not found.";
          }
        }
      } catch (error: any) {
        // Error handling during updating
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          console.error(error.response.data);
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join(", ");
        } else {
          this.errorMessage.message = "An error occurred during updating.";
        }
      }
    },

    async fetchCondutorId() {
      // Fetches the Condutor ID based on the CPF

      try {
        const condutorClient = new CondutorClient();
        const moveData = await condutorClient.getByCPF(this.move.condutor.cpf);

        if (moveData && moveData.id) {
          // If Condutor is found, assign the ID to the move object
          this.move.condutor.id = moveData.id;
          return true;
        } else {
          console.error("Condutor not found");
          return false;
        }
      } catch (error) {
        console.error("Failed to fetch condutor ID:", error);
        return false;
      }
    },

    async fetchVeiculoId() {
      // Fetches the Veiculo ID based on the placa

      try {
        const veiculoClient = new VeiculoClient();
        const moveData = await veiculoClient.findByPlaca(this.move.veiculo.placa);

        if (moveData && moveData.id) {
          // If Veiculo is found, assign the ID to the move object
          this.move.veiculo.id = moveData.id;
          return true;
        } else {
          console.error("Veiculo not found");
          return false;
        }
      } catch (error) {
        console.error("Failed to fetch veiculo ID:", error);
        return false;
      }
    },

    async fetchItems() {
      // Fetches the move details for editing

      const editMoveId = Number(this.$route.params.editCloseId);

      if (!isNaN(editMoveId)) {
        try {
          const response = await this.moveClient.findById(editMoveId);

          // Assigning fetched move details to component data
          this.moveCPF = response.condutor.cpf;
          this.movePlaca = response.veiculo.placa;
          this.moveEntrada = response.entrada;
          this.moveSaida = response.saida;
          this.move = response;

          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Invalid editCloseId parameter");
      }
    },

    cancelEdit() {
      // Method for canceling the edit and redirecting to a specific route
      this.$router.push("/access-movement");
    },
  },
});
</script>