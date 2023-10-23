import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// Schema装饰器同样接受一个options参数，让我们按意愿配置数据模型
// 同new mongoose.Schema(_, options)中的options配置一样，具体详情可查阅mongoose文档
@Schema({
  	// 配置集合名称。如果不配置此项的话，默认会取类名并加上一个's'，数据库内的集合名称就是'users'
    collection: 'user', 
    // timestamps是用来配置createdAt和updatedAt的。默认为false不创建，可按需求自定义
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: false
    },
    // 这里是对toJSON()方法进行配置，toJSON()方法是用来把查询出来的数据库数据对象转换成普通对象
  	// 数据库默认都有一个_id，是ObjectId类型，同时为其制定一个虚拟映射id，string类型
  	// virtuals是控制id字段是否显示的，默认为false
  	// transform是对结果文档做一些操作，常见的就是去掉_id，只保留id
    toJSON: {
        virtuals: true,
        transform: (doc, ret, opt) => {
            delete ret._id;
        }
    }
})
export class User {
  	// Prop装饰器是用来配置属性的，比如定义属性类型，是否必填等，具体可参考文档
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    pwd: string;
    @Prop({ required: true })
    company: string;
    @Prop({ required: false })
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
