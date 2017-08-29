import { Component } from '@angular/core';
import { TemplateService } from '../shared';
import { BaseTemplateSidebarComponent } from './base-template-sidebar.component';
import { ListService } from '../../shared/components/list/list.service';
import { DateTimeFormatterService } from '../../shared/services/date-time-formatter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'cs-template-sidebar',
  templateUrl: './base-template-sidebar.component.html',
  styleUrls: ['./base-template-sidebar.component.scss']
})
export class TemplateSidebarComponent extends BaseTemplateSidebarComponent {
  constructor(
    service: TemplateService,
    dateTimeFormatterService: DateTimeFormatterService,
    route: ActivatedRoute,
    router: Router,
    listService: ListService,
    notificationService: NotificationService
  ) {
    super(
      service,
      dateTimeFormatterService,
      route,
      router,
      listService,
      notificationService,
    );
  }
}
