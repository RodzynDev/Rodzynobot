import { Param } from '@discord-nestjs/core';

export class PlayDto {
    @Param({
        name: 'song',
        description:
            'URL or title of Song. Could be from Youtube',
        required: true,
    })
    song: string;

    @Param({
        name: 'playlist',
        description: 'Playlist name',
        required: false,
    })
    playlist: string|undefined;
}