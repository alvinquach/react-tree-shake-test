type ConcreteClass<T> = { new(): T };

type Dependency<T> =
    /**
     * Concrete class dependencies can be declared using the class itself if no
     * qualifier or explicit value is needed.
     */
    ConcreteClass<T> |
    /**
     * Concrete class dependencies can also be declared with optional qualifier
     * and/or explicit value.
     */
    {
        type: ConcreteClass<T>,
        qualifier?: string,
        value?: T
    } |
    /**
     * Abstract class dependencies must be declared with an explicit value.
     * Qualifier is still optional.
     */
    {
        type: { name: string },
        qualifier?: string,
        value: T
    } |
    /**
     * Other dependencies must be declared with a qualifier and explicit value.
     */
    {
        qualifier: string,
        value: T
    };

export class DependencyContainer {

    private static readonly _ValueTypeKey = '__value';

    private static readonly _DefaultQualifier = 'default';

    private static readonly _Dependencies: Record<string, Record<string, any>> = {};

    static registerDependencies(...dependencies: Array<Dependency<any>>) {
        for (const dependency of dependencies) {
            if (typeof dependency === 'function') {
                this._constructAndRegisterDependency(dependency);
                continue;
            }
            if (typeof dependency === 'object') {
                const { type, qualifier, value } = dependency as any;
                if (value !== undefined) {
                    this._registerDependency(type?.name || this._ValueTypeKey, value, qualifier);
                }
                if (typeof type === 'function') {
                    this._constructAndRegisterDependency(type, qualifier);
                    continue;
                }
            }
            console.error('Invalid dependency: ', dependency);
        }
    }

    private static _constructAndRegisterDependency(type: ConcreteClass<any>, qualifier = this._DefaultQualifier): void {
        const { name } = type;
        const map = this._getMapByName(name);
        if (map[qualifier]) {
            console.error(`${name} is already registered with qualifier '${qualifier}'.'`);
            return;
        }
        map[qualifier] = new type();
    }

    private static _registerDependency(name: string, value: any, qualifier = this._DefaultQualifier): void {
        const map = this._getMapByName(name);
        if (map[qualifier]) {
            console.error(`${name} is already registered with qualifier '${qualifier}'.'`);
            return;
        }
        map[qualifier] = value;
    }

    static getDependency<T> (type: { name: string }, qualifier?: string): T;
    static getDependency<T> (qualifier: string): T;
    static getDependency<T>(param1: { name: string } | string, param2?: string): T | undefined {
        let map;
        let qualifier;
        if (typeof param1 === 'string') {
            map = this._getMapByName(this._ValueTypeKey);
            qualifier = param1;
        } else {
            map = this._getMapByName(param1.name);
            qualifier = param2 || this._DefaultQualifier;
        }
        return map?.[qualifier];
    }

    private static _getMapByName(name: string): Record<string, any> {
        let map = this._Dependencies[name];
        if (!map) {
            map = this._Dependencies[name] = {};
        }
        return map;
    }

};
