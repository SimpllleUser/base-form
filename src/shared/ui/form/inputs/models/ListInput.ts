import { cloneDeep } from 'lodash';
import type { ABaseInput } from '../../../../../shared/ui/form/inputs/models/BaseInput';

export interface IListInput<T> {
  items: Array<T>;
  allowValidate: boolean;

  add(item: T): void;
  remove(item: T): void;
  isValid(): boolean;
  canValidate: boolean;
}

type InputListItemDefaultType = Record<string, ABaseInput>

export class ListInput {
  items: Array<InputListItemDefaultType>

  allowValidate = false

  defaultItem: Record<string, ABaseInput> | null = null

  constructor(data: Array<Record<string, ABaseInput>>, defaultItem: Record<string, ABaseInput> | null) {
    this.items = data;
    this.defaultItem = defaultItem;
  }

  add(): void {
    this.items.push(this.getItemForCreate());
  }

  remove(item: Record<string, ABaseInput>): void {
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

  private getItemForCreate() {
    const cleanedItem: InputListItemDefaultType = cloneDeep(this.items[0]);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in cleanedItem) {
      const item: ABaseInput = cleanedItem[key];
      if (item) {
        item.resetValue();
      }
    }
    return this.defaultItem || cleanedItem;
  }
}
