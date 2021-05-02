import {Component, OnInit} from '@angular/core';
import {FactoryResolver} from '../../backend/factories';

@Component({
  selector: 'dr-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  constructor(private driveFactoryResolver: FactoryResolver) {
  }

  factories: string[] = this.driveFactoryResolver.getAvailableFactoriesNames();

  ngOnInit(): void {
  }

}
