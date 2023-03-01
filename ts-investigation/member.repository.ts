import fs from 'fs';
import { Member } from "./member";

interface MemberDb {
    members: Member[]
};

export class MemberRepository {

    private _filename: string = "";

    private data: MemberDb;

    constructor(filename: string) {
        this.filename = filename;
        let text:string = fs.readFileSync(this.filename, 'utf8');
        this.data = JSON.parse(text);


        this.data.members.push(new Member(99, "Nina", "nina99@gmail"));
    }

    public get members(): Member[] {
        return this.data.members;
    }

    public get filename(): string {
        return this._filename;
    }

    public set filename(filename) {

        // validation on filename before I set it
        if (!filename.endsWith('.json')) {
            throw new Error("invalid filename");
        }
        this._filename = filename;
    }
}