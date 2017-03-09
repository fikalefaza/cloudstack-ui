import { Component, OnInit } from '@angular/core';
import { MdlDefaultTableModel } from 'angular2-mdl';
import { TranslateService } from 'ng2-translate';

import { EventService } from './event.service';
import { Event } from './event.model';
import { Observable } from 'rxjs';
import { dateTimeFormat, formatIso } from '../shared/components/date-picker/dateUtils';

let DateTimeFormat;
const areIntlLocalesSupported = require('intl-locales-supported');

if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  // puts this in the bundle,
  // todo dynamic import
  require('intl/locale-data/jsonp/ru.js');
}

@Component({
  selector: 'cs-event-list',
  templateUrl: 'event-list.component.html',
  styleUrls: ['event-list.component.scss']
})
export class EventListComponent implements OnInit {
  public loading = false;
  public tableModel: MdlDefaultTableModel;

  public events: Array<Event>;

  public date;

  public formatDate = formatIso;
  public dateTimeFormat;
  public locale;

  public selectedLevels: Array<string>;
  public levels = [
    'INFO',
    'WARN',
    'ERROR'
  ];

  constructor(
    private eventService: EventService,
    private translate: TranslateService,
  ) {
    this.selectedLevels = this.levels.concat();

    this.locale = this.translate.currentLang;
    if (this.translate.currentLang === 'en') {
      this.dateTimeFormat = dateTimeFormat;
    } else {
      this.dateTimeFormat = Intl.DateTimeFormat;
    }

    this.updateEvents = this.updateEvents.bind(this);
  }

  public ngOnInit(): void {
    this.translate.get(['DESCRIPTION', 'LEVEL', 'TYPE'])
      .subscribe(translations => this.initTableModel(translations));

    this.filterEvents();
  }

  public filterEvents(): void {
    // yyyy-MM-dd
    const params = {
      startDate: this.date,
      endDate: this.date
    };

    const selectedLevels = this.selectedLevels;

    if (!selectedLevels.length) {
      this.events = [];
      return;
    }

    this.loading = true;

    if (selectedLevels.length !== 1 && selectedLevels.length !== this.levels.length) {
      const obs = selectedLevels
        .map(level => this.eventService.getList(Object.assign({}, params, { level })));

      Observable.forkJoin(obs)
        .subscribe(results => {
          this.events = [].concat.apply([], results);
          this.updateEvents(this.events);
        });
      return;
    }

    if (selectedLevels.length === 1) {
      params['level'] = this.selectedLevels[0];
    }

    this.eventService.getList(params)
      .subscribe(this.updateEvents);
  }

  private initTableModel(translations: any): void {
    this.tableModel = new MdlDefaultTableModel([
      { key: 'description', name: translations['DESCRIPTION'] },
      { key: 'level', name: translations['LEVEL'] },
      { key: 'type', name: translations['TYPE'] },
      { key: 'time', name: 'Time' }
    ]);
  }

  private updateEvents(events): void {
    this.loading = false;
    this.events = events;
    this.createTableModel();
  }

  private createTableModel(): void {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    const dateTimeFormat = new DateTimeFormat(this.locale, options);
    this.tableModel.data = this.events.map(event => Object.assign({}, event, {
      selected: false,
      time: dateTimeFormat.format(new Date(event.created))
    }));
  }
}
