import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SgTemplateCreationComponent } from './sg-template-creation.component';
import { SecurityGroup } from '../sg.model';
import { SgRulesComponent } from '../sg-rules/sg-rules.component';
import { NotificationService } from '../../shared/services/notification.service';
import { ListService } from '../../shared/components/list/list.service';

@Component({
  selector: 'cs-sg-template-create-dialog',
  template: ``
})
export class SgTemplateCreationDialogComponent implements OnInit {
  constructor(
    private dialog: MdDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private listService: ListService
  ) {
  }

  ngOnInit() {
    this.dialog.open(SgTemplateCreationComponent, <MdDialogConfig>{
      disableClose: true,
      width: '450px'
    }).afterClosed()
      .subscribe((template: SecurityGroup) => {
        if (!template) {
          this.router.navigate(['../'], {
            preserveQueryParams: true,
            relativeTo: this.activatedRoute
          });

          return;
        }
        this.listService.onUpdate.emit(template);
        this.notificationService.message({
          translationToken: 'TEMPLATE_CREATED',
          interpolateParams: { name: template.name }
        });
        this.showRulesDialog(template);
      });
  }

  public showRulesDialog(group: SecurityGroup): void {
    this.dialog.open(SgRulesComponent, <MdDialogConfig>{
      width: '880px',
      data: {securityGroup: group}
    }).afterClosed()
      .subscribe(() => {
        this.router.navigate(['../'], {
          preserveQueryParams: true,
          relativeTo: this.activatedRoute
        });
      });
  }
}
