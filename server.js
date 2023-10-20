const express = require('express');
const path = require('node:path');

const app = express();
const port=5000;


const authorize = (req, res, next) => {
  

  const isAuth = true;
  if (isAuth) {
    next();
  } else {
    res.status(401).send('401 Not Authorized');
  }

};
  const requestTime=(req,res,next)=>{
  const date=new Date();
  const day=date.getDay();
  const hours=date.getHours();
  if(day<1 || day >5 || hours<9 || hours>17){
     return res.status(401).send('We are close ');
  }
  
  next();



};

app.use(requestTime);
app.use(authorize);
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'public','home.html'));
});


// listen to the port
app.listen(port, () => console.log(`Server is running on port ${port}`));
