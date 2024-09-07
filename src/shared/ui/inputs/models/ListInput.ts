import { cloneDeep, forOwn, has } from 'lodash';
import type { InputFormAbstract } from '../components/input-form/model';

export interface IListInput<T> {
  items: Array<T>;
  allowValidate: boolean;

  add(item: T): void;
  remove(item: T): void;
  isValid(): boolean;
  canValidate: boolean;
}

export class ListInput<T extends Record<string, InputFormAbstract>> implements IListInput<T> {
  items: Array<T>;

  allowValidate = false;

 private readonly defaultItem: T;

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

 getValue() {
   return this.items
     .map((inputRow) => Object
       .fromEntries(Object
         .entries(inputRow)
         .map(
           ([key, item]) => {
             if (has(item, 'allowValidate')) return [key, item?.getValue()];
             return [key, item];
           },
         )));
 }

 private getItemForCreate(): T {
   const cleanedItem: T = cloneDeep(this.items[0]);

   forOwn(cleanedItem, (item: InputFormAbstract) => {
     item.resetValue();
   });

   return this.defaultItem || cleanedItem;
 }
}
