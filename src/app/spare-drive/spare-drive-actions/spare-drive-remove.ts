import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Volume } from '../../shared/models/volume.model';
import { SpareDriveAction } from './spare-drive-action';


@Injectable()
export class SpareDriveRemoveAction extends SpareDriveAction {
  public name = 'DELETE';
  public icon = 'delete';

  public activate(volume: Volume): Observable<any> {
    return this.dialogService.confirm('CONFIRM_DELETE_VOLUME', 'NO', 'YES')
      .onErrorResumeNext()
      .do(() => this.jobsNotificationService.finish({message: 'VOLUME_DELETE_IN_PROGRESS'}))
      .switchMap(() => this.volumeService.remove(volume))
      .map(() => this.jobsNotificationService.finish({message: 'VOLUME_DELETE_DONE'}))
      .catch(error => {
        this.dialogService.alert(error);
        this.jobsNotificationService.fail({message: 'VOLUME_DELETE_FAILED'});
        return Observable.throw(error);
      });
  }
}