import {Playlist} from "./playlist.entity";
import {Track} from "./track.entity";

export interface PlaylistRepositoryI {
    createPlaylist: (name: string, isDefault: boolean, isPlaying: boolean, totalDuration: number, creatorId: any, creatorName: string, tracks: any) => Promise<any>;
    getPlaylist: (id: string) => Promise<Playlist>;
    getPlaylistByName: (name: string) => Promise<Playlist>;
    getPlaylists: () => Promise<Playlist[]>;
    deletePlaylist: (playlist: Playlist) => Promise<boolean>;
    addTrackToPlaylist: (playlist: Playlist, track: Track) => Promise<Playlist>;
    removeTrackFromPlaylist: (playlist: Playlist, track: Track) => Promise<Playlist>;
    getPlaylistTracks: (playlist: Playlist) => Promise<Track[]>;
    getPlaylistTrack: (playlist: Playlist, track: Track) => Promise<Track|null>;
}