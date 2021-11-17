// eslint-disable-next-line @typescript-eslint/ban-types
export type Type<T> = Function & {
    new (): T;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type AbstractType<T> = Function & {
    prototype: T;
};
