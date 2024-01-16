import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
    play(song: string): string {
        return `Start playing ${song}.`;
    }
}