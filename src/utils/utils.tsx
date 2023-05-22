import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from '../constants/delays';
import { ICircleElement } from '../types/types';
import { swap } from './algorythm-utils';

export const setDelay = (delay: number = DELAY_IN_MS): Promise<null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const getNumber = () => Math.floor(Math.random() * 100) + 1;

export const setElementsWithDelay = async (
  arr: ICircleElement[],
  setter: (arr: ICircleElement[]) => void,
  isLong?: boolean
) => {
  setter([...arr]);
  await setDelay(isLong ? DELAY_IN_MS : SHORT_DELAY_IN_MS);
};

type TReverseRes = {res: string[]; numberOfSteps: number};

export const reverseStringAlgorithm = (
  string: string,
  step?: number
): TReverseRes => {
  const arrayOfChars = string.split('');
  let stepCounter = 0;
  let startIndex = 0;
  let endIndex = arrayOfChars.length - 1;
  while (endIndex >= startIndex) {
    if (step === stepCounter) break;
    swap(arrayOfChars, startIndex, endIndex);
    startIndex++;
    endIndex--;
    stepCounter++;
  }
  return {res: arrayOfChars, numberOfSteps: stepCounter};
};