import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase {
    id!: number;
    sellRent!: number;
    name!: string;
    propertyType!: string;
    bhk!: number;
    furnishingType!: string;
    price!: number;
    builtArea!: number;
    carpetArea?: number;
    address!: string;
    address2?: string;
    city!: string;
    floorNo?: string;
    totalFloor?: string;
    readyToMove!: number;
    AOP?: string;
    mainEntrance?: string;
    security?: number;
    gated?: number;
    maintenance?: number;
    estPossessionOn?: string;
    image?: string;
    description?: string;
    postedOn!: string;
    postedBy!: number;
}