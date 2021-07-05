const {Shop,Product} = require("../db/models");



// exports.ShopsList = (req, res) =>  res.json(data);


//Fetch Shop Function
exports.fetchShop= async (shopId,next)=>{
  try {
      const foundShop= await Shop.findByPk(shopId);
      return (foundShop)
  } catch (error) {
      next(error)
  }
}





///// shops list
exports.shopsList = async (req, res,next) =>  {

  try {
    const shops = await Shop.findAll({

        attributes : {exclude: ["createdAt","updatedAt"]},

        include: [{
            model: Product,
            attributes: ["id"],
            as: "products"
         } ]

    }
    );
        res.json(shops);
  } 
  catch (error) { 
    next(error);
    // res.status(500).json({msg: error.message ?? "Server Error"})
  }

};





// exports.shopDetail = (req, res,next) => {
//     const reqShop = data.find(
//       (shop) => shop.id === +req.params.shopId
//     );
//     if (reqShop) {
//       res.json(reqShop);
//     } else {
//       next(error);
//       // res.status(404).json({ msg: "This path is not found" });
//     }
//   };


///////

  exports.shopsCreate = async (req, res, next) => {
    try {

         req.body.userId = req.user.id
        //  let userId;
        //  req.body = {...req.body, userId: 1}


        req.body.image=`http://localhost:8080/media/${req.file.filename}`

          console.log(req.body)

        const newShop = await Shop.create(req.body);
        res.status(201).json(newShop)

    } catch (error) {
      next(error);
        // res.status(500).json({msg: error.message ?? "server error"})
    }
};



exports.productsCreate = async (req, res, next) => {
    try {
        req.body.shopId=req.shop.id
        req.body.image=`http://localhost:8080/media/${req.file.filename}`
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct)

    } catch (error) {
      next(error);
        // res.status(500).json({msg: error.message ?? "server error"})
    }
};




//   exports.shopsDelete =async (req, res, next) => {
//     try {
//       await req.shop.destroy();
//       // this >> await req.foundshop.destroy();
//       res.status(204).end();
//     } catch (err) {
//       next(error);
//     }
//   };



// exports.shopUpdate =async (req, res, next) => {
//   try {
      
//     //     req.body.image=`http://localhost:8080/media/${req.file.filename}`
      
//     // await req.shop.update(req.body)
//     // res.json(req.shop);
    
        
//           req.body.image =`http://${req.get("host")}/media/${req.file.filename}`;
        
//         await req.shop.update(req.body);
//         res.status(204).end();
      
//   } catch (err) {
//     next(err);
//   }
// };



/*
/users/username/shops

username >>> userId

*/