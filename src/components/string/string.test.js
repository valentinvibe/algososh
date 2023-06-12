import { reverseStringAlgorithm } from "../../utils/utils";

describe(reverseStringAlgorithm, () => {
    test('Разворот строки с чётным количеством символов', () => {
      const input = 'Hello!';
      const expectedOutput = '!olleH';
  
      const result = reverseStringAlgorithm(input).res.join('');
  
      expect(result).toBe(expectedOutput);
    });

    test('Разворот строки с нечётным количеством символов', () => {
        const input = 'Hello world';
        const expectedOutput = 'dlrow olleH';
    
        const result = reverseStringAlgorithm(input).res.join('');
    
        expect(result).toBe(expectedOutput);
      });

    test('Разворот строки с одним символом', () => {
        const input = 'T';
        const expectedOutput = 'T';

        const result = reverseStringAlgorithm(input).res.join('');

        expect(result).toBe(expectedOutput);
    });

    test('Разворот пустой строки', () => {
        const input = '';
        const expectedOutput = '';

        const result = reverseStringAlgorithm(input).res.join('');

        expect(result).toBe(expectedOutput);
    });
    
  });