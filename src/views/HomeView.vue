<template>
  <div class="main-content d-flex flex-column">
    <div class="header d-flex align-items-baseline justify-content-between">
      <p class="title">Statistics</p>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <div class="latest-mov mt-2">
      <div class="segment-header d-flex justify-content-between mx-3 my-3">
        <p class="titlebox">Latest Movements</p>
        <div class="stats d-flex gap-3">
          <div class="done d-flex flex-column align-items-center">
            <span>{{ moveClose.length }}</span>
            <router-link to="/access-closemovement" class="text-reset text-decoration-done">Done</router-link>
          </div>
          <div class="hv"></div>
          <div class="pending d-flex flex-column align-items-center">
            <span>{{ moveOpen.length }}</span>
            <router-link to="/access-movement" class="text-reset text-decoration-done">Pending</router-link>
          </div>
        </div>
      </div>
      <div class="stats-table">
        <table class="table table-sm table-responsive">
          <thead>
            <tr class="border-top">
              <th scope="col">Conductor Name</th>
              <th scope="col">Car License</th>
              <th scope="col">Status</th>
              <th scope="col">Entry Date</th>
              <th scope="col">Departure Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
              <td>{{ movimentacao.condutor.nome }}</td>
              <td>{{ movimentacao.veiculo.placa }}</td>
              <td :class="{ 'text-success': movimentacao.saida, 'text-danger': !movimentacao.saida }">
                {{ movimentacao.saida ? 'Closed' : 'Pending' }}
              </td>
              <td>{{ movimentacao.entrada }}</td>
              <td>{{ movimentacao.saida !== null ? movimentacao.saida : '-' }}</td>
              <td>
                <router-link :to="getActionRoute(movimentacao)">
                  <i class="bi bi-eye"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="cards d-flex align-items-center gap-3">
      <div class="card cars d-flex flex-column justify-content-evenly align-items-center">
        <router-link to="/register/vehicle" class=" align-self-end">
          <img :src="require('@/assets/open tab.png')" alt="open tab" class="openTab">
        </router-link>
        <img :src="require('@/assets/back view of toy car turn right blue.png')" alt="car" class="registerCarImage">
        <router-link to="/register-vehicle">
          <button class="button carBtn">Register Car</button>
        </router-link>
      </div>
      <div class="card moves d-flex flex-column justify-content-between align-items-center">
        <router-link to="/register-movement">
          <button class="button moveBtn">Open Movement</button>
        </router-link>
      </div>

      <div class="card gains d-flex flex-column justify-content-between align-items-center">
        <img src="../assets/Chart.png" class="icongain align-self-end" alt="chartIcon">
        <div class="footer d-flex flex-column align-self-start">
          <p class="footerTitle">Total Day Win</p>
          <div class="gainsMoney d-flex justify-content-between align-items-center gap-3">
  <span class="moneyGain">${{ dayGain.toFixed(2) }}</span>
  <i :class="{'bi bi-arrow-down-up': previousDayGain == dayGain, 'bi bi-arrow-down-up text-success': previousDayGain < dayGain, 'bi bi-arrow-down-up text-danger': previousDayGain > dayGain}"></i>
</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MovimentacaoClient } from '@/client/movimentacao.client';
import { Movimentacao } from '@/model/movimentacao';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      formattedDate: '',
      movimentacoes: [] as Movimentacao[],
      moveOpen: [] as Movimentacao[],
      moveClose: [] as Movimentacao[],
      previousDayGain: 0 // Initialize previousDayGain with 0
    };
  },
  computed: {
    dayGain(): number {
      return this.moveClose.reduce((acc, movimentacao) => {
        return acc + movimentacao.valorTotal;
      }, 0);
    },
  },
  mounted() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    this.formattedDate = new Date().toLocaleString('en-US', options as Intl.DateTimeFormatOptions);
    this.fetchMovimentacoes();
    this.fetchMovimentacoesOpen();
    this.fetchMovimentacoesClose();
    this.retrievePreviousDayGain();
  },
  methods: {
    async fetchMovimentacoes() {
      try {
        const moveClient = new MovimentacaoClient();
        const response = await moveClient.findLastFive();
        this.movimentacoes = response;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchMovimentacoesOpen() {
      try {
        const moveClient = new MovimentacaoClient();
        const response = await moveClient.findAllByOpen('');
        this.moveOpen = response;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchMovimentacoesClose() {
      try {
        const moveClient = new MovimentacaoClient();
        const response = await moveClient.findAllByClose();
        this.moveClose = response;

        // Store dayGain in local storage with the current date
        const gainData = {
          date: this.formattedDate,
          gain: this.dayGain
        };

        const key = 'dayGain-' + this.formattedDate;  // Append date to the key name
        localStorage.setItem(key, JSON.stringify(gainData));
      } catch (error) {
        console.error(error);
      }
    },

    getActionRoute(movimentacao: Movimentacao) {
      if (movimentacao.saida) {
        return { path: '/access-closemovement', query: { licensePlate: movimentacao.veiculo.placa } }
      } else {
        return {
          path: '/access-movement',
          query: { licensePlate: movimentacao.veiculo.placa }
        }
      }
    },

    retrievePreviousDayGain() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date

      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const formattedYesterday = yesterday.toLocaleString('en-US', options as Intl.DateTimeFormatOptions);
      const key = 'dayGain-' + formattedYesterday;

      const previousDayData = localStorage.getItem(key);
      if (previousDayData) {
        const { gain } = JSON.parse(previousDayData);
        this.previousDayGain = gain;
      }


  },
}
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

.date {
  margin-right: 30px;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
}

.latest-mov {
  max-width: 990px;
  height: 271px;
  background: #FFFFFF;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
}

.segment-header .titlebox {
  margin-left: .5rem;
  font-family: 'Nunito';
  font-weight: 400;
  font-size: 20px;
  color: #000000;
}

.stats {
  margin-right: 1rem;
}

.stats span {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  color: #000000;
}

.stats p {
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 15px;
  color: #3C3C43;
}

.hv {
  border-left: 1px solid #D9D9D9;
  height: 60px;
  margin: 0 10px;
}


th {
  text-align: center;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #959595;
}

.cards {
  margin-right: 35px;
}

.card {
  width: 320px;
  height: 227px;
  margin-top: 10px;
  border-radius: 24px;
}

.moves {
  background-color: #3C3C43;
}

.cars,
.gains {
  background-color: #B5C2C9;
  border: none;
}

.button {
  width: 258px;
  height: 37px;
  border-radius: 24px;
  border: none;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 15px;
}

.carBtn {
  background: #3C3C43;
  color: #F3F3F3;
}

.moveBtn {
  background: #B5C2C9;
  color: #F3F3F3;
  margin-top: 20px;
  z-index: 1;
}

.gains {
  padding: 15px;
}

.footerTitle {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #64748B;
}

.moneyGain {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  display: flex;
  align-items: center;
  letter-spacing: -0.8px;
  color: #3C3C43;
}

.icongain {
  height: 27px;
  width: 27px;
}

.registerCarImage {
  width: 50%;
  height: 50%;
  object-fit: contain;
}

.openTab {
  width: 35px;
  height: 35px;
  align-self: flex-end;
  margin-right: 20px;
}

.card.moves {
  position: relative;
  height: 227px;
  border-radius: 24px;
  overflow: hidden;
}

.card.moves::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: #3C3C43;
}

.card.moves::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: url('../assets/image 1.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

a {
  text-decoration: none;
  z-index: 1;
}
</style>
