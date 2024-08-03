import { Ref, ref } from 'vue';
import { DefaultFormConfig  } from '@/shared/ui/form/composables/types';


export function useForm<T = DefaultFormConfig>(config: T): { form: Ref<T> } {
    const form = ref<T>(config)
    /// validate
    /// get value
    /// reset

    return {
        form,
    }
}
