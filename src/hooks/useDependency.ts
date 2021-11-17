import { DependencyContainer } from '../utils/DependencyContainer';
import { AbstractType, Type } from '../types/Type';

type Token<T = any> = Type<T> | AbstractType<T> | undefined;

export function useDependency<T> (token: Token<T>, qualifier?: string): T;
export function useDependency<T = any> (qualifier: string): T;

export function useDependency <T> (param1: Token<T> | string, param2?: string): T | undefined {
    if (typeof param1 === 'string') {
        return DependencyContainer.getDependency(param1);
    } else {
        return DependencyContainer.getDependency(param1, param2);
    }
};
