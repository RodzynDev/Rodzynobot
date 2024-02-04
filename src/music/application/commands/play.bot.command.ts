import { SlashCommandPipe } from '@discord-nestjs/common';
import {
    Command,
    EventParams,
    Handler, IA,
    InteractionEvent,
} from '@discord-nestjs/core';
import {ClientEvents, CommandInteraction, EmbedBuilder} from 'discord.js';

import { PlayDto } from '../../domain/dto/play.dto';
import {DefaultErrorMessageColor, MusicService} from "../../music.service";
import {Injectable, Logger} from '@nestjs/common';
import {Track} from "../../domain/track.entity";
import {DefaultPlaylistName, Playlist} from "../../domain/playlist.entity";

@Command({
    name: 'play',
    description: 'Plays a song',
})
@Injectable()
export class PlayBotCommand {
    private readonly logger = new Logger(MusicService.name)

    constructor(
        private readonly musicService: MusicService,
    ) {}

    @Handler()
    async onPlayCommand(
        @InteractionEvent(SlashCommandPipe) PlayDTO: PlayDto,
        @IA() interaction: CommandInteraction,
    ): Promise<any> {
        this.logger.log(`Playing song ${PlayDTO.song}`);

        const track: Track|any = await this.musicService.getSongTrackData(PlayDTO.song);
        if (!(track instanceof Track)) {
            let errorMessage = new EmbedBuilder()
                .setColor(DefaultErrorMessageColor)
                .setDescription(track.errorMessage);

            return {
                embeds: [
                    errorMessage
                ],
            };
        }

        const playlist = await this.musicService.getSelectedOfDefaultPlaylist(PlayDTO.playlist ?? DefaultPlaylistName, interaction);
        if (!(playlist instanceof Playlist)) {
            let errorMessage = new EmbedBuilder()
                .setColor(DefaultErrorMessageColor)
                .setDescription("I am unable to play your song, because the playlist you gave me is invalid. Please give me a valid playlist name");

            return {
                embeds: [
                    errorMessage
                ],
            };
        }

        return this.musicService.addSongToPlaylist(interaction, track, playlist);
    }
}