<template>
  <h2 class="text-center">Профиль</h2>
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
    <div><b>Баланс зерен: </b>{{ user.ammount }}</div>
    <div v-if="isAnonymous">
      <p>Войди или зарегестрируйся, чтобы не потерялть свои зерна</p>
      <div class="text-center">
        <Button label="Войти" />
      </div>
    </div>
    <DataView layout="list" :value="transactions">
      <template #header> История зерен</template>
      <template #list="{ data }">
        <div class="col-12">
          <div>
            Когда: {{ dateFormat(data.date) }}
          </div>
          <div>Начислено: {{ data.debit }}, списано {{data.credit}} зерен</div>
          <div>Сумма чека {{data.total}} рублей</div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts">
import { User } from "@/entities/User";
import { UserTransactionHistoryItem } from "@/entities/UserTransactionHistoryItem";
import { CurrentUserProvider } from "@/providers/CurrentUserProvider";
import { UserRepository } from "@/repositories/UserRepository";
import { TransactionRepository } from "@/repositories/TransactionRepository";

import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  setup() {
    const currentUserProvider = inject(
      "CurrentUserProvider"
    ) as CurrentUserProvider;
    const userRepository = inject("UserRepository") as UserRepository;
    const transactionRepository = inject(
      "TransactionRepository"
    ) as TransactionRepository;

    const user = ref<User>();
    const transactions = ref<UserTransactionHistoryItem[]>();

    const loadUser = async () => {
      user.value = await userRepository.findById(
        currentUserProvider.currentUserUid
      );
      transactions.value = await transactionRepository.getByCustomerId(
        currentUserProvider.currentUserUid
      );
    };

    currentUserProvider.onAuthicated(loadUser);

  const dateFormat = (value: Date) => {
      return value.toLocaleString("ru-RU", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
    };


    return {
      user,
      transactions,
      isAnonymous: currentUserProvider.isAnonymous,
      dateFormat
    };
  },
});
</script>