import { SlashCommandPipe } from '@discord-nestjs/common';
import {
    Command,
    EventParams,
    Handler, IA,
    InteractionEvent,
} from '@discord-nestjs/core';
import {ClientEvents, CommandInteraction} from 'discord.js';

import { PlayDto } from '../../domain/dto/play.dto';
import {MusicService} from "../../music.service";
import {Injectable} from "@nestjs/common";

@Command({
    name: 'play',
    description: 'Plays a song',
})
@Injectable()
export class PlayBotCommand {
    constructor(private readonly musicService: MusicService) {}

    @Handler()
    onPlayCommand(
        @InteractionEvent(SlashCommandPipe) PlayDTO: PlayDto,
        @IA() interaction: CommandInteraction,
    ): any {
        return this.musicService.playSong(interaction, PlayDTO.song)
    }
}