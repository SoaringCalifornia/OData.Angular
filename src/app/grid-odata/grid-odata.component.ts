import { IManagerResponse } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { ConfigService } from '../config.service';

import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

@Component({
  selector: 'app-grid-odata',
  templateUrl: './grid-odata.component.html',
  styleUrls: ['./grid-odata.component.css']
})
export class GridOdataComponent implements OnInit {

  constructor(public http: HttpClient) { }

  public readonly source = new DataSource({
    store: {
      type: 'odata',
      version: 4,
      url: ConfigService.urlOData + 'person',
      key: 'id'
    }
  });

  public readonly title = `Angular ${VERSION.full} OData`;
  public readonly urlOData = ConfigService.urlOData + '$metadata';
  public readonly urlApiManager = ConfigService.urlApi + 'manager/';

  @ViewChild(DxDataGridComponent, { static: false })
  set grid(v: DxDataGridComponent) {
    this.dataGrid = v;
  }

  throttle = 0;
  dataGrid: DxDataGridComponent;

  toolbarRefresh =
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        hint: 'Refresh',
        onClick: this.refresh.bind(this)
      }
    };

  ngOnInit() {
    console.log('ngOnInit');
    this.refresh();
  }

  onToolbarPreparing(toolbar) {
    console.log('onToolbarPreparing', toolbar);
    toolbar.toolbarOptions.items.unshift(
      this.toolbarRefresh
    );
  }

  refresh() {
    console.log('refresh');

    // Refresh Grid instance if available
    if (this.dataGrid && this.dataGrid.instance) {
      this.dataGrid.instance.refresh();
    }

    // Get current throttle value
    this.http.get(this.urlApiManager)
      .toPromise()
      .then(
        res => {
          console.log(res);
          this.throttle = (res as IManagerResponse).throttleDelaySecs;
        },
        err => console.error(err)
      );
  }

  applyThrottle() {
    console.log('applyThrottle', this.throttle);

    this.http.post(`${this.urlApiManager}throttle/${this.throttle}`, null)
      .toPromise()
      .then(
        res => {
          console.log(res);
          this.refresh();
        },
        err => console.error(err)
      );
  }


  applySeed() {
    console.log('applySeed');

    this.http.post(`${this.urlApiManager}seed`, null)
      .toPromise()
      .then(
        res => {
          console.log(res);
          this.refresh();
        },
        err => console.error(err)
      );
  }

}
