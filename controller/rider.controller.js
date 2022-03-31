const fs = require('fs');


const testing = (req, res, next) =>{
    res.send({data:"Testing Rider"})
}

const register = (req,res, next) =>{
    if(req.body.data != undefined){
        const rider_info = req.body.data;
        for(let i=0;i<rider_info.length;i++){
            console.log('i',i)
            if(!rider_info[i].phoneNo && !rider_info[i].name){
                res.status(400).send({result:"Invalid data Entry"});
            }
            if(i+1 == rider_info.length){
                console.log("entered")
                if(!fs.existsSync('./riderInfo.json')){
                    fs.writeFile('riderInfo.json', JSON.stringify({info:rider_info}), function (err) {
                        if (err) {
                            res.status(405).send({result:"Failed to Save"});
                            throw err
                        };
                        res.status(200).send({result:"Inserted Successfully"});
                      });
                } else {
                    fs.readFile('riderInfo.json','utf8', function(err, data) {
                        if (err) {
                            res.status(405).send({result:"Failed to Save"});
                            throw err
                        };
                        let rider_info_saved = JSON.parse(data);
                        console.log(rider_info_saved)
                        rider_info_saved.info = rider_info_saved.info.concat(rider_info);
                        fs.writeFile('riderInfo.json', JSON.stringify(rider_info_saved), function (err) {
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