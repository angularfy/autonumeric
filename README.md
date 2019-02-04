## ng-autonumeric

An Angular library that wraps the awesome [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) input formatter library

Get in touch on autonumeric@angularfy.com

---

ng-autoNumeric wraps the awesome AutoNumeric library and generate an `<input>` element managed by [AutoNumeric](https://github.com/autoNumeric/autoNumeric/).

**Checkout the [demo](https://codepen.io/ainouss/pen/LqLVXp)**

*Note: In order to minimize the size of the ng-autonumeric, the AutoNumeric library dependency **is not** bundled with it.*

This means you **need** to include the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library.

## Dependencies

The only two dependencies are [Angular](https://angular.io) and [autoNumeric 4](https://github.com/autoNumeric/autoNumeric/). 
Here is the list of minimal required versions:

| ng-autonumeric | angular | autoNumeric   |
| -------------- | ------- | ------------- |
| 1.x.x          | ^4.0.0  | ^4.0.0        |

## Installation

After installing the above dependencies, install `ng-autonumeric` via npm:

```shell
npm install --save @angularfy/ng-autonumeric
```
or yarn :

```shell
yarn add @angularfy/ng-autonumeric
```

Once installed you need to import our main module:
```js
import { NgAutonumericModule } from '@angularfy/ng-autonumeric';

@NgModule({
  ...
  imports: [NgAutonumericModule, ...],
  ...
})
export class YourAppModule {
}
```

### How to use the NgAutonumericComponent ?

The AutoNumeric component can be instantiated the same way `AutoNumeric` can.

After importing the NgAutonumericModule, in your component, you can define your options as follow :
```js
this.myOptions = {
  digitGroupSeparator: '.',
  decimalCharacter: ',',
  decimalCharacterAlternative: '.',
  currencySymbol: '\u00a0€',
  currencySymbolPlacement: 's',
  roundingMethod: 'U',
  minimumValue: '0'
}

```
in your HTML :
```html
<ng-autonumeric
     [(ngModel)]="myValue"
     [options]="myOptions">
</ng-autonumeric>
```

or simply with a predefined option name:
```html
<ng-autonumeric
    [(ngModdel)]="myValue"
    [options]="'French'">
</ng-autonumeric>
```

you can also use object literal as options directly in HTML 

```html
<ng-autonumeric
    [(ngModdel)]="myValue"
    [options]="{
              digitGroupSeparator: '.',
              decimalCharacter: ',',
              decimalCharacterAlternative: '.',
              currencySymbol: '\u00a0€',
              currencySymbolPlacement: 's',
              roundingMethod: 'U',
              minimumValue: '0'
    }">
</ng-autonumeric>
```
#### How to use the NgAutonumericDirective (since v1.0.1)

for better integration with input tag, we provide a directive :

``` HTML
<input [ngAutonumeric]="'French'" ngAutonumeric [(ngModel)]="myModel" (change)="onChange($event)" (format)="onFormat($event)"  />
```
If you want to keep your ngModel synchronized please use two-way binding otherwise, you can capture the change or format event.
(format is more verbose, happens every time the input visually changes, the change event in the other hand, is triggered only when the user types something and leaves the input.)

#### Readonly mode 

you can use the component in a reardonly mode :
``` HTML
<ng-autonumeric
    [(ngModdel)]="myValue"
    [options]="myOptions" [readonly]="true">
</ng-autonumeric>
```
in this case, we use a hidden input to instantiate the component & a span tag to display the value.


#### Styling 
we are agnostic about how the input should be styled. you can define your own style rules
```css
ng-autonumeric input{
    text-align:right;
}

```
#### Integration with other scripts & events support

This wrapper supports setting the AutoNumeric options via an `options`
**It also supports external value changes** (via `myComponent.set(42)` for instance) and update the formatting *and* the [`ngModel`]  accordingly.

The `paste`, `drop` and `wheel` events are supported as well.

Moreover, if you modify the `options` attribute, the AutoNumeric settings will be automatically updated with the new options. 

### Demo

The official AutoNumeric [documentation](http://autonumeric.org/#/guide) 


### Requirements

- [AutoNumeric](https://github.com/autoNumeric/autoNumeric) `^v4`
- [Angular](https://angular.io/) `^v4`

### Browser support

This supports the same browsers than AutoNumeric supports:
- Firefox and
- Chrome

*(latest 2 versions)*
If you use IE/Edge/Safari/Opera, this *might* work ;)

### What's next ? 

I will be working on supporting more AutoNumeric events (only autonumeric:formatted is supported for now). If you have any suggestions please feel free to reach by email bellow.

### Greetings

This project is hugely inspired from [vue-js implementtation of AutoNumeric](https://github.com/autoNumeric/vue-autoNumeric) by [Alexandre Bonneau](https://github.com/AlexandreBonneau)


### Support

As always, if you find this useful, please consider [supporting its development](https://www.patreon.com/ainouss)!
Huge Thanks :)

### License

`ng-autonumeric` is open-source and released under the [MIT License]

Copyright © 2019 Abdelghani AINOUSS

> PS:
I would love to know how you're using ng-autonumeric.
Contact and tell me!, abdelghani@ainouss.fr :)

