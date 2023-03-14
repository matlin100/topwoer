const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb+srv://project1:qweasd@cluster0.ppx2ade.mongodb.net/express0');
// await mongoose.connect('mongodb://localhost:27017/express0');

  console.log("mongo connect")


}



// await mongoose.connect('mongodb://localhost:27017/express0');


// await mongoose.connect('mongodb+srv://project1:qweasd@cluster0.ppx2ade.mongodb.net/express0');