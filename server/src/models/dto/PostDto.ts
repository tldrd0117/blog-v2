import { Dto } from './index'
import { Min, Length, MinLength, ValidateNested, IsInt } from 'class-validator'
import { lengthMsg } from './messages'


export class PostPageDto implements Dto{
    @Min(1)
    public limit=0
    @Min(0)
    public offset=0
}

export class PostDto implements Dto{
    @Length(1,20, lengthMsg("이름"))
    public username: number = 0
    @Length(1,200, lengthMsg("제목"))
    public title: string = ""
    @Length(1, 10000, lengthMsg("내용"))
    public content: string = ""
    @Length(1,200,{
        each: true,
        ...lengthMsg("태그")
    })
    public tags!: string[]
    
    @ValidateNested({
        each: true
    })
    public comments!: CommentDto[]
}

export class CommentDto implements Dto {
    @Length(1, 20, lengthMsg("이름"))
    username: string = ""
    @Length(1, 1000, lengthMsg("내용"))
    content: string = ""
}

export class PostWriteDto implements Dto{
    @IsInt()
    public authorId: number = 0
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
    @IsInt()
    public authorId: number = 0
    @Length(1, 1000, lengthMsg("답변내용"))
    public content: string = ""
}


