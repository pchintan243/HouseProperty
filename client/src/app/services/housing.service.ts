import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';

@Injectable({
	providedIn: 'root'
})
export class HousingService {

	constructor(private http: HttpClient) { }

	getProperty(id: number) {
		return this.getAllProperties().pipe(
			map(propertiesArray => {
				return propertiesArray.find(p => p.Id === id);
			})
		);
	}

	getAllProperties(SellRent?: number): Observable<IPropertyBase[]> {
		return this.http.get('data/properties.json').pipe(
			map((data: any) => {
				const propertiesList: Array<IPropertyBase> = [];
				const localProperties = JSON.parse(String(localStorage.getItem('newItem')));

				if (localProperties) {
					for (const id in localProperties) {
						if (SellRent) {
							if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
								propertiesList.push(localProperties[id]);
							}
						}
						else {
							propertiesList.push(localProperties[id]);
						}
					}
				}
				for (const id in data) {
					if (SellRent) {
						if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
							propertiesList.push(data[id]);
						}
					}
					else {
						propertiesList.push(data[id]);
					}
				}
				return propertiesList;
			})
		);
		return this.http.get<IProperty[]>('data/properties.json');
	}
	addProperty(property: Property) {
		let newItem = [property];
		if (localStorage.getItem('newItem')) {
			newItem = [property, ...JSON.parse(localStorage.getItem('newItem') as string)];
		}
		localStorage.setItem('newItem', JSON.stringify(newItem));
	}

	newPropId() {
		if (localStorage.getItem('PID')) {
			let id = parseInt(localStorage.getItem('PID') || '0') + 1;
			localStorage.setItem('PID', String(id));
			return id;
		}
		else {
			localStorage.setItem('PID', '101');
			return 101;
		}
	}

}
