import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Contact } from './ContactModal.js';  // Ensure the Contact model is correctly exported

const app = express();

// Use built-in express.json() to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// MongoDB connection
mongoose.connect(
    "mongodb+srv://amanjobs1234:SDe6WXea0SzaJwQ4@amongo.yw41v.mongodb.net/",
    { dbName: "Amongo" }
).then(() => console.log("Mongo is running and connected"))
  .catch((err) => console.log(err));

// POST request to create a new contact
app.post('/', async (req, res) => {
    console.log(req.body);
    
    // Destructure incoming request body
    const { name, gmail, phone } = req.body;
    
    try {
        // Check if a contact with the same gmail already exists
        let existingContact = await Contact.findOne({ gmail });
        if (existingContact) {
            return res.json({ message: "Contact already exists" });
        }

        // Create a new contact in the database
        const contact = await Contact.create({ name, gmail, phone });
        res.json({ message: "Contact saved successfully", contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET request to fetch all contacts
app.get('/', async (req, res) => {
    try {
        let contact = await Contact.find().sort({createdAt:-1});
        res.json({ message: "All Contacts", contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Another route for home
app.get('/home', (req, res) => {
    res.json({ message: "Welcome to our API" });
});

// PUT request to update a contact
app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        let contact = await Contact.findById(id);
        if (!contact) return res.json({ message: "Contact does not exist" });

        let data = await Contact.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ message: "User contact has been updated", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE request to delete a contact
app.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let contact = await Contact.findById(id);
        if (!contact) return res.json({ message: "Contact does not exist" });

        await contact.deleteOne();
        res.json({ message: "Your contact has been deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(2000, () => console.log("Server is running on port 2000"));
