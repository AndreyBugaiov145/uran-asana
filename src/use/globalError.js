import {onErrorCaptured, ref} from 'vue';

export function useGlobalError() {
    const isError = ref(false)
    onErrorCaptured(() => {
        isError.value = true ;
        return false;
    });

    return {isError}
}
