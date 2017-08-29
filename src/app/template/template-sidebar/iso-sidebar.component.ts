import { Component } from '@angular/core';
import { ListService } from '../../shared/components/list/list.service';
import { IsoService } from '../shared';
import { BaseTemplateSidebarComponent } from './base-template-sidebar.component';
import { DateTimeFormatterService } from '../../shared/services/date-time-formatter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'cs-iso-sidebar',
  templateUrl: './base-template-sidebar.component.html',
  styleUrls: ['./base-template-sidebar.component.scss']
})
export class IsoSidebarComponent extends BaseTemplateSidebarComponent {
  constructor(
    service: IsoService,
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
