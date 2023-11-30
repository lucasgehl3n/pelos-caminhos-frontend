<script setup>
import QRCode from "qrcode";
import { Button } from "flowbite-vue";

const props = defineProps({
  text: String,
});

const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};
const textQRCode = computed(() => props.text || window.location.href);
const qr = ref("");
onMounted(() => {
  if (textQRCode.value) {
    generateQR(textQRCode.value).then((response) => {
      if (response) qr.value = response;
    });
  }
});

const share = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Pelos caminhos",
        text: "Instituição tal",
        url: props.text,
      })
      .catch((error) => console.log("Error sharing", error));
  }
};
</script>

<template>
  <img :src="qr" />
  <div class="w-40 ml-3 sm:ml-0 sm:text-center">
    <Button color="default" v-on:click="share">{{ $t("share") }}</Button>
  </div>
</template>
