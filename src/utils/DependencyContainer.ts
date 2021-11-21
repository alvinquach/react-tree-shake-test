import { AbstractType, Type } from '../types/Type';

type Token<T = any> = Type<T> | AbstractType<T>;

type DependencyDefinition<T = any> =
    /**
     * Concrete class dependencies can be declared using the class itself if no
     * qualifier or explicit value is needed.
     */
    Type<T> |
    /**
     * Concrete class dependencies can also be declared with optional qualifier
     * and/or explicit value.
     */
    {
        token: Type<T>,
        qualifier?: string,
        value?: T
    } |
    /**
     * Abstract class dependencies must be declared with an explicit value.
     * Qualifier is still optional.
     */
    {
        token: AbstractType<T>,
        qualifier?: string,
        value: T
    } |
    /**
     * Other dependencies must be declared with a qualifier and explicit value.
     */
    {
        token?: undefined,
        qualifier: string,
        value: T
    };

abstract class Class1 {
    field = 'field';
}

class Class2 extends Class1 {}

export class DependencyContainer {

    private static readonly _DefaultQualifier = 'default';

    private static readonly _Dependencies = new Map<Token | undefined, Record<string, any>>();

    static readonly InjectablePropertiesMap = new Map<Token, Record<string, any>>();

    static test() {
        this._registerDependency(Class1, new Class2());
    }

    static registerDependencies(...dependenciesDefinitions: Array<DependencyDefinition>) {
        for (const dependencyDefinition of dependenciesDefinitions) {
            if (typeof dependencyDefinition === 'function') {
                this._instantiateAndRegisterDependency(dependencyDefinition);
                continue;
            }
            if (typeof dependencyDefinition === 'object') {
                const { token, qualifier, value } = dependencyDefinition;
                if (value !== undefined) {
                    this._registerDependency(token, value, qualifier);
                    continue;
                }
                if (typeof token === 'function') {
                    this._instantiateAndRegisterDependency(token as Type<any>, qualifier);
                    continue;
                }
            }
            console.error('Invalid dependency: ', dependencyDefinition);
        }
    }

    private static _instantiateAndRegisterDependency(cls: Type<any>, qualifier = this._DefaultQualifier): void {
        const map = this._getSubMapByToken(cls);
        if (map[qualifier]) {
            console.error(`Dependency is already registered with qualifier '${qualifier}'`, cls);
            return;
        }
        map[qualifier] = new cls();
    }

    private static _registerDependency<T>(token: Token<T> | undefined, value: T, qualifier = this._DefaultQualifier): void {
        const map = this._getSubMapByToken(token);
        if (map[qualifier]) {
            console.error(`Dependency is already registered with qualifier '${qualifier}'`, token);
            return;
        }
        map[qualifier] = value;
    }

    static getDependency<T> (token: Token<T>, qualifier?: string): T | undefined;
    static getDependency<T = any> (qualifier: string): T  | undefined;
    static getDependency<T>(param1: Token<T> | string, param2?: string): T | undefined {
        let map;
        let qualifier;
        if (typeof param1 === 'string') {
            map = this._getSubMapByToken(undefined);
            qualifier = param1;
        } else {
            map = this._getSubMapByToken(param1);
            qualifier = param2 || this._DefaultQualifier;
        }
        return map?.[qualifier];
    }

    private static _getSubMapByToken(token: Token | undefined): Record<string, any> {
        let map = this._Dependencies.get(token);
        if (!map) {
            this._Dependencies.set(token, map = {});
        }
        return map;
    }

};
