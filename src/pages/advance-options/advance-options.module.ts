import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvanceOptionsPage } from './advance-options';

@NgModule({
  declarations: [
    AdvanceOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvanceOptionsPage),
  ],
  exports: [
    AdvanceOptionsPage
  ]
})
export class AdvanceOptionsPageModule {}
