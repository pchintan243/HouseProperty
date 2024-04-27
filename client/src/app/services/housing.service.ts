import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../model/property';
import { IPropertyTypes } from '../model/ipropertytypes';
import { CityName } from '../model/icity';

@Injectable({
	providedIn: 'root'
})
export class HousingService {

	constructor(private http: HttpClient) { }

	getAllCities(): Observable<CityName[]> {
		return this.http.get<CityName[]>('https://localhost:1002/api/City/GetCities');
	}

	getPropertyTypes(): Observable<IPropertyTypes[]> {
		return this.http.get<IPropertyTypes[]>('https://localhost:1002/api/PropertyType/GetPropertyTypes');
	}

	getFurnishingTypes(): Observable<IPropertyTypes[]> {
		return this.http.get<IPropertyTypes[]>('https://localhost:1002/api/PropertyType/GetFurnishingTypes');
	}

	getProperty(id: number) {
		return this.http.get<Property>('https://localhost:1002/api/Property/GetPropertyDetail/' + id.toString());
	}

	getAllProperties(SellRent?: number): Observable<Property[]> {
		return this.http.get<Property[]>('https://localhost:1002/api/Property/GetProperties/' + SellRent?.toString());
	}
	addProperty(property: Property) {
		return this.http.post('https://localhost:1002/api/Property/AddProperty', property);
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

	getPropertyAge(dateOfEstablishment: Date) {

		const today = new Date();
		const estDate = new Date(dateOfEstablishment);
		let age = today.getFullYear() - estDate.getFullYear();
		const m = today.getMonth() - estDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
			age--;
		}

		if (today < estDate) {
			return 0;
		}

		if (age === 0) {
			return 1;
		}

		return age;
	}

}
