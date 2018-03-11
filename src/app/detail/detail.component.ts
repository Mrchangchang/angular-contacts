import { Component,OnInit, OnDestroy } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import { ContactService } from "../shared"

@Component({
  selector: "detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit, OnDestroy{
  contact_id: number;
  detail: any = {};
  contacts: any;
  private sub: any;
  constructor (
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _contactService: ContactService
  ) {}
  ngOnInit () {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.contact_id = params ['id'];
      this.getById(this.contact_id);
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  editContact () {
    this._router.navigate(['/edit', this.contact_id])
  }

  collectTheContact () {
    this.detail.collect == 0? this.detail.collect =1: this.detail.collect = 0;
    let ss_contacts = sessionStorage.getItem("contacts");
    this.contacts = JSON.parse(ss_contacts);
    this.contacts[this.contact_id - 1] = this.detail.collect;
    sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
  }

  getById (id: number) {
    let ss_contacts = sessionStorage.getItem("contacts");
    if (ss_contacts) {
      this.contacts = JSON.parse(ss_contacts);
      this.detail = this.contacts[this.contact_id - 1];
    } else {
      this._contactService.getContactById(this.contact_id).subscribe(data => {
        this.detail = data;
      })
    }
  }
}
