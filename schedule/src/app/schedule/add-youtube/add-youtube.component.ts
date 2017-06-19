import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/service';
import { Dataservice } from '../../shared/service/dataservice';
import { Router } from '@angular/router';
import { M_youtube } from '../../shared/service/model';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-add-youtube',
  templateUrl: './add-youtube.component.html',
  styleUrls: ['./add-youtube.component.css']
})
export class AddYoutubeComponent implements OnInit {

  msgs: Message[] = [];
  msgs2: Message[] = [];
  model = new M_youtube();//เปลี่ยน
  dd: any;
  mm: any;
  today: any;
  constructor(private _productService: ProductService, public _dt: Dataservice, private router: Router, private confirmationService: ConfirmationService) {
    // let timeInMs = Date.now();
    // this.model.START_DATE = 'xxx';
    // let today = new Date();
    // this.dd = today.getDate();
    // this.mm = today.getMonth() + 1; //January is 0!
    // let yyyy = today.getFullYear();
    // if (this.dd < 10) {
    //   this.dd = '0' + this.dd;
    // }
    // if (this.mm < 10) {
    //   this.mm = '0' + this.mm;
    // }
    // this.today = yyyy + '-' + this.mm + '-' + this.dd;
    // console.log(this.today);

  }
  models: any;
  models1: any;
  models2: any;
  models3: any;
  models4: any;
  ngOnInit() {
    if (this._dt.isLog) {
      if (this._dt.profile[0].status == 1) {

        this._productService.dbData(105)
          .subscribe(resproducts => this.models = resproducts,
          err => console.log(err)
          // , () => { }
          );

      } else {
        alert('ท่านไม่ใช่ผู้ดูแลระบบจะไม่สามารถเข้าได้');
        this.router.navigate(['Schedule']);
      }
    } else {
      alert('กรุณา Login เพื่อเข้าสู่ระบบ');
      this.router.navigate(['Login']);
    }


  }
  updataId: any;
  pd: any;
  tbl: any = "m_youtube";//เปลี่ยน
  fd: any = "ID";//เปลี่ยน'
  addmodel: any;
  geteditdel(del: number, pid: number, fdd: any) {
    this.msgs = [];
    this.model[fdd] = del;
    this.updataId = pid;
    this.pd = this.model;
    this._productService.addData(this.tbl, this.fd, this.updataId, this.pd)
      .subscribe(resproducts => this.addmodel = resproducts,
      err => console.log(err),
      () => {
        if (del == 2) {
          alert("ระบบทำการปิดรายชื่อเรียบร้อยแล้ว")
        } else if (del == 1) {
          alert("ระบบทำการเปิดรายชื่อเรียบร้อยแล้ว")
        } else if (del == 3) {
          alert("ระบบทำลดระดับเรียบร้อยแล้ว")
        } else {
          alert("ระบบทำเพิ่มระดับเรียบร้อยแล้ว")
        }
        this.model = new M_youtube();
        this.ngOnInit();
      }
      );
  }

  add() {
    this.msgs = [];
    this.model = new M_youtube();
    // this.model.status = 4;
    this.updataId = 0;
    //วันที่ปัจจุบัน

  }

  save() {
    // this.model.hcode = '00024';
    this.msgs2 = [];
    this.pd = this.model;
    this._productService.addData(this.tbl, this.fd, this.updataId, this.pd)
      .subscribe(resproducts => this.addmodel = resproducts,
      err => console.log(err),
      () => {
        this.msgs.push({ severity: 'success', summary: 'ระบบทำการบันทึกข้อมูล', detail: 'เรียบร้อยแล้ว.' });
        this.model = new M_youtube();
        this.ngOnInit();
      }
      );
  }

  edit(ev: any) {
    this.msgs = [];
    this.model = ev;
    this.updataId = this.model.ID;

  }

  del: any;
  delete(ev: any) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'ถ้าใช่กด YES ถ้าไม่ใช่กด NO',
      header: 'ท่านต้องการลบข้อมูลใช่หรือไม่',
      icon: 'fa fa-trash',
      accept: () => {
        this.updataId = ev.ID;
        this._productService.delData(this.tbl, this.fd, this.updataId)
          .subscribe(resproducts => this.del = resproducts,
          err => console.log(err),
          () => {
            this.msgs.push({ severity: 'success', summary: 'ระบบทำการลบข้อมูล', detail: 'เรียบร้อยแล้ว.' });
            this.ngOnInit();
          }
          );
      }
    });
  }


}
