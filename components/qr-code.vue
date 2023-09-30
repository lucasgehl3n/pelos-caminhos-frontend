<script setup>
import QRCode from 'qrcode';
const props = defineProps({
    text: String,
});

const generateQR = async text => {
    try {
        console.log(await QRCode.toDataURL(text))
    } catch (err) {
        console.error(err)
    }
}

const qr = ref('');
onMounted(() => {
    if (props.text) {
        qr.value = generateQR(props.text);
    }
});
</script>

<template>
    <img src="qr" />
</template>
