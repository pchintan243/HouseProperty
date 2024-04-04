import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

    public propertyId?: number;
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        // It return strings so we have to convert into int when we want to use that
        // one more way to convert string to int using + instead of Number()
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.params.subscribe(
            (params) => {
                this.propertyId = +params['id'];
            }
        );
    }
    onSelectNext() {
        // convert string to number
        this.propertyId = Number(this.propertyId) + 1;
        this.router.navigate(['property-detail/' + this.propertyId]);
    }
}
