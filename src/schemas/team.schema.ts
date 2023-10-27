import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
    collection: 'team', 
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: false
    },
    toJSON: {
        virtuals: true,
        transform: (doc, ret, opt) => {
            delete ret._id;
        }
    }
})

export class Team {
  	// Prop装饰器是用来配置属性的，比如定义属性类型，是否必填等，具体可参考文档
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    admin_id: string;
    @Prop({ required: false })
    company: string;
    @Prop({ required: true }) 
    members: string[];
    // 使用 type: Object 定义 members 字段以接受对象数组
    //members: Array<{ name: string; id: string; pwd: string }>; // 定义 members 为包含特定字段的对象数组
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export type TeamDocument = Team & Document;
