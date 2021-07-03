const express=require("express");
const upload = require("../media/middleware/multer")

const router = express.Router();
const {shopsCreate , shopsDelete , shopsList,shopUpdate,fetchShop} =require("../controllers/shopsController");
const { productsCreate } = require("../controllers/shopsController");



router.param("shopId",async (req,res,next,shopId)=>{
    const foundShop = await fetchShop(shopId,next)
   
    if(foundShop){
        req.shop=foundShop;
        
        next();
    }else {
        next(res.status(404).json({message : "shop is not found"}))
    }
})


router.post("/:shopId/products", upload.single("image") ,productsCreate);

router.post("/", upload.single("image") ,shopsCreate);

// router.delete("/:shopId",shopsDelete)

router.get("/", shopsList) 

// router.put("/:shopId",upload.single("image"),shopUpdate)




module.exports=router;