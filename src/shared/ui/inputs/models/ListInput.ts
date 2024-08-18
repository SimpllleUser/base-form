import { cloneDeep, forOwn } from 'lodash';
import type { ABaseInput } from '../../../../shared/ui/inputs/models/BaseInput';

export interface IListInput<T> {
  items: Array<T>;
  allowValidate: boolean;

  add(item: T): void;
  remove(item: T): void;
  isValid(): boolean;
  canValidate: boolean;
}

export class ListInput<T extends Record<string, ABaseInput>> implements IListInput<T> {
  items: Array<T>;

  allowValidate = false;

  defaultItem: T;

  constructor(data: Array<T>, defaultItem: T) {
    this.items = data;
    this.defaultItem = defaultItem;
  }

  add(): void {
    this.items.push(cloneDeep(this.defaultItem));
  }

  remove(item: T): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

  isValid(): boolean {
    return this.items
      .map(item => Object.values(item)
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

  resetValue() {
    this.items
      .flat()
      .forEach((row) => {
        forOwn(row, (item) => {
          item.resetValue();
        });
      });
  }

  private getItemForCreate(): T {
    const cleanedItem: T = cloneDeep(this.items[0]);

    forOwn(cleanedItem, (item: ABaseInput) => {
      item.resetValue();
    });

    return this.defaultItem || cleanedItem;
  }
}
