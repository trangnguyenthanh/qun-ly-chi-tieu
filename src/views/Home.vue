<template>
  <ion-page>
    <headerPage />

    <ion-content :scroll-y="true" style="font-size: 12px;">
      <div
        style="
          padding: 10px 10px 10px 10px;
          background: linear-gradient(to right, #757f9a, #d7dde8);
          height: 100%;
        "
      >
        <div style="text-align: center; ">
          <h4>Nhập khoản chi</h4>
        </div>


        <div
          style="
            position: relative;
            display: flex;
            height: 50px;
            background-color: #f68989;
            width: 100%;
            border-radius: 5px;
            text-align: center;
            align-items: center;
          "
        >
          <p style="margin-left: 20px; color: white; font-weight: 600;" >
            Tiền trong ví: {{ formatWalletMoney(walletMomo) }} VND
          </p>
        </div>
        <br />
        <ion-item style="border-radius: 5px; font-size: 12px;">
          <ion-label style="font-weight: 600;">Danh mục : </ion-label>
          <ion-select  v-model="selectedCategory"  >
            <ion-select-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              ><p >{{ category.name }}</p></ion-select-option
            >
          </ion-select>
        </ion-item>
        <br>
          <ion-input
          style="background-color: white; border-radius: 5px"
          fill="outline"
          v-model="note"
          @click="showCalculator = false"
        >
          <div slot="label">
            <ion-text style="font-weight: 600;" color="primary">ghi chú : </ion-text>
          </div>
        </ion-input>
        
        <br />
        <ion-input
          @click="showCalculator = true"
          style="background-color: white; border-radius: 5px"
          fill="outline"
          v-model="money"
          type="number"
          @input="handleInput"
          readonly
        >
          <div slot="label">
            <ion-text style="font-weight: 600;" color="danger">( VND ) : </ion-text>
          </div>
        </ion-input>
        <ion-button color="tertiary" style="margin-top: 10px ;" expand="block" @click="saveData">
          Lưu
        </ion-button>
<!-- keyboard -------------------------------------------------------------------------------------------- keyboard-->

        <div
          v-if="showCalculator"
          id="calculator"
          style="
            display: flex;
            justify-content: center;
            height: 40%;
            padding: 10px;
            border: 1px solid gray;
            border-radius: 10px;
          "
        >
          <hr />

          <div
            style="
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 2px;
              width: 80%;
              height: 100%;
            "
          >
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
            <ion-button  color="medium" @click="appendNumber(0)">0</ion-button>
          </div>
          <ion-button
            color="success"
            style="width: 100px"
            @click="showCalculator = false"
          >
            <ion-text style="font-size: 25px">Ok</ion-text></ion-button
          >
        </div>
      </div>
<!-- keyboard -------------------------------------------------------------------------------------------- keyboard-->

<!-- modal -------------------------------------------------------------------------------------------- modal-->
      <div> 
        <div v-if="showModalNotMoney" class="overlay"></div>
        <div v-if="showModalCategory" class="overlay"></div>
        <div v-if="showModalMoney0" class="overlay"></div>
        <div v-if="showDontNote" class="overlay"></div>
        <div v-if="showSuccessModal" class="overlay"></div>

        <div class="ShowModal" v-if="showModalNotMoney">
          <div class="wrapper" style="width: 200px">
            <h5 style="margin-bottom: 20px">
              Số tiền trong ví không đủ để thực hiện giao dịch.
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

        <div class="ShowModal" v-if="showModalCategory">
            <div class="wrapper" style="width: 200px">
              <h5 style="margin-bottom: 20px">
                Xin vui lòng chọn danh mục để lưu.
              </h5>
              <ion-button
                color="medium"
                style="width: 100px"
                @click="showModalCategory = false"
              >
                <ion-text style="font-size: 13px">Đóng</ion-text></ion-button
              >
            </div>
          </div>
          <div class="ShowModal" v-if="showModalMoney0">
            <div class="wrapper" style="width: 200px">
              <h5 style="margin-bottom: 20px">
                Số tiền ko được để trống.
              </h5>
              <ion-button
                color="medium"
                style="width: 100px"
                @click="showModalMoney0 = false"
              >
                <ion-text style="font-size: 13px">Đóng</ion-text></ion-button
              >
            </div>
          </div>
        </div>
        <div class="ShowModal" v-if="showDontNote">
            <div class="wrapper" style="width: 200px">
              <h5 style="margin-bottom: 20px">
                Xin vui lòng nhập ghi chú.
              </h5>
              <ion-button
                color="medium"
                style="width: 100px"
                @click="showDontNote = false"
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
<!-- modal -------------------------------------------------------------------------------------------------- modal-->

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const showModalNotMoney = ref<boolean>(false);

const showModalCategory = ref<boolean>(false);

const showModalMoney0 = ref<boolean>(false);

const showDontNote = ref<boolean>(false)

const money = ref("");

const note = ref('')

const showSuccessModal = ref(false);

import { onMounted, ref } from "vue";
import {
  IonPage,
  IonInput,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonButton
} from "@ionic/vue";
import headerPage from "./headerPage.vue";
import {  checkmarkCircleOutline } from "ionicons/icons";

const userName = ref<string>("");
const walletMomo = ref<string>("");
const selectedCategory = ref<string | null>(null);

const categories = ref([
  { id: 1, name: "Mua sắm", },
  { id: 2, name: "Ăn uống" },
  { id: 3, name: "Di chuyển" },
  { id: 4, name: "Giải trí" },
  { id: 5, name: "Hóa đơn" },
  { id: 6, name: "Sức khỏe" },
  { id: 7, name: "Gia đình" },
  { id: 8, name: "Quà tặng" },

  { id: 9, name: "Khác" },
  { id: 10, name: "Trả nợ" },

]);

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
  walletMomo.value = localStorage.getItem("walletMoney") || "";
});

