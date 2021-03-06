import { Component, Inject, OnInit } from '@angular/core';

import { Template } from '../../../template/shared';
import { BaseTemplateModel } from '../../../template/shared/base-template.model';
import { Iso } from '../../../template/shared/iso.model';
import { TemplateFilterListComponent } from '../../../template/template-filter-list/template-filter-list.component';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';


@Component({
  selector: 'cs-vm-creation-template-dialog',
  templateUrl: 'vm-template-dialog.component.html',
  styleUrls: ['../../../shared/styles/iso-dialog.scss']
})
export class VmTemplateDialogComponent extends TemplateFilterListComponent implements OnInit {
  public _selectedTemplate: BaseTemplateModel;
  public preselectedTemplate: Template;
  public templates: Array<Template>;
  public isos: Array<Iso>;
  public zoneId: string;

  constructor(
    @Inject(MD_DIALOG_DATA) data,
    private dialogRef: MdDialogRef<VmTemplateDialogComponent>
  ) {
    super();

    this.preselectedTemplate = data.template;
    this.templates = data.templates;
    this.isos = data.isos;
    this.zoneId = data.zoneId;
  }

  public ngOnInit(): void {
    this.selectedTemplate = this.preselectedTemplate;
  }

  public get typeOfSelectedSource(): 'Iso' | 'Template' {
    if (this.selectedTemplate instanceof Iso) {
      return 'Iso';
    }
    if (this.selectedTemplate instanceof Template) {
      return 'Template';
    }
  }

  public get selectedTemplate(): BaseTemplateModel {
    return this._selectedTemplate;
  }

  public set selectedTemplate(template: BaseTemplateModel) {
    this._selectedTemplate = template;
  }

  public onOk(): void {
    this.dialogRef.close(this.selectedTemplate);
  }

  public onCancel(): void {
    this.dialogRef.close(this.preselectedTemplate);
  }
}
