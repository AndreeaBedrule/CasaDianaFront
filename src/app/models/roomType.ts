import { IFacilities } from "./facilities";
import { IRol } from "./rol";

export interface IRoomType
{
    roomTypeId?: number,
    numberOfPersons: string,
    facilities: IFacilities,
    price: number,
}