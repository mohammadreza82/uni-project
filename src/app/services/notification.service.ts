import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private notification: NzNotificationService) {}

  show(type: 'success' | 'error' | 'info' | 'warning', title: string, content: string): void {
    this.notification.create(type, title, content, { nzPlacement: 'bottomRight' });
  }
}
