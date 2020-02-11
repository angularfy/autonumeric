import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import AutoNumeric from 'autonumeric';
import {AutonumericDefaults} from './autonumeric-defaults.service';
import {AutonumericOptions} from "./autonumeric.model";

export const AUTONUMERIC_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutonumericDirective),
    multi: true
};

@Directive({
    selector: '[autonumeric]',
    providers: [AUTONUMERIC_CONTROL_VALUE_ACCESSOR],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(blur)': 'onTouchedFn()'
    }
})
export class AutonumericDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

    /* Defines the strategy to apply when options change.
     * reset will drop any previous options
     * update will change old values one by one but keep those that are not mentioned in the new options
     */
    @Input()
    strategy: 'reset' | 'update' = 'reset';

    @Input()
    options: AutonumericOptions;

    instance: any;
    private isDisabled = false;
    private initialValue: any;
    unsubscribeFormat: () => void;
    unsubscribeRawValueModified: () => void;
    @Output()
    formatted = new EventEmitter();
    @Output()
    rawValueModified = new EventEmitter();
    onChangeFn: (value: any) => void = () => {
    };

    onTouchedFn = () => {
    };

    constructor(
        private elm: ElementRef,
        private defaults: AutonumericDefaults,
        private renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
        this.unsubscribeFormat = this.renderer.listen(this.elm.nativeElement, 'autoNumeric:formatted', ($event) => {
            this.formatted.emit($event);
        });
        this.unsubscribeRawValueModified = this.renderer.listen(this.elm.nativeElement, 'autoNumeric:rawValueModified', ($event) => {
            this.onChangeFn($event.detail.newRawValue);
            this.rawValueModified.emit($event);
        });
    }

    private normalize() {
        Object.keys(AutoNumeric.options).forEach(key => {
            this.options = this.options || {};
            if (typeof this.options[key] === 'undefined') {
                this.options[key] = (this.defaults as any)[key];
            }
        });
    }

    ngAfterViewInit(): void {
        this.normalize();
        this.instance = new AutoNumeric(
            this.elm.nativeElement,
            this.options
        );
        this.setDisabledState(this.isDisabled);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.instance) {
            return;
        }
        if (changes.options) {
            if (this.strategy === 'reset') {
                this.instance.options.reset();
            }
            this.normalize();
            this.instance.update(this.options);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeFormat();
        this.unsubscribeRawValueModified();
        try {
            this.instance.remove(); // remove listeners
        } catch (e) {
        }
    }

    writeValue(value: any): void {
        if (this.instance) {
            this.instance.set(value);
        } else {
            // autonumeric hasn't been initialised yet, store the value for later use
            this.initialValue = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
        if (this.instance) {
            if (this.isDisabled) {
                this.renderer.setProperty(this.instance.domElement, 'disabled', 'disabled');
            } else {
                this.renderer.removeAttribute(this.instance.domElement, 'disabled');
            }
        }
    }
}
