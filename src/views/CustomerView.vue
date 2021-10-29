<template>
  <div class="text-center"><h2>Сеть кафе "Аромат"</h2></div>
  <div id="main"><router-view /></div>
  <Navigation />
</template>

<script>
import { defineComponent, ref } from "vue";
import Navigation from "@/components/customer/Navigation.vue";

export default defineComponent({
  components: { Navigation },
});
</script>
<style scoped>
#main {
  position: absolute;
  bottom: 55px;
  top: 55px;
  left: 0px;
  right: 0px;
  overflow-y: auto;
}
</style>