import { Dto } from './index'
export class PostPageDto implements Dto{
    public limit=0
    public count=0
}

export class PostWriteDto implements Dto{
    public authorId!: string;
    public title!: string;
    public content!: string;
    public tagNames?: string[];
}
