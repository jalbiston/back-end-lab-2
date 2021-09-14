const e = require('express');
const houses = require('./db.json');
let id = 4

module.exports = {
    getHouses: (req, res) =>{
res.status(200).send(houses)
    },
    createHouse: (req, res) => {
     let {address, price, imageURL}=req.body
     let house ={
         id: id,
         address,
         price: +price,
         imageURL
     }   
     id++;
     houses.push(house)
     res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
     let {id} = req.params
     let {type} = req.body
     let index =houses.findIndex(elem => elem.id === +id)


     if (houses[index].price === 0 && type === 'minus'){
         res.status(400).send('Cannot be below 0')
     } else if (type === 'minus') {
         houses[index].price -=10000
         res.status(200).send(houses)
     }  else if (type === 'plus') {
         houses[index].price +=10000
         res.status(200).send(houses)
    
     }
    
    },
    deleteHouse: (req, res) => {
      let {id} = req.params
      let index = houses.findIndex(elem => elem.id === +id)
    houses.splice(index, 1)
    res.status(200).send(houses)
    }
}