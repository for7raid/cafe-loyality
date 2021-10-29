<template>
  <div class="flex ai-end" v-if="!items">
    <Skeleton size="2rem" class="p-mr-2"></Skeleton>
    <Skeleton size="3rem" class="p-mr-2"></Skeleton>
    <Skeleton size="4rem" class="p-mr-2"></Skeleton>
    <Skeleton size="5rem"></Skeleton>
  </div>
  <div>
    <DataView :value="items" layout="list">
      <template #header> Акции нашей сети </template>
      <template #list="{ data }">
        <div class="col-12 adv-item">
          
            <div><b>{{ data.name }}</b></div>
            <div>Когда: {{ dateFormat(data.from) }} - {{ dateFormat(data.to) }}</div>
            <div>Где: {{ data.location }}</div>
          
        </div>
      </template>
    </DataView>  
  </div>
</template>



<script lang="ts">
import { Adv } from "@/entities/Adv";
import { defineComponent, inject, ref } from "vue";
import { AdvRepository } from "@/repositories/AdvRepository";

export default defineComponent({
  setup() {
    const advRepository = inject("AdvRepository") as AdvRepository;
    const items = ref<Adv[]>([]);
    const loadCafes = async () => {
      items.value = await advRepository.getAll();
    };
    loadCafes();

    const dateFormat = (value: Date) => {
      return value.toLocaleString("ru-RU", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    };

    return { items, dateFormat };
  },
});
</script>
<style scoped>
.adv-item{
  padding: 5px;
}
</style>