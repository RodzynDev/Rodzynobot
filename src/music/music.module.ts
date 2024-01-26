import {Module} from "@nestjs/common";
import { DiscordModule } from '@discord-nestjs/core';
import {PlayBotCommand} from "./application/commands/play.bot.command";
import {MusicService} from "./music.service";
import {InjectDynamicProviders} from "nestjs-dynamic-providers";
import {MessageModule} from "../message/message.module";

// TODO: Fix this
// @InjectDynamicProviders('dist/**/*.bot.command.js')
@Module({
    imports: [
        DiscordModule.forFeature(),
        MessageModule
    ],
    controllers: [],
    providers: [
        PlayBotCommand,
        MusicService
    ],
    exports: [
        MusicService
    ]
})
export class MusicModule {}