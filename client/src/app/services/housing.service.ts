import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';

@Injectable({
	providedIn: 'root'
})
export class HousingService {

	constructor(private http: HttpClient) { }

	getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
		return this.http.get('data/properties.json').pipe(
			map((data: any) => {
				const propertiesList: Array<IPropertyBase> = [];
				for (const id in data) {
					if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
						propertiesList.push(data[id]);
					}
				}
				return propertiesList;
			})
		);
	}
}
