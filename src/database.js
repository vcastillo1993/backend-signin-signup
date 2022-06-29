import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/companydb",{
  useNewUrlParser: true,
  /* useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true */
  
})
  .then(db => console.log('DB is connected'))
  .then(error => console.log(error))