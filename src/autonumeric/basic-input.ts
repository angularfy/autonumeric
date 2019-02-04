/**
 * @author Abdelghani AINOUSS
 * @description
 * Basic HTML attributes for numeric component
 */
import {Input} from "@angular/core"


export class BasicInput implements Partial<HTMLInputElement> {

  @Input()
  required: boolean;
  @Input()
  disabled: boolean;
  @Input()
  readonly: boolean;
  @Input()
  title: string;
  @Input()
  placeholder: string;
}
