import CropItems from "../Models/CropItems.js";

const createItem = async () => {
  try {
    const newItem = new CropItems({
      name: 'brinjal',
      category: '6723c6fd95a6b62fe3e87dc8', // Use the actual Category ID here
      photo: 'https://cdn.pixabay.com/photo/2023/08/19/23/37/eggplant-8201359_1280.png',
    });

    await newItem.save();
    console.log('Item created successfully');
  } catch (error) {
    console.error('Error creating item:', error.message);
  }
};

export default createItem;
