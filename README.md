## ng-autonumeric

An Angular library that wraps the awesome [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) input formatter library

Get in touch on autonumeric@yemlil.com

---

ng-autoNumeric wraps the awesome AutoNumeric library and generate an `<input>` element managed by [AutoNumeric](https://github.com/autoNumeric/autoNumeric/).

**Checkout the [demo](https://codepen.io/ainouss/pen/LqLVXp)**

Alternatively you can check the [examples](#examples) directly in your browser to see how to integrate the component with Vue and AutoNumeric.

*Note: In order to minimize the size of the ng-autonumeric, the AutoNumeric library dependency **is not** bundled with it.*

This means you **need** to include the [AutoNumeric](https://github.com/autoNumeric/autoNumeric/) library.
the autoNumeric is declared as a peeDependency.

## Dependencies
The only two dependencies are [Angular](https://angular.io) and [autoNumeric 4](https://github.com/autoNumeric/autoNumeric/). 
Here is the list of minimal required versions:

| ng-autonumeric | Angular | autoNumeric |
| -------------- | ------- | ------------- |
| 1.x.x          | ^4.0.0  | ^4.0.0        |

## Installation
After installing the above dependencies, install `ng-bootstrap` via:
```shell
npm install --save @ng-bootstrap/ng-bootstrap
```
Once installed you need to import our main module:
```js
import {NgbModule} from '@yemlil/ng-autonumeric';

@NgModule({
  ...
  imports: [Autonumeric, ...],
  ...
})
export class YourAppModule {
}
```


### How to use?

The AutoNumeric component can be instantiated the same way `AutoNumeric` can.

Import the Autonumeric module:
```js

```
```html
<ng-autonumeric
     [(ngModel)]="myValue"
     [options]="myOptions">
</ng-autonumeric>
```

With a predefined option name:
```html
<ng-autonumeric
    [(ngModdel)]="myValue"
    [options]="'French'">
</ng-autonumeric>
```

With multiple option objects/predefined options:
```html
<vue-autonumeric
    v-model="myValue"
    :options="['euro', { minimumValue: '0' }]"
></vue-autonumeric>
```

#### Other props

##### Placeholder

You can define the input placeholder using:
```html
<vue-autonumeric
    v-model="myValue"
    :options="'euro'"
    :placeholder="'Enter your value here'"
></vue-autonumeric>
```

##### Tag

You can also specify the type of html tag (within the [AutoNumeric supported list](https://github.com/autoNumeric/autoNumeric/tree/next#on-other-dom-elements)) this component should generate using the `tag` prop.
By default, an `<input>` element is generated, but if you want a `<div>` element, you can use:
```html
<vue-autonumeric
    v-model="myValue"
    options="euro"
    tag="div"
></vue-autonumeric>
```

*Note: this will automatically set the `contenteditable` attribute to `true` for that generated element.*

#### Integration with other scripts & events support

This wrapper supports setting the AutoNumeric options via an `:options` [prop](https://vuejs.org/v2/guide/components.html#Props).<br>
**It also supports external value changes** (via `aNElement.set(42)` for instance) and update the formatting *and* the [`v-model`](https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model) accordingly.

The `paste`, `drop` and `wheel` events are supported as well.

Moreover, if you modify the `:options` prop, the AutoNumeric settings will be automatically updated with the new options. 

### Caveats

Please note that directly setting a `:value='42'` on the `<vue-autonumeric>` component **will break it** (really!).<br>
Do **NOT** do that:
```html
<vue-autonumeric
    v-model="myValue"
    :options="{ minimumValue: '0' }"
    :value="42042.69" <!-- This fails -->
></vue-autonumeric>
```

### Demo

The official AutoNumeric [documentation](http://autonumeric.org/#/guide) is using this component extensively :)<br>
<br>
An editable live example is available [on Codepen](https://codepen.io/AnotherLinuxUser/pen/pWgOrZ?editors=1010).

#### Examples

You can also check the [shipped examples](https://github.com/autoNumeric/vue-autoNumeric/blob/master/examples/index.html) in your browser, and study their [source here](https://github.com/autoNumeric/vue-autoNumeric/tree/master/examples-src).<br>To do so, first compile the example using:
```bash
# this will build the component *and* the examples
yarn build 
```
Then check the resulting html file in your browser using:
```bash
firefox ./examples/index.html # or `chrome`
```

### Requirements

- [AutoNumeric](https://github.com/autoNumeric/autoNumeric) `^v4`
- [Vue.js](https://github.com/vuejs/vue) `^v2`

### Browser support

This supports the same browsers than AutoNumeric supports:
- Firefox and
- Chrome

*(latest 2 versions)*<br><br>
If you use IE/Edge/Safari/Opera, this *might* work ;)

### Contributing

Whenever you change the source code, you can check how it affects the default examples by first building those in `examples/index.html` with:
```sh
yarn build:examples
```

The [contribution guidelines](https://github.com/autoNumeric/autoNumeric/blob/next/doc/CONTRIBUTING.md) for vue-autoNumeric are the same than for the parent [AutoNumeric](https://github.com/autoNumeric/autoNumeric) project.

### Support

As always, if you find this useful, please consider [supporting its development](https://www.patreon.com/AlexandreBonneau)!<br>
Huge Thanks :)

### License

`vue-autoNumeric` is open-source and released under the [MIT License](https://github.com/autoNumeric/vue-autoNumeric/blob/master/LICENSE).

<br>Copyright © 2019 Abdelghani AINOUSS

> PS:<br>
I would love to know how you're using vue-autonumeric.<br>
Contact and tell me! :)


[downloads-image]: http://img.shields.io/npm/dm/vue-autonumeric.svg
[downloads-url]: http://badge.fury.io/js/vue-autonumeric
[gitter-image]: https://img.shields.io/badge/gitter-autoNumeric%2FautoNumeric-brightgreen.svg
[gitter-url]: https://gitter.im/autoNumeric/vue-autoNumeric
[npm-image]: https://img.shields.io/npm/v/vue-autonumeric.svg
[npm-url]: https://npmjs.org/package/vue-autonumeric
[nodei-image]: https://nodei.co/npm/vue-autonumeric.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://nodei.co/npm/vue-autonumeric
[snyk-image]: https://snyk.io/test/github/autoNumeric/vue-autoNumeric/badge.svg
[snyk-url]: https://snyk.io/test/github/autoNumeric/vue-autoNumeric
