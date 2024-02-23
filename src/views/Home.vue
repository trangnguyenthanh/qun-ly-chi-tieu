<template>
  <ion-page>
    <headerPage/>
    <ion-content :scroll-y="true">
      <div
        style="
          padding: 20px 10px 10px 10px;
          display: flex;
          justify-content: space-between;
          background: linear-gradient(to right, #757f9a, #d7dde8);
          height: 100%;
        "
      >
        <div
          style="
            position: relative;
            display: flex;
            height: 50px;
            background-color: #f68989;
            width: 100%;
            border-radius: 5px;
            text-align: center;
          "
        >
        <p style="margin-left: 20px; color: white">
            Tiền trong ví: {{ formatWalletMoney(walletMomo) }} VND
          </p>
        </div>
      </div>
    </ion-content>


  </ion-page>



</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  IonPage,

  IonContent,
 
} from "@ionic/vue";
import headerPage from "./headerPage.vue"


const userName = ref<string>("");
const walletMomo = ref<string>("");

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
  walletMomo.value = localStorage.getItem("walletMoney") || "";
});

const formatWalletMoney = (money: string) => {
  if (!money) return '0';
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<style scoped></style>
