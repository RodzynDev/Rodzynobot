import {Module} from "@nestjs/common";
import { DiscordModule } from '@discord-nestjs/core';
import {PlayBotCommand} from "./application/commands/play.bot.command";
import {MusicService} from "./music.service";
import {InjectDynamicProviders} from "nestjs-dynamic-providers";
import {MessageModule} from "../message/message.module";
import {DatabasePlaylistsRepository} from "./infrastructure/databasePlaylists.repository";
import {DatabaseTracksRepository} from "./infrastructure/databaseTracks.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Playlist} from "./domain/playlist.entity";
import {Track} from "./domain/track.entity";

// TODO: Fix this
// @InjectDynamicProviders('dist/**/*.bot.command.js')
@Module({
    imports: [
        TypeOrmModule.forFeature([Playlist, Track]),
        DiscordModule.forFeature(),
        MessageModule
    ],
    controllers: [],
    providers: [
        DatabasePlaylistsRepository,
        DatabaseTracksRepository,

        MusicService,

       PlayBotCommand
    ],
    exports: [
        MusicService
    ]
})
export class MusicModule {}