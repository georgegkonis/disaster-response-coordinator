import { Pipe } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
    standalone: true,
    name: 'person'
})
export class PersonPipe {

    transform(user: User): string {
        return user.details ? `${user.details.firstName} ${user.details.lastName} (${user.username})` : `${user.username}`;
    }
}