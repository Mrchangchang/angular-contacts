import { Component,OnInit } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import { Location} from "@angular/common";
import { ContactService } from "../shared";
import { UtilService } from "../shared/util.service"

const ClickingBackColor = '#eee';


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
  isEmail: boolean = false;
  isBir: boolean = false;
  nameTip: boolean = false;
  phoneTip: boolean = false;
  addrTip: boolean = false;
  emailTip: boolean = false;
  birTip: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _location: Location,
    private _contactService: ContactService,
    private _utilService: UtilService
  ) {}

  ngOnInit() {
    this.getContacts();
    this._activatedRouter.params.subscribe(params => {
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })
    this.operateTitle = this.isAdd?"新建联系人":"编辑联系人";
    if(!this.isAdd) this.getContactDetailById(this.editId)
  }

  submitForm () {
    this.nameTip = true;
    this.phoneTip = true;
    this.addrTip = true;
    this.emailTip = true;
    this.birTip = true;
    if (this.isName && this.isPhoneNum && this.isAddr && this.isEmail && this.birTip) {
      if (this.isAdd) this.addContact();
      else this.editContact();
    }
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
  editContact () {
    let edit_contact = {
      "id": this.editId,
      "name": this.contact.name,
      "telNum": this.contact.telNum,
      "address": this.contact.address,
      "email": this.contact.email,
      "birthday": this.contact.birthday,
      "collection": 0
    }
    let ss_session = sessionStorage.getItem('contacts');
    this.contacts = JSON.parse(ss_session);
    this.contacts.splice(this.editId - 1,1, edit_contact);
    sessionStorage.setItem('contacts',JSON.stringify(this.contacts));
    this._router.navigate(['/list',this.editId]);
  }

  cancleOperate () {
    this._location.back();
  }

  //失去焦点事件
  onBlurName () {
    this.nameTip = true;
    this.isName = this.contact.name? true: false;
  }

  onBlurPhone () {
    this.phoneTip = true;
    this.isPhoneNum = this._utilService.checkPhoneNum(this.contact.telNum)?true: false;
  }
  onBlurAddr () {
    this.addrTip = true;
    this.isAddr = this.contact.address? true: false;
  }
  onBlurEmail () {
    this.emailTip = true;
    this.isEmail = this._utilService.checkEmail(this.contact.email)?true:false;
  }
  onBlurBir () {
    this.birTip = true;
    this.isBir = this.contact.birthday?true:false;
  }
}
