import { IDirection, IMAQEBot, IStep, ITurn  } from './maqeBot.types';

const DIGIT_REGEX: RegExp = /\d/;
const WALK: string = 'W';
const LEFT: ITurn = 'L';
const RIGHT: ITurn = 'R';
const DIRECTIONS: IDirection[] = ['West', 'North', 'East', 'South'];

export function MAQEBot(direction: String): string {
   const inputDirection = direction.split('')
   console.log(inputDirection)
   return 'hello';
}