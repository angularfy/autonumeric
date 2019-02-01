/**
 * @author Abdelghani AINOUSS
 * @description
 * Basic HTML attributes for numeric component
 */
import { Input } from "@angular/core"


export class BasicInput {
  @Input()
  max: number;
  @Input()
  min: number;
  @Input()
  required: boolean;
  @Input()
  disabled: boolean;
  @Input()
  readonly: boolean;
  @Input()
  title: string;
}
