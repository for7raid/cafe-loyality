<template>
  <div class="grid formgrid" v-if="!user">
    <div class="field col-12 md-6 pr-md-6 pr-0">
      <div class="p-4">
        <div class="flex mb-3">
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
          </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex jc-between mt-3">
          <Skeleton width="4rem" height="2rem"></Skeleton>
          <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
      </div>
    </div>
  </div>

  <div v-if="user">
    <div class="text-center" v-if="!isAnonymous">Привет, {{ user.name }}!</div>
    <div class="text-center">
      У тебя <b>{{ user.ammount }}</b> койфейных зерен.
    </div>

    <div class="text-center">
      <img :src="qr" />
    </div>
    <div class="text-center">
      Покажи этот код бариста, чтобы начислить зерна оплатить ими часть заказа.
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/entities/User";
import { CurrentUserProvider } from "@/providers/CurrentUserProvider";
import { UserRepository } from "@/repositories/UserRepository";
import { defineComponent, inject, ref } from "vue";
const QRious = require("qrious");

export default defineComponent({
  setup() {
    const currentUserProvider = inject(
      "CurrentUserProvider"
    ) as CurrentUserProvider;
    const userRepository = inject("UserRepository") as UserRepository;

    const user = ref<User>();
    const qr = ref();

    const loadUser = async () => {
      user.value = await userRepository.findById(
        currentUserProvider.currentUserUid
      );
      qr.value = new QRious({
        value: currentUserProvider.currentUserUid,
        level: "H",
        padding: 25,
        size: 200,
      }).toDataURL("image/jpeg");
    };

    currentUserProvider.onAuthicated(loadUser);

    return {
      user,
      isAnonymous: currentUserProvider.isAnonymous,
      qr,
    };
  },
});
</script>