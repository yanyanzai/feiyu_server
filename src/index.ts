import express from 'express';
import mongoose from 'mongoose';
import membersRoutes from './routers/members';
const app = express();

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://sunyan:WamPF5vX5RcZzRsW@cluster0.llmkoh4.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/members', membersRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
