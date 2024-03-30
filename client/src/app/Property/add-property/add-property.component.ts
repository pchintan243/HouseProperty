import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('Form') addProperty?: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Full', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    FType: '',
    PType: '',
    Price: 0,
    SellRent: 0,
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Form submitted:');
    console.log(this.addProperty?.value);
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
