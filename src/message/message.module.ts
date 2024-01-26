import {Module} from "@nestjs/common";
import { DiscordModule } from '@discord-nestjs/core';
import {MessageService} from "./message.service";

@Module({
    imports: [DiscordModule.forFeature()],
    controllers: [],
    providers: [
        MessageService
    ],
    exports: [
        MessageService
    ]
})
export class MessageModule {}