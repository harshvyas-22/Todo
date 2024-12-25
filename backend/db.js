const mongoose=require("mongoose");
 
const URL=`mongodb+srv://harshvyas:harsh@cluster0.vrj7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(URL)

const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo=mongoose.model('todo',todoSchema);
module.exports={
    todo
}