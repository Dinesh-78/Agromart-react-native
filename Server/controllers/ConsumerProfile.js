import express from "express"
import Consumer from "../Models/Consumer.js";
import Items from "../Models/CropItems.js";
import Category from "../Models/CropCategory.js"
import CropCategory from "../Models/CropCategory.js";
export const Registerconsumer= async (req, res) => {
    
    try {
        const {name, phno,password} = req.body;
        if ( !name || !phno || !password ) {
            return res.status(400).json({ message: "Please provide all required data" });
        }

        const newconsumer = new Consumer({
          
            name,
            phno,
            password,
           
        });

        const register = await newconsumer.save();
        res.status(201).json({ message: 'Consumer Register Sucessful' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', err });
    }
};

export const loginConsumer = async (req, res) => {
    const { phno, password } = req.body;

    try {
        if (!phno || !password) {
            return res.status(400).json({ message: 'Phone number and password are required' });
        }

        
        const user= await Consumer.findOne({ phno });
        if (!user) {
            return res.status(404).json({ message: 'Consumer not found' });
        }

        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

export const getitems = async (req,res) =>{
    const { categoryid } = req.params;
    try{
        const items = await Items.find({ category: categoryid }).populate('category');
        res.status(200).json(items);
    } catch(err){
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Failed to fetch items" });
    }
}

export const getallitems = async (req,res) =>{
    try{
        const items = await Items.find().populate('category');
        res.status(200).json(items);
    } catch(err){
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Failed to fetch items" });
    }
}


export const getcategories = async (req,res) =>{
    try{
        const categories = await CropCategory.find();
        res.status(200).json(categories);
    } catch (err){
        console.error("Error fetching Categories:", err);
        res.status(500).json({ message: "Failed to fetch Categories" });
    }
}