import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular OData Example';

  constructor() {
    const version = `Angular v${VERSION.full}`;
    console.log(version);
  }

}
