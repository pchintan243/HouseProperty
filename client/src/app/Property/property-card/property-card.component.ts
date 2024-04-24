import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.property);

  }
  @Input() property?: IPropertyBase;
  @Input() hideIcons?: boolean;
}
