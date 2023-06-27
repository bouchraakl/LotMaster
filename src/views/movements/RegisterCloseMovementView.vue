<template>
  <div class="access-content d-flex flex-column align-items-start justify-content-start">
    <p class="title-pages">Register: Close Movement</p>
    <div class="form-application d-flex flex-column custom-section">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3" @submit.prevent="submitForm">

        <!-- Associated Condutor Field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Condutor</label>

            <!-- Read-only input field for Associated Condutor -->
            <input class="form-control" readonly list="datalistOptions" id="exampleDataList"
              style="width: 300px; color: #909394" v-model="condutorAs" />
          </div>
        </div>

        <!-- Associated Vehicle Field -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="exampleDataList" class="form-label">Associated Vehicle</label>

            <!-- Read-only input field for Associated Vehicle -->
            <input class="form-control" readonly list="datalistOptions" id="exampleDataList"
              style="width: 300px; color: #909394" v-model="veiculoAs" />
          </div>
        </div>

        <!-- Entry Date and Exit Date Fields -->
        <div class="d-flex align-items-center align-self-start gap-3">
          <div class="d-flex flex-column">
            <label for="entry" class="form-label">Entry Date</label>

            <!-- Read-only input field for Entry Date -->
            <input class="form-control" readonly type="datetime-local" id="entry" style="width: 300px; color: #909394"
              v-model="entryAs" />
          </div>
          <div class="d-flex flex-column">
            <label for="exit" class="form-label">Exit Date</label>

            <!-- Input field for Exit Date -->
            <input class="form-control" type="datetime-local" id="exit" style="width: 300px" v-model="move.saida" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit">Close Movement</button>

          <!-- Button to show receipt -->
          <button @click="showReceipt(move)" data-bs-toggle="modal" data-bs-target="#details" type="button">Show
            Receipt</button>

          <!-- Display Error Message -->
          <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
            {{ errorMessage.message }}
          </p>
        </div>
      </form>

      <!-- Receipt Modal -->
      <div class="modal fade" id="details" tabindex="-1" aria-labelledby="details" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Receipt</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-between align-items-center">
              <div class="modal-col d-flex flex-column" style="text-align: start;">
                <p>Active :</p>
                <p>Registration Date :</p>
                <hr>
                <p>Driver Name :</p>
                <p>Driver CPF :</p>
                <p>Driver Phone :</p>
                <p>Driver Total Payed Hours :</p>
                <p>Driver Discount Hours :</p>
                <hr>
                <p>Vehicle License Plate :</p>
                <p>Vehicle Brand Name :</p>
                <p>Vehicle Modal Name :</p>
                <p>Vehicle Type :</p>
                <p>Vehicle Year :</p>
                <p>Vehicle Color :</p>
                <hr>
                <p>Entry Date :</p>
                <p>Exit Date :</p>
                <p>Total Hours :</p>
                <p>Total Penalty Hours :</p>
                <p>Total Discount Hours :</p>
                <p>Penalty Value :</p>
                <p>Discount Value :</p>
                <p>Total Value :</p>
              </div>
              <div class="modal-col d-flex flex-column">
                <!-- Display receipt details using data from the selectedMove object -->
                <p>{{ selectedMove?.ativo }}</p>
                <p>{{ selectedMove?.cadastro }}</p>
                <hr>
                <p>{{ selectedMove?.condutor.nome }}</p>
                <p>{{ selectedMove?.condutor.cpf }}</p>
                <p>{{ selectedMove?.condutor.telefone }}</p>
                <p>{{ selectedMove?.condutor.tempoPagoHoras }}</p>
                <p>{{ selectedMove?.tempoDesconto }}</p>
                <hr>
                <p>{{ selectedMove?.veiculo.placa }}</p>
                <p>{{ selectedMove?.veiculo.modelo.marca.nome }}</p>
                <p>{{ selectedMove?.veiculo.modelo.nome }}</p>
                <p>{{ selectedMove?.veiculo.tipo }}</p>
                <p>{{ selectedMove?.veiculo.ano }}</p>
                <p>{{ selectedMove?.veiculo.cor }}</p>
                <hr>
                <p>{{ selectedMove?.entrada }}</p>
                <p>{{ selectedMove?.saida }}</p>
                <p>{{ selectedMove?.tempoHoras }}</p>
                <p>{{ selectedMove?.tempoMultaHoras }}</p>
                <p>{{ selectedMove?.tempoDesconto }}</p>
                <p>{{ selectedMove?.valorMulta }}</p>
                <p>{{ selectedMove?.valorDesconto }}</p>
                <p>{{ selectedMove?.valorTotal }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CondutorClient } from "@/client/condutor.client";
