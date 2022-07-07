const mangoose=require('mongoose')

const FeelingsShema=new mangoose.Schema({
    feeling: String
    
    
})

mangoose.model("feeling",FeelingsShema)