import {Component, ViewChild} from '@angular/core';
import AutoNumeric from 'autonumeric';
import {AutonumericComponent} from './autonumeric/autonumeric.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  myModel = null;
  options = {
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    decimalCharacterAlternative: '.',
    currencySymbol: ' \u202f€',
    currencySymbolPlacement: AutoNumeric.options.currencySymbolPlacement.suffix,
    roundingMethod: AutoNumeric.options.roundingMethod.halfUpSymmetric,
  };
  @ViewChild('numeric')
  numeric: AutonumericComponent;

  constructor() {
    setInterval(() => {
      this.myModel = Math.random() * Math.random() * Math.random() * 10000;
    }, 2000);
    setTimeout(() => {
      this.numeric.ngOnDestroy();
    }, 10000);
  }

  onChange($event) {
    console.log('change:::', this.myModel);
  }

  onFormat($event) {
    console.log('format', this.myModel);
  }
}
