
enum Occupation {
  Actress,
  Baker,
}

type Person = {
  name: string,
  age: number,
  occupation: Occupation
}

let person1: Person = {
  name: 'maria',
  age: 29,
  occupation: Occupation.Actress
};

let person2: Person = {
  name: 'roberto',
  age: 19,
  occupation: Occupation.Baker
};

let person3: Person = {
  name: 'laura',
  age: 32,
  occupation: Occupation.Actress
};

let person4: Person = {
  name: "carlos",
  age: 19,
  occupation: Occupation.Baker
}