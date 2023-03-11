const Certificate = require("../models/Certificate");
const shortid = require("shortid");
const axios = require("axios");

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
    };
    await axios.post("http://localhost:8080/api/v1/addBlock", block);
    return res.status(201).send({
      result: true,
      certificate: certificate.toJSON(),
      message: "Certificate uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      result: false,
      certificate: null,
      message: "Error occurred",
    });
  }
};

const getCertificates = async (req, res, next) => {
  try {
    const { uid, shared } = req.params;
    let certificates = [];
    if (shared === "me")
      certificates = await Certificate.find({ sharedWith: { $in: [uid] } });
    else certificates = await Certificate.find({ userUid: uid });
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

module.exports = {
  addCertificate,
  getCertificates,
};
