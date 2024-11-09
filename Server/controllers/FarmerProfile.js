import express from 'express';
import CropProduct from '../Models/FarmProducts.js'
import cloudinary from "cloudinary";
import Farmer from "../Models/Farmer.js";
import { getDataUri } from '../utils/features.js';
import CropCategory from '../Models/CropCategory.js';
import CropItems from '../Models/CropItems.js';
import mongoose from 'mongoose';
export const loginFarmer = async (req, res) => {
    const { phno, password } = req.body;

    try {
        if (!phno || !password) {
            return res.status(400).json({ message: 'Phone number and password are required' });
        }

        
        const farmer = await Farmer.findOne({ phno });
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        // Compare the entered password with the hashed password in the database
       
        // If phone and password are correct, return success
        return res.status(200).json({ message: 'Login successful', farmer });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};



export const allproducts= async (req,res) =>{
    
    try{
        const allproducts=await CropProduct.find().populate('item');
        
        res.status(200).json(allproducts);
    } catch (err){
        console.log(err);
        res.status(500).json({message: 'error' })
    }
}

 export const farmerdetails=async (req,res) =>{
    try{
    const {phno}=req.query;
    if (!phno) {
        return res.status(400).json({ message: 'Phone number is required' });
    }
    const userdetails=await Farmer.findOne({phno:phno});
    if (!userdetails) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userdetails);
}catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
}
}

export const getidproduct=async(req,res) =>{
    try{
        const product=await CropProduct.findOne({proid: req.params.proid});
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err){
        console.log(err);
        res.status(500).json({message: 'error' })
    }
}


export const addproduct= async (req, res) => {
    console.log("WORKING");
    try {
        const {name, phno,item,location,quantity,price} = req.body;
        if ( !name || !phno || !item || !location || !quantity || !price) {
            return res.status(400).json({ message: "Please provide all required data" });
        }

        const newProduct = new CropProduct({
          
            name,
            phno,
            item,
            location,
            quantity,
            price,
           
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product added', prod: savedProduct });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', err });
    }
};

// PUT route to update a product by farmerid
export const UpdateProduct= async (req, res) => {
    console.log("WORKING");
    try {
        const { name, phno, item, location, quantity, price} = req.body;

        let productupdate = await CropProduct.findOne({ proid: req.params.proid});
        if (!productupdate) {
            return res.status(404).json({ message: "No product found to update" });
        }

        const updatedProduct = await CropProduct.updateOne(
            { proid: req.params.proid },  
            {
                name,
                phno,
                item,
                location,
                quantity,
                price
            },
            { runValidators: true }  // Ensures validation rules are applied
        );

        if (updatedProduct.nModified === 0) {
            return res.status(404).json({ message: "No product was updated" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err });
    }
};

// DELETE route to delete a product by farmerid
export const deleteproduct= async (req, res) => {
    try {
        const proid = req.params.proid;

        const deleteProduct = await CropProduct.findOneAndDelete({ proid });
        if (!deleteProduct) {
            return res.status(404).json({ message: "No Product Found" });
        }

        res.status(200).json({ message: "Deleted Successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err });
    }
};

export const registerfarmer=async (req,res) =>{
    try{
        const {name,phno,password,location}=req.body;
        if(!name || !phno|| !password || !location){
            res.status(400).json({message: "please Enter all details"})
        }
        const registerprofile = new Farmer({
           name,
           phno,
           password,
           location
        })
        const register=await registerprofile.save();
        res.status(200).json({message: "inserted Succesfully"})

    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server Error', err });

    }
}


export const Productpic = async(req,res) =>{
    try {
        const { name } = req.body;

        // Check if both name and file are provided
        if (!name || !req.file) {
            return res.status(400).json({ message: "Name and image are required" });
        }

        // Convert the uploaded file to Data URI
        const file = getDataUri(req.file);
        // Upload the file to Cloudinary
        const cdb = await cloudinary.v2.uploader.upload(file.content);

        // Create new category with name and uploaded image URL
        const newCategory = await CropCategory.create({
            name,
            photo: cdb.secure_url
        });

        // Respond with the newly created category
        res.status(201).json({ message: "Product uploaded successfully", newCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err });
    }
};

export const cropcategories = async (req, res) => {
    try {
        const categories = await CropCategory.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const categoryitems = async (req,res) =>{
    console.log("Entering");
    const { categoryid } = req.params;
    console.log(categoryid);
    try {
        
        const items = await CropItems.find({ category:categoryid });

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this category.' });
        }

        
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const sortallproducts= async (req,res) =>{
    
    try{
        const order= req.query.sort;
        let query={};
        if(order==='low'){
           query={price: 1};
        } else if (order==='high'){
            query={price: -1};
        }

        const allproducts=await CropProduct.find().populate('item').sort(query);
        
        res.status(200).json(allproducts);
    } catch (err){
        console.log(err);
        res.status(500).json({message: 'error' })
    }
}
