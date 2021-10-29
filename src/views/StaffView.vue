<template>
  <div>
    <div v-if="user">
      <div>У покупателя {{ user.ammount }} кофейных зерен</div>

      <div class="p-fluid">
        <div class="p-field">
          <label>Сумма чека</label>
          <InputNumber v-model="checkTotal" />
        </div>
        <div class="p-field">
          <label>Списать зерен</label>
          <InputNumber v-model="creditAmmount" />
        </div>
      </div>

      <Button
        icon="pi pi-wallet"
        iconPos="right"
        class="p-button-success"
        label="Закрыть чек"
        @click="makeTransaction"
      />
      <Button
        icon="pi pi-times"
        iconPos="right"
        class=""
        label="Отмена"
        @click="cancel"
      />
    </div>

    <div v-show="!user">
      <div class="text-center">Отсканируйте QR код клиента</div>
      <div id="reader"></div>
    </div>
    <Toast />
  </div>
</template>

<script lang="ts">
import { User, UserId } from "@/entities/User";
import { UserTransactionHistoryItem } from "@/entities/UserTransactionHistoryItem";
import { CurrentUserProvider } from "@/providers/CurrentUserProvider";
import { TransactionRepository } from "@/repositories/TransactionRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { defineComponent, inject, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

export default defineComponent({
  setup() {
    const toast = useToast();
    const currentUserProvider = inject(
      "CurrentUserProvider"
    ) as CurrentUserProvider;
    const userRepository = inject("UserRepository") as UserRepository;
    const transactionRepository = inject(
      "TransactionRepository"
    ) as TransactionRepository;
    const customerId = ref<UserId | null>("DQmNI4As5sUgM58XoeiQnEh4QSa2");
    const user = ref<User | null>();

    const checkTotal = ref(0);
    const creditAmmount = ref(0);

    const loadCustomer = async () => {
      checkTotal.value = 0;
      creditAmmount.value = 0;
      if (!customerId.value) {
        user.value = null;
      } else {
        user.value = await userRepository.findById(customerId.value);
      }
    };

    const cancel = () => {
      checkTotal.value = 0;
      creditAmmount.value = 0;
      user.value = null;
      customerId.value = null;
      startQr();
    };

    const makeTransaction = async () => {
      if (checkTotal.value <= 0) {
        toast.add({
          severity: "error",
          summary: "Сумма",
          detail: "Неверная сумма чека",
          life: 3000,
        });
        return;
      }

      if (creditAmmount.value > user.value!.ammount) {
        toast.add({
          severity: "error",
          summary: "Списание",
          detail: "Сумма для списания не может быть больше зерен клиента",
          life: 3000,
        });
        return;
      }

      const tr = new UserTransactionHistoryItem();
      tr.customerId = user.value!.uid;
      tr.staffId = currentUserProvider.currentUserUid;
      tr.total = checkTotal.value;
      tr.debit = Math.floor(checkTotal.value * 0.01);
      tr.credit = creditAmmount.value;
      tr.date = new Date();
      tr.ammount = user.value!.ammount + tr.debit;
      user.value!.ammount = tr.ammount;

      await userRepository.save(user.value!);
      await transactionRepository.save(tr);

      cancel();
    };

    //loadCustomer();

    let html5QrCode: Html5Qrcode;

    const onScanSuccess = async (decodedText: any, decodedResult: any) => {
      customerId.value = decodedText;
      await stopQr();
      await loadCustomer();
      if (!user.value) {
        toast.add({
          severity: "error",
          summary: "Не найден",
          detail: "Клиент не найден",
          life: 3000,
        });
        cancel();
      }
    };

    const startQr = async () => {
      const config = { fps: 10, qrbox: { width: 200, height: 200 } };
      await stopQr();
      if (html5QrCode.getState() == Html5QrcodeScannerState.PAUSED) {
        html5QrCode.resume();
        return;
      } else if (
        html5QrCode.getState() == Html5QrcodeScannerState.NOT_STARTED
      ) {
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          onScanSuccess,
          undefined
        );
      }
    };

    const stopQr = async () => {
      if (html5QrCode.getState() == Html5QrcodeScannerState.SCANNING) {
        html5QrCode.pause();
      }
    };

    onMounted(() => {
      html5QrCode = new Html5Qrcode("reader", undefined);
      startQr();
    });

    return {
      customerId,
      user,
      checkTotal,
      creditAmmount,
      makeTransaction,
      cancel,
    };
  },
});
</script>

<style scoped>
#reader {
  height: 40px;
  width: 300px;
}
</style>