const formatWalletMoney = (money: string) => {
  if (!money) return "0";
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const showCalculator = ref<boolean>(false);

const appendNumber = (number: number) => {
  money.value += number;
};
const add = () => {
  money.value += "+";
};
const subtract = () => {
  money.value += "-";
};
const multiply = () => {
  money.value += "*";
};
const divide = () => {
  money.value += "/";
};
const clear = () => {
  money.value = "";
};
let result: string | number = "";

const calculate = () => {
  try {
    result = eval(money.value) as string;
    money.value = result;
  } catch (error) {
    money.value = "Error";
  }
};
const handleInput = () => {
  money.value = money.value.replace(/[^0-9+\-*/.]/g, '');
};


const saveData = () => {


  if (selectedCategory.value === null) {
  console.error("Vui lòng chọn danh mục trước khi lưu.");
  showModalCategory.value = true;

  setTimeout(() => {
    showModalCategory.value = false;
  }, 3000);
  return;
}

if(note.value === ''){
    showDontNote.value = true

    setTimeout(() => {
      showDontNote.value = false
    },3000)
    return;

  }


  const selectedCategoryName = categories.value.find(
    (category) => category.id === selectedCategory.value
  )?.name;

  const enteredAmount = Number(money.value);
  if (isNaN(enteredAmount) || enteredAmount <= 0) {
    console.error("Vui lòng nhập số tiền hợp lệ.");
    showModalMoney0.value = true
    setTimeout(() => {
      showModalMoney0.value = false
    },3000)
    return;
  }

  const currentWalletMoney = Number(walletMomo.value.replace(/\D/g, ""));
  if (enteredAmount > currentWalletMoney) {
    console.error("Số tiền trong ví không đủ.");
    showModalNotMoney.value = true;

    setTimeout(() => {
      showModalNotMoney.value = false;
    }, 3000);
    return;
  }

  const currentDate = new Date();
  const transactionDateTime = currentDate.toISOString();

  const newWalletMoney = currentWalletMoney - enteredAmount;
  walletMomo.value = formatWalletMoney(String(newWalletMoney));

  localStorage.setItem("walletMoney", String(newWalletMoney));

  let categoryTransactions = JSON.parse(
    localStorage.getItem(selectedCategoryName) || "[]"
  );

  categoryTransactions.push({
    note:note.value,
    amount: enteredAmount,
    date: transactionDateTime,
  });



  showSuccessModal.value = true;

setTimeout(() => {
  showSuccessModal.value = false
  return;
  
},1000)

note.value =''
money.value = ''

  localStorage.setItem(
    selectedCategoryName,
    JSON.stringify(categoryTransactions)
  );


  setTimeout(() => {
    window.location.reload()
    
  },800)
};





</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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



</style>



