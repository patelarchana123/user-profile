import { Component, HostListener } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Validation } from '../validators/validation';
import { RegisterService } from '../service/register.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  submitted = false;
  isChecked: boolean = false;
  password!: boolean;
  allReadyRegistered!: boolean;
  confirmPassword!: boolean;

  // email validation variables
  isUserNameContainNumber: number = 0;
  lengthError: boolean = false;
  patternError: boolean = false;

  // Regex patterns

  // Firstname and Lastname pattern
  namePattern = "^[A-Za-z]+(['?]{0,1}[A-Za-z]+)?$";

  // Password Pattern
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&_!])[A-Za-z0-9@#$&_!]*$';

  private destroy: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: RegisterService,
    private loaderService: LoaderService
  ) {
    this.allReadyRegistered = false;

    // Form builder
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],

        email: ['', [Validators.required]],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern(this.passwordPattern),
          ],
        ],

        confirmPassword: ['', [Validators.required]],
      },
      // password and confirm password match validator
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    this.destroy = new Subject();
  }

  // email validation
  ngOnInit(): void {
    this.form
      .get('email')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((value: string) => {
        let username: string = '';
        if (value.includes('@')) {
          username = value.split('@')[0];
          this.isUserNameContainNumber = Number(username);

          if (username.length > 0) {
            if (username.length < 3 || username.length > 80) {
              this.lengthError = true;
              this.patternError = false;
            } else {
              this.lengthError = false;
            }
          } else {
            if ( value.includes('..') || this.isUserNameContainNumber === +username || value.includes('.@') || value.includes('@.') || value.split('@').length - 1 > 1 || !value.includes('@')
            ) {
              this.patternError = true;
              this.lengthError = false;
            } else {
              this.patternError = false;
            }
          }
        }
        const EMAIL_REGEXP = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]{1,}(?:\.[a-zA-Z]{2,})+$/;
        if ( value.includes('..') || value.includes(' ') || !EMAIL_REGEXP.test(value) || this.isUserNameContainNumber === +username || value.includes('.@') || value.includes('@.') || value.split('@').length - 1 > 1 || !value.includes('@')) {
          this.patternError = true;
          this.lengthError = false;
        } else {
          this.patternError = false;
        }
      });
  }

  // get form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // onclick icon show password and change the icon

  togglePasswordText() {
    this.isChecked = !this.isChecked;
    this.password = this.isChecked;
  }
  toggleConfirmPasswordText() {
    this.isChecked = !this.isChecked;
    this.confirmPassword = this.isChecked;
  }

  // Already regestered users
  removeallReadyRegistered() {
    this.allReadyRegistered = false;
  }

  // method execute on form submit
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader(true);
    this.userService.userRegister(this.form.value).subscribe(
      (res: any) => {
        this.loaderService.showLoader(false);
        this.route.navigate(['/']);
      },

      (error) => {
        this.loaderService.showLoader(false);
        // Handle error
        if (error === 'Email Id Already Exists') {
          this.allReadyRegistered = true;
          return;
        }
      }
    );
  }

  // capitalizeFirstLetter
  capitalizeFirstLetter(controlName: string) {
    const control = this.form.get(controlName);
    let value = control?.value.trim();
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    control?.setValue(value);
  }

  // spaceEvent
  spaceEvent(event: KeyboardEvent) {
    let e = window.event || event;
    let key = event.keyCode;
    // Space pressed
    if (key === 32) {
      e.preventDefault();
    }
  }
// Handle the pasted text 
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  // destroy
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
