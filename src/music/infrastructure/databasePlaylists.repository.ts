import {PlaylistRepositoryI} from "../domain/playlist.repository";
import {Repository} from "typeorm";
import {Playlist} from "../domain/playlist.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Track} from "../domain/track.entity";

export class DatabasePlaylistsRepository implements PlaylistRepositoryI {
    constructor(
        @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
    ) {
    }

    public async addTrackToPlaylist(playlist: Playlist, track: Track): Promise<Playlist> {
        playlist.tracks.push(track);
        return await this.playlistRepository.save(playlist);
    }

    public async createPlaylist(name: string, isDefault: boolean, isPlaying: boolean, totalDuration: number, creatorId: any, creatorName: string, tracks: any): Promise<any> {
        return this.playlistRepository.save({
            name: name,
            isDefault: isDefault,
            isPlaying: isPlaying,
            totalDuration: totalDuration,
            creatorId: creatorId,
            creatorName: creatorName,
            tracks: tracks
        });
    }

    public async deletePlaylist(playlist: Playlist): Promise<boolean> {
        if(playlist.isDefault) {
            return false;
        }

        await this.playlistRepository.remove(playlist);
        return true;
    }

    public async getPlaylist(id: string): Promise<Playlist|null> {
        return await this.playlistRepository.findOneBy({id: id});
    }

    public async getPlaylistByName(name: string): Promise<any> {
        return await this.playlistRepository.findOne({
            where: {
                name: name
            }
        });
    }

    public async getPlaylistTrack(playlist: Playlist, track: Track): Promise<Track|null> {
        return Promise.resolve(undefined);
    }

    getPlaylistTracks(playlist: Playlist): Promise<any> {
        return Promise.resolve(undefined);
    }

    getPlaylists(): Promise<any> {
        return Promise.resolve(undefined);
    }

    public async removeTrackFromPlaylist(playlist: Playlist, track: Track): Promise<any> {
        playlist.tracks = playlist.tracks.filter((t) => t.id !== track.id);
        return await this.playlistRepository.save(playlist);
    }
}