import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./feauters/main-components/home/home.component').then(
        c => c.HomeComponent
      )
  },
  {
    path: 'products',
    loadComponent: () =>
      import(
        './feauters/main-components/allProductsFiles/products/products.component'
      ).then(c => c.ProductsComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./feauters/main-components/contact-us/contact-us.component').then(
        c => c.ContactUsComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feauters/main-components/login/login.component').then(
        c => c.LoginComponent
      )
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./feauters/main-components/cart/cart.component').then(
        c => c.CartComponent
      )
  },
  {
    path: 'add',
    loadComponent: () =>
      import(
        './feauters/main-components/allProductsFiles/add-product/add-product.component'
      ).then(c => c.AddProductComponent)
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import(
        './feauters/main-components/allProductsFiles/update-product/update-product.component'
      ).then(c => c.updateFormComponent)
  }
]
