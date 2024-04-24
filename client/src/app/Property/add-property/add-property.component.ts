import { HousingService } from './../../services/housing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { IPropertyTypes } from 'src/app/model/ipropertytypes';
import { Property } from 'src/app/model/property';

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

    // @ViewChild('Form') addProperty?: NgForm;
    @ViewChild('formTabs') formTabs?: TabsetComponent;
    addPropertyForm!: FormGroup;
    nextClicked!: boolean;
    property = new Property();

    propertyTypes!: IPropertyTypes[];
    furnishTypes!: IPropertyTypes[];

    cityList: string[] = [];

    propertyView: IPropertyBase = {
        id: 0,
        name: '',
        furnishingType: '',
        propertyType: '',
        price: 0,
        sellRent: 0,
        bhk: 0,
        builtArea: 0,
        city: '',
        readyToMove: 0
    };

    constructor(private router: Router, private fb: FormBuilder, private housingService: HousingService,
        private toast: ToastrService) { }

    ngOnInit() {
        this.CreateAddPropertyForm();
        this.housingService.getAllCities().subscribe((cities: string[]) => {
            this.cityList = cities;
        });

        this.housingService.getPropertyTypes().subscribe((property: IPropertyTypes[]) => {
            this.propertyTypes = property;
        });

        this.housingService.getFurnishingTypes().subscribe((furnish: IPropertyTypes[]) => {
            this.furnishTypes = furnish;
        });
    }

    updateBuiltArea(value: string): void {
        this.propertyView.builtArea = parseFloat(value);
    }

    // Assuming 'propertyView' is a property of your component
    updateCity(selectedCity: string): void {
        this.propertyView.city = selectedCity;
    }

    // Assuming 'propertyView' is a property of your component
    updatePrice(value: string): void {
        this.propertyView.price = parseFloat(value);
    }
    
    updateEstPossessionOn(value: string): void {
        // Parse the string value into a Date object
        this.propertyView.estPossessionOn = new Date(value);
    }
    
    CreateAddPropertyForm() {
        this.addPropertyForm = this.fb.group({
            BasicInfo: this.fb.group({
                SellRent: ['1', Validators.required],
                BHK: [null, Validators.required],
                PType: [null, Validators.required],
                FType: [null, Validators.required],
                Name: [null, Validators.required],
                City: [null, Validators.required]
            }),
            PriceInfo: this.fb.group({
                Price: [null, Validators.required],
                BuiltArea: [null, Validators.required],
                CarpetArea: [null],
                Security: [null],
                Maintenance: [null],
            }),
            AddressInfo: this.fb.group({
                FloorNo: [null],
                TotalFloor: [null],
                Address: [null, Validators.required],
                LandMark: [null]
            }),
            OtherInfo: this.fb.group({
                ReadyToMove: [null, Validators.required],
                EstPosessionOn: [null],
                Age: [null],
                Gated: [null],
                MainEntrance: [null],
                Description: [null],
            }),
        });
    }

    //#region <Getter Methods>
    // #region <FormGroups>

    get BasicInfo() {
        return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
    }

    get PriceInfo() {
        return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
    }

    get AddressInfo() {
        return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
    }

    get OtherInfo() {
        return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
    }
    // #endregion

    // #region <FormControl>

    get SellRent() {
        return this.BasicInfo.controls['SellRent'] as FormControl;
    }

    get BHK() {
        return this.BasicInfo.controls['BHK'] as FormControl;
    }

    get PType() {
        return this.BasicInfo.controls['PType'] as FormControl;
    }

    get FType() {
        return this.BasicInfo.controls['FType'] as FormControl;
    }

    get Name() {
        return this.BasicInfo.controls['Name'] as FormControl;
    }

    get City() {
        return this.BasicInfo.controls['City'] as FormControl;
    }

    get Price() {
        return this.PriceInfo.controls['Price'] as FormControl;
    }

    get BuiltArea() {
        return this.PriceInfo.controls['BuiltArea'] as FormControl;
    }

    get CarpetArea() {
        return this.PriceInfo.controls['CarpetArea'] as FormControl;
    }

    get Security() {
        return this.PriceInfo.controls['Security'] as FormControl;
    }

    get Maintenance() {
        return this.PriceInfo.controls['Maintenance'] as FormControl;
    }

    get FloorNo() {
        return this.AddressInfo.controls['FloorNo'] as FormControl;
    }

    get TotalFloor() {
        return this.AddressInfo.controls['TotalFloor'] as FormControl;
    }

    get Address() {
        return this.AddressInfo.controls['Address'] as FormControl;
    }

    get LandMark() {
        return this.AddressInfo.controls['LandMark'] as FormControl;
    }

    get ReadyToMove() {
        return this.OtherInfo.controls['ReadyToMove'] as FormControl;
    }

    get EstPossessionOn() {
        return this.OtherInfo.controls['EstPosessionOn'] as FormControl;
    }

    get Age() {
        return this.OtherInfo.controls['Age'] as FormControl;
    }

    get Gated() {
        return this.OtherInfo.controls['Gated'] as FormControl;
    }

    get MainEntrace() {
        return this.OtherInfo.controls['MainEntrance'] as FormControl;
    }

    get Description() {
        return this.OtherInfo.controls['Description'] as FormControl;
    }
    // #endregion
    // #endregion
    onBack() {
        this.router.navigate(['/']);
    }

    onSubmit() {
        this.nextClicked = true;
        if (this.allTabsValid()) {
            this.mapProperty();
            this.housingService.addProperty(this.property);
            this.toast.success('Property Added Successfully');

            if (this.SellRent.value === '2') {
                this.router.navigate(['/rent-property']);
            } else {
                this.router.navigate(['/']);
            }
        }
        else {
            this.toast.error('Please fill all the field');
        }
    }

    mapProperty(): void {
        this.property.id = this.housingService.newPropId();
        this.property.sellRent = +this.SellRent.value;
        this.property.bhk = this.BHK.value;
        this.property.propertyType = this.PType.value;
        this.property.name = this.Name.value;
        this.property.city = this.City.value;
        this.property.furnishingType = this.FType.value;
        this.property.price = this.Price.value;
        this.property.security = this.Security.value;
        this.property.maintenance = this.Maintenance.value;
        this.property.builtArea = this.BuiltArea.value;
        this.property.carpetArea = this.CarpetArea.value;
        this.property.floorNo = this.FloorNo.value;
        this.property.totalFloors = this.TotalFloor.value;
        this.property.address = this.Address.value;
        this.property.address2 = this.LandMark.value;
        this.property.readyToMove = this.ReadyToMove.value;
        this.property.age = this.Age.value;
        this.property.gated = this.Gated.value;
        this.property.mainEntrance = this.MainEntrace.value;
        this.property.estPossessionOn = this.EstPossessionOn.value;
        this.property.description = this.Description.value;
    }

    allTabsValid(): boolean {
        if (this.BasicInfo.invalid) {
            if (this.formTabs?.tabs[0]) {
                this.formTabs.tabs[0].active = true;
                return false;
            }
        }

        if (this.PriceInfo.invalid) {
            if (this.formTabs?.tabs[1]) {
                this.formTabs.tabs[1].active = true;
                return false;
            }
        }

        if (this.AddressInfo.invalid) {
            if (this.formTabs?.tabs[2]) {
                this.formTabs.tabs[2].active = true;
                return false;
            }
        }

        if (this.OtherInfo.invalid) {
            if (this.formTabs?.tabs[3]) {
                this.formTabs.tabs[3].active = true;
                return false;
            }
        }
        return true;
    }

    selectTab(tabId: number, IsCurrentTabValid: boolean) {
        this.nextClicked = true;
        if (IsCurrentTabValid) {
            if (this.formTabs?.tabs[tabId]) {
                this.formTabs.tabs[tabId].active = true;
            }
        }
    }
}
