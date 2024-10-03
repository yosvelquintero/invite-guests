interface Result<T> {
  items: T[];
  count: number;
}

// TEST CASE 1
// The following code should NOT produce a TypeScript error
export const responseNumber: Result<number> = {
  items: [1, 2, 3],
  count: 1,
};

// TEST CASE 2
// The following code should NOT produce a TypeScript error
export const responseString: Result<string> = {
  items: ['aa', 'bsd', 'cdas'],
  count: 1,
};

// TEST CASE 3
// The following code SHOULD produce a TypeScript error
export const responseBoolean: Result<boolean> = {
  items: [true, false],
  count: 1,
};
