<template>
  <div class="flex ai-end" v-if="!items">
    <Skeleton size="2rem" class="p-mr-2"></Skeleton>
    <Skeleton size="3rem" class="p-mr-2"></Skeleton>
    <Skeleton size="4rem" class="p-mr-2"></Skeleton>
    <Skeleton size="5rem"></Skeleton>
  </div>
  <div>
    <Card v-for="item in items" :key="item.id">
      <template #content>
        {{ item.address }}
      </template>
    </Card>
  </div>
</template>



<script lang="ts">
import { Cafe } from "@/entities/Cafe";
import { defineComponent, inject, ref } from "vue";
import { CafeRepository } from "@/repositories/CafeRepository";

export default defineComponent({
  setup() {
    const cafeRepository = inject("CafeRepository") as CafeRepository;
    const items = ref<Cafe[]>([]);
    const loadCafes = async () => {
      items.value = await cafeRepository.getAll();
    };
    loadCafes();
    return { items };
  },
});
</script>
<style scoped>
</style>