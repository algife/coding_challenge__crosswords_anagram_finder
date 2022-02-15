export interface AnagramDictionaryItem {
  [key: string]: string[]; // where the key is the sorted word and the value is array of the dictionary words/anagrams that matches that case
}
