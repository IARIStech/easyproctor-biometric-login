<template>
    <!-- Mascara -->
    <div class="w-full h-full absolute top-0 right-0 bg-white bg-opacity-70 facial-biometry__square-mask"></div>

    <!-- Frame -->
    <div class="absolute w-full bg-primary biometry__square" style="height: 79%"/>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const FaceMask = defineComponent({
});

export default FaceMask;
</script>

<style>
.facial-biometry__square-mask {
    mask-image: url('~@/assets/biometry/square.svg'), url('~@/assets/biometry/selfie-mask.svg');
    mask-size: cover, auto 79%;
    mask-repeat: no-repeat;
    mask-position: center, center calc(100% - 30px);
    mask-composite: subtract;

    -webkit-mask-composite: source-out;
}
.biometry__square{
    mask-image: url("~@/assets/biometry/selfie-frame.svg");
    mask-size: auto 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    bottom: 30px;
}
</style>