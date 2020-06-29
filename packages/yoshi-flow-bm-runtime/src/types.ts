import { BusinessManagerModule } from '@wix/business-manager-api';
import { IBMModuleParams } from './moduleParams';

export interface ModuleInitOptions {
  module: BusinessManagerModule;
  moduleParams: IBMModuleParams;
}

export type ModuleInitFn = (this: any, options: ModuleInitOptions) => void;

export interface MethodOptions {
  module: BusinessManagerModule;
  moduleParams: IBMModuleParams;
}

export type MethodFn = (
  this: any,
  options: MethodOptions,
  ...args: Array<any>
) => any;
