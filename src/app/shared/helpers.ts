import {FormControl, FormGroup} from "@angular/forms";

export const getControl = (form: FormGroup, control: string): FormControl => {
  return form.get(control) as FormControl;
};
