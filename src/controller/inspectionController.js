const model = require("../model/inspectionModel");
const nodemailer = require("nodemailer");

const createInsp = async (req, res) => {
  const { timKey, taimItemKey, updKey, tiimCreatedBy } = req.body;
  
  if (!timKey || !taimItemKey || !updKey || !tiimCreatedBy) {
    return res.status(400).json({
      success: true,
      error: false,
      message: "All fields are required",
    });
    
  }
  try {
    await model.createInspection(timKey, taimItemKey, updKey, tiimCreatedBy);
    res.status(200).json({
      success: true,
      error: false,
      message: "data inserted successfully",
    });
  } catch (err) {
    console.error("error executing query:" + err.stack);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

const createAreaMaster = async (req, res) => {
  const {
    timKey,
    updKey,
    tamAreaKey,
    taimItemName,
    taimItemType,
    taimDescription,
    taimFutureInspection,
    taimCreatedBy,
  } = req.body;
  if (
    !timKey ||
    !updKey ||
    !tamAreaKey ||
    !taimItemName ||
    !taimItemType ||
    !taimDescription ||
    !taimFutureInspection ||
    !taimCreatedBy
  ) {
    return res.status(400).json({
      success: true,
      error: false,
      message: "All fields are required",
    });
  }

  try {
    await model.createAreaItemMaster(
      timKey,
      updKey,
      tamAreaKey,
      taimItemName,
      taimItemType,
      taimDescription,
      taimFutureInspection,
      taimCreatedBy
    );
    res.status(200).json({
      success: true,
      error: false,
      message: "data inserted successfully",
    });
  } catch (err) {
    console.error("error executing query:" + err.stack);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "mishramanishkumar029@gmail.com",
    pass: "jfhi htwu uicr okqa",
  },
});

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "No files uploaded",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "Missing required fields: email",
      });
    }

    const image_path = req.files.originalname;
    const mailOptions = {
      from: "mishramanishkumar029@gmail.com",
      to: email,
      subject: "email with file attached",
      html: "<b>Hello from manish</b>",
      attachments: [
        {
          filename: image_path,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      error: false,
      message: `successfully email sent: ${info.messageId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "email not sent!! something went wrong...",
    });
  }
};

module.exports = {
  createInsp,
  createAreaMaster,
  sendEmail,
};
