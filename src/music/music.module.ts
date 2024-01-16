import {Module} from "@nestjs/common";
import {InjectDynamicProviders} from "nestjs-dynamic-providers";

@InjectDynamicProviders('dist/**/*.bot.command.js')
@Module({
    imports: [],
    controllers: [],
    providers: [],
    exports: []
})
export class MusicModule {}