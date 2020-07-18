const { notes } = require('../data/notes');
const Ids = require('ids');
const ids = new Ids();
const fs = require("fs");
const path = require("path");

//function generate unique id
function getId(){
    let newId = ids.next();
    ids.claim(newId)
    return newId
}
//function to validate a note before create one
function validateNote(note){
    if(!note.title || typeof note.title !== 'string' ){
        return false;
    }
    if(!note.text || typeof note.text !== 'string' ){
        return false;
    }
    return true;
}
//function to search note by query
function filterByQuery(query, notesArray){
    let queryResults = notesArray;
    if(query.title){
        queryResults = queryResults.filter(note => note.title.toLowerCase() === query.title.toLowerCase())
    }
    if(query.text){
        queryResults = queryResults.filter(note => note.text.toLowerCase() === query.text.toLowerCase())
    }
    return queryResults;
}
//function to find a note by id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}
//funtion to create a note
function createNewNote(body, notesArray) {
    console.log('body',body)
    //create id
    let newId = getId();
    if(!ids.assigned(newId)){
        createNewNote(body, notesArray)
    }else {
        body.id = newId
    }

    let note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}
function deleteNote(id, notesArray){
    let newArray = notesArray
    newArray = newArray.filter(note => note.id !== id)
    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: newArray }, null, 2)
    );
    return newArray;
}
module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
};