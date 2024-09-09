import { type } from "os";

interface Admin {
	role: string;
}

interface User {
	id: string;
	name: string;
}

type PermissionType<T> = T extends Admin ? 'admin' : 'user';

const aUserPermissions: PermissionType<Admin> = 'admin';
const bUserPermissions: PermissionType<User> = 'user';

// ------------------------------------

type T1 = string | number | null | undefined;

type RempveType<T, TRemove> = T extends TRemove ? never : T;

type T2 = RempveType<T1, null | undefined>
type T3 = Exclude<T1, null | undefined>

// ------------------------------------

type ExtractType<T, TExtract> = T extends TExtract ? T : never;

type T4 = ExtractType<T1, string>
type T5 = ExtractType<T3, number>

type T6 = Extract<T1, string>

type NonNullType<T> = T extends null | undefined ? never : T;

type T7 = NonNullType<T1>
type T8 = NonNullable<T1>

interface User {
	name: string;
	age: number;
	updateName(newName: string): void;
	updateAge(newAge: number): void;
}

type GetFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type GetNonFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type T9 = GetFunctionPropertyNames<User>;
type GetFunctionType<T> = Pick<T, GetFunctionPropertyNames<T>>
// const a: T9 = 'updateName';

type T10 = GetFunctionType<User>;
const b: T10 = {
	updateName: (newName: string) => {},
	updateAge: (newAge: number) => {}
}

type T11 = Pick<User, GetNonFunctionPropertyNames<User>>;
// const c: T11 = {
// 	age: 0,
// 	name: ''
// };

type UserFunctionTypeName = GetFunctionPropertyNames<User>; // 'updateName' | 'updateAge'

// infer

type ArrayElement<T> = T extends (infer E) ? E : never;
type ArrayElement1<T> = T extends (infer E)[] ? E : never;
type T12 = ArrayElement<number[]>;
type T12a = ArrayElement1<number[]>;

type T13 = ArrayElement<string[]>;
type T13a = ArrayElement1<string[]>;

type T14 = ArrayElement<{name: string}>;
const d: T14 = {name: 'a'};
type T14a = ArrayElement1<{name: string}>;
// const e: T14a = {name: 'a'}; error

type ElementType<T> = T extends { id: infer E} ? E : never;

type typeUserId = ElementType<User>
const f: typeUserId = '1';

// function
type FunctionReturnType<T extends (...args: any) => any> = T extends (...arge: any) => infer R ? R : never;

function sayHello(name: string) {
	return `Hello ${name}`;
}

type sayHelloType = FunctionReturnType<typeof sayHello>;
type T16 = FunctionReturnType<() => number>;

type T17 = ReturnType<typeof sayHello>;

class Pet {
	name = 'pet';
	age = 18;
}
// option 1
const pet1 = new Pet();

type PetType = typeof pet1;

// option 2
type ClassInstanceType<T extends new (...arge: any) => any> = T extends new (...arge: any) => infer R ? R : never;
// custom type
type newPetType = ClassInstanceType<typeof Pet>;
// built-in type utility type
type newPetType1 = InstanceType<typeof Pet>;
