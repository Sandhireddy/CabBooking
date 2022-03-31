const fs = require('fs');

const startTrip = (req, res, next) => {
    const coordinated = req.body.coord;
    if(coordinated.x1 && coordinated.x2 && coordinated.y1 && coordinated.y2 && coordinated.riderPhoneNo){
        const location_calculation = Math.sqrt((Math.sqrt(coordinated.x2 - coordinated.x1) + Math.sqrt(coordinated.y2 - coordinated.y1)))
        console.log(location_calculation.toFixed(2));
        if(!fs.existsSync('./riderInfo.json')){
            res.status(400).send({result: "Rider Info is not avaliable"});
        } else {
            const rider_info_saved = fetch_rider_details();
            if(rider_info_saved != null){
                rider_info_saved = JSON.parse(rider_info_saved);
                console.log(rider_info_saved)
                let rider_exist = rider_info_saved.info.filter(data => data.phoneNo == coordinated.riderPhoneNo);
                console.log(rider_exist);
                if(rider_exist.length){
                    const driver_info_saved = fetch_driver_details();
                    if(driver_info_saved != null){
                        const threshold_info = fetch_threshold_details();
                        if(threshold_info != null){
                            driver_info_saved = JSON.parse(driver_info_saved);
                            threshold_info = JSON.parse(threshold_info);
                            let filter_driver = driver_info_saved.info.filter(d => d.threshold > location_calculation && d.avaliablity == "YES");
                            console.log("filter_driver",filter_driver)
                        } else {
                            res.status(405).send({result:"Failed to allocated the trip"});
                        }
                    } else {
                        res.status(405).send({result:"Driver Details is not avaliable"});
                    }
                } else {
                    res.status(405).send({result:"Rider Details is not avaliable1"});
                }
            } else {
                res.status(405).send({result:"Rider Details is not avaliable2"});
            }    
        }

    } else {
        res.status(400).send({result: "Invalid body"});
    }
}

const fetch_driver_details = ()=>{
    fs.readFile('driverInfo.json','utf8', function(err, driver_data) {
        if (err) {
            return null;
        }
        return driver_data;
    });
}

const fetch_rider_details = async ()=>{
    await fs.readFile('riderInfo.json','utf8', async function(err, rider_data) {
        if (err) {
            return null;
        }
        console.log("rider_data",rider_data);
        return rider_data;
    });
}

const fetch_threshold_details = () =>{
    fs.readFile('threshold.json','utf8', function(err, rider_data) {
        if (err) {
            return null;
        }
        return rider_data;
    });
}

module.exports = {
    "startTrip":startTrip
}