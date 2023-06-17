import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, ModalService, SplitterOrientation} from "ng-devui";
import {CoalConf, CoalConfService} from "../../service/coal-conf.service";
import {KeyService} from "../../service/key.service";
import {TipModalComponent} from "../../shared/component/tip-modal/tip-modal.component";
import {AuthComponent} from "./auth/auth.component";
import {ExpendComponent} from "./expend/expend.component";
import {BondComponent} from "./bond/bond.component";
import {DataListComponent} from "./data-list/data-list.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  orientation: SplitterOrientation = 'horizontal';
  splitBarSize = '2px';
  disabledBarSize = '1px';

  // splitter pane input
  size = '30%';
  minSize = '20%';
  maxSize = '60%';

  @ViewChild('tipModal', {static: false}) tipModal!: TipModalComponent;
  @ViewChild('list', {static: false}) list!: DataListComponent;
  coalConfList: CoalConf[] = [];
  coalConfIdList: number[] = [];

  constructor(private coalConfService: CoalConfService,
              public keyService: KeyService,
              private modalService: ModalService) {
  }

  add() {
    const coalConf = new CoalConf();
    this.coalConfService.save(coalConf).subscribe(coalConf => {
      this.coalConfList.push(coalConf);
      this.list.findAll();
      if(coalConf.id){
        this.coalConfIdList.push(coalConf.id);
      }
    });
  }

  editRow(coalConf: CoalConf) {
    if(coalConf.id && !this.coalConfIdList.includes(coalConf.id)){
      this.coalConfList.push(coalConf);
      this.coalConfIdList.push(coalConf.id);
    }
  }

  closeCoalConf(coalConf: CoalConf, index: number){
    this.coalConfIdList.splice(index, 1);
    this.coalConfList.splice(index, 1);
  }

  setAuth(){
    const results = this.modalService.open({
      id: 'dialog-service',
      width: '800px',
      component: AuthComponent,
      backdropCloseable: true,
      data: {
        content: 'Error: This is an error message, please take a look.',
        cancelBtnText: 'Ok',
        onClose: () => {
          results.modalInstance.hide();
        },
      }
    });
  }

  expend(){
    const results = this.modalService.open({
      id: 'expend',
      width: '900px',
      component: ExpendComponent,
      backdropCloseable: false,
      data: {
        onClose: () => {
          results.modalInstance.hide();
        },
      }
    });
  }

  bond(){
    const results = this.modalService.open({
      id: 'bond',
      width: '900px',
      component: BondComponent,
      backdropCloseable: false,
      data: {
        onClose: () => {
          results.modalInstance.hide();
        },
      }
    });
  }

  refresh(){
    this.list.findAll();
  }

  ngOnInit(): void {
  }
}
