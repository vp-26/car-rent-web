import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent {
 panelSizes = [25, 75];

  ngAfterViewInit() {
    this.panelSizes = [25, 75];
  }
}
