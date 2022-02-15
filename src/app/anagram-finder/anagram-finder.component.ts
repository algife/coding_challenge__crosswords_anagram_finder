import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  map,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { cleanWhiteSpacesAndCommas } from './../helpers/clean-spaces-and-commas';
import { DictionaryService } from './../services/dictionary.service';

@Component({
  selector: 'app-anagram-finder',
  templateUrl: './anagram-finder.component.html',
  styleUrls: ['./anagram-finder.component.css'],
})
export class AnagramFinderComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  public query$ = new BehaviorSubject('');

  public anagramFinderForm: FormGroup = this.fb.group({
    anagramSearchInput: [''],
  });

  get matchList(): string[] {
    return this.dictionaryService.matchList;
  }

  get dictionarySize(): number {
    return this.dictionaryService.dictionarySize;
  }

  constructor(
    private dictionaryService: DictionaryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initDictionary();
    this.initSearchQuerySubscription();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }

  initDictionary(): void {
    this.dictionaryService.getDictionaryList();
  }

  initSearchQuerySubscription(): void {
    // Update anagram list when user enters new values
    const queryChanges$ = this.anagramFinderForm
      .get('anagramSearchInput')
      ?.valueChanges.pipe(
        debounceTime(100),
        takeUntil(this.destroyed$), // unsubscribes when the component is destroyed
        map((query: string) => cleanWhiteSpacesAndCommas(query)),
        tap((query) => this.query$.next(query))
      );

    queryChanges$?.subscribe((query) => {
      console.log('Searching Matches for', query);
      this.dictionaryService.searchAnagramMatches(query);
    });
  }
}
