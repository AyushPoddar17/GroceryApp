import express from 'express';
import bodyParser from 'body-parser';
import groceryRoutes from './routes/groceryRoutes';
import userRoutes from './routes/userRoute';
import loginRoutes from './routes/loginRoute'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/',loginRoutes)
app.use('/groceries',groceryRoutes);
app.use('/user',userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});