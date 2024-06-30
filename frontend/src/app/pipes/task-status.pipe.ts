import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../enums/task-status.enum';

@Pipe({
    standalone: true,
    name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

    transform(status: TaskStatus): string {
        switch (status) {
            case TaskStatus.PENDING:
                return 'danger';
            case TaskStatus.ACCEPTED:
                return 'warning';
            case TaskStatus.COMPLETED:
                return 'success';
        }
    }
}