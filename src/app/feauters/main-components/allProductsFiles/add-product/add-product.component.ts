import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { ProductsService } from '../../../service/products.service'

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [ProductsService]
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup
  product: any = {}
  constructor (
    private ProductsService: ProductsService,
    private router: Router
  ) {
    this.addForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(parseInt(''), [
        Validators.required,
        Validators.min(1),
        Validators.max(500000)
      ])
    })
  }
  ngOnInit (): void {
    this.addProduct()
  }
  addProduct () {
    this.ProductsService.addProduct(this.product).subscribe({
      next: data => {
        this.product = data
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }

  onSubmit () {
    this.addForm.markAllAsTouched()
    if (this.addForm.valid) {
      console.log(this.addForm.value)
      alert('What a product, that’s a masterpiece!😱💥"')
      this.router.navigate(['/products'])
    } else {
      return
    }
  }
}
