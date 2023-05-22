import { useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css"
import InputWrapper from "../input-wrapper/input-wrapper";
import { RadioInput } from "../ui/radio-input/radio-input";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TBar } from "../../types/types";
import { getNumber } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { selectionSortAlgorithm, bubbleSortAlgorithm } from "./utils";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {
  const [inProgress, setInProgress] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [checked, setChecked] = useState<'selection' | 'bubble'>('selection');
  const [bars, setBars] = useState<TBar[]>([]);

  const getRandomArr = () => {
    const minNum = 3;
    const maxNum = 17;
    const size = ~~(Math.random() * (maxNum - minNum) + minNum);
    const arr: TBar[] = Array.from({length: size}, () => ({
      num: getNumber(),
      state: ElementStates.Default
    }));
    setBars([...arr]);
  };

  const sortWithDelay = async (arr: TBar[]) => {
    setBars([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);
  };

  // СОРТИРОВКА ВЫБОРОМ
  const selectionSort = async (mode: 'ascending' | 'descending') => {
    setInProgress(true);
    mode === 'ascending' ? setIsAscending(true) : setIsDescending(true);
    const arr = [...bars];
    let stepCounter = 1;
    while (stepCounter !== selectionSortAlgorithm(mode, arr).numberOfSteps) {
      await sortWithDelay(
        selectionSortAlgorithm(mode, arr, stepCounter).resArr
      );
      stepCounter++;
    }
    setInProgress(false);
    mode === 'ascending' ? setIsAscending(false) : setIsDescending(false);
  };

  // СОРТИРОВКА ПУЗЫРЬКОМ
  const bubbleSort = async (mode: 'ascending' | 'descending') => {
    setInProgress(true);
    mode === 'ascending' ? setIsAscending(true) : setIsDescending(true);
    const array = [...bars];
    array.forEach(el => (el.state = ElementStates.Default));
    let stepCounter = 1;
    while (stepCounter !== bubbleSortAlgorithm(mode, array).numberOfSteps) {
      await sortWithDelay(bubbleSortAlgorithm(mode, array, stepCounter).resArr);
      stepCounter++;
    }
    setInProgress(false);
    mode === 'ascending' ? setIsAscending(false) : setIsDescending(false);
  };

  useEffect(() => {
    getRandomArr();
  }, []);
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <InputWrapper>
          <div className={styles.radioWrapper}>
            <RadioInput
              disabled={inProgress}
              checked={checked === 'selection'}
              onChange={() => setChecked('selection')}
              value="selection"
              label="Выбор"
            />
            <RadioInput
              disabled={inProgress}
              checked={checked === 'bubble'}
              onChange={() => setChecked('bubble')}
              value="bubble"
              label="Пузырёк"
            />
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              sorting={Direction.Ascending}
              disabled={inProgress}
              isLoader={isAscending}
              text="По возрастанию"
              onClick={() =>
                checked === 'selection'
                  ? selectionSort('ascending')
                  : bubbleSort('ascending')
              }
            />
            <Button
              sorting={Direction.Descending}
              disabled={inProgress}
              isLoader={isDescending}
              text="По убыванию"
              onClick={() =>
                checked === 'selection'
                  ? selectionSort('descending')
                  : bubbleSort('descending')
              }
            />
          </div>
          <Button
            disabled={inProgress}
            isLoader={false}
            text="Новый массив"
            type="submit"
            onClick={() => getRandomArr()}
          />
        </InputWrapper>
        <ul className={styles.columnList}>
          {bars.map((bar, idx) => {
            return <Column index={bar.num} state={bar.state} key={idx} />;
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
