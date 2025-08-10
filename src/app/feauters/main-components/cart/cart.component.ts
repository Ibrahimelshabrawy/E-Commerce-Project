import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { ProductsService } from '../../service/products.service'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [ProductsService]
})
export class CartComponent implements OnInit {
  cartProducts: any[] = []
  constructor (
    private ProductsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit (): void {
    this.cartProducts = this.ProductsService.getCart()
  }

  buyNow (index: number) {
    alert('✅ Successful purchase! Thank you for using our store.')
    this.cartProducts.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  }
  deleteFromCart (index: number) {
    alert('deleted')
    this.cartProducts.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  }
  deleteCart () {
    this.ProductsService.clearCart()
    alert('Cart Is Empty')
    this.cartProducts = []
  }

  isExpanded: { [key: number]: boolean } = {}
  toggleExpand (productId: number): void {
    this.isExpanded[productId] = !this.isExpanded[productId]
  }
}
