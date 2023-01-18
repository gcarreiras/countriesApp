const axios = require('axios');
const {Activity , Country} = require ('../db.js');


const createActivity =  async (req, res) => {

    //recibo mi actividad... hay una funcion que se encarga de verificar que esten todos los datos
    // y que me coincidan con los que corresponden a mi db , se utilizo el findOrCreate para evitar 
    // duplicados, si la actividad ya se cargo....avisa que es duplicada con la variable created
   
    const {name, difficulty, duration, season , country} = req.body;
    
    
    const resultCheck = checkBody (name, difficulty, duration, season, country)
   
    if (resultCheck === 'ok'){
                
        try{
            const [ activity , created] = await Activity.findOrCreate({
                where:{
                    name,
                    difficulty,
                    duration,
                    season
                }
            })

            if (created){
                for (let i = 0; i < country.length; i++) {
                    let createCountry = await Country.findByPk(country[i])
                    await activity.addCountry(createCountry)
                    
                }
                
                return res.status(200).json('created')
            }
            
            else return res.status(200).json('activity already exist')
            
    
        }catch(err){
            return res.status(404).json({error: err});
        }
    }else{
        return res.status(404).json(resultCheck) 
    }

}


function checkBody  (name, difficulty, duration, season , country){
   
    if (!name || !difficulty || !duration || !season || !country) return ('all data is required')
   
    if (name.length > 50) return ('name must be at least 50 characters long')
    
    if (typeof duration !== 'number') return ('duration must be a number')
   
    if (difficulty  < 1  || difficulty > 5 ) return ('difficulty must be between 1 --- 5')

// por si me olvido..... aca use una regular expresion, se pueden mandar derecho  tipo let re = /ab+c/;
// o llamando a la funcion constructora que use... esta tiene varios metodos, entre ellos el test.... que es el que use
// devuelve true o false, tmb comprobe la longitud y pase todo a mayuscula... si bien lo voy a comprobar en el front...


    charCheck = new RegExp('^[A-Z]+$', 'i')
    for (let i = 0; i < country.length; i++) {
        country[i] = country[i].toUpperCase()
        if ((country[i].length !== 3) || (!charCheck.test(country[i]))) return ('invalid country id')
    }
    

    let seasonCheck = ['summer', 'fall' ,'winter' , 'spring']

    for (let i = 0 ; i < seasonCheck.length ; i++){
        if (seasonCheck[i] === season) return ('ok')
    }
     return  ('invalid season')
                 
     
}

const getActivitys = async (req, res) =>{
    try{
       const arrayAct = await Activity.findAll({
        include : Country
       })

       return res.status(200).json(arrayAct)

    }catch(error){
        return res.status(400).json(error)
    }
}



module.exports ={createActivity , getActivitys}