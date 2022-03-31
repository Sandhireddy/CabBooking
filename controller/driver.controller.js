
const fs = require('fs');

const testing = (req, res, next) =>{
    res.send({data:"Testing Driver"})
}


const register = (req,res, next) =>{
    if(req.body.data != undefined){
        const driver_info = req.body.data;
        for(let i=0;i<driver_info.length;i++){
            console.log('i',i)
            if(!driver_info[i].phoneNo && !driver_info[i].name && !driver_info[i].avaliablity && !driver_info[i].threshold){
                res.status(400).send({result:"Invalid data Entry"});
            }
            if(i+1 == driver_info.length){
                console.log("entered")
                if(!fs.existsSync('./driverInfo.json')){
                    fs.writeFile('driverInfo.json', JSON.stringify({info:driver_info}), function (err) {
                        if (err) {
                            res.status(405).send({result:"Failed to Save"});
                            throw err
                        };
                        res.status(200).send({result:"Inserted Successfully"});
                      });
                } else {
                    fs.readFile('driverInfo.json','utf8', function(err, data) {
                        if (err) {
                            res.status(405).send({result:"Failed to Save"});
                            throw err
                        };
                        let driver_info_saved = JSON.parse(data);
                        console.log(driver_info_saved)
                        driver_info_saved.info = driver_info_saved.info.concat(driver_info);
                        fs.writeFile('driverInfo.json', JSON.stringify(driver_info_saved), function (err) {
                            if (err) {
                                res.status(405).send({result:"Failed to Save"});
                                throw err
                            };
                            res.status(200).send({result:"Inserted Successfully"});
                          });
                    });
                }
            }
        }
        
    } else {
        res.status(400).send({result:"Invalid data Entry"})
    }
    
}

module.exports = {
    "testing":testing,
    "register":register
};