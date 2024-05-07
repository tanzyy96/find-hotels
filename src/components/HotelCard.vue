<script setup lang="ts">
import { Hotel } from "@/types/hotel";
import { CardContent, Card } from "./ui/card";
import { Input } from "./ui/input";
import { Star } from "lucide-vue-next";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";
import { computed, ref } from "vue";

const props = defineProps<{
  hotel: Hotel;
}>();

const search = ref("");
const filteredReviews = computed(() => {
  return props.hotel.reviews.filter(
    (review) =>
      review.description.toLowerCase().includes(search.value.toLowerCase()) ||
      review.title.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <Card class="cursor-pointer hover:shadow-gray-500">
        <CardContent class="truncate text-left">
          <img
            :src="hotel.photo"
            alt="hotel.name"
            class="w-full h-24 object-cover mb-2 mt-4 rounded-lg"
          />
          <span class="font-semibold">{{ hotel.name }}</span>
          <div class="flex flex-row items-center gap-x-1">
            <Star :size="16" fill="yellow" color="orange" />
            <span>{{ hotel.rating }}</span>
            <span>({{ hotel.reviews.length }})</span>
          </div>
          <span class="text-sm text-gray-500">{{ hotel.address }}</span>
          <div class="text-sm mt-2">S${{ hotel.price }}/night</div>
        </CardContent>
      </Card>
    </DialogTrigger>
    <DialogContent class="w-[80vw] max-w-[80vw]">
      <DialogHeader>
        <DialogTitle>{{ hotel.name }}'s Reviews</DialogTitle>
        <DialogDescription>{{ hotel.address }}</DialogDescription>
      </DialogHeader>
      <div class="flex flex-row items-center gap-x-2">
        <Input v-model="search" placeholder="Search" />
        <Button @click="search = ''">Clear</Button>
      </div>
      <div class="h-[70vh] overflow-y-scroll flex flex-col gap-2">
        <Card v-for="review in filteredReviews" :key="review.title">
          <CardContent class="flex flex-col py-4">
            <div class="font-bold">{{ review.title }}</div>
            <div class="flex flex-row items-center gap-x-2">
              <Star :size="16" fill="yellow" color="orange" />
              <span>{{ review.rating }}</span>
            </div>
            <div>{{ review.description }}</div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  </Dialog>
</template>
<style scoped lang="scss"></style>
