import styles from "./list-page.module.css";
import {useState,  useMemo, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import InputWrapper from '../../components/input-wrapper/input-wrapper';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import {ArrowIcon} from '../../components/ui/icons/arrow-icon';
import {ElementStates} from '../../types/element-states';
import {ICircleElement, TElStateList} from '../../types/types';
import {setElementsWithDelay} from '../../utils/utils';
import {LinkedList} from './utils';

export const ListPage: React.FC = () => {
  const maxNum = 12;
  const initialStrings = useMemo(() => ['0', '34', '8', '1'], []);
  const initialState: ICircleElement[] = useMemo(() => [], []);
  const linkedList = useMemo(
    () => new LinkedList<string>(initialStrings),
    [initialStrings]
  );

  useEffect(() => {
    initialStrings.forEach(el => {
      initialState.push({
        char: el,
        state: ElementStates.Default
      });
    });
    setElements(initialState);
  }, [initialStrings, initialState]);

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIdx, setInputIdx] = useState<number>();
  const [elements, setElements] = useState<ICircleElement[]>([]);

  const [elState, setElState] = useState<TElStateList>({
    isAddingToHead: false,
    isAddingToTail: false,
    isDeletingFromHead: false,
    isDeletingFromTail: false,
    isAddingByIdx: false,
    isDeletingByIdx: false
  });

  const inProgress = useMemo<boolean>(
    () => !!Object.values(elState).find(el => el),
    [elState]
  );

  const addToHead = async () => {
    const array = [...elements];
    setElState({
      ...elState,
      isAddingToHead: true
    });
    linkedList.insertAt(inputValue, 0);
    array[0] = {
      ...array[0],
      adding: true,
      extraCircle: {
        char: linkedList.getNodeByIdx(0) || ''
      }
    };
    await setElementsWithDelay([...array], setElements);

    array[0] = {
      ...array[0],
      adding: false,
      extraCircle: undefined
    };
    array.unshift({
      char: linkedList.getNodeByIdx(0) || '',
      state: ElementStates.Modified
    });
    await setElementsWithDelay([...array], setElements);

    array[0].state = ElementStates.Default;
    setElState({
      ...elState,
      isAddingToHead: false
    });
    setInputValue('');
  };

  const removeFromHead = async () => {
    const array = [...elements];
    setElState({
      ...elState,
      isDeletingFromHead: true
    });
    array[0] = {
      ...array[0],
      char: '',
      deleting: true,
      extraCircle: {
        char: linkedList.removeFromPosition(0) || ''
      }
    };
    await setElementsWithDelay([...array], setElements);
    array.shift();
    array[0].state = ElementStates.Modified;
    await setElementsWithDelay([...array], setElements);
    array[0].state = ElementStates.Default;
    setElState({
      ...elState,
      isDeletingFromHead: false
    });
  };

  const addToTail = async () => {
    const array = [...elements];
    setElState({
      ...elState,
      isAddingToTail: true
    });
    linkedList.addToTail(inputValue);
    const tailIdx = linkedList.getSize() - 1;
    for (let i = 0; i <= tailIdx; i++) {
      array[i] = {
        ...array[i],
        adding: true,
        extraCircle: {
          char: linkedList.getNodeByIdx(tailIdx) || ''
        }
      };
      if (i > 0) {
        array[i - 1] = {
          ...array[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing
        };
      }
      await setElementsWithDelay([...array], setElements);
    }

    array[array.length - 1] = {
      ...array[array.length],
      char: linkedList.getNodeByIdx(tailIdx) || '',
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined
    };
    await setElementsWithDelay([...array], setElements);
    array.forEach(el => (el.state = ElementStates.Default));
    await setElementsWithDelay([...array], setElements);
    setElState({
      ...elState,
      isAddingToTail: false
    });
    setInputValue('');
  };

  const removeFromTail = async () => {
    const array = [...elements];
    setElState({
      ...elState,
      isDeletingFromTail: true
    });
    const {length} = array;
    const tailIdx = linkedList.getSize() - 1;
    array[length - 1] = {
      ...array[length - 1],
      char: '',
      deleting: true,
      extraCircle: {
        char: linkedList.removeFromPosition(tailIdx) || ''
      }
    };
    await setElementsWithDelay([...array], setElements);
    array.pop();
    array[length - 2].state = ElementStates.Modified;
    await setElementsWithDelay([...array], setElements);

    array[length - 2].state = ElementStates.Default;
    setElState({
      ...elState,
      isDeletingFromTail: false
    });
  };

  const addByIdx = async (idx: number) => {
    const array = [...elements];
    setElState({
      ...elState,
      isAddingByIdx: true
    });
    linkedList.insertAt(inputValue, idx);
    for (let i = 0; i <= idx; i++) {
      array[i] = {
        ...array[i],
        adding: true,
        extraCircle: {
          char: linkedList.getNodeByIdx(idx) || ''
        }
      };
      if (i > 0)
        array[i - 1] = {
          ...array[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing
        };
      await setElementsWithDelay([...array], setElements);
    }

    array[idx] = {
      ...array[idx],
      adding: false,
      extraCircle: undefined
    };
    array.splice(idx, 0, {
      char: linkedList.getNodeByIdx(idx) || '',
      state: ElementStates.Modified
    });
    await setElementsWithDelay([...array], setElements);
    array.forEach(el => (el.state = ElementStates.Default));
    setElState({
      ...elState,
      isAddingByIdx: false
    });
    setInputValue('');
    setInputIdx(undefined);
  };

  const removeByIdx = async (idx: number) => {
    const array = [...elements];
    setElState({
      ...elState,
      isDeletingByIdx: true
    });

    for (let i = 0; i <= idx; i++) {
      array[i].state = ElementStates.Changing;
      if (i === idx) array[i].withoutArrow = true;
      await setElementsWithDelay([...array], setElements);
    }

    array[idx] = {
      ...array[idx],
      char: '',
      deleting: true,
      extraCircle: {
        char: linkedList.removeFromPosition(idx) || ''
      }
    };
    await setElementsWithDelay([...array], setElements);
    array.splice(idx, 1);
    array.forEach(el => (el.state = ElementStates.Default));
    setElState({
      ...elState,
      isDeletingByIdx: false
    });
    setInputIdx(undefined);
    await setElementsWithDelay([...array], setElements);
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <InputWrapper>
          <Input
            disabled={inProgress}
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={inputValue || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setInputValue(e.currentTarget.value)
            }
            isLimitText={true}
            maxLength={4}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || !inputValue || elements.length > maxNum}
            isLoader={elState.isAddingToHead}
            text="Добавить в head"
            onClick={() => addToHead()}
          />
          <Button
            extraClass={styles.button}
            isLoader={elState.isAddingToTail}
            disabled={inProgress || !inputValue || elements.length > maxNum}
            text="Добавить в tail"
            onClick={() => addToTail()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || elements.length <= 1}
            isLoader={elState.isDeletingFromHead}
            text="Удалить из head"
            onClick={() => removeFromHead()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || elements.length <= 1}
            isLoader={elState.isDeletingFromTail}
            text="Удалить из tail"
            onClick={() => removeFromTail()}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            disabled={inProgress}
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={inputIdx || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setInputIdx(Number(e.currentTarget.value.replace(/[^0-9]/g, '')))
            }
          />
          <Button
            extraClass={styles.bigButton}
            disabled={
              !inputValue ||
              !inputIdx ||
              inProgress ||
              inputIdx > elements.length - 1 ||
              elements.length > maxNum
            }
            isLoader={elState.isAddingByIdx}
            text="Добавить по индексу"
            onClick={() => inputIdx && addByIdx(inputIdx)}
          />
          <Button
            extraClass={styles.bigButton}
            isLoader={elState.isDeletingByIdx}
            disabled={!inputIdx || inProgress || inputIdx > elements.length - 1}
            text="Удалить по индексу"
            onClick={() => inputIdx && removeByIdx(inputIdx)}
          />
        </InputWrapper>
      </div>
      <ul className={styles.circleList}>
        {elements.map((char, idx) => {
          return (
            <div className={styles.elementWrapper} key={idx}>
              <Circle
                state={char.state}
                letter={char.char!}
                index={idx}
                head={idx === 0 && !char.adding && !char.deleting ? 'head' : ''}
                tail={
                  idx === elements.length - 1 && !char.adding && !char.deleting
                    ? 'tail'
                    : ''
                }
              />
              {idx !== elements.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === ElementStates.Changing && !char.withoutArrow
                      ? '#d252e1'
                      : '#0032FF'
                  }
                />
              )}
              {char.adding && (
                <Circle
                  extraClass={styles.topCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
              {char.deleting && (
                <Circle
                  extraClass={styles.bottomCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};

export default ListPage;
