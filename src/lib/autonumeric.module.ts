import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {AutonumericOptions} from "./autonumeric.model";
import {AutonumericDefaults} from "./autonumeric-defaults.service";
import {AutonumericDirective} from "./autonumeric.directive";
import {CommonModule} from '@angular/common';

export const USER_DEFAULTS = new InjectionToken('autonumeric defaults');

export function defaultsFactory(userDefaults: AutonumericOptions): AutonumericDefaults {
    const defaults: AutonumericDefaults = new AutonumericDefaults();
    Object.assign(defaults, userDefaults);
    return defaults;
}

@NgModule({
    imports: [CommonModule],
    declarations: [AutonumericDirective],
    exports: [AutonumericDirective]
})
export class AutonumericModule {
    static forRoot(userDefaults: AutonumericOptions = {}): ModuleWithProviders {
        return {
            ngModule: AutonumericModule,
            providers: [
                {
                    provide: USER_DEFAULTS,
                    useValue: userDefaults
                },
                {
                    provide: AutonumericDefaults,
                    useFactory: defaultsFactory,
                    deps: [USER_DEFAULTS]
                }
            ]
        };
    }
}
