import {Component, ElementRef, Input, OnInit} from '@angular/core';

export class Bond{
  row1_1?: number;
  row1_2?: number;
  row2_1?: number;
  row2_2?: number;
  row3_1?: number;
  row3_2?: number;
  row4_1?: number;
  row4_2?: number;
  row5_1?: number;
  row5_2?: number;
  row5_3?: number;
  row5_4?: number;
  row6_1?: number;
  row6_2?: number;
  row6_3?: number;
}

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss']
})
export class BondComponent implements OnInit{

  @Input() data: any;
  parent!: HTMLElement;
  bond: Bond = new Bond();

  constructor(private elr: ElementRef) {
  }

  close() {
    this.data.onClose();
  }

  complete(){
    if(this.bond.row1_1 && this.bond.row2_1 && this.bond.row3_1){
      this.bond.row4_1 =10 +  (30 * this.bond.row2_1 + 70 * this.bond.row3_1) / this.bond.row1_1;
    }
    if(this.bond.row1_2 && this.bond.row2_2 && this.bond.row3_2){
      this.bond.row4_2 = (30 * this.bond.row2_2 + 70 * this.bond.row3_2) / (5 * this.bond.row1_2);
    }
    if(this.bond.row5_1 && this.bond.row5_2 && this.bond.row5_4){
      this.bond.row6_3 = (this.bond.row5_4 - this.bond.row5_1) / (this.bond.row5_2 - this.bond.row5_1) * 100
    }
    if(this.bond.row5_1 && this.bond.row5_2 && this.bond.row5_3){
      this.bond.row6_1 = (this.bond.row5_2 - this.bond.row5_3) / (this.bond.row5_2 - this.bond.row5_1) * 100
    }
    if(this.bond.row5_1 && this.bond.row5_2 && this.bond.row5_3 && this.bond.row5_4){
      this.bond.row6_2 = (this.bond.row5_3 - this.bond.row5_4) / (this.bond.row5_2 - this.bond.row5_1) * 100
    }
  }

  ngOnInit(): void {
    this.parent = this.elr.nativeElement.parentElement;
  }
}
