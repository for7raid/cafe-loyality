<template>
  <div id="nav">
    <TabMenu :model="items" />
  </div>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const items = ref([
      {
        label_: "Главная",
        icon: "pi pi-fw pi-home",
        to: "/customer/",
      },
      {
        label_: "Карта",
        icon: "pi pi-fw pi-map",
        to: "/customer/map",
      },
      {
        label_: "Акции",
        icon: "pi pi-fw pi-ticket",
        to: "/customer/adv",
      },
      {
        label_: "Профиль",
        icon: "pi pi-fw pi-cog",
        to: "/customer/profile",
      },
      {
        label: "Продавец",
        icon: "pi pi-fw pi-wallet",
        to: "/staff",
      }
    ]);

    return { items };
  },
});
</script>
<style scoped>
#nav {
  position: absolute;
  height: 35px;
  bottom: 20px;
  left: 0px;
  right: 0px;
}
</style>