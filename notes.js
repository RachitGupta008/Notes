const fs = require('fs');

var fetchNotes = () => {
  try {
    var noteData = fs.readFileSync("notes-data.json");
    return JSON.parse(noteData);
    } catch(e) {
      return [];
  }
};

var saveNote = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
  if(typeof(title) == 'undefined') {
    console.log("Title cant be emtpty");
  } else {
    var notes = fetchNotes();
    var note = {
      title,
      body
    };
    var duplicate  = notes.filter((noteObj) => noteObj.title === title);

    if (duplicate.length === 0) {
      notes.push(note);
      saveNote(notes);
      return note;
    }
  }
};

var removeNote = (title) => {
  if(typeof(title) == 'undefined'){
    console.log("Title cant be emtpty");
  }else {
    var notes = fetchNotes();
    var newNotes = notes.filter((noteObj) => noteObj.title !== title);
    saveNote(newNotes);

    return notes.length !== newNotes.length;
  }
};

var showAll = () => {
  return fetchNotes();
};

var read = (title) => {
  if(typeof(title) == 'undefined'){
    console.log("Title cant be emtpty");
  }else {
    var notes = fetchNotes();
    var reqNode = notes.filter((noteObj) => noteObj.title === title);
    return reqNode[0];
  }
};

var printMessage = (note, heading, errormessage) => {
  if (note) {
    console.log("\n",heading);
    console.log("\n Title:", note.title);
    console.log("===============================\n Body:", note.body);
  } else {
    console.log(errormessage);
  }
};

module.exports = {
  addNote,
  removeNote,
  showAll,
  read,
  printMessage
};
