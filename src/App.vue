<template>
    <RouterView #default="{Component}">
        <Transition name="fade" mode="out-in">
            <component :is="Component"/>
        </Transition>
    </RouterView>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const App = defineComponent({
});

export default App;
</script>

<style>

</style>