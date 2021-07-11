
const {Product,Shop} = require("../db/models");


// exports.ProductsList = (req, res) =>  res.json(data);


//Fetch Product Function
exports.fetchProduct= async (productId,next)=>{
  try {
      const foundProduct= await Product.findByPk(productId);
      return (foundProduct)
  } catch (error) {
      next(error)
  }
}





///// products list
exports.productsList = async (req, res,next) =>  {

  try {
    const products = await Product.findAll({

        attributes : {exclude: ["createdAt","updatedAt"]}

    }
    );
        res.json(products);
  } 
  catch (error) { 
    next(error);
    // res.status(500).json({msg: error.message ?? "Server Error"})
  }

};





// exports.productDetail = (req, res,next) => {
//     const reqProduct = data.find(
//       (product) => product.id === +req.params.productId
//     );
//     if (reqProduct) {
//       res.json(reqProduct);
//     } else {
//       next(error);
//       // res.status(404).json({ msg: "This path is not found" });
//     }
//   };




// exports.productsCreate = async (req, res, next) => {
//   try {
//       req.body.image=`http://localhost:8080/media/${req.file.filename}`
//       const newProduct = await Product.create(req.body);
//       res.status(201).json(newProduct)

//   } catch (error) {
//     next(error);
//       // res.status(500).json({msg: error.message ?? "server error"})
//   }
// };





  exports.productsDelete = async (req, res, next) => {
    try {
     // const shop = Shop.findByPk(req.product.id)

      // user came from passort
      if(req.shop.userId !== req.user.id){
        next({
            status: 401,
            message: "This product not yours! you can't do that"
          })

          // throw{
          //   status: 401,
          //   message: "This product not yours! you can't do that"
          // }
      }
      await req.product.destroy();
      // this >> await req.foundproduct.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };



exports.productUpdate =async (req, res, next) => {
  try {
      
    //     req.body.image=`http://localhost:8080/media/${req.file.filename}`
      
    // await req.product.update(req.body)
    // res.json(req.product);

    if(req.shop.userId !== req.user.id){
      // throw{
      //   status: 401,
      //   message: "This product not yours! you can't do that"
      // }
      next({
        status: 401,
        message: "This product not yours! you can't do that"
      })
    }

    if(req.file){
          req.body.image =`http://${req.get("host")}/media/${req.file.filename}`;
    }
        await req.product.update(req.body);
        res.status(200).end();
      
  } catch (error) {
    next(error);
  }
};