<template>
    <div
      class="access-content d-flex flex-column align-items-start justify-content-start"
    >
      <p class="title-pages">Edit : Close Movement</p>
      <div class="form-application d-flex flex-column custom-section">
        <form
          class="form-app d-flex flex-column align-items-start mt-4 h-100 gap-3"
          @submit.prevent="submitForm"
        >
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="exampleDataList" class="form-label"
                >Associated Condutor</label
              >
              <input
                class="form-control"
                readonly
                list="datalistOptions"
                id="exampleDataList"
                style="width: 300px; color: #909394"
                v-model="condutorAs"
              />
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="exampleDataList" class="form-label"
                >Associated Vehicle</label
              >
              <input
                class="form-control"
                readonly
                list="datalistOptions"
                id="exampleDataList"
                style="width: 300px; color: #909394"
                v-model="veiculoAs"
              />
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="entry" class="form-label">Entry Date</label>
              <input
                class="form-control"
                readonly
                type="datetime-local"
                id="entry"
                style="width: 300px; color: #909394"
                v-model="entryAs"
              />
            </div>
            <div class="d-flex flex-column">
              <label for="exit" class="form-label">Exit Date</label>
              <input
                class="form-control"
                type="datetime-local"
                id="exit"
                style="width: 300px"
                v-model="moveSaida"
              />
            </div>
          </div>
          <div class="mt-3 d-flex align-items-center gap-3">
            <button type="submit">Update Movement</button>
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
  import { MovimentacaoClient } from "@/client/movimentacao.client";
  import { VeiculoClient } from "@/client/veiculo.client";
  import { Movimentacao } from "@/model/movimentacao";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        condutorAs: "",
        veiculoAs: "",
        entryAs: new Date(),
        moveSaida: new Date(),
        move: new Movimentacao(),
        errorMessage: {
          status: "", // Possible values: "success", "error"
          message: "",
        },
      };
    },
    computed: {
      moveClient() {
        return new MovimentacaoClient();
      },
    },
    async mounted() {
      this.fetchOpenMovement();
      await this.fetchEdit();
    },
    methods: {
      async submitForm() {
        if (!this.condutorAs) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "CPF cannot be null.";
                return;
            }

            if (!this.veiculoAs) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Placa cannot be null.";
                return;
            }

            if (!this.entryAs) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Entry Date cannot be null.";
                return;
            }

            if (!this.moveSaida) {
                this.errorMessage.status = "error";
                this.errorMessage.message = "Exit Date cannot be null.";
                return;
            }

            console.log(this.condutorAs);
            console.log(this.veiculoAs);
            console.log(this.entryAs);

            this.move.condutor.cpf = this.condutorAs;
            this.move.veiculo.placa = this.veiculoAs;
            this.move.entrada = this.entryAs;
            this.move.saida = this.moveSaida;


            try {
                await this.fetchItems();
                await this.moveClient.update(this.move);

                // Set success message
                this.errorMessage.status = "success";
                this.errorMessage.message = "Movement edited successfully";
            } catch (error: any) {
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
  
      async fetchOpenMovement() {
        try {
          const response = await this.moveClient.findById(
            Number(this.$route.params.movemId)
          );
          this.condutorAs = response.condutor.cpf;
          this.veiculoAs = response.veiculo.placa;
          this.entryAs = response.entrada;
          console.log(this.entryAs);
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
            this.move.veiculo.id = veiculoData.id;
          }
          if (condutorData && condutorData.id) {
            this.move.condutor.id = condutorData.id;
          }
          this.move.entrada = new Date(this.entryAs);
        } catch (error) {
          console.error("Failed to fetch veiculo ID:", error);
        }
      },
      async fetchEdit() {

        const editMoveId = Number(this.$route.params.editCloseId);

            if (!isNaN(editMoveId)) {
                try {
                    const response = await this.moveClient.findById(editMoveId);
                    this.condutorAs = response.condutor.cpf;
                    this.veiculoAs = response.veiculo.placa;
                    this.entryAs = response.entrada;
                    this.moveSaida = response.saida;
                    this.move = response;
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Invalid editMovemId parameter");
            }
       
      },
      cancelEdit() {
        this.$router.push("/access-closemovement");
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
  