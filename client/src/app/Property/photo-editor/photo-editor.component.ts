import { Photo } from './../../model/photo';
import { HousingService } from 'src/app/services/housing.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/app/model/property';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
    @Input() property!: Property;
    @Output() mainPhotoChangedEvent = new EventEmitter<string>();

    uploadResponse!: Photo;
    selectedFile: File | null = null;
    selectedFileUrl: string | ArrayBuffer | null | undefined;

    constructor(private housingService: HousingService, private toast: ToastrService, private http: HttpClient) { }

    previewImage() {
        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedFileUrl = e.target?.result;
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.previewImage();
    }

    onUpload() {

        if (!this.selectedFile) {
            console.error('No file selected.');
            return;
        }

        let token = localStorage.getItem('token');
        if (token) {
            token = token.replace(/^"(.*)"$/, '$1');
        }
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        };

        const formData = new FormData();
        formData.append('formFile', this.selectedFile);
        this.http.post<Photo>('https://localhost:1002/api/Property/AddPropertyPhoto/' + this.property.id, formData, httpOptions).subscribe(
            (res: Photo) => {
                this.uploadResponse = res;
                console.log(res);
                this.property.photos.push(res);
                console.log(this.property.photos);

                this.selectedFile = null;
                this.selectedFileUrl = null;
            }
        );
    }
    ngOnInit(): void {
    }

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
