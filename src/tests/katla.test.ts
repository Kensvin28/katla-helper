import { describe, expect, it } from "vitest";
import { getWordList } from "../utils/getWordList";
import { Words } from "../interfaces/Words";

describe('read word list file', () => {
    it('should read the word list file and return a Words instance', () => {
        const path = './src/assets/words.json';
        const result = getWordList(path);

        expect(result).toBeInstanceOf(Array);
        expect(result).not.toBeNull();
    });
})

describe('get possible words from letters', () => {
    const mockWordList = ['makan', 'makna', 'bibi', 'aman', 'wahana', 'beret', 'makin']
    it('returns words that can be formed from given letters', () => {
        const wordList = new Words(...mockWordList);
        const letters = ['a', 'm', 'k', 'a', 'n'];
        const possibleWords = wordList.getPossibleWordsFromLetters(letters);
        expect(possibleWords).toBeInstanceOf(Words);
        expect(possibleWords.length).toBeGreaterThan(0);
        expect(possibleWords).toContain('makan');
        expect(possibleWords).toContain('makna');
        expect(possibleWords).not.toContain('aman');
        expect(possibleWords).not.toContain('bibi');
        expect(possibleWords).not.toContain('wahana');
        expect(possibleWords).not.toContain('beret');
        expect(possibleWords).not.toContain('makin');
    });

    it('returns words that can be formed from given letters', () => {
        const wordList = new Words(...mockWordList);
        const letters = ['a', 'm', 'k', 'a', 'n', 'a', 'n'];
        const possibleWords = wordList.getPossibleWordsFromLetters(letters);
        expect(possibleWords).toBeInstanceOf(Words);
        expect(possibleWords).not.toContain('makan');
        expect(possibleWords).not.toContain('makna');
        expect(possibleWords).not.toContain('aman');
        expect(possibleWords).not.toContain('bibi');
        expect(possibleWords).not.toContain('wahana');
        expect(possibleWords).not.toContain('beret');
        expect(possibleWords).not.toContain('makin');
    });

    it('should return words that can be formed from given letters', () => {
        const path = './src/assets/words.json';
        const wordList = getWordList(path);
        const letters = ['a', 'm', 'k', 'a', 'n'];
        const possibleWords = wordList.getPossibleWordsFromLetters(letters);

        expect(possibleWords).toBeInstanceOf(Array);
        expect(possibleWords.length).toBeGreaterThan(0);
    });

    it('should return an empty list if no words can be formed', () => {
        const path = './src/assets/words.json';
        const wordList = getWordList(path);
        const letters = ['x', 'y', 'z', 'z'];
        const possibleWords = wordList.getPossibleWordsFromLetters(letters);

        expect(possibleWords.length).toBe(0);
    });
});

describe('get words with letter at index', () => {
    const mockWordList = ['makan', 'makna', 'bibi', 'aman', 'wahana', 'beret', 'makin']
    it('returns words that contain the specified letter at the given index', () => {
        const wordList = new Words(...mockWordList);
        const letter = 'a';
        const index = 1;
        const filteredWords = wordList.getWordsWithLetterAtIndex(letter, index);
        expect(filteredWords).toBeInstanceOf(Words);
        expect(filteredWords.length).toBeGreaterThan(0);
        expect(filteredWords).toContain('makan');
        expect(filteredWords).toContain('makna');
        expect(filteredWords).not.toContain('bibi');
        expect(filteredWords).not.toContain('aman');
        expect(filteredWords).toContain('wahana');
        expect(filteredWords).not.toContain('beret');
        expect(filteredWords).toContain('makin');
    });
});

describe('get words without letters', () => {
    const mockWordList = ['makan', 'makna', 'bibi', 'aman', 'wahana', 'beret', 'makin']
    it('returns words that do not contain the specified letters', () => {
        const wordList = new Words(...mockWordList);
        const letters = ['a', 'm'];
        const filteredWords = wordList.getWordsWithoutLetters(letters);
        expect(filteredWords).toBeInstanceOf(Words);
        expect(filteredWords.length).toBeGreaterThan(0);
        expect(filteredWords).not.toContain('makan');
        expect(filteredWords).not.toContain('makna');
        expect(filteredWords).toContain('bibi');
        expect(filteredWords).not.toContain('aman');
        expect(filteredWords).not.toContain('wahana');
        expect(filteredWords).toContain('beret');
        expect(filteredWords).not.toContain('makin');
    });

    it('should return an empty list if all words contain the specified letters', () => {
        const wordList = new Words(...mockWordList);
        const letters = ['a', 'm', 'b'];
        const filteredWords = wordList.getWordsWithoutLetters(letters);

        expect(filteredWords.length).toBe(0);
    });
});