const express=require("express");
const upload = require("../media/middleware/multer")

const router = express.Router();
const { productsDelete , productsList,productUpdate,fetchProduct} =require("../controllers/productsController");

const passport = require("passport");
const { fetchShop } = require("../controllers/shopsController");


// router.param("productId",async (req,res,next,productId)=>{
//     const foundProduct = await fetchProduct(productId,next)
   
//     if(foundProduct){
//         req.product=foundProduct;
//         res.status(204).end();
//         next();
//     }else {
//         next(res.status(404).json({message : "product is not found"}))
//     }
// })

router.param("productId", async (req, res, next, productId) => {
    const product = await fetchProduct(productId, next);

    if (product) {
      const shop = await fetchShop(product.shopId, next)
      req.product = product;
      req.shop = shop;
      next();
    } else {
      next({ message: "product Not Found", status: 404 });
    }
  });


//router.post("/",passport.authenticate("jwt",{session:false}), upload.single("image") , productsCreate);
  
router.delete("/:productId",passport.authenticate("jwt",{session:false}), productsDelete)

router.get("/", productsList) 

router.put("/:productId", passport.authenticate("jwt",{session:false}), upload.single("image"),productUpdate)




module.exports = router;