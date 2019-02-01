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
  ViewEncapsulation,
} from '@angular/core';
import {AutonumericOptions} from './autonumeric-options';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import AutoNumeric from 'autonumeric';
import {BasicInput} from './basic-input';

@Component({
  selector: 'app-autonumeric',
  templateUrl: './autonumeric.component.html',
  styleUrls: ['./autonumeric.component.css'],
  encapsulation: ViewEncapsulation.None,
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
  options: AutonumericOptions;
  @Input()
  type: string;
  @Input()
  disabled: boolean;
  @ViewChild('input')
  input: ElementRef;
  instance: any;
  globalInstance: () => void;
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
    if (this.disabled === true) {
      const div = this.renderer.createElement('input');
      this.instance = new AutoNumeric(div, this.options);
    } else {
      this.instance = new AutoNumeric(this.input.nativeElement, this.options);
    }
    this.globalInstance = this.renderer.listen(this.input.nativeElement, 'autoNumeric:formatted', () => {
      this.onFormatted();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }
    this.instance.set(this.ngModel);
  }

  @HostListener('change', ['$event.target.value'])
  handleChage(value) {
    this.writeValue(value);
    if (this.instance) {
      value = this.instance.getNumber();
    }
    this._onChange(value);
    this._onTouched();
  }

  onFormatted() {
    const value = this.instance.getNumber();
    this.format.emit(value);
  }

  @HostListener('blur', ['$event'])
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
  }

  writeValue(obj: any): void {
    this.internal = obj;
  }

  ngOnDestroy(): void {
    let d = () => this.globalInstance();
    d();
  }

}
