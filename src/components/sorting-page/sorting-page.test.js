import { selectionSortAlgorithm, bubbleSortAlgorithm } from "./utils";
import { ElementStates } from "../../types/element-states";

describe("Алгоритм сортировки выбором", () => {
    // Сортировка пустого массива
    test('Сортировка выбором пустого массива по возрастанию', () => {
        const mode = 'ascending';
        const inputArr = [];
        const expectedOutput = [];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    test('Сортировка выбором пустого массива по убыванию', () => {
        const mode = 'descending';
        const inputArr = [];
        const expectedOutput = [];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    // Сортировка массива из одного элемента
    test('Сортировка выбором массива из одного элемента по возрастанию', () => {
        const mode = 'ascending';
        const inputArr = [
            {num: 74, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 74, state: ElementStates.Modified}
        ];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    test('Сортировка выбором массива из одного элемента по убыванию', () => {
        const mode = 'descending';
        const inputArr = [
            {num: 74, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 74, state: ElementStates.Modified}
        ];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })

    // Сортировка массива из нескольких элементов
    test('Сортировка выбором массива из нескольких элементов по возрастанию', () => {
        const mode = 'ascending';
        const inputArr = [
            {num: 74, state: ElementStates.Default},
            {num: 59, state: ElementStates.Default},
            {num: 88, state: ElementStates.Default},
            {num: 66, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 59, state: ElementStates.Modified},
            {num: 66, state: ElementStates.Modified},
            {num: 74, state: ElementStates.Modified},
            {num: 88, state: ElementStates.Modified}
        ];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })

    test('Сортировка выбором массива из нескольких элементов по убыванию', () => {
        const mode = 'descending';
        const inputArr = [
            {num: 74, state: ElementStates.Default},
            {num: 59, state: ElementStates.Default},
            {num: 88, state: ElementStates.Default},
            {num: 66, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 88, state: ElementStates.Modified},
            {num: 74, state: ElementStates.Modified},
            {num: 66, state: ElementStates.Modified},
            {num: 59, state: ElementStates.Modified}
        ];
        
        const result = selectionSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })

})

describe('Алгоритм сортировки пузырьком', () => {
    // Сортировка пустого массива
    test('По возрастанию', ()=> {
        const mode = 'ascending';
        const inputArr = [];
        const expectedOutput = [];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    test('По убыванию', ()=> {
        const mode = 'descending';
        const inputArr = [];
        const expectedOutput = [];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    // Сортировка массива из одного элемента
    test('По возрастанию', () => {
        const mode = 'ascending';
        const inputArr = [
            {num: 74, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 74, state: ElementStates.Modified}
        ];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    test('По убыванию', () => {
        const mode = 'descending';
        const inputArr = [
            {num: 74, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 74, state: ElementStates.Modified}
        ];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
    // Сортировка массива из нескольких элементов
    test('По возрастанию', () => {
        const mode = 'ascending';
        const inputArr = [
            {num: 74, state: ElementStates.Default},
            {num: 59, state: ElementStates.Default},
            {num: 88, state: ElementStates.Default},
            {num: 66, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 59, state: ElementStates.Modified},
            {num: 66, state: ElementStates.Modified},
            {num: 74, state: ElementStates.Modified},
            {num: 88, state: ElementStates.Modified}
        ];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })

    test('По убыванию', () => {
        const mode = 'descending';
        const inputArr = [
            {num: 74, state: ElementStates.Default},
            {num: 59, state: ElementStates.Default},
            {num: 88, state: ElementStates.Default},
            {num: 66, state: ElementStates.Default}
        ];
        const expectedOutput = [
            {num: 88, state: ElementStates.Modified},
            {num: 74, state: ElementStates.Modified},
            {num: 66, state: ElementStates.Modified},
            {num: 59, state: ElementStates.Modified}
        ];
        
        const result = bubbleSortAlgorithm(mode,inputArr).resArr
        expect(result).toStrictEqual(expectedOutput);
    })
})