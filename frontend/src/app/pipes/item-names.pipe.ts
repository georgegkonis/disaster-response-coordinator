import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
    standalone: true,
    name: 'itemNames'
})
export class ItemNamesPipe implements PipeTransform {

    transform(items: Item[]): string {
        return items.map(item => item.name).join(', ');
    }
}