import { Dto } from './index'
import { Min, Length, MinLength, ValidateNested, IsInt, ArrayContains, IsDateString } from 'class-validator'
import { lengthMsg } from './messages'

export class PostPageDto implements Dto{
    @Min(1)
    public limit:number=0
    @Min(0)
    public offset:number=0
}

export class PostGetDto implements Dto{
    @Min(1)
    public postId:number=0
}

export class PostSearchDto implements Dto{
    @Min(1)
    public limit: number=0
    @Min(0)
    public offset: number=0
    @MinLength(1)
    public word: string = ""
    @ArrayContains(["tag","content","title"])
    public type: string[] = []
}

export class PostPlusViewNumberDto implements Dto{
    @Min(1)
    public postId: number = 0
}

export class PostDto implements Dto{
    @Length(1,20, lengthMsg("이름"))
    public username: string = ""
    @Length(1,200, lengthMsg("제목"))
    public title: string = ""
    @Length(1, 10000, lengthMsg("내용"))
    public content: string = ""
    @Length(1,200,{
        each: true,
        ...lengthMsg("태그")
    })
    public tags!: string[]

    @IsDateString()
    public updatedAt: string = ""

    @Min(0)
    public view: number = 0

    @Min(0)
    public commentsLength: number = 0
    
    @ValidateNested({
        each: true
    })
    public comments!: CommentDto[]
}

export class CommentDto implements Dto {
    @Length(1, 20, lengthMsg("이름"))
    username: string = ""
    @Length(1, 1000, lengthMsg("답변"))
    content: string = ""
}

export class PostWriteDto implements Dto{
    @Length(1,200, lengthMsg("제목"))
    public title: string = ""
    @Length(1, 10000, lengthMsg("내용"))
    public content: string = ""
    @Length(1,200,{
        each: true,
        ...lengthMsg("태그")
    })
    public tags!: string[]
}

export class PostWriteCommentDto implements Dto{
    @IsInt()
    public postId: number = 0
    @Length(1, 1000, lengthMsg("답변"))
    public content: string = ""
    @IsInt()
    public parentId: number = -1
    @IsInt()
    public depth: number = 1
}

