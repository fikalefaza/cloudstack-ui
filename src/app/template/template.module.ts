import { MdlModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdSelectModule,
  MdTooltipModule,
  MdMenuModule,
  MdButtonModule,
  MdIconModule,
  MdTabsModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicModule } from 'ng-dynamic-component';

import { SharedModule } from '../shared/shared.module';
import { TagsModule } from '../tags/tags.module';
import { IsoAttachmentComponent } from './iso-attachment/iso-attachment.component';
import { IsoService, TemplateService } from './shared';
import { TemplateActionsService } from './shared/template-actions.service';
import { TemplateCreationComponent } from './template-creation/template-creation.component';
import { TemplateFilterListComponent } from './template-filter-list/template-filter-list.component';
import { TemplateFiltersComponent } from './template-filters/template-filters.component';
import { TemplateCardListComponent } from './template-list/template-card-list.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplatePageComponent } from './template-page/template-page.component';
import { templatesRouting } from './template.routing';
import { TemplateComponent } from './template/template.component';
import { TemplateSidebarComponent } from './template-sidebar/template-sidebar.component';
import { IsoSidebarComponent } from './template-sidebar/iso-sidebar.component';
import { TemplateTagsComponent } from './template-tags/template-tags.component';
import { ClipboardModule } from 'ngx-clipboard/dist';
import { TemplateFilterListSelectorComponent } from './template-filter-list/template-filter-list-selector.component';
import { TemplateCreationDialogComponent } from './template-creation/template-creation-dialog.component';
import { TemplateZonesComponent } from './template-sidebar/zones/template-zones.component';
import { IsoZonesComponent } from './template-sidebar/zones/iso-zones.component';
import { TemplateDetailsComponent } from './template-sidebar/details/template-details.component';
import { IsoDetailsComponent } from './template-sidebar/details/iso-details.component';
import { IsoTagsComponent } from './template-tags/iso-tags.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicModule.withComponents([TemplateComponent]),
    TranslateModule,
    MdTooltipModule,
    MdlModule,
    MdSelectModule,
    SharedModule,
    TagsModule,
    ClipboardModule,
    templatesRouting,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdTabsModule,
  ],
  declarations: [
    TemplateSidebarComponent,
    IsoSidebarComponent,
    IsoAttachmentComponent,
    TemplateComponent,
    TemplateCreationComponent,
    TemplateCreationDialogComponent,
    TemplateFiltersComponent,
    TemplateListComponent,
    TemplateCardListComponent,
    TemplateFilterListComponent,
    TemplateFilterListSelectorComponent,
    TemplatePageComponent,
    TemplateTagsComponent,
    IsoTagsComponent,
    TemplateZonesComponent,
    IsoZonesComponent,
    TemplateDetailsComponent,
    IsoDetailsComponent
  ],
  exports: [
    TemplateFilterListSelectorComponent,
    TemplateFilterListComponent
  ],
  providers: [
    IsoService,
    TemplateService,
    TemplateActionsService
  ],
  entryComponents: [
    IsoAttachmentComponent,
    TemplateCreationComponent
  ]
})
export class TemplateModule {
}
