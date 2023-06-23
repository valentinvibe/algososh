import styles from "./stack-page.module.css"
import { useState, useMemo, FormEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ICircleElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { StackAlgorithm } from "./utils";
import { setElementsWithDelay } from "../../utils/utils";
import InputWrapper from "../input-wrapper/input-wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [elements, setElements] = useState<ICircleElement[]>([]);
  const [isPushing, setIsPushing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const stack = useMemo(() => new StackAlgorithm<string>(), []);

  const pushElement = async () => {
    setIsPushing(true);
    setInputValue('');
    stack.push(inputValue);
    elements.forEach(el => {
      el.state = ElementStates.Default;
      el.head = '';
    });
    const element = stack.peak();
    elements.push({
      char: element ? element : '',
      state: ElementStates.Default
    });
    await setElementsWithDelay(elements, setElements);
    const headIdx = elements.length - 1;
    elements[headIdx].head = 'top';
    elements[headIdx].state = ElementStates.Changing;
    await setElementsWithDelay(elements, setElements);
    setIsPushing(false);
  };

  const popElement = async () => {
    setIsPopping(true);
    stack.pop();
    if (stack.getSize()) {
      elements.pop();
      setElements([...elements]);
      await setDelay(SHORT_DELAY_IN_MS);
      const headIdx = elements.length - 1;
      elements[headIdx].state = ElementStates.Changing;
      elements[headIdx].head = 'top';
      setElements([...elements]);
    } else {
      setElements([]);
    }
    setIsPopping(false);
  };

  const clear = async () => {
    stack.clear();
    setElements([]);
  };
  return (
    <SolutionLayout title="Стек">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          pushElement();
        }}>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            disabled={isPushing || isPopping}
            placeholder="Введите текст"
            min={1}
            maxLength={4}
            value={inputValue || ''}
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setInputValue(evt.currentTarget.value)
            }
            isLimitText={true}
          />
          <Button
            disabled={!inputValue || isPopping || elements.length > 12}
            isLoader={isPushing}
            text="Добавить"
            type="submit"
            data-cy = "addBtn"
          />
          <Button
            extraClass={styles.deleteBtn}
            isLoader={isPopping}
            disabled={!elements.length || isPushing}
            onClick={() => popElement()}
            text="Удалить"
            data-cy = "delBtn"
          />
          <Button
            disabled={!elements.length || isPushing || isPopping}
            text="Очистить"
            onClick={() => clear()}
            data-cy = "clearBtn"
          />
        </InputWrapper>
      </form>
      <ul className={styles.circleList}>
        {elements.map((char, idx) => {
          return (
            <Circle
              state={char.state}
              letter={char.char!}
              index={idx}
              key={idx}
              head={char.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};

export default StackPage;
