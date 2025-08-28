import { Component, OnInit } from '@angular/core';
import { FoodReserveService } from '../../services/food-reserve.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-reserve',
  imports: [CommonModule],

  templateUrl: './food-reserve.component.html',
  styleUrls: ['./food-reserve.component.scss'],
})
export class FoodReserveComponent implements OnInit {
  foods: any[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private foodService: FoodReserveService) {}

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.isLoading = true;
    this.foodService.getFoods().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        // فرض می‌کنیم که API یک آرایه از غذاها برمی‌گرداند.
        // ما یک فیلد isReserved را به هر آبجکت اضافه می‌کنیم.
        this.foods = res.map((food: any) => ({ ...food, isReserved: false }));
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Error fetching foods:', err);
        this.errorMessage = 'Could not load food list. Please try again later.';
      }
    });
  }

  reserveFood(foodId: number): void {
    // پیدا کردن غذای مورد نظر در آرایه foods
    const foodItem = this.foods.find(f => f.id === foodId);
    if (!foodItem) {
      return;
    }

    // غیرفعال کردن دکمه برای جلوگیری از کلیک‌های متعدد
    foodItem.isReserved = true; 

    this.foodService.reserveFood(foodId).subscribe({
      next: (res) => {
        // با موفقیت رزرو شد.
        console.log('Food reserved successfully:', res);
        // اگر ظرفیت کم می‌شود، آن را در UI به روز می‌کنیم.
        // foodItem.capacity--;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error reserving food:', err);
        // در صورت خطا، دکمه را دوباره فعال می‌کنیم.
        foodItem.isReserved = false;
        // نمایش پیغام خطا به کاربر
        alert('Failed to reserve food. Please try again.');
      }
    });
  }
}
