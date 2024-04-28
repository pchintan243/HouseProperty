import { HttpClient, HttpHeaders } from '@angular/common/http';
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
		let token = localStorage.getItem('token');
		if (token) {
			token = token.replace(/^"(.*)"$/, '$1');
		}
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token
			})
		};
		return this.http.get<CityName[]>('https://localhost:1002/api/City/GetCities', httpOptions);
	}

	getPropertyTypes(): Observable<IPropertyTypes[]> {
		return this.http.get<IPropertyTypes[]>('https://localhost:1002/api/PropertyType/GetPropertyTypes');
	}

	getFurnishingTypes(): Observable<IPropertyTypes[]> {
		return this.http.get<IPropertyTypes[]>('https://localhost:1002/api/PropertyType/GetFurnishingTypes');
	}

	getProperty(id: number) {
		let token = localStorage.getItem('token');
		if (token) {
			token = token.replace(/^"(.*)"$/, '$1');
		}
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token
			})
		};
		return this.http.get<Property>('https://localhost:1002/api/Property/GetPropertyDetail/' + id.toString(), httpOptions);
	}

	getAllProperties(SellRent?: number): Observable<Property[]> {
		let token = localStorage.getItem('token');
		if (token) {
			token = token.replace(/^"(.*)"$/, '$1');
		}
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token
			})
		};
		return this.http.get<Property[]>('https://localhost:1002/api/Property/GetProperties/' + SellRent?.toString(), httpOptions);
	}
	addProperty(property: Property) {
		let token = localStorage.getItem('token');
		if (token) {
			token = token.replace(/^"(.*)"$/, '$1');
		}
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token
			})
		};
		return this.http.post('https://localhost:1002/api/Property/AddProperty', property, httpOptions);
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

	setPrimaryPhoto(propertyId: number, propertyPhotoId: string) {
		let token = localStorage.getItem('token');
		if (token) {
			token = token.replace(/^"(.*)"$/, '$1');
		}
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + token
			})
		};
		return this.http.post('https://localhost:1002/api/Property/SetPrimaryPhoto/' + propertyId + '/' + propertyPhotoId, {}, httpOptions);
	}
}
