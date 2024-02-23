<template>
  <ion-page>
    <ion-tabs @ionTabsDidChange="handleTabChange">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tab1">
          <ion-icon :icon="playCircle" />
          <ion-label>Listen now</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/tab2">
          <ion-icon id="icon" :icon="addCircle" />
        </ion-tab-button>

        <ion-tab-button tab="library" href="/tab3">
          <ion-icon :icon="radio"  />
          <ion-label>Library</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/vue';
import { playCircle, radio, library, addCircle } from 'ionicons/icons';

export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon },
  data() {
    return {
      playCircle,
      radio,
      library,
      addCircle
    };
  },
  methods: {
    handleTabChange(tab: string) {
      if (tab === 'home') {
        const walletMoney = parseFloat(localStorage.getItem('walletMoney') || '0');
        console.log('walletMoney updated:', walletMoney);
      }
    }
  }
};
</script>

<style scoped>
#icon {
  font-size: 40px;
}
</style>
