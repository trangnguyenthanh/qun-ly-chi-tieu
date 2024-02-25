<template>
  <ion-page>
    <headerPage/>
    <ion-content :scroll-y="true" style="">
      <div style="padding: 10px; height: 100%">
        <div style="text-align: center">
          <h4>Thêm vào ví</h4>

        </div>
        <ion-input
          style="background-color: white ; "
          label-placement="floating"
          fill="outline"
          v-model="money"
          @click="showCalculator = true"
          @input="handleInput"
          readonly
        >
          <div slot="label">
           Nhập số tiền <ion-text color="danger">(VND)</ion-text>
          </div>

        </ion-input>
        <div id="flex-container">
          <ion-datetime
            style="
              border-radius: 10px;
              border: 1px solid black;
              align-items: center;
              justify-content: space-between;
              display: flex;
            "
            display-format="DD/MM/YYYY"
            v-model="selectedDate"
            @ionChange="handleDateChange"
          ></ion-datetime>

        

        </div>
        <ion-button style="margin-top: 10px" expand="block" @click="saveData">
          Lưu
        </ion-button>

      </div>
    </ion-content>
  <div v-if="showCalculator" id="calculator" style=" display: flex; justify-content: center; height: 40%; padding: 10px;border: 1px solid gray; border-radius: 10px;" >
     <hr>

     <div  style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; width: 80%; height: 100%;" >
        <ion-button color="dark" @click="clear()">C</ion-button>
        <ion-button @click="divide()"> ÷ </ion-button>
        <ion-button @click="multiply()">x</ion-button>
        <ion-button color="danger" @click="calculate()"> =</ion-button>
  
        <ion-button color="medium" @click="appendNumber(1)">1</ion-button>
        <ion-button color="medium" @click="appendNumber(2)">2</ion-button>
        <ion-button color="medium" @click="appendNumber(3)">3</ion-button>
        <ion-button @click="add()">+</ion-button>

        <ion-button color="medium" @click="appendNumber(4)">4</ion-button>
        <ion-button color="medium" @click="appendNumber(5)">5</ion-button>
        <ion-button color="medium" @click="appendNumber(6)">6</ion-button>
        <ion-button @click="subtract()">-</ion-button>
        <ion-button color="medium" @click="appendNumber(7)">7</ion-button>
        <ion-button color="medium" @click="appendNumber(8)">8</ion-button>
        <ion-button color="medium" @click="appendNumber(9)">9</ion-button>
        <ion-button color="medium" @click="appendNumber(0)">0</ion-button>

      
     </div>
    <ion-button color="success" style="width: 100px;"  @click="showCalculator=false">  <ion-text style="font-size: 25px;" >Ok</ion-text></ion-button>

  </div>
  <div v-if="showModalNotMoney" class="overlay"></div>
  <div v-if="showSuccessModal" class="overlay"></div>

  <div class="ShowModal" v-if="showModalNotMoney">
          <div class="wrapper" style="width: 200px">
            <h5 style="margin-bottom: 20px">
             Số tiền không được để trống
            </h5>
            <ion-button
              color="medium"
              style="width: 100px"
              @click="showModalNotMoney = false"
            >
              <ion-text style="font-size: 13px">Đóng</ion-text></ion-button
            >
          </div>
        </div>
        <div class="ShowModal" v-if="showSuccessModal">
            <div class="wrapper" style="width: 200px">
              <h5 style="margin-bottom: 20px">
           Đã nhập dữ liệu
              </h5>
            <ion-icon color="success" style="font-size: 40px;" :icon="checkmarkCircleOutline">

            </ion-icon>
            </div>
          </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonInput, IonButton, IonDatetime,IonContent } from "@ionic/vue";
import { onMounted, ref } from "vue";
import headerPage from "./headerPage.vue";
import {  checkmarkCircleOutline } from "ionicons/icons";
const money = ref('')

const showModalNotMoney = ref<boolean>(false);
  const showSuccessModal = ref<boolean>(false);

 

const userName = ref<string>("");

const selectedDate = ref<string>("");

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
});

const saveData = () => {
  const moneyValue = parseFloat(money.value || "0");
  let walletMoney = parseFloat(localStorage.getItem("walletMoney") || "0");
  walletMoney += moneyValue;


if (money.value === '') {
showModalNotMoney.value = true;
setTimeout(() => {
  showModalNotMoney.value = false;
}, 1000);
return;
}
showSuccessModal.value = true

setTimeout(() => {
showSuccessModal.value = false
  
},1000)


  const transaction = {
    amount: moneyValue,
    date: new Date().toISOString(),
  };

  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("walletMoney", walletMoney.toString());



  setTimeout(() => {
    window.location.reload()
    
  },800)

}

const handleDateChange = (event: CustomEvent) => {
  selectedDate.value = event.detail.value;
};


const showCalculator = ref<boolean>(false);

const appendNumber = (number: number) => {
  money.value += number;
};
const add = () => {
  money.value += '+';
};
const subtract = () => {
  money.value += '-';
};
const multiply = () => {
  money.value += '*';
};
const divide = () => {
  money.value += '/';
};
const calculate = () => {
  try {
    result = eval(money.value) as string;
    money.value = result; 
  } catch (error) {
    money.value = 'Error';
  }
};


const clear = () => {
  money.value = '';
};



let result: string | number = '';

const handleInput = () => {
  money.value = money.value.replace(/[^0-9+\-*/.]/g, '');
};


</script>

<style scoped>
#flex-container {
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#buttons{
  display: grid;
}
.ShowModal {
  text-align: center;
  position: fixed;
  z-index: 1000;
  background-color: white;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 20px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

</style>
