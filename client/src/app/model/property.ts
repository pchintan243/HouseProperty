import { IPropertyBase } from "./ipropertybase";
import { Photo } from "./photo";

export class Property implements IPropertyBase {
    id!: number;
    sellRent!: number;
    name!: string;
    propertyType!: string;
    propertyTypeId!: number;
    bhk!: number;
    furnishingType!: string;
    furnishingTypeId!: number;
    price!: number;
    builtArea!: number;
    carpetArea?: number;
    address!: string;
    address2?: string;
    city!: string;
    cityId!: number;
    floorNo?: number;
    totalFloors?: number;
    readyToMove!: boolean;
    age?: number;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: Date;
    photo?: string;
    description?: string;
    photos!: Photo[];
}