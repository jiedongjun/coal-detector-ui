import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "ng-devui";

@Component({
  selector: 'app-tip-modal',
  templateUrl: './tip-modal.component.html',
  styleUrls: ['./tip-modal.component.scss']
})
export class TipModalComponent implements OnInit {
  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }
}
