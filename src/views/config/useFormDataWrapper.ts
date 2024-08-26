import {
  computed, ref, WritableComputedRef, UnwrapRef,
} from 'vue';

export function useFormDataWrapper<T, DataFormat>(
  ClassType: new (data: DataFormat) => T,
  data: DataFormat,
): WritableComputedRef<T> {
  const entity = ref<UnwrapRef<T>>(new ClassType(data) as UnwrapRef<T>);

  const actualEntity = computed<T>({
    get: () => entity.value as T,
    set: (value: T) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      entity.value = new ClassType(value as unknown as DataFormat) as UnwrapRef<T>;
    },
  });

  return actualEntity;
}
