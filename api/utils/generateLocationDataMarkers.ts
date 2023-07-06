import { Request } from "express";
const s2 = require('@radarlabs/s2');

export const generateS2BigIntIds = (req: Request) => {
    let longitude = req.query.longitude;
    let latitude = req.query.latitude;
    return new s2.CellId(new s2.LatLng(latitude, longitude));
};

const findCurrentLatitudeandLongitude = () => {
    console.log("call if used");
};