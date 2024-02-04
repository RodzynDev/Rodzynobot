import {Track} from "./track.entity";

export interface TrackRepositoryI {
    createTrack: (title: string, url: string, duration: number, thumbnail: string, playedTimes: number, lastPlayed: Date, isPlaying: boolean, isCurrentQueue: boolean, playlists: any) => Promise<any>;
    getTrackByURL: (url: string) => Promise<any>;
    getTrack: (id: string) => Promise<any>;
    getTracks: () => Promise<any>;
    deleteTrack: (track: Track) => Promise<boolean>;
}