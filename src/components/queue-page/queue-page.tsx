import styles from "./queue-page.module.css"
import { useState, useMemo} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ICircleElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import Queue from "./utils";
import { setElementsWithDelay } from "../../utils/utils";
import InputWrapper from "../input-wrapper/input-wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const maxNum = 7;

  const initialState: ICircleElement[] = Array.from({length: maxNum}, () => ({
    char: '',
    state: ElementStates.Default
  }));

  const [inputValue, setInputValue] = useState<string>('');
  const [elements, setElements] = useState<ICircleElement[]>(initialState);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queue = useMemo(() => new Queue<string>(maxNum), []);

  const enqueue = async () => {
    setIsAdding(true);
    setInputValue('');
    const array = [...elements];
    queue.enqueue(inputValue);
    const head = queue.getHead();
    const tail = queue.getTail();
    array[head.index].char = head.value;
    array[head.index].head = 'head';
    if (tail.index > 0) array[tail.index - 1].tail = '';
    array[tail.index].char = tail.value;
    array[tail.index].tail = 'tail';
    array[tail.index].state = ElementStates.Changing;
    await setElementsWithDelay(elements, setElements);
    array[tail.index].state = ElementStates.Default;
    setIsAdding(false);
  };

  const dequeue = async () => {
    setIsDeleting(true);
    const array = [...elements];
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) clear();
    else {
      queue.dequeue();
      const head = queue.getHead();
      array[head.index - 1].state = ElementStates.Changing;
      await setElementsWithDelay(array, setElements);
      array[head.index - 1].state = ElementStates.Default;
      if (head.index > 0) {
        array[head.index - 1].head = '';
        array[head.index - 1].char = '';
      }
      array[head.index].char = head.value;
      array[head.index].head = 'head';
    }
    setIsDeleting(false);
  };

  const clear = () => {
    queue.clear();
    setElements([...initialState]);
  };
  return (
    <SolutionLayout title="Очередь">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          enqueue();
        }}>
        <InputWrapper>
          <Input
            disabled={isAdding || isDeleting}
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
            disabled={
              !inputValue ||
              isDeleting ||
              elements[elements.length - 1].char !== ''
            }
            isLoader={isAdding}
            text="Добавить"
            type="submit"
          />
          <Button
            extraClass={styles.deleteBtn}
            isLoader={isDeleting}
            disabled={isAdding || queue.isEmpty()}
            text="Удалить"
            onClick={() => dequeue()}
          />
          <Button
            disabled={isAdding || isDeleting || queue.isEmpty()}
            text="Очистить"
            onClick={() => clear()}
          />
        </InputWrapper>
      </form>
      <ul className={styles.circleList}>
        {elements.map((char, index) => {
          return (
            <Circle
              state={char.state}
              letter={char.char!}
              index={index}
              key={index}
              head={char.head}
              tail={char.tail}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};

export default QueuePage;
