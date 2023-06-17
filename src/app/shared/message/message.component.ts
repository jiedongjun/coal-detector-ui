import {Component, Input, OnInit} from '@angular/core';
import {AlertType} from "ng-devui";

export class Message{

  type!: AlertType;

  msg?: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  msgs: Array<any> = [];

  showToast(message: Message) {
    this.msgs = [
      { severity: message.type, content: message.msg, life: 1000 }
    ];
  }
}
