import { ActivatedRoute } from '@angular/router';
import { IProperty } from '../IProperty.interface';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-property-list',
	templateUrl: './property-list.component.html',
	styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
	// SellRent value 1 means property is for buy & 2 for rent
	SellRent: number = 1;
	properties: Array<IProperty> | undefined;

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
}