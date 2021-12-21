<template>
    <div class="w-full h-screen flex flex-col items-center justify-center relative" ref="biometryContentRoot">
        
        <!-- Camera -->
        <div class="w-full h-full">
            <video class="w-full h-full"
                   style="transform: scale(-1,1)"
                   ref="camera"
                   autoplay playsinline muted/>
            <canvas ref="cameraPlaceholder" style="display: none"></canvas>
        </div>

        <img :src="picture" v-if="picture.length"
             class="w-full h-full absolute object-contain"
             style="transform: scale(-1,1)"/>

        <slot/>

        <!-- Tituto -->
        <div class="absolute top-0 my-4 px-5 text-center flex flex-col items-center justify-center rounded-xl"
             :class="{'bg-white bg-opacity-60': maskText}">
            <h1 class="text-3xl font-bold mb-2">{{ title }}</h1>
            <p>{{ subtitle }}</p>
        </div>

        <!-- Options -->
        <div class="absolute bottom-10 flex items-center">

            <transition name="fade" mode="out-in">
                
                <div v-if="picture.length == 0" key="1" class="flex items-center">
                    <!-- Tirar a foto -->
                    <button class="cursor-pointer mx-5 w-12 h-12 rounded-full flex items-center justify-center bg-primary"
                            @click="() => takePicture()">
                        <img :src="cameraIcon" class="w-6"/>
                    </button>
                </div>

                <div v-else-if="!loading" key="2" class="flex items-center">
                    <!-- Confirmar -->
                    <button class="mx-5 w-12 h-12 rounded-full flex items-center justify-center bg-red-500"
                            @click="picture = ''">
                        <img :src="error" class="w-4"/>
                    </button>
                    <button class="mx-5 w-12 h-12 rounded-full flex items-center justify-center bg-primary" @click="checkBiometry">
                        <img :src="iconCheck" class="w-4"/>
                    </button>
                </div>

                <div v-else key="3">
                    <!-- Carregando -->
                    <div class="mx-5 w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                        <Loading/>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { error, iconCheck, camera as cameraIcon } from '@/assets/icons';
import Loading from '@/components/Loading.vue';

const TakePicture = defineComponent({
    components: { Loading },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Validação facial'
        },
        subtitle: {
            type: String,
            default: 'Encaixe seu rosto no formato e clique no botão abaixo'
        },
        maskText: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const camera = ref<HTMLVideoElement | null>(null);
        const cameraPlaceholder = ref<HTMLCanvasElement | null>(null);

        const picture = ref('');
        
        const startCapture = () => {
            const cameraContainer = camera.value as HTMLVideoElement;

            // eslint-disable-next-line no-undef
            const constraints: MediaStreamConstraints = {
                audio: false,
                video: {
                    facingMode: 'user',
                    aspectRatio: 1.777777778,
                    width: { min: 640, ideal: 1920, max: 1920 },
                    height: { min: 400, ideal: 1080 },
                }
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then((media: MediaStream) => {
                    cameraContainer.srcObject = media;
                    cameraContainer.play();
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const takePicture = () => {
            const cameraContainer = camera.value as HTMLVideoElement;
            const canvas = cameraPlaceholder.value as HTMLCanvasElement;
            canvas.width = cameraContainer.videoWidth;
            canvas.height = cameraContainer.videoHeight;

            canvas.getContext('2d')!.drawImage(cameraContainer, 0, 0, cameraContainer.videoWidth, cameraContainer.videoHeight);
            picture.value = canvas!.toDataURL('image/jpg');
        };

        const checkBiometry = () => {
            if(props.loading)
                return;
            context.emit('checkbiometry', { picture: picture.value, reset: () => picture.value = '' } );
        };

        onMounted(() => startCapture());

        onBeforeUnmount(() => {
            const cameraContainer = camera.value as HTMLVideoElement;
            const stream = cameraContainer.srcObject as MediaStream;

            stream.getTracks().forEach(el => {
                el.stop();
            });

            cameraContainer.srcObject = null;
        });

        return { camera, picture, takePicture, cameraPlaceholder, checkBiometry, error, iconCheck, cameraIcon };
    }
});

export default TakePicture;
</script>

<style>

</style>