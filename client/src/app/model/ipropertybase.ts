export interface IPropertyBase {
    id: number;
    sellRent: number;
    name: string;
    propertyType: string;
    propertyTypeId: number;
    furnishingType: string;
    furnishingTypeId: number;
    price: number;
    bhk: number;
    builtArea: number;
    city: string;
    cityId: number;
    readyToMove: boolean;
    photo?: string;
    estPossessionOn?: Date;
}