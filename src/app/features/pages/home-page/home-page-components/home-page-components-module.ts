import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './components/card/card';
import {ButtonComponent} from '../../../../shared/components/ui/button-component/button-component';



@NgModule({
  declarations: [
    Card
  ],
  imports: [
    CommonModule,
    ButtonComponent
  ],
  exports: [
    Card
  ]
})
export class HomePageComponentsModule { }
