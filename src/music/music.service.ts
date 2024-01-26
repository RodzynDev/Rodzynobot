import {
    AudioPlayer,
    AudioPlayerStatus,
    AudioResource,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    joinVoiceChannel, NoSubscriberBehavior,
    VoiceConnection,
    VoiceConnectionStatus,
} from '@discordjs/voice';
import {Injectable, Logger} from '@nestjs/common';
import {Client, CommandInteraction, EmbedBuilder, GuildMember, RGBTuple} from "discord.js";
import {InjectDiscordClient} from "@discord-nestjs/core";
import ytdl from 'ytdl-core';
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {formatSongDuration} from "../common/utils/formatSongDuration";

export const DefaultErrorMessageColor: RGBTuple = [205, 63, 63]
export const DefaultMessageColor: RGBTuple = [255, 161, 42];

@Injectable()
export class MusicService {
    private readonly logger = new Logger(MusicService.name);
    private audioPlayer: AudioPlayer | undefined;
    private voiceConnection: VoiceConnection | undefined;
    private audioResource: AudioResource | undefined;
    private readonly eventEmitter: EventEmitter2
    constructor(
        @InjectDiscordClient() private readonly client: Client,
    ) {}

    async playSong(commandInteraction: CommandInteraction, songUrl: string) {
        this.logger.log(`Playing song ${songUrl}`);

        const commandInteractionMember = commandInteraction.member as GuildMember;

        // Validate song URL
        if(ytdl.validateURL(songUrl) === false) {
            let errorMessage = new EmbedBuilder()
                .setColor(DefaultErrorMessageColor)
                .setDescription("I am unable to play your song, because the URL you gave me is invalid. Please give me a valid URL");

            return {
                success: false,
                reply: {
                    embeds: [
                        errorMessage
                    ],
                },
            };
        }

        const songMetadata = await ytdl.getInfo(songUrl);
        this.audioResource = await createAudioResource(ytdl(songUrl, {filter: 'audioonly'}));
        const connectionData = await this.tryJoinChannelAndEstablishVoiceConnection(commandInteractionMember);

        if(!connectionData.success) {
            return connectionData.reply;
        }

        if (this.voiceConnection === undefined) {
            this.logger.error(`Unable to play song ${songUrl} because voice connection is undefined`);
            return;
        }

        this.audioPlayer.play(this.audioResource);
        this.voiceConnection.subscribe(this.audioPlayer);

        let songInfoEmbed = new EmbedBuilder()
            .setColor(DefaultMessageColor)
            .setTitle(songMetadata.videoDetails.title)
            .setURL(songUrl)
            .setThumbnail(songMetadata.videoDetails.thumbnails[0].url)
            .setDescription("I am now playing this song")
            .setTimestamp()
            .addFields(
                { name: 'Duration', value: formatSongDuration(parseInt(songMetadata.videoDetails.lengthSeconds)), inline: true } as any,
                { name: 'Queue Position', value: 1 + '', inline: true } as any,
                { name: 'Added by', value: commandInteractionMember.user.globalName, inline: true } as any,
            );

        return {
            embeds: [
                songInfoEmbed
            ],
        };
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
                .setColor(DefaultErrorMessageColor)
                .setDescription("I am unable to join your channel, because you don't seem to be in a voice channel. Connect to a channel first to use this command");

            return {
                success: false,
                reply: {
                    embeds: [
                        errorMessage
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
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
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

    // @OnEvent('internal.audio.track.announce')
    // handleOnNewTrack(track: Track) {
    //     const resource = createAudioResource(
    //         track.getStreamUrl(this.jellyfinStreamBuilder),
    //         {
    //             inlineVolume: true,
    //         },
    //     );
    //     this.playResource(resource);
    // }
}