import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnagramFinderComponent } from './anagram-finder/anagram-finder.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AnagramFinderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
