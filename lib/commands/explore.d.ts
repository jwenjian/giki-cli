import Command from '../lib/base';
import { AxiosInstance } from 'axios';
export default class Explore extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        number: import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
    };
    doCommand(userConfig: {
        token: any;
    }, client: AxiosInstance): Promise<void>;
}
