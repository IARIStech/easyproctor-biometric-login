<template>
    <div class="flex">
        <div :style="{ backgroundColor: color }" class="vs-loading__dot"></div>
        <div :style="{ backgroundColor: color }" class="vs-loading__dot"></div>
        <div :style="{ backgroundColor: color }" class="vs-loading__dot"></div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const Loading = defineComponent({
    props: {
        color: {
            type: String,
            default: 'white'
        }
    }
});

export default Loading;
</script>

<style>
@keyframes boucing {
    0% {
        transform: translateY(0)
    }
    20% {
        transform: translateY(-70%)
        
    }
    40% {
        transform: translateY(70%)
    }
    60% {
        transform: translateY(0)
    }
    100% {
        transform: translateY(0)
    }
}
.vs-loading__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: white;
    margin-right: 3px;
    animation-name: boucing;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
}
.vs-loading__dot:nth-child(2) {
    animation-delay: .2s;
}
.vs-loading__dot:last-child {
    margin-right: 0;
    animation-delay: .4s;
}
</style>