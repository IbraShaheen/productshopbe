const express=require("express");
const upload = require("../media/middleware/multer")

const router = express.Router();
const {productsCreate , productsDelete , productsList,productUpdate,fetchProduct} =require("../controllers/productsController");


router.param("productId",async (req,res,next,productId)=>{
    const foundProduct = await fetchProduct(productId,next)
   
    if(foundProduct){
        req.product=foundProduct;
        res.status(204).end();
        next();
    }else {
        next(res.status(404).json({message : "product is not found"}))
    }
})

// router.post("/", upload.single("image") ,productsCreate);
 
// router.delete("/:productId",productsDelete)

router.get("/", productsList) 

// router.put("/:productId",upload.single("image"),productUpdate)




module.exports=router;