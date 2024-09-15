const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//models
const {User} = require('./models/user'); 
const {Brand} = require('./models/brand')
const {Wood} = require('./models/wood')
const {Product} = require('./models/product')

//middlewares
const {auth} = require('./middleware/auth')
const {admin} = require('./middleware/admin')

// PRODUCTS //

//BY ARRIVAL
// /articles?sortBy=createdtAt&order=desc&limit=4

//BY SELL
// /articles?sortBy=sold&order=desc&limit=4&skip=5
app.get('/api/product/articles', (req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    
    Product.find().
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    limit(limit).exec().then((docs)=>{
        res.status(200).send(docs)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array") {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            console.log(item)
            return new mongoose.Types.ObjectId(item)
        })
    }

    Product.find({'_id':{$in:items}}).
    populate('brand').
    populate('wood').
    exec().
    then((docs)=>{
        return res.status(200).send(docs)
    }).catch((err)=>{
        return res.status(500).send(err)
    })
      
   
})
app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save().then((docs)=>{
        res.status(200).json({success:true, article:docs})
    }).catch((err)=>{
        res.json({sucess:true,error:err})
    })
})

// WOODS //
app.post('/api/product/wood', auth, admin, (req,res)=>{
    const wood = new Wood(req.body);

    wood.save().then((doc)=>{
        res.status(200).json({
            success:true,
            wood:doc
        })
    }).catch((err)=>{
        res.json({success:false, error: err})
    })
})

app.get('/api/product/getWoods',auth,admin,(req,res)=>{
    Wood.find().then((docs)=>{
        res.status(200).json({sucess:true, woods:docs})
    }).catch((err)=>{
        res.json({success:false, error:err})
    })
})

// BRANDS //
app.post('/api/product/brand', auth, admin, (req,res)=>{
    const brand = new Brand(req.body);

    brand.save().then((doc)=>{
        res.status(200).json({
            success: true,
            brand: doc
        })
    }).catch((error)=>{
        res.json({success:false, error: error})
    })

})

app.get('/api/product/getBrands', auth, admin, (req,res)=>{
    Brand.find().then((brands)=>{
        res.status(200).send(brands)
    }).catch((err)=>{
        res.status(400).send(err)
    })

})


// Users //

app.get('/api/users/auth', auth, (req,res)=>{
    res.status(200).json({
        isAdmin : req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name : req.user.name,
        lastName : req.user.name,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);

    const err =  user.save().then((result)=>{
        res.status(200).json({
            success:true,
           // data:result
        });
    }).catch((err)=>{
        res.json({
            success:false,
            error:err
        });
    }) 
})

app.post('/api/users/login', async (req,res)=>{
    // find email
    try{
        const user = await User.findOne({'email':req.body.email})
        if(!user) return res.json({loginSuccess:false,message:'Ath fail, email deosnt exist'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:"Wrong password"});
    
            user.generateToken((err,user)=>{
                 if(err) return res.status(400).send(err);
                 res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                 })
            })
        })
    }
    catch{
        res.status(400).json({loginSuccess:false, message: 'Error in login'})
    }
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.user._id},
        { token: ''}
    ).then(()=>{
        res.status(200).send({success:true})
    }).catch(()=>{
        res.json({sucess:false, err})
    })
})

const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})