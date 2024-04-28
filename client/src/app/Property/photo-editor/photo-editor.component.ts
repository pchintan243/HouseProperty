import { HousingService } from 'src/app/services/housing.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {
    @Input() property!: Property;
    @Output() mainPhotoChangedEvent = new EventEmitter<string>();

    constructor(private housingService: HousingService, private toast: ToastrService) { }

    mainPhotoChanged(url: string) {
        this.mainPhotoChangedEvent.emit(url);
    }

    setPrimaryPhoto(propertyId: number, photo: Photo) {
        // debugger
        this.housingService.setPrimaryPhoto(propertyId, photo.publicId).subscribe(() => {
            this.mainPhotoChanged(photo.imageUrl);
            this.property.photos.forEach(p => {
                if (p.isPrimary) { p.isPrimary = false; }
                if (p.publicId == photo.publicId) { p.isPrimary = true; }
            });
            this.toast.success("Main photo updated successfully");
        });
    }

    
    deletePhoto(propertyId: number, photo: Photo) {
        this.housingService.deletePhoto(propertyId, photo.publicId).subscribe(() => {
            this.property.photos = this.property.photos.filter(p => p.publicId !== photo.publicId);
            this.toast.success("Photo deleted successfully");
        });
    }

    
}
