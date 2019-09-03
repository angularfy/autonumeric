/**
 * @author Abdelghani AINOUSS
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {NgAutonumericOptionsSelect} from './autonumeric-options-select';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import AutoNumeric from 'autonumeric';
import {BasicInput} from './basic-input';


/**
 * Allowed Tag
 *
 *
 ```
 'input', 'b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample', 'span', 'strong', 'td', 'th', 'u'
 ```
 *
 * ***
 * @example
 *
 ```
 <input [ngAutonumeric]="{
  digitGroupSeparator: ' ',
  decimalCharacter: ',',
  decimalCharacterAlternative: '.',
  currencySymbol: '\u00a0€',
  currencySymbolPlacement: 's',
  roundingMethod: 'U',
  minimumValue: '0'
}" [(ngModel)]="myModel" (format)="onFormat($event)"(change)="onChange($event)" placeholder=''/>
 ```
 * Complete Example: https://stackblitz.com/edit/ng-autonumeric
 *
 * ***
 *
 * To generate selector
 *
 *
 ```
 const allowedTagList = [
 'input', 'b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample', 'span', 'strong', 'td', 'th', 'u'
 ]
 let selector = allowedTagList.join('[ngAutonumeric], ') + '[ngAutonumeric]';
 console.log(selector);
 ```
 *
 */
@Directive({
  selector: 'input[ngAutonumeric], b[ngAutonumeric], caption[ngAutonumeric], cite[ngAutonumeric], code[ngAutonumeric], const[ngAutonumeric], dd[ngAutonumeric], del[ngAutonumeric], div[ngAutonumeric], dfn[ngAutonumeric], dt[ngAutonumeric], em[ngAutonumeric], h1[ngAutonumeric], h2[ngAutonumeric], h3[ngAutonumeric], h4[ngAutonumeric], h5[ngAutonumeric], h6[ngAutonumeric], ins[ngAutonumeric], kdb[ngAutonumeric], label[ngAutonumeric], li[ngAutonumeric], option[ngAutonumeric], output[ngAutonumeric], p[ngAutonumeric], q[ngAutonumeric], s[ngAutonumeric], sample[ngAutonumeric], span[ngAutonumeric], strong[ngAutonumeric], td[ngAutonumeric], th[ngAutonumeric], u[ngAutonumeric]',
  exportAs: 'ngAutonumeric',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgAutonumericDirective),
    multi: true
  }],
})
export class NgAutonumericDirective extends BasicInput implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit, OnDestroy {

  private internal: number | string;
  @Input()
  ngAutonumeric: NgAutonumericOptionsSelect;
  instance: any;
  unlistenFormatted: () => void;
  @Output()
  format = new EventEmitter();
  _onChange = (_) => {
  };
  _onTouched = () => {
  };

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2, private input: ElementRef) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (AutoNumeric === undefined) {
      throw 'AutoNumeric is a peer dependency, please make sure you install it before using this library. Hint : npm install --save autonumeric@latest';
    }
    this.instance = new AutoNumeric(this.input.nativeElement, this.ngAutonumeric);
    this.instance.set(this.internal);
    this.unlistenFormatted = this.renderer.listen(this.input.nativeElement, 'autoNumeric:formatted', ($event) => {
      this.format.emit($event);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }
    if (changes.ngAutonumeric) {
      this.instance.update(this.ngAutonumeric);
    }
  }

  set(value) {
    if (this.instance) {
      this.instance.set(value);
    } else {
      throw 'NgAutonumeric instance not available. try using two binding by providing [(ngModel)]';
    }
  }

  @HostListener('change', ['$event.target.value'])
  handleChange(value) {
    if (this.instance) {
      value = this.instance.getNumber();
    }
    this._onChange(value);
  }


  @HostListener('blur')
  handleTouched() {
    this._onTouched();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.internal = obj;
    if (this.instance) {
      this.instance.set(obj);
    }
  }

  ngOnDestroy(): void {
    if (this.unlistenFormatted) {
      this.unlistenFormatted();
    }
  }
}
