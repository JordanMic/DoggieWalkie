export interface ICreateDogProfile {
  breedOfDog: string;
  dogName: string;
  dateOfBirth: string;
  gender: GenderEnum;
  castration: boolean;
  description: string;
  header: string;
}
export enum GenderEnum {
  Male = 'Piesek',
  Female = 'Suczka'
}

// @ts-ignore
export let GenderDictionary = new Map<GenderEnum, string>([
  [GenderEnum.Female, 'Suczka'],
  [GenderEnum.Male, 'Piesek'],
]);

// @ts-ignore
export let CastrationDictionary = new Map<boolean, string>([
  [true, 'Tak'],
  [false, 'Nie'],
]);
