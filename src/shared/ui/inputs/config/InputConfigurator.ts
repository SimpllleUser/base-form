import { forOwn } from 'lodash';

type InputDataItem = Record<string, CallableFunction>

export class InputConfigurator<T> {
  private static instance: InputConfigurator<any>

   private readonly inputs!: T

   constructor(inputs: T) {
     if (InputConfigurator.instance) {
       return;
     }
     this.inputs = inputs;
     InputConfigurator.instance = this;
   }

   addInput(input: InputDataItem) {
     forOwn(input, (value, key) => {
       InputConfigurator.instance.inputs[key] = value;
     });
   }

   getInputs() {
     return this.inputs;
   }
}
