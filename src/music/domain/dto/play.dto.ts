import { Param } from '@discord-nestjs/core';

export class PlayDto {
    @Param({
        name: 'song',
        description:
            'URL of Song. Could be from Youtube',
        required: true,
    })
    song: string;
}