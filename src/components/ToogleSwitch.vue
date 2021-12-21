<template>
    <div class="w-14 h-8 rounded-full flex items-center  cursor-pointer transition-colors duration-200"
         style="padding: 0 2px"
         :style="{'background-color': modelValue ? activeColor : '#E8E8E8'}"
         :class="{'--switch-on': modelValue}"
         @click.stop="clicked(); $emit('pressed')">
        <div class="w-7 h-7 bg-white rounded-full shadow-md switch__circle transition-all duration-200">

        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const ToogleSwitch = defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            required: true
        },
        activeColor: {
            type: String,
            default: 'var(--primary-color)'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const clicked = () => {
            if(!props.disabled) {
                context.emit("update:modelValue", !props.modelValue);
            }
        };

        return { clicked };
    }
});

export default ToogleSwitch;
</script>

<style>
.--switch-on .switch__circle {
    margin-left: calc(50% - 2px);
}

</style>