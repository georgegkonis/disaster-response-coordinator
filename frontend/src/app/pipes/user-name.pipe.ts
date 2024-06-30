import { Pipe } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
    standalone: true,
    name: 'userName'
})
export class UserNamePipe {

    transform(user: User): string {
        return user.details ? `${user.details.firstName} ${user.details.lastName} (${user.username})` : `${user.username}`;
    }
}