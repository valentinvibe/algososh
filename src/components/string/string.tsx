import styles from './string.module.css';
import React, {useState, FormEvent} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import InputWrapper from '../input-wrapper/input-wrapper';
import { setDelay } from '../../utils/utils';
import {DELAY_IN_MS} from '../../constants/delays';
import {ElementStates} from '../../types/element-states';
import { ICircleElement } from '../../types/types';
import { reverseStringAlgorithm } from '../../utils/utils';


const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [letters, setLetters] = useState<ICircleElement[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const swapString = async () => {
    setInputValue('');
    setInProgress(true);
    const arrayOfChars: ICircleElement[] = [];
    inputValue.split('').forEach(el => {
      arrayOfChars.push({char: el, state: ElementStates.Default});
    });
    setLetters([...arrayOfChars]);
    await setDelay();
    const numberOfSteps: number =
      reverseStringAlgorithm(inputValue).numberOfSteps;
      let step = 0;

    while (step !== numberOfSteps) {
      arrayOfChars[step].state = ElementStates.Changing;
      arrayOfChars[inputValue.length - (step + 1)].state =
        ElementStates.Changing;
      setLetters([...arrayOfChars]);
      await setDelay(DELAY_IN_MS);
      reverseStringAlgorithm(inputValue, step + 1).res.forEach((elem, index : number) => {
        arrayOfChars[index].char = elem;
      });
      arrayOfChars[step].state = ElementStates.Modified;
      arrayOfChars[inputValue.length - (step + 1)].state =
        ElementStates.Modified;
      setLetters([...arrayOfChars]);
      await setDelay(DELAY_IN_MS);
      step++;
    }
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          swapString();
        }}>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            disabled={inProgress}
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setInputValue(evt.currentTarget.value)
            }
            isLimitText={true}
            maxLength={11}
            value={inputValue}
          />
          <Button
            disabled={!inputValue}
            isLoader={inProgress}
            text="Развернуть"
            type="submit"
          />
        </InputWrapper>
      </form>

      <ul className={styles.circleList}>
        {letters.map((letter, index) => {
          return <Circle state={letter.state} letter={letter.char!} key={index} />;
        })}
      </ul>
    </SolutionLayout>
  );
};

export default StringComponent;