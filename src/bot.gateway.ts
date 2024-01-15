import {Injectable, Logger} from "@nestjs/common";
import {InjectDiscordClient, Once} from "@discord-nestjs/core";
import {Client} from "discord.js";

@Injectable()
export class BotGateway {
    private readonly logger: Logger = new Logger(BotGateway.name);

    constructor(
        @InjectDiscordClient() private readonly discordClient: Client,
    ) {}

    @Once('ready')
    onReady(): void {
        this.logger.log(`Logged in as ${this.discordClient.user.tag}!`);
    }
}