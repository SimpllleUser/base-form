import type { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

export interface IListInput<T> {
  items: Array<T>;
  allowValidate: boolean;

  add(item: T): void;
  remove(item: T): void;
  isValid(): boolean;
  canValidate: boolean;
}

export class ListInput<T> {
  items: Array<T>

  allowValidate = false

  constructor(data: Array<T>) {
    this.items = data;
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

  isValid() {
    return this.items
      .map(item => Object.values(item as unknown as Record<string, ABaseInput>)
        .every((input) => input.isValid()))
      .every(Boolean);
  }

  set canValidate(value: boolean) {
    this.allowValidate = value;
    this.items
      .forEach(item => Object.values(item)
        .forEach((input) => {
          (input as ABaseInput).canValidate = value;
        }));
  }
}
