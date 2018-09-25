var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var historySchema = new Schema({
    location: {
        type: String,
    },
    date: {
        type: Date
    }
});

var History = mongoose.model("History", historySchema);

//Export
module.exports = History;