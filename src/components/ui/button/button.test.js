import renderer from "react-test-renderer";
import { Button } from "./button";

describe(Button,() => {
    it('Кнопка с текстом', () => {
        const tree = renderer.create(<Button>Кнопка с текстом</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Кнопка без текста', () => {
        const tree = renderer.create(<Button/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Заблокированная кнопка', () => {
        const tree = renderer.create(<Button disabled={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });    

    it('Кнопка с индикацией загрузки', () => {
        const tree = renderer.create(<Button isLoader={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    }); 




})