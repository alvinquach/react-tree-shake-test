import { DependencyContainer } from '../utils/DependencyContainer';

export function useDependency<T> (type: { name: string }, qualifier?: string): T;
export function useDependency<T> (qualifier: string): T;

export function useDependency <T> (param1: { name: string } | string, param2?: string): T | undefined {
    if (typeof param1 === 'string') {
        return DependencyContainer.getDependency(param1);
    } else {
        return DependencyContainer.getDependency(param1, param2);
    }
};
