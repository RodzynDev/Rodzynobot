import {BaseEntity} from "../../common/entities/base.entity";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {Track} from "./track.entity";

export const DefaultPlaylistName = 'Default';

@Entity()
export class Playlist extends BaseEntity {
    @Column({unique: true, default: 'Domyślna'})
    name: string;

    @Column()
    isDefault: boolean;

    @Column()
    isPlaying: boolean;

    @Column()
    totalDuration: number;

    @Column()
    creatorId: string;

    @Column()
    creatorName: string;

    @ManyToMany(() => Track, (track: Track) => track.playlists, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    tracks?: Track[];
}