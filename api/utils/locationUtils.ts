import { Request } from "express";
const s2 = require('@radarlabs/s2');
import * as wkx from 'wkx'

export const generateS2BigIntIds = (req: Request) => {
    // TODO: check if this works for both cases, you should include a test case where both fail
    let longitude = req.query.longitude ? req.query.longitude : req.body.longitude;
    let latitude = req.query.latitude ? req.query.latitude : req.body.latitude;
    return new s2.CellId(new s2.LatLng(latitude, longitude));
};

export const createWKTPointString = (latitude: number, longitude: number) => {
    //Serializing a Point geometry to WKT
    return new wkx.Point(latitude, longitude).toWkt();
};

export const parseWKTPointStringToGeometry = (wktStr: string) => {
    return wkx.Geometry.parse(wktStr);
}

export const createHomeCityIdString = (latitude: number, longitude: number) => {
    return String(BigInt(new s2.CellId(new s2.LatLng(Number(latitude), Number(longitude))).id()))
};

const findCurrentLatitudeandLongitude = () => {
    console.log("call if used");
};