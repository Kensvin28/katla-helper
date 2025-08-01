import { Words } from "../interfaces/Words";
import { readFileSync } from "fs";

export function getWordList(path: string): Words {
    const data = readFileSync(path, 'utf-8');
    return new Words(...JSON.parse(data));
}