#!/usr/bin/env node
const axios = require('axios')
// const { format } = require('date-fns');
// let date = "04-06-2021";

// pingCowin();
scheduleCowinPinger();

function scheduleCowinPinger() {
    let pingCount = 0;
    timer = setInterval(() => {
        // console.clear();
        pingCount += 1;
        pingCowin();
        console.log("Ping Count - ", pingCount);
    },  60000);
}

function pingCowin() {
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=296&date=04-06-2021`).then((result) => {
        const { centers } = result.data;
        let isSlotAvailable = false;
        let count = 0;
        let appointmentsAvailableCount = 0;
        if (centers.length) {
            centers.forEach(center => {
                center.sessions.forEach((session => {
                    if (session.available_capacity > 0) {
                        if(!(session.vaccine == "COVAXIN" && session.min_age_limit == 45)){
                           
                        count++;
                        isSlotAvailable = true
                        appointmentsAvailableCount++;
                        console.log(`Center name ${center.name}`)
                        console.log(`Vaccine:  ${session.vaccine}`)
                        console.log(`Dose 1:  ${session.available_capacity_dose1}`)
                        console.log(`Dose 2:  ${session.available_capacity_dose2}`)
                        console.log(`Age:  ${session.min_age_limit}`)
                        
                        console.log("\n");
                        }
                    }
                }));
            });
        }
        console.log(`Total count: ${count}`)
    });
}

    

