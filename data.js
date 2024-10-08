const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Tennis')
.then(()=>{
    console.log('成功了');
})
.catch((err)=>{
    console.log(err);
})


//用户信息
let userSchema = new mongoose.Schema({
    user_pwd:String, //密码
    user_phone:String, //手机号,
    r_time:{  //注册时间
        type:Date,
        default:Date.now
    }
})

//场馆
let venueSchema = new mongoose.Schema({
    name:String, //名字
    image:String, // 场馆图片
    description:String,//场馆描述
    location:String, //地址
    create_time:{  //创建时间
        type:Date,
        default:Date.now
    }
})

//门票
 let ticketSchema = new mongoose.Schema({
    vid:{ //场馆id
        type:mongoose.Types.ObjectId,
        ref:'venues'
    },
    dateForm:Date, //门票开始
    dateTo:Date, //门票结束
    capacity:Number, //可预约票数
    remaining:Number, //剩余票数,
    isActive:{type:Boolean,default:true}, //是否可预约
    content:String
 })
//预约
let orderSchema = new mongoose.Schema({
    uid:{  //用户id
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    tid:{ //门票id
        type:mongoose.Types.ObjectId,
        ref:'ticket'
    },
    date:Date, //预约时间
    selectedTime:String, //预约的时间段
    numberOfPeople:Number,//预约人数
    status:{ //预约状态
        type:String,
        default:'已预约'
    },
    userDetails:Array,//所预约的用户,用户信息  name,idcard phone
    create_time:{  //预约时的时间
        type:Date,
        default:Date.now
    }
})

//活动信息表
let activities = new mongoose.Schema({
    name:String, //活动名称
    event_time:Date, //活动时间
    description:String, //活动描述
    status:{type:Boolean,default:true} //是否进行中
})

//公告
let announcements = new mongoose.Schema({
    content:String, //公告内容
    publish_time:Date, //发布时间
})

//用户表
let userModel = mongoose.model('user',userSchema,'user')
//场馆表
let venueModel = mongoose.model('venues',venueSchema,'venues')
//预约表
let orderModel = mongoose.model('order',orderSchema,'order')
//门票表
let ticketModel = mongoose.model('ticket',ticketSchema,'ticket')
//公告表
let announcementsModel = mongoose.model('announcement',announcements,'announcement')
//活动表
let activitiesModel = mongoose.model('activities',activities,'activities')
module.exports = {userModel,venueModel,orderModel,ticketModel,announcementsModel,activitiesModel}