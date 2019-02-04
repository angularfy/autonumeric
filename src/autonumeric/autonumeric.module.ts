import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgAutonumericComponent } from './autonumeric.component';
import { NgAutonumericDirective } from './autonumeric.directive';

@NgModule({
  declarations: [NgAutonumericComponent, NgAutonumericDirective],
  imports: [CommonModule, FormsModule],
  exports: [NgAutonumericComponent, NgAutonumericDirective]
})
export class NgAutonumericModule {
}