import { MovimentacaoClient } from "@/client/movimentacao.client";
import { VeiculoClient } from "@/client/veiculo.client";
import { Movimentacao } from "@/model/movimentacao";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      condutorAs: "", // Stores the value of condutorAs
      veiculoAs: "", // Stores the value of veiculoAs
      entryAs: new Date(), // Stores the value of entryAs as the current date
      move: new Movimentacao(), // Creates a new instance of Movimentacao and stores it in move
      errorMessage: {
        status: "", // Possible values: "success", "error"
        message: "", // Stores the error message
      },
      selectedMove: null as Movimentacao | null, // Stores the selected Movimentacao object, initially set to null
    };
  },
  computed: {
    moveClient() {
      return new MovimentacaoClient(); // Returns a new instance of MovimentacaoClient
    },
  },
  mounted() {
    this.fetchOpenMovement(); // Fetches the open movement when the component is mounted
  },
  methods: {
    async submitForm() {
      // Check if the exit date is null
      if (this.move.saida == null) {
        // Set an error message for missing exit date
        this.setErrorMessage("error", "Exit date is required");
        return; // Exit the function early
      }

      try {
        // Fetch the veiculo and condutor data
        await this.fetchItems();

        // Perform any additional form validation or data manipulation here

        // Submit the form data
        await this.moveClient.save(this.move);

        // Set success message
        this.setErrorMessage("success", "Movement closed successfully");

        const moveId = this.move.id;
        await this.moveClient.delete(Number(this.$route.params.movemId));
      } catch (error) {
        // Handle errors during registration
        this.setErrorMessage("error", "An error occurred during registration.", error);
      }
    },

    setErrorMessage(status: string, message: string, error?: any) {
      this.errorMessage.status = status; // Set the status property of the errorMessage object

      if (error && error.response && error.response.data) {
        // If an error object is provided and it has a response with data
        const errorMessages = Object.values(error.response.data);
        message = errorMessages.join(""); // Concatenate error messages
      }

      this.errorMessage.message = message; // Set the message property of the errorMessage object
    },

    async fetchOpenMovement() {
      try {
        const response = await this.moveClient.findById(Number(this.$route.params.movemId));
        this.condutorAs = response.condutor.cpf; // Assign the CPF of the condutor to condutorAs
        this.veiculoAs = response.veiculo.placa; // Assign the license plate of the veiculo to veiculoAs
        this.entryAs = response.entrada; // Assign the entry date of the movement to entryAs
      } catch (error) {
        console.log(error);
      }
    },

    async fetchItems() {
      try {
        const veiculoClient = new VeiculoClient();
        const condutorClient = new CondutorClient();
        const veiculoData = await veiculoClient.findByPlaca(this.veiculoAs);
        const condutorData = await condutorClient.getByCPF(this.condutorAs);
        if (veiculoData && veiculoData.id) {
          this.move.veiculo.id = veiculoData.id; // Assign the ID of the veiculo to move.veiculo.id
        }
        if (condutorData && condutorData.id) {
          this.move.condutor.id = condutorData.id; // Assign the ID of the condutor to move.condutor.id
        }
        this.move.entrada = this.entryAs; // Assign the entry date to move.entrada
      } catch (error) {
        console.error("Failed to fetch veiculo ID:", error);
      }
    },

    async showReceipt(move: Movimentacao) {
      if (move.saida == null) {
        try {
          this.fetchItems();
          const response = await this.moveClient.findById(Number(this.$route.params.movemId));
          this.selectedMove = response;
          console.log(this.selectedMove + "move.saida == null");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          this.fetchItems();
          const response = await this.moveClient.findByLast();
          this.selectedMove = response;
          console.log(this.selectedMove + "move.saida != null");
        } catch (error) {
          console.log(error);
        }
      }
    }
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
