 import productmodel from "../../models/Product.js";
import { cloudImageUpload } from "../../cloudinary/Cloudinary.js";
 import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config();





export const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await cloudImageUpload(req.file.buffer);
        // console.log(result)
    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred in image upload" });
  }
};



const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);

    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    // 1️⃣ Create a product in Stripe
    const stripeProduct = await stripe.products.create({
      name: title,
      description: description,
      images: [image], // Ensure this is an array
    });

    // 2️⃣ Create a price for the product in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price * 100, // Convert price to cents
      currency: "usd",
    });

    // 3️⃣ Save product in MongoDB with Stripe IDs
    const newProduct = new productmodel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      stripeProductId: stripeProduct.id, 
      stripePriceId: stripePrice.id, 
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Error adding product", error: error.message });
  }
};


export const fetchAllProduct =async (req,res) =>{
    try{
          
           const listOfProducts = await productmodel.find({

           }) 
           res.status(200).json({
            success:true,
            data:listOfProducts
           })
    } catch(error){
        console.log(error)
         res.json({
             success:false,
             message:"error occured in image upload"
         })
    }
}

export const editProduct = async (req, res) => {
    try {
        console.log("hello",req.body);
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

       
        const findProduct = await productmodel.findById(id);
        
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (image) findProduct.image = image;
        if (title) findProduct.title = title;
        if (description) findProduct.description = description;
        if (category) findProduct.category = category;
        if (brand) findProduct.brand = brand;
        if (price) findProduct.price = price;
        if (salePrice) findProduct.salePrice = salePrice;
        if (totalStock) findProduct.totalStock = totalStock;

        
        await findProduct.save();

        return res.status(200).json({
            success: true,
            data: findProduct,
        });

    } catch (error) {
        console.error("Error in editProduct:", error); // Better error logging
        res.status(500).json({
            success: false,
            message: "Error occurred while updating product",
            error: error.message, // Include error details
        });
    }
};
export const deleteProduct =async (req,res) =>{
    try{
        const {id}= req.params
        const product = await productmodel.findByIdAndDelete(id) ;
        if(!product) return res.status(404).json({
            success:false,
            message:"product not found"
        });
        res.status(200).json({
            success:true,
            message:"product delete successfully"
        })

    } catch(error){
        console.log(error)
         res.json({
             success:false,
             message:"error occured in image upload"
         })
    }
}
