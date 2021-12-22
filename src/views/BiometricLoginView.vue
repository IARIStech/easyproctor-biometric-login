<template>
    <TakePicture @checkbiometry="check" :loading="loading">
        <FaceMask/>
    </TakePicture>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import TakePicture from '@/components/TakePicture.vue';
import { useAlert } from "@/hooks/alert";
import { useRoute, useRouter } from 'vue-router';
import UserService from "@/services/UserService";
import FaceMask from '@/components/FaceMask.vue';

const BiometricLoginView = defineComponent({
    components: { TakePicture, FaceMask },
    setup() {
        
        const alert = useAlert();
        const { replace, go } = useRouter();
        const route = useRoute();

        const loading = ref(false);

        var cpf = route.params.userCPF.toString();

        const check = (data: { picture: string; reset: () => void}) => {
            loading.value = true;

            const [ request ] = UserService.Login({ emailOrCpf: cpf.replace(new RegExp("[.-]", "gi"), ''), key: data.picture.substr(22, data.picture.length) });
            request
                .then(resp => {
                    replace({ name: process.env.VUE_APP_LOGIN_REDIRECT_URL });
                })
                .catch((error) => {
                    loading.value = false;
                    data.reset();
                    alert({
                        message: error,
                        actions: [
                            {
                                title: "Voltar",
                                action: () => go(-1)
                            },
                            {
                                title: "Tentar novamente",
                                primary: true
                            }
                        ]
                    });
                })
               
        };

        return { loading, check };
    }
});

export default BiometricLoginView;
</script>

<style>

</style>