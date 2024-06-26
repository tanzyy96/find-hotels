<script setup lang="ts">
import { Hotel, HotelReview } from "@/types/hotel";
import { BaseCardContent, BaseCard } from "./ui/card";
import { BaseInput } from "./ui/input";
import { Star } from "lucide-vue-next";
import {
  BaseDialog,
  BaseDialogTrigger,
  BaseDialogDescription,
  BaseDialogContent,
  BaseDialogHeader,
} from "./ui/dialog";
import {
  BaseTabs,
  BaseTabsList,
  BaseTabsContent,
  BaseTabsTrigger,
} from "./ui/tabs";
import { computed, ref } from "vue";
import { filterSearch } from "@/lib/utils";

const props = defineProps<{
  hotel: Hotel;
}>();

const search = ref("");
const filteredReviews = computed(() => {
  return filterSearch(search.value, props.hotel.reviews);
});
</script>
<template>
  <BaseDialog>
    <BaseDialogTrigger>
      <BaseCard class="cursor-pointer hover:shadow-gray-500">
        <BaseCardContent class="truncate text-left">
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
        </BaseCardContent>
      </BaseCard>
    </BaseDialogTrigger>
    <BaseDialogContent class="w-[80vw] max-w-[80vw] h-[80vh] flex flex-col">
      <BaseDialogHeader>
        <BaseDialogTitle>{{ hotel.name }}'s Reviews</BaseDialogTitle>
        <BaseDialogDescription>{{ hotel.address }}</BaseDialogDescription>
      </BaseDialogHeader>
      <BaseTabs default-value="reviews">
        <BaseTabsList class="grid w-full grid-cols-2">
          <BaseTabsTrigger data-testid="review-btn" value="reviews">
            Reviews
          </BaseTabsTrigger>
          <BaseTabsTrigger data-testid="desc-btn" value="description">
            Description
          </BaseTabsTrigger>
        </BaseTabsList>
        <BaseTabsContent value="reviews">
          <div class="flex flex-row items-center gap-x-2 mb-2">
            <BaseInput
              data-testid="search-input"
              v-model="search"
              placeholder="Search"
            />
            <BaseButton data-testid="clear-button" @click="search = ''"
              >Clear</BaseButton
            >
          </div>
          <div class="h-[60vh] overflow-y-scroll flex flex-col gap-2">
            <BaseCard
              v-for="review in filteredReviews"
              :key="review.description"
            >
              <BaseCardContent class="flex flex-col py-4">
                <div class="flex flex-row justify-between items-center">
                  <div class="font-bold">{{ review.title }}</div>
                  <div class="text-gray-600 text-sm">
                    By {{ review.user.name }}
                  </div>
                </div>
                <div class="flex flex-row items-center gap-x-2">
                  <Star :size="16" fill="yellow" color="orange" />
                  <span>{{ review.rating }}</span>
                </div>
                <div>{{ review.description }}</div>
              </BaseCardContent>
            </BaseCard>
          </div>
        </BaseTabsContent>
        <BaseTabsContent value="description">
          <div v-html="hotel.description" />
        </BaseTabsContent>
      </BaseTabs>
    </BaseDialogContent>
  </BaseDialog>
</template>
<style scoped lang="scss"></style>
