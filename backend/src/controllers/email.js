const emailService = require('../services/email');

const sendEmail = async (req, res) => {
    const { to, subject, messageObj } = req.body;

    const result = await emailService.sendEmail(to, subject, messageObj);

    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(500).json({ error: result.error });
    }
};

module.exports = { sendEmail };
