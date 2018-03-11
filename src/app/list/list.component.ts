import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from  '../shared/contact.server';
@Component({
  selector: 'list',
  templateUrl: "./list.component.html",
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  contacts: any = [];
  private isAdd: number = 1;
  constructor(
    private _router: Router,
    private _contactService: ContactService
  ) {}
  ngOnInit() {
    this.getContacts()
  }
  getContacts() {
    let ss_contacts = sessionStorage.getItem('contacts');
    if (!ss_contacts) {
      this._contactService.getContactsData().subscribe( data => {
        if (data.success) {
          this.contacts = data.data;
          sessionStorage.setItem("contacts",JSON.stringify(this.contacts))
        }

      })
    } else {
      this.contacts = JSON.parse(ss_contacts);
    }
  }
  addContact() {
    this._router.navigate(['edit'])
  }
  routerNavigate(id:number) {
    this._router.navigate(['list',id])
  }
}
