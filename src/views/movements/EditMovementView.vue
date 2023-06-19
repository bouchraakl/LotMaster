<template>
    <div
      class="access-content d-flex flex-column align-items-start justify-content-start"
    >
      <p class="title-pages">Edit : Open Movement</p>
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
                list="datalistOptionsCondutor"
                id="exampleDataList"
                placeholder="Search By CPF ..."
                style="width: 300px"
                v-model="moveCPF"
              />
              <datalist id="datalistOptionsCondutor">
                <option
                  v-for="option in datalistOptionsCondutor"
                  :value="option"
                ></option>
              </datalist>
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="exampleDataList" class="form-label"
                >Associated Vehicle</label
              >
              <input
                class="form-control"
                list="datalistOptionsVeiculo"
                id="exampleDataList"
                placeholder="Search By lisence plate ..."
                style="width: 300px"
                v-model="movePlaca"
              />
              <datalist id="datalistOptionsVeiculo">
                <option
                  v-for="option in datalistOptionsVeiculo"
                  :value="option"
                ></option>
              </datalist>
            </div>
          </div>
          <div class="d-flex align-items-center align-self-start gap-3">
            <div class="d-flex flex-column">
              <label for="entry" class="form-label">Entry Date</label>
              <input
                class="form-control"
                type="datetime-local"
                id="entry"
                style="width: 300px"
                v-model="moveEntrada"
              />
            </div>
          </div>
          <!-- Error Message -->
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
      };
    },
    computed: {
      moveClient() {
        return new MovimentacaoClient();
      },
    },
    async mounted() {
      try {
        await this.fetchItems();
        const veiculoClient = new VeiculoClient();
        const condutorClient = new CondutorClient();
        const modelData = await veiculoClient.findAll();
        const modelData2 = await condutorClient.findAll();
        this.datalistOptionsVeiculo = modelData.map((car) => car.placa);
        this.datalistOptionsCondutor = modelData2.map((condutor) => condutor.cpf);
      } catch (error) {
        console.error(
          "Failed to fetch veiculo data:",
          this.datalistOptionsVeiculo
        );
        console.error(
          "Failed to fetch condutor data:",
          this.datalistOptionsCondutor
        );
      }
    },
    methods: {
      async submitForm() {
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

            console.log(this.moveCPF);
            console.log(this.movePlaca);
            console.log(this.moveEntrada);

            this.move.condutor.cpf = this.moveCPF;
            this.move.veiculo.placa = this.movePlaca;
            this.move.entrada = this.moveEntrada;


            try {
                console.log(this.move);

                this.move.id = Number(this.$route.params.editMovemId);
                console.log(this.move.id);
                await this.fetchCondutorId();
                await this.fetchVeiculoId();
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
  
      async fetchCondutorId() {
        try {
          const condutorClient = new CondutorClient();
          const moveData = await condutorClient.getByCPF(this.move.condutor.cpf);
          if (moveData && moveData.id) {
            this.move.condutor.id = moveData.id;
          } else {
            console.error("Condutor not found");
          }
        } catch (error) {
          console.error("Failed to fetch condutor ID:", error);
        }
      },
  
      async fetchVeiculoId() {
        try {
          const veiculoClient = new VeiculoClient();
          const moveData = await veiculoClient.findByPlaca(
            this.move.veiculo.placa
          );
          if (moveData && moveData.id) {
            this.move.veiculo.id = moveData.id;
          } else {
            console.error("Veiculo not found");
          }
        } catch (error) {
          console.error("Failed to fetch veiculo ID:", error);
        }
      },

      async fetchItems() {
            const editMoveId = Number(this.$route.params.editMovemId);

            if (!isNaN(editMoveId)) {
                try {
                    const response = await this.moveClient.findById(editMoveId);
                    this.moveCPF = response.condutor.cpf;
                    this.movePlaca = response.veiculo.placa;
                    this.moveEntrada = response.entrada;
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
        this.$router.push("/access-movement");
      },
    },
  });
  </script>
  
  <style>
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
  