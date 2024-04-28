import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

    public propertyId?: number;
    public mainPhotoUrl: string = '';
    property = new Property();
    galleryOptions!: NgxGalleryOptions[];
    galleryImages!: NgxGalleryImage[];

    constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

    ngOnInit() {
        // It return strings so we have to convert into int when we want to use that
        // one more way to convert string to int using + instead of Number()
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.data.subscribe(
            (data) => {
                this.property = data['prp'] as Property;
                console.log(this.property.photos);

            }
        );

        this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn as Date);

        // this.route.params.subscribe(
        //     (params) => {
        //         this.propertyId = +params['id'];
        //         this.housingService.getProperty(this.propertyId).subscribe(
        //             (data) => {
        //                 this.property = data as Property;
        //             }
        //         );
        //     }
        // );

        this.galleryOptions = [
            {
                width: '100%',
                height: '465px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            }
        ];

        this.galleryImages = this.getPropertyPhotos();
    }

    getPropertyPhotos(): NgxGalleryImage[] {
        const photoUrls: NgxGalleryImage[] = [];
        for (const photo of this.property.photos ? this.property.photos : []) {
            if (photo.isPrimary) {
                this.mainPhotoUrl = photo.imageUrl;
            }
            else {
                photoUrls.push({
                    small: photo.imageUrl,
                    medium: photo.imageUrl,
                    big: photo.imageUrl
                });
            }
        }
        return photoUrls;
    }

}
