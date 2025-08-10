import { Component, OnInit } from '@angular/core'
import { ProductsService } from '../../../service/products.service'
import { HttpClientModule } from '@angular/common/http'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  products: any[] = []
  constructor (
    private ProductsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit (): void {
    this.getAllProducts()
  }
  getAllProducts () {
    this.ProductsService.getAllProducts().subscribe({
      next: data => {
        this.products = data
        console.log(this.products)
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }

  deleteProduct (id: number) {
    this.ProductsService.deleteProduct(id).subscribe({
      next: () => {
        alert('Item Deleted Successfully')
        this.getAllProducts()
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log('Complete')
      }
    })
  }
  addProduct () {
    this.router.navigate(['add'])
  }
  updateProduct (id: number) {
    this.router.navigate(['update/', id])
  }
  addToCart (product: any) {
    this.ProductsService.addToCart(product)
    alert('Great choice! Go to the shopping cart to complete the purchase.')
  }

  isExpanded: { [key: number]: boolean } = {}
  toggleExpand (productId: number): void {
    this.isExpanded[productId] = !this.isExpanded[productId]
  }
}
