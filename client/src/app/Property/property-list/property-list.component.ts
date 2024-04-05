import { ActivatedRoute } from '@angular/router';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
	selector: 'app-property-list',
	templateUrl: './property-list.component.html',
	styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
	// SellRent value 1 means property is for buy & 2 for rent
	SellRent: number = 1;
	properties?: Array<IPropertyBase>;
	Today = new Date();
	City = '';
	SortByParam = '';
	SortDirection = 'asc';

	SearchCity = '';
	constructor(private route: ActivatedRoute, private housingService: HousingService) { }

	ngOnInit(): void {
		this.route.snapshot.url.toString() ? this.SellRent = 2 : this.SellRent = 1;
		this.housingService.getAllProperties(this.SellRent).subscribe(
			data => {
				this.properties = data;
			},
			error => {
				console.log(error);
			}
		);
	}

	onCityFilter() {
		this.SearchCity = this.City;
	}
	
	onFilterClear() {
		this.SearchCity = '';
		this.City = '';
	}

	onSortDirection() {
		if (this.SortDirection === 'asc') {
			this.SortDirection = 'desc';
		}
		else {
			this.SortDirection = 'asc';
		}
	}
}