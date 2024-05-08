<script setup lang="ts">
import { BaseInput } from "./ui/input";
import { BaseCard } from "./ui/card";
import { RotateCcw } from "lucide-vue-next";
import { BaseButton } from "./ui/button";
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
  <BaseCard class="grid grid-cols-1 lg:grid-cols-3 p-4 gap-2">
    <div class="col-span-3 flex-row flex items-center gap-2">
      <h2 class="text-xl font-semibold">Filter by</h2>
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Name</span>
      <BaseInput v-model="name" placeholder="Search name" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Above Rating</span>
      <BaseInput
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
      <BaseInput v-model="minPrice" placeholder="Min Price" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Max Price</span>
      <BaseInput v-model="maxPrice" placeholder="Max Price" />
    </div>
    <div class="flex flex-col">
      <span class="text-xs text-gray-500">Sort price</span>
      <BaseButton variant="outline" size="sm" @click="setSortPrice">
        {{ sortPrice === "asc" ? "Ascending" : "Descending" }}
      </BaseButton>
    </div>
    <div class="mt-4 col-span-3 flex-row flex gap-2">
      <BaseButton @click="$emit('submit')"> Apply Filters </BaseButton>
      <BaseButton variant="outline" size="icon" @click="$emit('reset')">
        <RotateCcw :size="15" />
      </BaseButton>
    </div>
  </BaseCard>
</template>
<style scoped lang="scss"></style>
