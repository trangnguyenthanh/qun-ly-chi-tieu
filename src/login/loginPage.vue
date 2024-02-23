<template>
  <div>
    <div id="topheader">
      <h1 id="Title">sổ thu chi</h1>
    </div>
    <div id="Content">
      <h2>Xin Chào</h2>
      <ion-input
        id="custom-input"
        fill="outline"
        v-model="inputValue"
        :placeholder="errorMessage ? errorMessage : 'Nhập tên của bạn'"
      >
     
</ion-input>

      <ion-button
        id="nextHome"
        color="warning"
        @click="handleContinue"
        :href="inputValue.trim() ? '/tab1' : null"
      >
        Tiếp tục
      </ion-button>
    </div>
    <div id="rules">
      <p>
        Bằng việc ấn và tiếp tục, bạn đã đồng ý với
        <br />
        <span id="open-modal" @click="openModal"
          >điều khoản và điều kiện sử dụng</span
        >
      </p>
    </div>

    <ion-modal ref="modal" @willDismiss="onWillDismiss">

      <ion-header>
      <ion-toolbar>

        
        <ion-title @click="confirm">Back</ion-title>
      </ion-toolbar>
    </ion-header>
      <terms />
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import terms from "./terms.vue";
import { IonModal, IonInput, IonButton,IonHeader, IonToolbar, IonTitle, } from "@ionic/vue";
import { ref } from "vue";

const inputValue = ref("");
const errorMessage = ref(" Nhập họ tên để đăng nhập");

const handleContinue = () => {
  if (inputValue.value.trim() === "") {
    errorMessage.value 
    return;
  } 
  localStorage.setItem('userName', inputValue.value.trim());

};

const modal = ref();
const openModal = () => {
  modal.value.$el.present();
};
const confirm = () => {
  modal.value.$el.dismiss({ data: name }, "confirm");
};

const onWillDismiss = (event: CustomEvent) => {
  if (event.detail.role === "confirm") {
    console.log("Name:", event.detail.data);
  }
};
</script>

<style scoped>
#Title {
  position: relative;
  top: 70px;
  text-align: center;
  color: white;
}

#topheader {
  position: relative;
  bottom: 20px;
  background: #036e9b;
  height: 150px;
}
#Content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#Content h2 {
  text-align: center;
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
}
#Content p {
  text-align: center;
}
#custom-input {
  margin-top: 20px;
  width: 80%;
}
#rules {
  margin-top: 50px;
  text-align: center;
}
#open-modal {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

#nextHome {
  color: white;
  padding-top: 20px;
  width: 80%;
}
</style>
