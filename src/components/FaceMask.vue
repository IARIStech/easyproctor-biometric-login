<template>
    <!-- Mascara -->
    <div class="w-full h-full absolute top-0 right-0 bg-white bg-opacity-70 facial-biometry__mask"></div>

    <!-- Frame -->
    <div class="absolute w-full h-3/5 bg-primary biometry__frame"/>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const FaceMask = defineComponent({
});

export default FaceMask;
</script>

<style>
.facial-biometry__mask {
    mask-image: url('~@/assets/biometry/square.svg'), url('~@/assets/biometry/face-mask.svg');
    mask-size: cover, auto 60%;
    mask-repeat: no-repeat;
    mask-position: center, center;
    mask-composite: subtract;

    -webkit-mask-image: url('~@/assets/biometry/square.svg'), url('~@/assets/biometry/face-mask.svg');
    -webkit-mask-size: cover, auto 60%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center, center;
    -webkit-mask-composite: source-out;
}
.biometry__frame {
    mask-image: url("~@/assets/biometry/face-frame.svg");
    mask-size: auto 100%;
    mask-position: center;
    mask-repeat: no-repeat;

    -webkit-mask-image: url("~@/assets/biometry/face-frame.svg");
    -webkit-mask-size: auto 100%;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
}
</style>