import Command from '../lib/base';
import { flags } from '@oclif/command';
import { AxiosInstance } from 'axios';
export default class New extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        tag: flags.IOptionFlag<string[]>;
        action: flags.IOptionFlag<string | undefined>;
    };
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    doCommand(userConfig: Object, client: AxiosInstance): Promise<void>;
}
