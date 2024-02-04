import {BaseEntity} from "../../common/entities/base.entity";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {Playlist} from "./playlist.entity";

@Entity()
export class Track extends BaseEntity {
    @Column({unique: true})
    title: string;

    @Column({unique: true})
    url: string;

    @Column()
    duration: number;

    @Column()
    thumbnail: string;

    @Column()
    playedTimes: number;

    @Column()
    lastPlayed: Date;

    @Column()
    isPlaying: boolean;

    @Column()
    isCurrentQueue: boolean;

    @ManyToMany(() => Playlist, (playlist) => playlist.tracks)
    playlists: Playlist[];
}