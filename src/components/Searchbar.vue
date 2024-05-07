<script setup lang="ts">
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { RotateCcw } from "lucide-vue-next";
import { Button } from "./ui/button";
import { PropType } from "vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  sortPrice: {
    type: String as PropType<"asc" | "desc">,
    default: "asc",
  },
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
});
defineEmits(["reset", "submit"]);

const name = defineModel("name", { default: "" });
const rating = defineModel("rating", { default: 0 });
const minPrice = defineModel("minPrice", { default: 0 });
const maxPrice = defineModel("maxPrice", { default: 0 });
const sortPrice = defineModel("sortPrice", { default: "asc" });

const setSortPrice = () => {
  sortPrice.value = sortPrice.value === "asc" ? "desc" : "asc";
};
</script>
<template>
  <Card class="grid grid-cols-1 lg:grid-cols-3 p-4 gap-2">
    <div class="col-span-3 flex-row flex items-center gap-2">
      <h2 class="text-xl font-semibold">Filter by</h2>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Name</span>
      <Input v-model="name" placeholder="Search name" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Above Rating</span>
      <Input
        v-model="rating"
        placeholder="Above rating"
        type="number"
        min="0"
        max="10"
      />
    </div>
    <div />
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Min Price</span>
      <Input v-model="minPrice" placeholder="Min Price" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Max Price</span>
      <Input v-model="maxPrice" placeholder="Max Price" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Sort price</span>
      <Button variant="outline" size="sm" @click="setSortPrice">
        {{ sortPrice === "asc" ? "Ascending" : "Descending" }}
      </Button>
    </div>
    <div class="mt-4 col-span-3 flex-row flex gap-2">
      <Button @click="$emit('submit')"> Apply Filters </Button>
      <Button variant="outline" size="icon" @click="$emit('reset')">
        <RotateCcw :size="15" />
      </Button>
    </div>
  </Card>
</template>
<style scoped lang="scss"></style>
