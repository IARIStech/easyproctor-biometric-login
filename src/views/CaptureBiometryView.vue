<template>
    <div class="w-full h-screen relative">
        <TakePicture
            @checkbiometry="check"
            :loading="loading"
            title="Cadastro de biometria facial"
            subtitle="Encaixe seu rosto no formato e clique no botão abaixo"
        >
            <FaceMask />
        </TakePicture>

        <Modal v-model:isOpened="modalOpened" width="24rem">
            <div class="h-72 flex overflow-hidden relative">
                <Transition name="slide">
                    <div
                        class="w-full h-full flex flex-col items-center justify-between p-9 flex-shrink-0"
                        v-if="modalPageIndex == 0"
                    >
                        <div class="h-32 flex items-center justify-center">
                            <img :src="captureIllustration1" class="h-full" />
                        </div>
                        <p class="text-sm">
                            É necessario realizar a captura da sua face antes de
                            prosseguirmos, esteja atento às instruções que aparecerão na tela
                            e execute a ação solicitada.
                        </p>
                    </div>

                    <div
                        class="w-full h-full flex flex-col items-center justify-between p-9 flex-shrink-0"
                        v-else-if="modalPageIndex == 1"
                    >
                        <div class="h-32 flex items-center justify-center">
                            <img :src="captureIllustration2" class="h-full" />
                        </div>
                        <p class="text-sm">
                            Tente encaixar o seu rosto no formato indicado na tela. Não
                            utilize óculos, boné ou adornos que possam interferir no
                            reconhecimento facial.
                        </p>
                    </div>

                    <div
                        class="w-full h-full flex flex-col items-center justify-between p-9 flex-shrink-0"
                        v-else-if="modalPageIndex == 2"
                    >
                        <div class="h-32 flex items-center justify-center">
                            <img :src="captureIllustration3" class="h-full" />
                        </div>
                        <p class="text-sm">
                            Após realizar a captura, confira a foto e confirme para finalizar
                            o seu cadastro.
                        </p>
                    </div>
                </Transition>

                <div class="absolute w-full flex justify-center bottom-3">
                    <div
                        class="w-1 h-1 rounded-full bg-gray-200 ml-1"
                        :class="{ 'bg-primary': modalPageIndex == 0 }"
                    ></div>
                    <div
                        class="w-1 h-1 rounded-full bg-gray-200 ml-1"
                        :class="{ 'bg-primary': modalPageIndex == 1 }"
                    ></div>
                    <div
                        class="w-1 h-1 rounded-full bg-gray-200 ml-1"
                        :class="{ 'bg-primary': modalPageIndex == 2 }"
                    ></div>
                </div>
            </div>
            <!-- Footer -->
            <div class="w-full border-t border-neutral-2">
                <button
                    class="outline-none h-16 flex items-center justify-center w-full"
                    @click="
                        modalPageIndex == 2 ? (modalOpened = false) : (modalPageIndex += 1)
                    "
                >
                    {{ modalButtonText }}
                </button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useAlert } from "@/hooks/alert";
import { useRoute, useRouter } from "vue-router";
import { removeCpfMask } from "@/utils/stringFunctions";
import { useMediaPermissions } from "@/hooks/mediaPermission";
import {
    captureIllustration1,
    captureIllustration2,
    captureIllustration3,
} from "@/assets/img";

import UpdateBiometryDTO from "@/dtos/UpdateBiometryDTO";
import TakePicture from "@/components/TakePicture.vue";
import Modal from "@/components/Modal.vue";
import UserService from "@/services/UserService";
import FaceMask from "@/components/FaceMask.vue";

const CaptureBiometryView = defineComponent({
    components: { TakePicture, Modal, FaceMask },
    setup() {
        const alert = useAlert();
        const { replace, go } = useRouter();
        const permissions = useMediaPermissions();
        const route = useRoute();

        const loading = ref(false);
        const modalOpened = ref(true);
        const modalPageIndex = ref(0);

        const modalButtonText = computed(() => {
            switch (modalPageIndex.value) {
                case 0:
                    return "Continuar";
                case 1:
                    return "Próximo";
                case 2:
                    return "Iniciar captura";
                default:
                    return "";
            }
        });

        var cpf = route.params.userCPF.toString();

        const check = async (data: { picture: string; reset: () => void }) => {
            try {

                const granted = await permissions();
                if (!granted) {
                    throw "Para continuar você precisa conceder as permissões";
                }

                loading.value = true;
                const picture = data.picture.substr(22, data.picture.length);

                const dataToSend: UpdateBiometryDTO = {
                    faceImage: picture,
                    cpf: removeCpfMask(cpf),
                };

                const [request] = UserService.UpdateUserFace(dataToSend);
                const resp = await request;

                replace({ name: process.env.VUE_APP_REDIRECT_URL });
            } catch (error) {
                console.log(error)
                loading.value = false;
                alert({
                    message: error as string,
                    actions: [
                        {
                            title: "Voltar",
                            action: () => go(-1),
                        },
                        {
                            title: "Tentar novamente",
                            primary: true,
                            action: () => data.reset(),
                        },
                    ],
                });
            }
        };

        return {
            loading,
            check,
            modalOpened,
            modalPageIndex,
            modalButtonText,
            captureIllustration1,
            captureIllustration2,
            captureIllustration3,
        };
    },
});

export default CaptureBiometryView;
</script>

<style>
.slide-enter-from,
.slide-leave-from {
  transform: translateX(0);
}
.slide-enter-to,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
</style>
