import { CardContentModel } from "./card-content.model";

export interface CardModel extends CardContentModel {
    content?: string;
    centeredContent?: boolean;
}