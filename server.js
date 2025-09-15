const express = require('express');
const app = express();
const PORT = 4001;

app.use(express.json());
let books = [];
app.use(express.static('frontend'));
app.post('/api/books',(req,res)=>{
    const {title,author}=req.body
    if(!title||!author||title.trim()===''||author.trim()===''){
        res.status(404).json({error:"Invalid Entry"})
    }
    const newBook = {
        id:Date.now().toString(),
        title,
        author,
        available:true
    }
    books.push(newBook)
    res.status(201).json("Book is added")
})
app.get('/api/books',(req,res)=>{
    res.status(200).json(books)
})
app.delete('/api/books/:id',(req,res)=>{
    const {id} = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    if(bookIndex===-1){
        return res.status(404).json({message: 'Book not found'});
    }
    books.splice(bookIndex,1);
    res.status(200).json({message:'Book deleted successfully'})
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = app;
