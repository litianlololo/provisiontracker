export class Record {
    readonly name: string;
    readonly unit: string;
    readonly remark: string;
}
export class CreateCollectDto {
    readonly title: string;
    readonly admin: string;
    readonly owner: string;
    readonly  description: string;
    readonly team: string;
    readonly time: Date[];
    readonly records: Record[];
}
