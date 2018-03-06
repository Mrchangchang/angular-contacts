import { Component,OnInit } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import { Location} from "@angular/common";
import { ContactService } from "../shared";
import { UtilService } from "../shared/util.service"

@Component({
  selector: "edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit{
  isAdd: boolean;
  operateTitle: string;
  editId: number;
  contacts: any = {};
  contact: any = {};
  isName: boolean = false;
  isPhoneNum: boolean = false;
  isAddr: boolean = false;
  isEamail: boolean = false;
  isBir: boolean = false;
  nameTip: boolean = false;
  phoneTip: boolean = false;
  addrTip: boolean = false;
  enailTip: boolean = false;
  birTip: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _location: Location,
    private _contactService: ContactService,
    private _utilService: UtilService
  ) {}

  ngOnInit() {
    this._activatedRouter.params.subscribe(params => {
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })
    this.operateTitle = this.isAdd?"新建联系人":"编辑联系人";

  }

  getContacts () {
    this._contactService.getContactsData().subscribe(data => {
      this.contacts = data;
    })
  }

  getContactDetailById (id:number) {
    let ss_contacts = sessionStorage.getItem("contacts");
    if (ss_contacts) {
      this.contacts = JSON.parse(ss_contacts);
      this.contact = this.contacts[id - 1]
    } else {
      this._contactService.getContactById(id).subscribe(data => {
        this.contact = data;
      })
    }
  }

  addContact () {
    let contacts_length = this.contacts.length;
    let new_id = this.contacts[contacts_length - 1].id + 1;
    let new_contact = {
      "id": this.editId,
      "name": this.contact.name,
      "telNum": this.contact.telNum,
      "address": this.contact.address,
      "email": this.contact.email,
      "birthday": this.contact.birthday,
      "collection": 0
    }
    this.contacts.push(new_contact);
    sessionStorage.setItem("contacts",JSON.stringify(this.contacts));
    this._router.navigate(['']);
  }
}
