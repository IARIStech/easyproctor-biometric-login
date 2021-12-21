<template>
    <Modal :isOpened="isOpened">
        <div class="flex flex-col items-center p-7">
            <Icon :icon="icon" color="var(--primary-color)" size="33px" class="mb-5"/>
            <h2 class="text-xl font-medium mb-2">{{ title }}</h2>
            <p v-html="message"></p>
            <p class="alert__detail" v-if="detail.length"><small>{{ detail }}</small></p>
        </div>

        <!-- Error Footer -->
        <footer class="w-full border-t border-gray-200 flex">
            <button class="outline-none h-16 flex items-center justify-center flex-1" @click="isOpened = false" v-if="actions.length == 0">
                Ok
            </button>
            <template v-else>
                <button v-for="(option, index) in actions"
                        class="outline-none h-16 flex items-center justify-center flex-1 border-l first:border-l-0 border-gray-200"
                        :class="{'font-medium text-primary': option.primary}"
                        :key="index"
                        @click="loadAction(option.action)" >
                    {{ option.title }}
                </button>
            </template>
        </footer>
    </Modal>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Modal from './Modal.vue';
import Icon from './Icon.vue';
import { alert } from '@/assets/icons';

interface Option {
    title: string;
    action?: (args?: any) => void;
    primary?: boolean;
}

const Alert = defineComponent({
    components: { Modal, Icon },
    setup() {
        const actions = ref<Option[]>([]);

        const icon = ref('alert');
        const title = ref('Opss...');
        const message = ref('');
        const isOpened = ref(false);
        const detail = ref('');

        const displayAlert = (options: { title?: string; message: string; actions?: Option[]; icon?: string; detail?: string}) => {
            actions.value = options.actions || [];
            icon.value = options.icon || alert;
            title.value = options.title || "Opss...";
            message.value = options.message;
            detail.value = options.detail || '';
            isOpened.value = true;
        };

        const loadAction = (action?: () => void) => {
            isOpened.value = false;
            setTimeout(() => {
                if(action != null) {
                    action();
                }
            }, 300);
        };

        return { icon, title, message, isOpened, detail, loadAction, displayAlert, actions };
    }
});

export default Alert;
</script>

<style>

</style>