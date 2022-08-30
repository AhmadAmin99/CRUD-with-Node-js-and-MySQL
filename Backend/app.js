const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app=express();
app.use(express.json());
app.use(cors())


const q = mysql.createConnection({
    host:'localhost',
    database:'assignment4',
    user:'root',
    password:''
})
//1 - addProduct
app.post('/addProduct',(req,res)=>{
    const {name,price,description} = req.body;
    q.execute(`INSERT INTO products (name, price, description) values('${name}',${price},'${description}')`);
    res.json({message:"success"});
})

app.get('/getAllProducts', (req,res)=>{
    q.execute(`SELECT * FROM products`,(err,result)=>{
        res.json({message:"success",result});
    })

app.put('/update',(req,res)=>{
    const {id,name,price,description} = req.body;
    q.execute(`UPDATE products set name = '${name}', price = ${price}, description = '${description}' where id = ${id}`);
    res.json({message:"success"});
    })
})

app.delete('/delete',(req,res)=>{
    const {id} = req.body;
    q.execute(`DELETE FROM products where id = ${id}`);
    res.json({message:"success"});
})

app.get('/search', (req,res)=>{
    const {name} = req.body;
    q.execute(`SELECT * FROM products where name like '%${name}%'`,(err,result)=>{
        res.json({message:"success",result});
    });

})


app.listen(3000,()=>{
    console.log('server is running..............');
})