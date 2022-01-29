const alert = require("alert")
const basePath = process.cwd();
const fs = require("fs")
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const fsExtra = require('fs-extra')

const getAllDirFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(file)
    }
  })

  return arrayOfFiles
}
exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
    //   var name= post.user_name;
    //   var pass= post.password;
    //   var fname= post.first_name;
    //   var lname= post.last_name;
    //   var mob= post.mob_no;
 
      if (!req.files)
                return res.status(400).send('No files were uploaded.');
 
        var file = req.files.l1_uploaded_image;
        var img_name=file.name;
        const result = getAllDirFiles("layers/layers1").length
        const result2 = getAllDirFiles("layers/layers2").length
        const result3 = getAllDirFiles("layers/layers3").length
 
         if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

            
            if(result<3){
                                 
              file.mv('layers/layers1/'+file.name, function(err) {
                             
                  if (err)
 
                    return res.status(500).send(err);
                       // var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
                       var sql = "INSERT INTO `users_image`(`image`) VALUES ('" + img_name + "')";
 
                            var query = db.query(sql, function(err, result) {
                                 //res.redirect('profile/'+result.insertId);
                                 res.redirect('http://localhost:3001/');
                            });
                       });
                     }
               else if(result2<3){
                  file.mv('layers/layers2/'+file.name, function(err) {
                             
                     if (err)
    
                       return res.status(500).send(err);
                          // var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
                          var sql = "INSERT INTO `users_image1`(`image`) VALUES ('" + img_name + "')";
    
                               var query = db.query(sql, function(err, result) {
                                    //res.redirect('profile/'+result.insertId);
                                    res.redirect('http://localhost:3001/');
                               });
                          });

               }
               else if(result3<3){
                  file.mv('layers/layers3/'+file.name, function(err) {
                             
                     if (err)
    
                       return res.status(500).send(err);
                          // var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
                          var sql = "INSERT INTO `users_image2`(`image`) VALUES ('" + img_name + "')";
    
                               var query = db.query(sql, function(err, result) {
                                    //res.redirect('profile/'+result.insertId);
                                    res.redirect('http://localhost:3001/');
                               });
                          });

               }
               
               else if(result==3 && result2==3 && result3==3){
                async function ls() {
                  const { stdout, stderr } = await exec('node index2.js');
                  console.log('stdout:', stdout);
                  console.log('stderr:', stderr);
                  fsExtra.emptyDirSync("layers/layers1/");
                fsExtra.emptyDirSync("layers/layers2/");
                fsExtra.emptyDirSync("layers/layers3/");
                 
                 
                }
                ls();
                
                function intervalFunc() {
                  res.render('profile.ejs');
                  
                }
                
                setTimeout(intervalFunc, 2000);
                clearTimeout(intervalFunc);


          }
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};
exports.profile = function(req, res){
    var message = '';
    var id = req.params.id;
    var sql="SELECT * FROM `users_image` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
      if(result.length <= 0)
      message = "Profile not found!";
      
      res.render('profile.ejs',{data:result, message: message});
   });
};
