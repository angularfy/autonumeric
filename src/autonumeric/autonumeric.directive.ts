/**
 * @author Abdelghani AINOUSS
 */

import {
    ChangeDetectorRef,
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
    Directive,
    AfterViewInit,
} from '@angular/core';
import { NgAutonumericOptionsSelect } from './autonumeric-options-select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import AutoNumeric from 'autonumeric';
import { BasicInput } from './basic-input';

@Directive({
    selector: 'input[ngAutonumeric]',
    exportAs: 'ngAutonumeric',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgAutonumericDirective),
        multi: true
    }],
})
export class NgAutonumericDirective extends BasicInput implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit, OnDestroy {

    @Input()
    ngModel: number | string;
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
            throw "AutoNumeric is a peer dependency, please make sure you install it before using this library. Hint : npm install --save autonumeric@latest";
        }
        this.instance = new AutoNumeric(this.input.nativeElement, this.ngAutonumeric);
        setTimeout(()=>{
            this.instance.set(this.ngModel);
        },0);
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
        if (changes.ngAutonumeric) {
            this.instance.update(this.ngAutonumeric);
        }
    }

    set(value) {
        if (this.instance) {
            this.instance.set(value);
        } else throw 'NgAutonumeric instance not available. try using two binding by providing [(ngModel)]';
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
        let value = $event;
        if (this.instance) {
            value = this.instance.getFormatted()
        }
        this.format.emit(value);
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
        this.ngModel = obj;
    }

    ngOnDestroy(): void {
        if (this.unlistenFormatted)
            this.unlistenFormatted();
    }
}