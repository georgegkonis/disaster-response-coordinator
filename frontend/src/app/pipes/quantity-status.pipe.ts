import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'quantityStatus'
})
export class QuantityStatusPipe implements PipeTransform {

    transform(quantity: number, option: 'message' | 'severity'): string {
        if (quantity > 50) {
            return option === 'message' ? 'In Stock' : 'success';
        } else if (quantity > 0) {
            return option === 'message' ? 'Low Stock' : 'warning';
        } else {
            return option === 'message' ? 'Out of Stock' : 'danger';
        }
    }
}