import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactForm!: FormGroup //رزعني ايرور وسألت الشات قالي اعمل كده وحرفيا مش فاهم ليه الايرور اصلا
  constructor (private router: Router) {
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ]),
      message: new FormControl('', [Validators.required])
    })
  }
  onSubmit () {
    this.contactForm.markAllAsTouched()
    if (this.contactForm.valid) {
      console.log(this.contactForm.value)
      alert('We Received Your Message Successfully , Thanks For Contact Us')
      this.router.navigate(['/home'])
    } else {
      return
    }
  }
}
