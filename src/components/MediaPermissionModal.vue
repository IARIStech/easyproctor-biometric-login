<template>
    
    <Modal :isOpened="isOpened" width="430px">
        <div class="flex flex-col items-center p-7">
            <Icon :icon="video" color="var(--primary-color)" size="40px" class="mb-5"/>
            <h2 class="text-xl font-medium mb-4">Permitir uso da câmera e seu microfone</h2>
            <p>Precisamos da sua permissão para ativar a câmera e o microfone.</p>
            <p class="font-medium mb-7">Na mensagem aberta pelo seu navegador:</p>
            <p class="text-lg">Selecione <b class="font-medium text-primary">Permitir</b></p>

        </div>
    </Modal>

    <Modal :isOpened="cameraLockedModalOpened" width="430px">
        <div class="flex flex-col p-7">
            <Icon :icon="videoLock" color="var(--primary-color)" size="40px" class="mb-5 self-center"/>
            <h2 class="text-xl font-medium mb-4">Sua câmera está bloqueada</h2>
            <p class="mb-4 text-left">Precisamos ter acesso à câmera para realizar a sua validação facial. Para ativá-la:</p>

            <ul class="text-left list-disc list-inside text-sm text-neutral-black">
                <li>Clique no ícone de câmera bloqueada</li>
                <li>Selecione <b>Sempre Permitir</b></li>
                <li>Em seguida atualize esta página</li>
            </ul>
        </div>
        <button class="outline-none h-16 flex items-center justify-center flex-1  border-t border-gray-200 w-full"
                @click="goBack">
            Voltar
        </button>
    </Modal>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import Icon from '@/components/Icon.vue';
import { video, videoLock } from '@/assets/icons';
const MediaPermissionModal = defineComponent({
    components: { Modal, Icon },
    setup() {
        const isOpened = ref(false);
        const cameraLockedModalOpened = ref(false);
        
        const permissionStatus = ref<'none' | 'granted' | 'notGranted'>('none');
        
        const checkPermissions = async () => {
            permissionStatus.value = 'none';

            setTimeout(() => {
                if(permissionStatus.value == 'none') {
                    isOpened.value = true;
                }
            }, 3000);

            const constraints = {
                audio: true, 
                video: true
            };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                stream.getTracks().forEach(el => {
                    el.stop();
                });
                permissionStatus.value = 'granted';
                isOpened.value = false;
                return true;

            } catch (error) {
                permissionStatus.value = 'notGranted';
                isOpened.value = false;
                cameraLockedModalOpened.value = true;
                return false;
            }
        };

        const goBack = () => {
            cameraLockedModalOpened.value = false;
        };

        return { isOpened, cameraLockedModalOpened, checkPermissions, permissionStatus, goBack, video, videoLock };
    }
});

export default MediaPermissionModal;
</script>

<style>

</style>