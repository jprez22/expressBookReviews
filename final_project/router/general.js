const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/:books',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/books/:isbn',function (req, res) {
  //Extract the ISBN parameter 
  const ISBN = req.params.isbn
  // Send the array as the reponse to the client
  res.send(books[ISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let arr = Object.entries(books)
  const book_author = new Promise((resolve, reject)=>{

        let book_by_author = arr.filter((item)=>item[1].author === author)
        if (book_by_author)
        {
            resolve(book_by_author)
            //res.status(200).json(book_by_author[0][1])
        }
        else{
            //res.status(404).json({message: 'No book is found for the author: ${author}'})
            reject({message: 'No book is found for the author: ${author}'})
        }
  })

  book_author.then((resp)=>{
    res.status(200).json(resp)
  }).catch(err=>res.status(403).json({error: err}))
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let arr = Object.entries(books)
    const book_title = new Promise((resolve, reject)=>{
  
          let book_by_title = arr.filter((item)=>item[1].title === title)
          if (book_by_title)
          {
              resolve(book_by_title)
              //res.status(200).json(book_by_title[0][1])
          }
          else{
              //res.status(404).json({message: 'No book is found for the title: ${title}'})
              reject({message: 'No book is found for the title: ${title}'})
          }
    })
  
    book_title.then((resp)=>{
      res.status(200).json(resp)
    }).catch(err=>res.status(403).json({error: err}))
    
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
