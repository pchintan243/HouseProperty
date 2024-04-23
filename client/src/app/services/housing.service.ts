import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
	providedIn: 'root'
})
export class HousingService {

	constructor(private http: HttpClient) { }

	getAllCities(): Observable<string[]> {
		return this.http.get<string[]>('https://localhost:1002/api/City/GetCities');
	}

	getProperty(id: number) {
		return this.getAllProperties(id).pipe(
			map(propertiesArray => {
				return propertiesArray.find(p => p.id == id);
			})
		);
	}

	getAllProperties(SellRent?: number): Observable<Property[]> {
		return this.http.get<Property[]>('https://localhost:1002/api/Property/GetProperties/' + SellRent?.toString());
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
