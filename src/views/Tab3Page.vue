<template>
  <ion-page>
    <headerPage/>

    <ion-content :fullscreen="true" :scroll-y="true" style="background: #036E9B;width: 100%; text-align: center; ">
      <ion-item style="border-radius: 5px; font-size: 13px;">
        <ion-label style="font-weight: 600;">Danh mục : </ion-label>
        <ion-select interface="popover" v-model="selectedCategory" @ionChange="handleCategoryChange">
          <ion-select-option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</ion-select-option>
        </ion-select>
      </ion-item>
      <div style="margin-bottom: 10px; border: 1px solid gray; border-radius: 20px; ">
        <ion-input v-model="searchText" color="medium" placeholder="Tìm kiếm"></ion-input>

      </div>
      <div style="text-align: center;">
        <div v-if="filteredNotes && filteredNotes.length > 0" style="font-size: 10px;">
          <ion-table v-if="filteredNotes.length > 0">
            <div style="margin: 5px 0px 10px 0px;">
              <ion-row class="table-header">
                <ion-col style="color: rgb(215, 51, 45);">Ghi chú</ion-col>
                <ion-col style="color: rgb(7, 126, 15);">Tiền đã chi </ion-col>
                <ion-col style="color: rgb(25, 32, 171);">Ngày tháng</ion-col>
              </ion-row>
            </div>

            <div style="background: #338aaf">
              <ion-row v-for="(note, index) in filteredNotes" :key="index" class="table-row" style="padding: 10px; color: white;">
                <ion-col>{{ note.note }}</ion-col>
                <ion-col>{{ formatAmount(note.amount) }} ₫</ion-col>
                <ion-col>{{ formatDate(note.date) }} </ion-col>
              </ion-row>
            </div>
          </ion-table>

        
        </div>
        <ion-text v-else style="font-weight: 600; width: 100%;  padding: 20px;">
            <h4>Không có dữ liệu</h4>
          </ion-text>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import headerPage from "./headerPage.vue"
import { ref, computed } from "vue";
import { IonPage, IonSelect, IonSelectOption, IonItem, IonText, IonInput } from '@ionic/vue';

const selectedCategory = ref<string | null>('1');
const categories = ref([
  { id: 1, name: "Mua sắm" },
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

const selectedNotes = ref([]);
const searchText = ref('');

function handleCategoryChange() {
  const selectedCategoryName = selectedCategory.value;
  const dataFromLocalStorage = localStorage.getItem(selectedCategoryName);
  selectedNotes.value = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
}

function formatDate(dateString: any) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatAmount(amount: any) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const filteredNotes = computed(() => {
  let filtered = selectedNotes.value;

  if (searchText.value) {
    const searchTerm = searchText.value.toLowerCase();
    filtered = filtered.filter(note => {
      return note.note.toLowerCase().includes(searchTerm) || note.amount.toString().includes(searchTerm);
    });
  }

  return filtered;
});
</script>

<style scoped>
.table-header {
  background-color: #f2f2f2;
  font-weight: bold;
}
.table-row {
  border-bottom: 1px solid #ddd;
}
</style>
