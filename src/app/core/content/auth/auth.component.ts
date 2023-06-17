import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {KeyService} from "../../../service/key.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() data: any;
  validTime: Date = new Date();
  oldKey?: string;
  newKey?: string;
  parent!: HTMLElement;

  constructor(private elr: ElementRef, private keyService: KeyService) {
  }

  close(event: any) {
    this.data.onClose(event);
  }

  createKey() {
    if (this.oldKey) {
      this.keyService.update(this.oldKey, this.validTime.getTime()).subscribe((res: any) => {
        if (res && res.key) {
          this.newKey = res.key;
        }
      })
    }
  }

  getKeyFile() {
    if (this.newKey) {
      const keyFile = new File([this.newKey], 'secret.key');
      const objectUrl = URL.createObjectURL(keyFile);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = objectUrl;
      link.download = keyFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    }
  }

  ngOnInit(): void {
    this.parent = this.elr.nativeElement.parentElement;
  }
}
