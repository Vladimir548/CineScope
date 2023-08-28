import {IconType} from "react-icons";

export interface IRoutes{
    id:number,
    icon:IconType,
    name:string,
    link:string
    mainLink:IMainLink
    subLink:ISubLink[]
}
 interface ISubLink{
    id:number,
    icon: IconType,
    name:string,
    link:string,
    description:string
}
interface IMainLink {
    id:number,
    name:string,
    link:string
    src:string
}