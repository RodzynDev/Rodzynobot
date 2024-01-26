import { Module } from '@nestjs/common';
import {DiscordModule} from "@discord-nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "./common/config/configuration";
import {MusicModule} from "./music/music.module";
import {BotGateway} from "./bot.gateway";
import {MessageModule} from "./message/message.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('discord_config'),
      inject: [ConfigService],
    }),
    MusicModule,
    MessageModule
  ],
  providers: [
    BotGateway
  ],
})
export class BotModule {}
