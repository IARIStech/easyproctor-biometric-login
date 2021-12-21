import { Plugin, createApp } from 'vue';
import MediaPermissionModal from '@/components/MediaPermissionModal.vue';

let useMediaPermissions: () => (() => Promise<boolean>);

const alert: Plugin = {
    install: () => {
        const mediaPermission = createApp(MediaPermissionModal).mount(document.body.appendChild(document.createElement('div')));
        useMediaPermissions = () => (mediaPermission as any).checkPermissions;
    }
};

export { useMediaPermissions };

export default alert;