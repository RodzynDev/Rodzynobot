import {
    AudioPlayer,
    AudioPlayerStatus,
    AudioResource,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    joinVoiceChannel,
    VoiceConnection,
    VoiceConnectionStatus,
} from '@discordjs/voice';
import {Injectable, Logger} from '@nestjs/common';
import {Client, CommandInteraction, EmbedBuilder, GuildMember, RGBTuple} from "discord.js";
import {InjectDiscordClient} from "@discord-nestjs/core";
import ytdl from 'ytdl-core';

export const DefaultErrorMessage: RGBTuple = [255, 161, 42];

@Injectable()
export class MusicService {
    private readonly logger = new Logger(MusicService.name);
    private audioPlayer: AudioPlayer | undefined;
    private voiceConnection: VoiceConnection | undefined;
    private audioResource: AudioResource | undefined;
    constructor(
        @InjectDiscordClient() private readonly client: Client,
    ) {}

    async playSong(commandInteraction: CommandInteraction, songUrl: string) {
        this.logger.log(`Playing song ${songUrl}`);
        console.log(commandInteraction.member);

        this.audioResource = createAudioResource(ytdl(songUrl, {filter: 'audioonly'}));
        this.tryJoinChannelAndEstablishVoiceConnection(commandInteraction.member as GuildMember);

        if (this.voiceConnection === undefined) {
            this.logger.error(`Unable to play song ${songUrl} because voice connection is undefined`);
            return;
        }

        this.audioPlayer.play(this.audioResource);
        this.voiceConnection.subscribe(this.audioPlayer);

        console.log(this.audioPlayer.state.status);
        console.log(this.audioPlayer.state.status === AudioPlayerStatus.Playing);
        console.log(this.audioPlayer.state.status === AudioPlayerStatus.Idle);
        console.log(this.audioPlayer.state.status === AudioPlayerStatus.Paused);
        console.log(this.audioPlayer.state.status === AudioPlayerStatus.AutoPaused);
        console.log(this.audioPlayer.checkPlayable());

        // let errorMessage = new EmbedBuilder()
        //     .setColor(DefaultErrorMessage)
        //     .setDescription("I am unable to play this song, sorry ;p");
        //
        // return {
        //     success: false,
        //     reply: {
        //         embeds: [
        //             errorMessage.toJSON()
        //         ],
        //     },
        // };

        return `Start playing ${songUrl}.`;
    }

    private tryJoinChannelAndEstablishVoiceConnection(
        member: GuildMember,
    ){
        if (this.voiceConnection !== undefined) {
            this.logger.debug(
                'Avoided joining the voice channel because voice connection is already defined',
            );
            return {
                success: true,
                reply: {},
            };
        }

        if (member.voice.channel === null) {
            this.logger.log(
                `Unable to join a voice channel because the member ${member.user.username} is not in a voice channel`,
            );

            let errorMessage = new EmbedBuilder()
                .setColor(DefaultErrorMessage)
                .setDescription("I am unable to join your channel, because you don't seem to be in a voice channel. Connect to a channel first to use this command");

            return {
                success: false,
                reply: {
                    embeds: [
                        errorMessage.toJSON()
                    ],
                },
            };
        }

        const channel = member.voice.channel;

        joinVoiceChannel({
            channelId: channel.id as string,
            adapterCreator: channel.guild.voiceAdapterCreator as any,
            guildId: channel.guildId as string
        });

        if (this.voiceConnection === undefined) {
            this.voiceConnection = getVoiceConnection(member.guild.id as string);
            this.audioPlayer = createAudioPlayer({
                // behaviors: {
                //     noSubscriber: NoSubscriberBehavior.Pause,
                // },
            });
        }

        this.voiceConnection?.on(VoiceConnectionStatus.Disconnected, () => {
            // if (this.voiceConnection !== undefined) {
            //     const playlist = this.playbackService.getPlaylistOrDefault().clear();
            //     this.disconnect();
            // }
        });

        return {
            success: true,
            reply: {},
        };
    }
}