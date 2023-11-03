import { Url } from "url";

export default class AnimalImageModel{
    id: number = 0;
    image: Url | Blob | string = '';
}