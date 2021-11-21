import 'reflect-metadata';
import { AbstractType, Type } from '../types/Type';

type Token<T = any> = Type<T> | AbstractType<T>;

export type InjectedField = {
    field: string;
    param1: Token | string;
    param2?: string;
};

export const InjectMetadataKey = Symbol('InjectedFields');

export function Inject(token: Token, qualifier?: string): (target: any, field: string) => void;
export function Inject(qualifier: string): (target: any, field: string) => void;
export function Inject(param1: Token | string, param2?: string): (target: any, field: string) => void {
    return function (target: any, field: string) {
        let injectedFields = Reflect.getMetadata(InjectMetadataKey, target) as Array<InjectedField>;
        if (!injectedFields) {
            injectedFields = [];
        }
        injectedFields.push({ field, param1, param2 });
        Reflect.metadata(InjectMetadataKey, injectedFields)(target);
    };
}