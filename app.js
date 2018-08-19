const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
var getOption = (describe,alias,demand) =>{
  return {
    describe,
    alias,
    demand
  };
};
const titleOptions =  getOption("Title of the note",
"t",
true
);
const bodyOptions = getOption("Body of the note",
"b",
false);
var argv = yargs
.command(
  "add",
  "Add a new note",
  {
    title: titleOptions,
    body: bodyOptions
  })
.command(
  "remove",
  "Remove a note",
  {
    title: titleOptions
  }
)
.command(
  "list",
  "List all the notes present"
)
.command(
  "show",
  "Retrive the note by its title name",
  {
    title: titleOptions
  }
)
  .help()
.argv;
var command = process.argv[2];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  notes.printMessage(note, "Note added", "Note already exist or title not define");
} else if (command === 'remove') {
  var isRemoved = notes.removeNote(argv.title);
  var message = isRemoved ? "Note removed" : "Note not found or title underfined";
  console.log(message);
} else if (command === 'list') {
  var allnotes = notes.showAll();
  allnotes.forEach((note) => notes.printMessage(note, "NOTE"));
} else if (command === 'show') {
  var note = notes.read(argv.title);
  notes.printMessage(note, "NOTE", "Note not found or title not defined");
}  else {
  console.log("No command found");
}
