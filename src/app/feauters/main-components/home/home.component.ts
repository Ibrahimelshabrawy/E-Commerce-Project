import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductsService],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.ProductsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
