import { DependencyContainer } from '../utils/DependencyContainer';
import { InjectedField, InjectMetadataKey } from './Inject';

export function Injectable<T extends { new(...args: any[]): {} }>(BaseClass: T) {
    const injectedFields = Reflect.getMetadata(InjectMetadataKey, BaseClass.prototype) as Array<InjectedField>;
    if (!injectedFields) {
        return BaseClass;
    }
    return class extends BaseClass {
        constructor(...args: any[]) {
            super(args);
            for (const injectedField of injectedFields) {
                const { field, param1, param2 } = injectedField;
                // Name of field for caching the injected value within the class instance.
                const cacheField = `_${field}`;
                Object.defineProperty(this, field, {
                    get() {
                        // Retrieve the cached value if possible.
                        if (this[cacheField]) {
                            return this[cacheField];
                        }
                        return this[cacheField] = DependencyContainer.getDependency(param1 as any, param2);
                    }
                });
            }
        }
    };
}