const Certificate = require('../models/certificate');

// Issue a new certificate
const issueCertificate = async (req, res) => {
    try {
        const { certId, userName, courseName } = req.body;
        const userId = req.result._id;
        
        console.log(`Issuing certificate: ${certId} for ${userName}`);

        // Check if certificate already exists for this ID
        const existingCert = await Certificate.findOne({ certId });
        if (existingCert) {
            console.log(`Certificate ${certId} already exists.`);
            return res.status(200).json(existingCert);
        }

        const newCert = await Certificate.create({
            certId,
            user: userId,
            userName,
            courseName
        });
        
        console.log(`Successfully issued certificate: ${certId}`);
        res.status(201).json(newCert);
    } catch (err) {
        console.error("Error issuing certificate:", err);
        res.status(500).json({ message: "Error issuing certificate", error: err.message });
    }
};

// Verify a certificate by ID
const verifyCertificate = async (req, res) => {
    try {
        const { certId } = req.params;
        console.log(`Verifying certificate: ${certId}`);
        
        // Search case-insensitive just in case
        const cert = await Certificate.findOne({ 
            certId: { $regex: new RegExp(`^${certId}$`, "i") } 
        }).populate('user', 'firstName lastName emailId');

        if (!cert) {
            console.log(`Certificate ${certId} not found.`);
            return res.status(404).json({ message: "Certificate not found or invalid ID" });
        }

        console.log(`Certificate ${certId} verified successfully.`);
        res.status(200).json(cert);
    } catch (err) {
        console.error("Error verifying certificate:", err);
        res.status(500).json({ message: "Error verifying certificate", error: err.message });
    }
};

module.exports = {
    issueCertificate,
    verifyCertificate
};
