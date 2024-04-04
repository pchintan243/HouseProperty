import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

    public propertyId?: number;
    property = new Property();

    constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

    ngOnInit() {
        // It return strings so we have to convert into int when we want to use that
        // one more way to convert string to int using + instead of Number()
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.params.subscribe(
            (params) => {
                this.propertyId = +params['id'];
                this.housingService.getProperty(this.propertyId).subscribe(
                    (data) => {
                        this.property = data as Property;
                    }
                );
            }
        );
    }
}
