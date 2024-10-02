interface Result<T> {
  // items: Array<number | string | boolean>;
  // items: number[] | string[] | boolean[];
  items: T[];
  count: number;
}

// TEST CASE 1
// The following code should NOT produce a TypeScript error
const responseNumber: Result<number> = {
  items: [1, 2, 3],
  count: 1,
};

// TEST CASE 2
// The following code should NOT produce a TypeScript error
const responseString: Result<string> = {
  items: ['aa', 'bsd', 'cdas'],
  count: 1,
};

// TEST CASE 3
// The following code SHOULD produce a TypeScript error
const responseBoolean: Result<boolean> = {
  items: [true, false],
  count: 1,
};

// Logs
console.log('[Log] ~ file: test.ts:14 ~ responseNumber ------>', responseNumber);
console.log('[Log] ~ file: test.ts:22 ~ responseString ------>', responseString);
console.log('[Log] ~ file: test.ts:30 ~ responseBoolean ------>', responseBoolean);
