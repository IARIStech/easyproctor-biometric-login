<template>
    <button class="flex items-center justify-center rounded-md font-medium disabled:bg-neutral-2 disabled:cursor-not-allowed"
            @click="$emit('pressed')"
            :class="type">
        <slot/>
    </button>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

const Button = defineComponent({
    props: {
        type: {
            type: String as PropType<'primary' | 'hollow'>,
            default: 'primary'
        }
    }
});

export default Button;
</script>

<style>

</style>