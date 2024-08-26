import { cloneDeep, forOwn, has } from 'lodash';
import type { ABaseInput } from './BaseInput';
import { BaseInput } from '@/shared/ui/inputs';

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

 private readonly defaultItem: T;

 constructor(data: Array<T>, defaultItem: T) {
   this.items = data;
   this.defaultItem = defaultItem;
 }

 add(): void {
   const item = Object.assign(cloneDeep(this.defaultItem), { key: this.items.length });
   this.items.push(item);
 }

 remove(item: T): void {
   this.items.splice(this.items.indexOf(item), 1);
 }

 isValid(): boolean {
   return this.items
     ?.map(item => Object.values(item)
       ?.every((input) => input?.isValid && input?.isValid()))
     ?.every(Boolean) || false;
 }

 set canValidate(value: boolean) {
   this.allowValidate = value;
   this.items
     .forEach(item => {
       forOwn(item, (input) => {
         if (has(input, 'allowValidate')) {
           input.canValidate = value;
         }
       });
     });
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
