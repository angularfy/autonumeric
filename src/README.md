## @angularfy/autonumeric

An Angular library that wraps the awesome [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library

Get in touch on autonumeric@angularfy.com

---

@angularfy/autonumeric supports most of [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) options.

**Checkout the [demo](https://angularfy-autonumeric.stackblitz.io)**

_Note: In order to minimize the size of the @angularfy/autonumeric, the AutoNumeric library dependency **is not** bundled with it._

This means you **need** to include the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library.

## Dependencies

The dependency is [autoNumeric 4](https://github.com/autoNumeric/autoNumeric/).
Here is the list of minimal required versions:

| @angularfy/autonumeric | angular | autoNumeric |
| ---------------------- | ------- | ----------- |
| 1.x.x                  | ^4.0.0  | ^4.0.0      |
| 2.x.x                  | ^4.0.0  | ^4.0.0      |
| 3.x.x                  | ^4.0.0  | ^4.0.0      |

---

## Installation

After installing the above dependencies, install `@angularfy/autonumeric` via npm:

```shell
npm install --save @angularfy/autonumeric
```

or yarn :

```shell
yarn add @angularfy/autonumeric
```

Once installed you need to import our main module:

```js
import { AutonumericModule } from "@angularfy/autonumeric";

@NgModule({
  //...
  imports: [
    AutonumericModule.forRoot(), // ...
  ],
  //...
})
export class YourAppModule {}
```

---

### How to use the @angularfy/autonumeric ?

The AutoNumeric component can be instantiated the same way `AutoNumeric` can.

After importing the AutonumericModule
in your component, you can define your options as follow :

```ts
this.myOptions = {
  digitGroupSeparator: ".",
  decimalCharacter: ",",
  decimalCharacterAlternative: ".",
  currencySymbol: "\u00a0€",
  currencySymbolPlacement: "s",
  roundingMethod: "U",
  minimumValue: "0",
};
```

in your HTML :

```html
<input [(ngModel)]="myValue" autonumeric [options]="myOptions" />
```

or simply with a predefined option name:

```html
<input autonumeric [(ngModel)]="myValue" options="French" />
```

you can also use object literal as options directly in HTML

```html
<input
  [(ngModel)]="myValue"
  autonumeric
  [options]="{
              digitGroupSeparator: '.',
              decimalCharacter: ',',
              decimalCharacterAlternative: '.',
              currencySymbol: '\u00a0€',
              currencySymbolPlacement: 's',
              roundingMethod: 'U',
              minimumValue: '0'
    }"
/>
```

The library supports also reactive forms.

---

#### Customize autonumeric defaults

You can override autonumeric default by providing default configuration:

```js
import { AutonumericModule } from "@angularfy/autonumeric";

@NgModule({
  //...
  imports: [
    AutonumericModule.forRoot({
      // user defaults here
    }), // ...
  ],
  //...
})
export class YourAppModule {}
```

You can also use providers to achieve this :

```js
const userDefaults: AutonumericOptions = {
  // default options
};
export function defaultsFactory(
  userDefaults: AutonumericOptions
): AutonumericDefaults {
  const defaults: AutonumericDefaults = new AutonumericDefaults();
  Object.assign(defaults, userDefaults);
  return defaults;
}
@NgModule({
  imports: [AutonumericModule],
  providers: [
    {
      provide: USER_DEFAULTS,
      useValue: userDefaults,
    },
    {
      provide: AutonumericDefaults,
      useFactory: defaultsFactory,
      deps: [USER_DEFAULTS],
    },
  ],
})
export class YourAppModule {}
```

#### Supported events

Alongside with native events, autonumeric emits two events : formatted, rawValueModified, those events are bubbled from the
native library. Please refer to official docs for more details

```HTML
<input options="French" autonumeric [(ngModel)]="myModel" (change)="onChange($event)" (formatted)="onFormat($event)" (rawValueModified)="onValueUpdate($event) />
```

If you want to keep your ngModel synchronized please use two-way binding otherwise, you can capture the change or format event.
(format is more verbose, happens every time the input visually changes, the change event in the other hand, is triggered only when the user types something and leaves the input.)

#### Readonly mode

you can use the component in a reardonly mode :

```HTML
<span
    [(ngModel)]="myValue" autonumeric [options]="myOptions">
</span>
```

you can also use an input with {..., readOnly : true } in options.

#### Styling

we are agnostic about how the input should be styled. you can define your own style rules

```css
input[autonumeric],
span[autonumeric] {
  text-align: right;
}
```

#### Integration with other scripts & events support

If some reason you need to access the native autonumeric instance, you can reference your element using
@ViewChild.

```HTML
<input options="French" autonumeric #myNumericField  />
```

in your component :

```ts
 @ViewChild('myNumericField', { static: true })
 myNumericField:AutonumericDirective;

...
reset(){
    this.myNumericField.instance.reset();
}
set(val:any){
    this.myNumericField.instance.set(val);
}

...
```

### Demo

The official AutoNumeric [documentation](http://autonumeric.org/#/guide)

### Requirements

- [AutoNumeric](https://github.com/autoNumeric/autoNumeric) `^v4`
- [Angular](https://angular.io/) `^v4`

### Browser support

This supports the same browsers than AutoNumeric supports:

- Firefox and
- Chrome

_(latest 2 versions)_
If you use IE/Edge/Safari/Opera, this _might_ work ;)

### What's next ?

I will be working on supporting more AutoNumeric options. If you have any suggestions please feel free to reach by email bellow.

### Greetings

This project is hugely inspired from [vue-js implementtation of AutoNumeric](https://github.com/autoNumeric/vue-autoNumeric) by [Alexandre Bonneau](https://github.com/AlexandreBonneau)

### Support

As always, if you find this useful, please consider [supporting its development](https://www.patreon.com/ainouss)!
Huge Thanks :)

### License

`@angularfy/autonumeric` is open-source and released under the [MIT License]

> PS:
> I would love to know how you're using @angularfy/autonumeric.
> Contact and tell me!, abdelghani@ainouss.fr :)
