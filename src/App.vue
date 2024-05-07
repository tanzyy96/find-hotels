<script setup lang="ts">
import { onMounted, ref } from "vue";
import Searchbar from "./components/Searchbar.vue";
import HotelCard from "./components/HotelCard.vue";
import { Hotel } from "./types/hotel";
import { filterAndSort } from "./lib/utils";

type Filter = {
  name: string;
  rating: number;
  minPrice: number;
  maxPrice: number;
};

// API URL, can be placed in .env if needed
const URL = "https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/en";
const results = ref([] as Hotel[]);
const filtered = ref([] as Hotel[]);
const selectedHotel = ref<Hotel | null>(null);
const filters = ref<Filter>({
  name: "", // contains this name
  rating: 0, // above this rating
  minPrice: 0, // above this price
  maxPrice: 0, // below this price
});
const sort = ref({
  price: "asc" as "asc" | "desc",
});

const onSubmit = () => {
  filtered.value = filterAndSort(results.value, filters.value, sort.value);
};

const onSelectHotel = (hotel: Hotel) => {
  selectedHotel.value = hotel;
};

const fetchHotels = async () => {
  const response = await fetch(URL);
  const data: Hotel[] = await response.json();
  results.value = data;
  filtered.value = data;
  filters.value.minPrice = Math.min(...data.map((hotel) => hotel.price));
  filters.value.maxPrice = Math.max(...data.map((hotel) => hotel.price));
};

const resetFilters = () => {
  filters.value = {
    name: "",
    rating: 0,
    minPrice: 0,
    maxPrice: 0,
  };
  sort.value = {
    price: "asc",
  };
  filtered.value = results.value;
  filters.value.minPrice = Math.min(
    ...results.value.map((hotel) => hotel.price),
  );
  filters.value.maxPrice = Math.max(
    ...results.value.map((hotel) => hotel.price),
  );
};

onMounted(() => {
  fetchHotels();
});
</script>

<template>
  <div class="page">
    <h1 class="text-4xl font-extrabold my-2 lg:text-5xl">
      Find The Right Stay, <br />Today.
    </h1>
    <Searchbar
      v-model:name="filters.name"
      v-model:rating="filters.rating"
      v-model:min-price="filters.minPrice"
      v-model:max-price="filters.maxPrice"
      v-model:sort-price="sort.price"
      @reset="resetFilters"
      @submit="onSubmit"
    />
    <div
      v-if="filtered.length"
      class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3"
    >
      <HotelCard
        v-for="hotel in filtered"
        :key="hotel.id"
        :hotel="hotel"
        @click="onSelectHotel(hotel)"
      />
    </div>
    <div v-else class="text-center mt-8 text-gray-500">
      No results found. Please reset filters and try something else.
    </div>
  </div>
</template>

<style scoped>
.page {
  min-padding: 20px;
  padding: 5%;
}
</style>
