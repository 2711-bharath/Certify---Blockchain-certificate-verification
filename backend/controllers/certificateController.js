const Certificate = require("../models/Certificate");
const shortid = require("shortid");
const axios = require("axios");
const _ = require("lodash");

const addCertificate = async (req, res, next) => {
    try {
        const body = req.body;
        const {
            name,
            description,
            url,
            sharedWith,
            userUid,
            issuedBy,
            credentialId,
            file,
        } = body;
        const uid = shortid.generate();
        const certificate = new Certificate({
            name,
            description,
            sharedWith,
            userUid,
            issuedBy,
            credentialId,
            file,
            uid: uid,
            URL: url,
        });
        await certificate.save();
        let concatData = name + description + url;
        let block = {
            string_data: concatData,
            image_url: url,
            user_uid: userUid,
            certificate_uid: uid,
            date: new Date(),
            init_mined: true,
        };
        await axios.post("http://localhost:8080/api/v1/addBlock", block);
        return res.status(201).send({
            result: true,
            certificate: certificate.toJSON(),
            message: "certificate saved succesfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            result: false,
            error,
        });
    }
};

const updateCertificate = async (req, res, next) => {
    const body = req.body;
    let uid = _.get(body, ["uid"]);
    if (!uid) {
        return res.status(404).send({
            result: false,
            certificate: null,
            message: "certificate uid is required",
        });
    }
    let certificate = await Certificate.findOne({
        uid: uid,
    });
    const isDeleteChanged = certificate.isDeleted !== body.isDeleted;
    _.assign(certificate, {
        ..._.pick(body, ["sharedWith", "file", "isDeleted"]),
    });
    await certificate.save();
    let nonEditable = _.pick(body, [
        "name",
        "description",
        "url",
        "credentialId",
    ]);
    if (!_.isEmpty(nonEditable)) {
        _.assign(certificate, nonEditable);
        let concatData =
            certificate.name + certificate.description + certificate.url;
        let block = {
            string_data: concatData,
            image_url: certificate.URL,
            user_uid: certificate.userUid,
            certificate_uid: uid,
            init_mined: certificate.mined,
        };
        await axios.post("http://localhost:8080/api/v1/addBlock", block);
    }
    if (certificate.mined == false) {
        await certificate.save();
    }
    let message = "Updated Successfully";
    if (isDeleteChanged)
        if (certificate.isDeleted) message = "Certificate deleted successfully";
        else message = "Certificate restored successfully";
    res.status(200).send({
        result: true,
        certificate,
        message,
    });
};

const mineBlock = async (req, res, next) => { };

const getCertificates = async (req, res, next) => {
    try {
        const { uid, status } = req.params;
        let certificates = [];
        if (status === "shared")
            certificates = await Certificate.find({
                sharedWith: {
                    $elemMatch: { user_id: uid },
                },
            });
        else if (status === "deleted")
            certificates = await Certificate.find({
                userUid: uid,
                isDeleted: true,
            });
        else
            certificates = await Certificate.find({
                userUid: uid,
                isDeleted: false,
            });
        return res.send({
            result: true,
            certificates: certificates,
        });
    } catch (err) {
        console.log("Error occurred", err);
        return res.send({
            result: false,
            certificates: null,
            message: "Error occurred",
        });
    }
};

const getblockDataForMining = async (req, res, next) => {
    console.log("here");
    let blockId = req.params.id;
    let latestBlock = await axios.get("http://localhost:8080/api/v1/getLatestBlock");
    let currBlock = await axios.get(`http://localhost:8080/api/v1/getBlock/${blockId}`);
    console.log(latestBlock, currBlock);
    return res.status(200).send(
        {
            lastBlock: latestBlock.data,
            block: currBlock.data
        }
    );
};

module.exports = {
    addCertificate,
    updateCertificate,
    mineBlock,
    getCertificates,
    getblockDataForMining
};
