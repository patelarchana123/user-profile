import { AbstractControl } from '@angular/forms';

export class Validation {
    static match(controlName: string, checkControlName : string)
    {
        
        return (controls : AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);
            
            if(checkControl?.errors && !checkControl.errors['matching'])
            {
                return null;
            }
            if(checkControl?.value !== control?.value)
            {
                controls.get(checkControlName)?.setErrors({ matching: true});
                return;
            }
            else if(control?.value == checkControl?.value)
            {
                controls.get(checkControlName)?.setErrors(null);
                return;
            }
            else
            {
                return null;
            }
        };
    }
}
