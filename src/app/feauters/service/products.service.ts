import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = 'https://fakestoreapi.com/products'
  constructor (private http: HttpClient) {}

  // Products API
  getAllProducts (): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  getProductById (id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  addProduct (product: any): Observable<any> {
    return this.http.post(this.apiUrl, product)
  }
  updateProduct (id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product)
  }
  deleteProduct (id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  // Cart
  addToCart (product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  getCart (): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  }

  clearCart () {
    localStorage.clear()
  }
  deleteFromCart (index: number): void {
    let cart = this.getCart()
    cart = cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}
