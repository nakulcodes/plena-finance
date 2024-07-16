import { Controller, Param, Put } from "@nestjs/common";
import { UserBlockService } from "./block.service";

@Controller()
export class UserBlockController {
    constructor(private readonly userBlockSerivce: UserBlockService) {

    }


    @Put(':id/block')
    block(@Param('id') id: string) {
        return this.userBlockSerivce.blockUser(id);
    }

    @Put(':id/unblock')
    unblock(@Param('id') id: string) {
        return this.userBlockSerivce.unblockUser(id);
    }

}