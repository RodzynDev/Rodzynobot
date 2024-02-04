import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TrackRepositoryI} from "../domain/track.repository";
import {Track} from "../domain/track.entity";
import {Playlist} from "../domain/playlist.entity";

export class DatabaseTracksRepository implements TrackRepositoryI {
    constructor(
        @InjectRepository(Track) private readonly trackRepository: Repository<Track>,
    ) {
    }

    public async createTrack(
        title: string,
        url: string,
        duration: number,
        thumbnail: string,
        playedTimes: number,
        lastPlayed: Date,
        isPlaying: boolean,
        isCurrentQueue: boolean,
        playlists: Playlist[]
    ): Promise<any> {
        return await this.trackRepository.save({
            title: title,
            url: url,
            duration: duration,
            thumbnail: thumbnail,
            playedTimes: playedTimes,
            lastPlayed: lastPlayed,
            isPlaying: isPlaying,
            isCurrentQueue: isCurrentQueue,
            playlists: playlists
        });
    }

    public async deleteTrack(track: Track): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async getTrack(trackId: string): Promise<Track> {
        return await this.trackRepository.findOneBy({
            id: trackId
        })
    }

    public async getTrackByURL(url: string): Promise<any> {
        return await this.trackRepository.findOne({
            where: {
                url: url
            }
        });
    }

    getTracks(): Promise<any> {
        return Promise.resolve(undefined);
    }
}