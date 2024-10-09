
const Verify=require("../middlewares/Verify");
const VerifyRole=require("../middlewares/VerifyRole");
const Auth=require('./auth');

const Router = (server) => {
  server.get("/v1", (req, res) => {
    try {
      res.status(200).json({
        status: "Success",
        data: [],
        message: "Welcome to our API homepage",
      });
    } catch (err) {
      res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
  });
  
  server.use("/v1/auth",Auth);
  server.get("/v1/user",Verify,(req,res)=>{
    res.status(200).json({
      status: "success",
      message: "Welcome to the User Dashboard!",
  });

  });
  // server.get("/v1/admin",Verify,VerifyRole,(req,res)=>{
  //   res.status(200).json({
  //     status: "success",
  //     message: "Welcome to the Admin portal!",

  // });
};
module.exports=Router;
