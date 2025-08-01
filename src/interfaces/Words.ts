export class Words extends Array<string> {
    constructor(...words: string[]) {
        super(...words);
        Object.setPrototypeOf(this, Words.prototype);
    }

    isEqual(other: Words): boolean {
        return this.length === other.length && this.every((word, index) => word === other[index]);
    }

    getWord(index: number): string | undefined {
        return this[index];
    }

    toString(): string {
        return this.join(', ');
    }

    counter<T extends string>(array: T[]): Record<T, number> {
        return array.reduce((acc: Record<T, number>, word: T) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {} as Record<T, number>);
    }

    getPossibleWordsFromLetters(searchLetters: string[]): Words {
        const letterSet = this.counter(searchLetters);
        const filteredWords = new Words();

        for (const dictWord of this) {
            const dictLetterCount: Record<string, number> = this.counter([...dictWord]);
            let canFormWord: boolean = true;

            for (const [letter, targetLetterCount] of Object.entries(letterSet)) {
                const dictLetterCountValue = dictLetterCount[letter] || 0;
                if (targetLetterCount > dictLetterCountValue) {
                    canFormWord = false;
                    break;
                }
            }

            if (canFormWord) {
                filteredWords.push(dictWord);
            }
        }
        return filteredWords;
    }

    getWordsWithLetterAtIndex(letter: string, index: number): Words {
        const filteredWords = new Words();

        for (const dictWord of this) {
            if (dictWord[index] === letter) {
                filteredWords.push(dictWord);
            }
        }
        return filteredWords;
    }

    getWordsWithoutLetters(searchLetters: string[]): Words {
        const letterSet = this.counter(searchLetters);
        const filteredWords = new Words();

        for (const dictWord of this) {
            let canFormWord: boolean = true;

            for (const letter of dictWord) {
                if (letterSet[letter]) {
                    canFormWord = false;
                    break;
                }
            }

            if (canFormWord) {
                filteredWords.push(dictWord);
            }
        }
        return filteredWords;
    }
}