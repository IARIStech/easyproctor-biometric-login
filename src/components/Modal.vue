<template>
    <transition name="fade">
        <div class="fixed top-0 right-0 w-full h-screen z-50 bg-black bg-opacity-40 flex items-center justify-center" v-if="isOpened" @click.self="canClose ? $emit('update:isOpened', false) : null">
            <transition name="modalAppear" appear>
                <div class="bg-white rounded-xl text-center" style="max-width: calc(100%-40px)" :style="{width: width}">
                    <slot/>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const Modal = defineComponent({
    props: {
        isOpened: {
            type: Boolean,
            default: false
        },
        canClose: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: '340px'
        }
    }
});

export default Modal;
</script>

<style>

</style>