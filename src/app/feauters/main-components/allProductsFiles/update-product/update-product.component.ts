import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ProductsService } from '../../../service/products.service'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { title } from 'node:process'

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  providers: [ProductsService]
})
export class updateFormComponent implements OnInit {
  updateForm: FormGroup
  productId: number = 0
  constructor (
    private ProductsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })
  }
  ngOnInit (): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']
      this.getProductById(this.productId)
    })
  }
  getProductById (id: number) {
    this.ProductsService.getProductById(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.updateForm.patchValue({
          title: data.title,
          description: data.description,
          price: data.price
        })
      }
    })
  }
  onSubmit () {
    // this.updateForm.markAllAsTouched()
    if (this.updateForm.valid) {
      this.ProductsService.updateProduct(
        this.productId,
        this.updateForm.value
      ).subscribe({
        next: () => {
          alert('The Product Is Updated!✅')
          console.log(this.updateForm.value)

          this.router.navigate(['/products'])
        },
        error: err => {
          console.log(err)
        },
        complete: () => {
          console.log('Complete')
        }
      })
    } else {
      return
    }
  }
}
