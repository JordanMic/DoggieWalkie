import { IDog } from "../sample";

export interface IUser {
    id: bigint;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    header: string;
    shortBio: string;
    town: string;
    description: string;
    contractedWalks: number;
    completedWalks: number;
    signedUpDate: string;
    dogs: Array<IDog>;
    imgUrl: string;
}

export class UserViewModel implements IUser {
    public id: bigint;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public header: string;
    public shortBio: string;
    public town: string;
    public description: string;
    public contractedWalks: number;
    public completedWalks: number;
    public signedUpDate: string;
    public dogs: Array<IDog> = [];
    public imgUrl: string;

    constructor(item?: UserViewModel) {
        this.id = item && item.id ? item?.id : BigInt(0);
        this.firstName = item && item.firstName ? item?.firstName : '';
        this.lastName = item && item.firstName ? item?.firstName : '';
        this.phoneNumber = item && item.firstName ? item?.firstName : '';
        this.header = item && item.firstName ? item?.firstName : '';
        this.shortBio = item && item.firstName ? item?.firstName : '';
        this.town = item && item.firstName ? item?.firstName : '';
        this.description = item && item.description ? item?.description : '';
        this.contractedWalks = item && item.contractedWalks ? item?.contractedWalks : 0;
        this.completedWalks = item && item.completedWalks ? item?.completedWalks : 0;
        this.dogs = item && item.dogs ? item?.dogs : [];
        this.signedUpDate = item && item.signedUpDate ? item?.signedUpDate : '';
        this.imgUrl = item && item.imgUrl ? item?.imgUrl : '';
    }
}