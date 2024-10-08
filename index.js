var express = require('express');
var router = express.Router();
var {userModel,venueModel,orderModel,ticketModel,activitiesModel,announcementsModel}= require("../module/data")


//登录 无token版
router.post('/login',async (req,res)=>{
    let {username,password} = req.body
    let user = await userModel.findOne({username,password})
    if(user){
        res.send({
            code:200,
            msg:'登录成功'
        })
    }else{
        res.send({
            code:401,
            msg:'登录失败,用户名或密码错误'
        })
    }
})


//认证 不全版
router.post('/auth', async(req,res)=>{
    let {real_name,idcard} = req.body
    let user = await authenticationModel.findOne({real_name,idcard})
    if(user){
        res.send({
            code:200,
            msg:'认证成功'
        })
    }else{
        res.send({
            code:401,
            msg:'认证失败'
        })
    }
})


//获取场馆-----------------------------------------------------------------
router.post('/venues', async(req,res)=>{
    let list = await venueModel.findOne()
    res.send({
        code:200,
        data:list,
        msg:'成功'
    })
})

//获取某个场馆信息
// router.post('/venue', async(req,res)=>{
//     let {id} = req.body
//     let list = await venueModel.findOne({_id:id})
//     res.send({
//         data:list,
//         code:200
//     })
// })

//添加场馆--1
// router.post('/add_venue',async (req,res)=>{
//     let {name} = req.body
//     let list = await venueModel.findOne({name})
//     if(list){
//         res.send({
//             code:201,
//             msg:'已有该场馆'
//         })
//     }else{
//         res.send({
//             code:200,
//             msg:'添加成功'
//         })
//     }
// })

// 修改场馆信息--0
router.post('/update_venue',async (req,res)=>{
    let {id} = req.body
    await venueModel.updateOne({_id:id},req.body)
    res.send({
        code:200,
        msg:'修改成功'
    })
})

//删除场馆--0
// router.post('/del_venue',async (req,res)=>{
//     let {ids} = req.body
//     await venueModel.deleteMany({_id:ids})
//     res.send({
//         code:200,
//         msg:'删除成功'
//     })
// })


//预约信息---------------------------------------------------------
router.post('/order', async (req,res)=>{
    let {page,pageSize,status} = req.body
    let p = [{}]
    if(status){
        p.push({status:status})
    }
    let list = await orderModel.find({$and:p}).skip((page-1)*pageSize).limit(pageSize)
    res.send({
        code:200,
        data:list
    })
})

//my预约
router.post('/myorder',async (req,res)=>{
    let {id} = req.body
    let list = await orderModel.findOne({uid:id})
    res.send({
        code:200,
        data:list
    })
} )

//添加预约
router.post('/add_order',async (req,res)=>{
    let list = await orderModel.findOne(req.body)
    if(list){
        res.send({
            code:201,
            msg:'已有预约过'
        })
    }else{
        orderModel.create(req.body)
        res.send({
            code:200,
            msg:'预约成功'
        })
    }
})

//修改预约
router.post('/update_order',async (req,res)=>{
    let {id} = req.body
    await orderModel.updateOne({_id:id},req.body)
    res.send({
        code:200,
        msg:'修改预约成功'
    })
})

//删除预约
router.post('/del_order',async (req,res)=>{
    let {id} = req.body
    await orderModel.deleteMany({_id:id})
    res.send({
        code:200,
        msg:'取消预约'
    })
})

//门票信息--------------------------------------------------------
router.post('/ticket',async (req,res)=>{
    let {id} = req.body
    let ticket = await ticketModel.findOne({_id:id})
    res.send({
        code:200,
        msg:'获取成功',
        ticket:ticket
    })
})
//添加门票
router.post('/add_ticket', (req,res)=>{
    ticketModel.create(req.body)
    res.send({
        code:200,
        msg:'添加成功'
    })
})
//修改门票
router.post('/update_ticket',async (req,res)=>{
    let {id} = req.body
    await ticketModel.updateOne({_id:id},req.body)
    res.send({
        code:200,
        msg:'修改成功'
    })
})
//删除门票
router.post('/delete_ticket',async (req,res)=>{
    let {id} = req.body
    await ticketModel.deleteMany({_id:id},req.body)
    res.send({
        code:200,
        msg:'删除成功'
    })
})

//公告-------------------------------------------------------------
router.post('/anno',async (req,res)=>{
    let annos = await announcementsModel.find()
    res.send({
        code:200,
        msg:'获取成功',
        annos:annos
    })
})
//添加公告
router.post('/add_anno', (req,res)=>{
    announcementsModel.create(req.body)
    res.send({
        code:200,
        msg:'添加成功'
    })
})
//修改公告
router.post('/update_anno',async (req,res)=>{
    let {id} = req.body
    await announcementsModel.updateOne({_id:id},req.body)
    res.send({
        code:200,
        msg:'修改成功'
    })
})
//删除公告
router.post('/delete_anno',async (req,res)=>{
    let {id} = req.body
    await announcementsModel.deleteMany({_id:id},req.body)
    res.send({
        code:200,
        msg:'删除成功'
    })
})
//活动-------------------------------------------------------------
router.post('/active',async (req,res)=>{
    let active = await activitiesModel.find()
    res.send({
        code:200,
        msg:'获取成功',
        active:active
    })
})
//添加活动
router.post('/add_active', (req,res)=>{
    activitiesModel.create(req.body)
    res.send({
        code:200,
        msg:'添加成功'
    })
})
//修改活动
router.post('/update_active',async (req,res)=>{
    let {id} = req.body
    await activitiesModel.updateOne({_id:id},req.body)
    res.send({
        code:200,
        msg:'修改成功'
    })
})
//删除活动
router.post('/delete_active',async (req,res)=>{
    let {id} = req.body
    await activitiesModel.deleteMany({_id:id},req.body)
    res.send({
        code:200,
        msg:'删除成功'
    })
})
module.exports = router;
