import { SlashCommandPipe } from '@discord-nestjs/common';
import {
    Command,
    EventParams,
    Handler,
    InteractionEvent,
} from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';

import { PlayDto } from '../../domain/dto/play.dto';
import {MusicService} from "../../music.service";

@Command({
    name: 'play',
    description: 'Plays a song',
})
export class PlayBotCommand {
    constructor(private readonly musicService: MusicService) {
        console.log('test');
    }

    @Handler()
    onPlayCommand(
        @InteractionEvent(SlashCommandPipe) dto: PlayDto,
        @EventParams() args: ClientEvents['interactionCreate'],
    ): string {
        console.log('DTO', dto);
        console.log('Event args', args);

        return this.musicService.play(dto.song)
    }
}