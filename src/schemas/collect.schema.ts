import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Record} from '../collect/dto/create-collect.dto';
// Schema装饰器同样接受一个options参数，让我们按意愿配置数据模型
// 同new mongoose.Schema(_, options)中的options配置一样，具体详情可查阅mongoose文档
@Schema({
  	// 配置集合名称。如果不配置此项的话，默认会取类名并加上一个's'，数据库内的集合名称就是'users'
    collection: 'collect', 
    // timestamps是用来配置createdAt和updatedAt的。默认为false不创建，可按需求自定义
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
export class Collect {
  	// Prop装饰器是用来配置属性的，比如定义属性类型，是否必填等，具体可参考文档
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    admin: string;
    @Prop({ required: true })
    owner: string;
    @Prop({ required: false })
    description: string;
    @Prop({ required: true })
    team: string;
    @Prop({ required: true })
    time: Date[];
    @Prop({ required: true})
    records: Record[];
}

export const CollectSchema = SchemaFactory.createForClass(Collect);
export type CollectDocument = Collect & Document;
