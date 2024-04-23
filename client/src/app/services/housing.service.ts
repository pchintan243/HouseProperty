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
		return this.http.get<Property>('https://localhost:1002/api/Property/GetPropertyDetail/' + id.toString());
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

	getPropertyAge(dateOfEstablishment: Date) {
		
		const today = new Date();
		const estDate = new Date(dateOfEstablishment);
		let age = today.getFullYear() - estDate.getFullYear();
		const m = today.getMonth() - estDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
			age--;
		}

		if (today < estDate) {
			return '0';
		}

		if (age === 0) {
			return 'Less than a year';
		}

		return age.toString();
	}

}
