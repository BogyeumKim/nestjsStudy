import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC,
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        console.log(this.isStatusValid(value));
        
        if(this.isStatusValid(value) < 0){
            throw new BadRequestException(`${value} 는 잘못된 status`)
        }
    
        return value;
    }

    private isStatusValid(status : any) {
        const index = this.StatusOptions.indexOf(status);
        return index
    }
}