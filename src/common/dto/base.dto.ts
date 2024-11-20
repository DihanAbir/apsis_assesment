import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment-timezone';

export class BaseDto implements Readonly<BaseDto> {
    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    isDeleted: boolean;

    @ApiProperty()
    createdAt: number;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedAt: number;

    @ApiProperty()
    updatedBy: string;

    @ApiProperty({
        required: false
    })
    timezone: string;

    constructor(data?: any) {
        if (data) {
            data.hasOwnProperty("isActive") && (this.isActive = data.isActive);
            data.hasOwnProperty("isDeleted") && (this.isDeleted = data.isDeleted);
            const time =
                (data?.timezone &&
                    moment().tz(data.timezone).valueOf()) ||
                Date.now();
            data.createdBy && (this.createdBy = data.cBy) && (this.createdAt = time);
            data.updatedBy && (this.updatedBy = data.updatedBy) && (this.updatedAt = time);
        }
    }
}
