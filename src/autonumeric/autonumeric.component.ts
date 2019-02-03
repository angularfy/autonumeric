/**
 * @author Abdelghani AINOUSS
 * abdelghani@ainouss.fr
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
  ViewChild,
} from '@angular/core';
import {AutonumericOptionsSelect} from './autonumeric-options-select';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import AutoNumeric from 'autonumeric';
import {BasicInput} from './basic-input';

@Component({
  selector: 'ng-autonumeric',
  templateUrl: './autonumeric.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutonumericComponent),
    multi: true
  }]
})
export class AutonumericComponent extends BasicInput implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input()
  ngModel: number | string;
  @Input()
  options: AutonumericOptionsSelect;
  @Input()
  type: string;
  @ViewChild('input')
  input: ElementRef;
  instance: any;
  unlistenFormatted: () => void;
  internal: string;
  @Output()
  format = new EventEmitter();
  _onChange = (_) => {
  };
  _onTouched = () => {
  };

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.instance = new AutoNumeric(this.input.nativeElement, this.options);
    this.instance.set(this.ngModel);
    this.unlistenFormatted = this.renderer.listen(this.input.nativeElement, 'autoNumeric:formatted', ($event) => {
      this.onFormatted($event);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }
    if (changes.ngModel) {
      this.instance.set(this.ngModel);
    }
  }

  @HostListener('change', ['$event.target.value'])
  handleChange(value) {
    this.writeValue(value);
    if (this.instance) {
      value = this.instance.getNumber();
    }
    this._onChange(value);
    this._onTouched();
  }

  onFormatted($event) {
    this.format.emit($event);
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
    if (this.instance) {
      this.internal = this.instance.getFormatted();
    }
  }

  ngOnDestroy(): void {
    this.unlistenFormatted();
  }
}
