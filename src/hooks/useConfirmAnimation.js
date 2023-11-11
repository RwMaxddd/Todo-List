import { ref } from 'vue'

export function useConfirmAnimation() {
    const disabled = ref(false)

    function warnDisabled() {
        disabled.value = true
        setTimeout(() => {
            disabled.value = false
        }, 1500)
    }

    return { disabled, warnDisabled }
}