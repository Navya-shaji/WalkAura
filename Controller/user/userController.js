const LoadHomePage=async(req,res)=>{

try {
   return  res.render("Home")
} catch (error) {
    console.log(error)
    res.status(500).send("server error")
}
}


const PageNotFound=async(req,res)=>{
    try {
        res.render("PageNotFound");
    } catch (error) {
        res.redirect('/PageNotFound')
    }
}

module.exports={
    LoadHomePage,
    PageNotFound
}