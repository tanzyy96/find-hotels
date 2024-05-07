<script setup lang="ts">
import { Hotel } from "@/types/hotel";
import { DialogContent } from "./ui/dialog";

defineProps<{
  hotel: Hotel;
}>();
</script>
<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Reviews</DialogTitle>
    </DialogHeader>
    <div>{{ hotel.reviews }}</div>
    <DialogFooter>
      <Button>Close</Button>
    </DialogFooter>
  </DialogContent>
</template>
<style scoped lang="scss"></style>
