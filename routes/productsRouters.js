const express=require("express");
const upload = require("../media/middleware/multer")

const router = express.Router();
const {productsCreate , productsDelete , productsList,productUpdate,fetchProduct} =require("../controllers/productsController");

const passport = require("passport")


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
      req.product = product;
      next();
    } else {
      next({ message: "product Not Found", status: 404 });
    }
  });


router.post("/",passport.authenticate("jwt",{session:false}), upload.single("image") , productsCreate);
  
router.delete("/:productId",passport.authenticate("jwt",{session:false}), productsDelete)

router.get("/", passport.authenticate("jwt",{session:false}), productsList) 

router.put("/:productId", passport.authenticate("jwt",{session:false}), upload.single("image"),productUpdate)




module.exports=router;