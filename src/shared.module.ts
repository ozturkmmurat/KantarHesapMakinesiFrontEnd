import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabeticalPipe } from './app/pipes/alphabeticalPipe/alphabetical.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlphabeticalPipe
  ],
  exports: [
    AlphabeticalPipe
  ]
})
export class SharedModule { }