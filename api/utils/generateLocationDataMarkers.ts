import { Request } from "express";
const s2 = require('@radarlabs/s2');

export const generateS2BigIntIds = (req: Request) => {
    // TODO: check if this works for both cases, you should include a test case where both fail
    let longitude = req.query.longitude ? req.query.longitude : req.body.longitude;
    let latitude = req.query.latitude ? req.query.latitude : req.body.latitude;
    return new s2.CellId(new s2.LatLng(latitude, longitude));
};

const findCurrentLatitudeandLongitude = () => {
    console.log("call if used");
};