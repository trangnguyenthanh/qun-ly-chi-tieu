<template>

        <ion-header :translucent="true">
      <ion-toolbar>
        <div style="display: flex">
          <ion-icon
            style="position: relative; top: 2px; left: 15px"
            size="large"
            color="primary"
            :icon="peopleCircle"
          ></ion-icon>
          <ion-title style="display: flex" color="tertiary">
            {{ userName }}
          </ion-title>
        </div>
      </ion-toolbar>
    </ion-header>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  IonHeader,
  IonToolbar,
} from "@ionic/vue";
import { peopleCircle } from "ionicons/icons";

const userName = ref<string>("");

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "";
});
</script>