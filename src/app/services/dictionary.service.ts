import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { AnagramDictionaryItem } from '../models';
import { environment } from './../../environments/environment';
import { cleanWhiteSpacesAndCommas } from './../helpers/clean-spaces-and-commas';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  public query: string = 'aals';
  public matchList: string[] = [];
  public dictionaryHashMap: AnagramDictionaryItem = {};

  constructor(private http: HttpClient) {}

  resetMatchList(): void {
    this.matchList = [];
  }

  // CASE INSENSTIVE MATCH FINDER
  searchAnagramMatches(query: string) {
    this.resetMatchList();

    const sortedCheckWord: string = sortWord(query.toLowerCase());

    const anagrams = this.dictionaryHashMap[sortedCheckWord];
    const isAMatch: boolean = anagrams != undefined && anagrams.length > 0;

    if (isAMatch) this.matchList = [...anagrams];
    console.log('Matches found', anagrams);
  }

  get dictionarySize(): number {
    return Object.keys(this.dictionaryHashMap).length;
  }

  getDictionaryList(): void {
    const dictionaryFile$: Observable<string> = this.http.get(
      environment.dictionaryApiUrl,
      { responseType: 'text' }
    );

    dictionaryFile$.pipe(first()).subscribe((data: string) => {
      try {
        const wordsArray = data.split('\n');

        wordsArray.forEach((originalWord: string) => {
          const sortedWord = sortWord(
            originalWord.replace(' ', '').toLowerCase()
          );

          if (this.dictionaryHashMap[sortedWord] == undefined) {
            this.dictionaryHashMap[sortedWord] = [];
          }

          this.dictionaryHashMap[sortedWord].push(originalWord);
        });

        console.log(
          'Total words loaded in the dictionary',
          // this.dictionaryHashMap.size
          this.dictionarySize
        );
      } catch (err) {
        console.error('ERROR', err);
      }
    });
  }
}

// Helper function
const sortWord = (words: string) => {
  let result = cleanWhiteSpacesAndCommas(words).split('');
  result.sort();
  return result.join('');
};
