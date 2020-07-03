import Command from '../lib/base';
import { flags } from '@oclif/command';
import { AxiosInstance } from 'axios';
export default class Explore extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        number: flags.IOptionFlag<string | undefined>;
    };
    doCommand(userConfig: {
        token: any;
    }, client: AxiosInstance): Promise<void>;
}
