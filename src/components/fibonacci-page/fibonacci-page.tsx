import styles from "./fibonacci-page.module.css"
import { useState, FormEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import InputWrapper from "../input-wrapper/input-wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import getFibArray from "./utils";

export const FibonacciPage: React.FC = () => {
  const maxValue = 19;
  const [inputValue, setInputValue] = useState<number>(0);
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const calcFib = async () => {
    setInProgress(true);
    const fibArray = [...getFibArray(inputValue)];
    const renderFib: number[] = [];
    for (let num of fibArray) {
      renderFib.push(num);
      setNumbersArr([...renderFib]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form
        onSubmit={evt => {
          evt.preventDefault();
          inputValue && calcFib();
          setInputValue(0);
        }}>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            disabled={inProgress}
            placeholder="Введите число от 1 до 19"
            type="number"
            min={1}
            value={inputValue || ''}
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setInputValue(
                Number(evt.currentTarget.value.replace(/[^0-9]/g, ''))
              )
            }
            isLimitText={true}
            maxLength={2}
            max={maxValue}
          />
          <Button
            disabled={inputValue ? inputValue > maxValue : true}
            isLoader={inProgress}
            text="Развернуть"
            type="submit"
          />
        </InputWrapper>
      </form>
      <ul className={styles.circleList}>
        {numbersArr.map((num, idx) => {
          return <Circle letter={num.toString()} key={idx} index={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
