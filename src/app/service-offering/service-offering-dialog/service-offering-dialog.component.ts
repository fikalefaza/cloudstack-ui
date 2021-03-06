import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ServiceOffering } from '../../shared/models/service-offering.model';
import { ServiceOfferingFilterService } from '../../shared/services/service-offering-filter.service';
import { VirtualMachine } from '../../vm/shared/vm.model';
import { ZoneService } from '../../shared/services/zone.service';
import { VmChangeServiceOfferingAction } from '../../vm/vm-actions/vm-change-service-offering';
import { CustomServiceOfferingService } from '../custom-service-offering/service/custom-service-offering.service';
import { Observable } from 'rxjs/Observable';
import { ICustomOfferingRestrictions } from '../custom-service-offering/custom-offering-restrictions';
import { ServiceOfferingService } from '../../shared/services/service-offering.service';
import { Zone } from '../../shared/models';


@Component({
  selector: 'cs-service-offering-dialog',
  templateUrl: 'service-offering-dialog.component.html',
  styleUrls: ['service-offering-dialog.component.scss'],
})
export class ServiceOfferingDialogComponent implements OnInit {
  public serviceOffering: ServiceOffering;
  public serviceOfferings: Array<ServiceOffering>;
  public loading: boolean;
  public virtualMachine: VirtualMachine;

  public restrictions$: Observable<ICustomOfferingRestrictions>;

  constructor(
    @Inject(MD_DIALOG_DATA) data,
    public dialogRef: MdDialogRef<ServiceOfferingDialogComponent>,
    public customServiceOfferingService: CustomServiceOfferingService,
    private serviceOfferingService: ServiceOfferingService,
    private serviceOfferingFilterService: ServiceOfferingFilterService,
    private vmChangeServiceOfferingAction: VmChangeServiceOfferingAction,
    private zoneService: ZoneService
  ) {
    this.restrictions$ = this.getRestrictions();
    this.virtualMachine = data.virtualMachine;
  }

  public ngOnInit(): void {
    this.zoneService.get(this.virtualMachine.zoneId)
      .switchMap(zone => this.fetchData(zone))
      .do(offerings => this.serviceOfferings = offerings)
      .switchMap(offerings => this.getDefaultServiceOffering(offerings))
      .subscribe(offering => this.serviceOffering = offering);
  }

  public updateOffering(offering: ServiceOffering): void {
    this.serviceOffering = offering;
  }

  public onChange(): void {
    this.loading = true;
    this.vmChangeServiceOfferingAction.activate(
      this.virtualMachine,
      { serviceOffering: this.serviceOffering }
    )
      .finally(() => this.loading = false)
      .subscribe(() => this.dialogRef.close(this.serviceOffering));
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private fetchData(zone: Zone): Observable<Array<ServiceOffering>> {
    return this.serviceOfferingFilterService.getAvailableByResources({ zone })
      .map(availableOfferings => {
        return !!this.virtualMachine.serviceOffering
          ? availableOfferings.filter(
            offering =>
              offering.id !== this.virtualMachine.serviceOffering.id)
          : availableOfferings;
      })
      .switchMap(offerings => {
        const offeringsWithSetParams = offerings.map(offering => {
          if (!offering.isCustomized) {
            return Observable.of(offering);
          }

          return this.customServiceOfferingService.getCustomOfferingWithSetParams(
            offering,
            zone.id
          );
        });

        return Observable.forkJoin(offeringsWithSetParams);
      });
  }

  private getRestrictions(): Observable<ICustomOfferingRestrictions> {
    return this.customServiceOfferingService
      .getCustomOfferingRestrictionsByZone()
      .map(restrictions => restrictions[this.virtualMachine.zoneId]);
  }

  private getDefaultServiceOffering(offerings: Array<ServiceOffering>): Observable<ServiceOffering> {
    return this.zoneService.get(this.virtualMachine.zoneId)
      .switchMap(zone => this.serviceOfferingService.getDefaultServiceOffering(zone))
      .map(offering => {
        const defaultOffering = offerings.find(_ => _.id === offering.id);
        return defaultOffering || offerings[0];
      });
  }
}
