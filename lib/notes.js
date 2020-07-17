const { notes } = require('../data/notes');

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

module.exports = {
    filterByQuery,
    findById,
    //createNewNote,
    validateNote
};