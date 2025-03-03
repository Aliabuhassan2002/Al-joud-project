const contactUs = require("../models/contactUs");

exports.submitMessage = async (req, res) => {
  try {
    const { full_name, email, message } = req.body;
    const newMessage = await contactUs.create({
      full_name,
      email,
      message,
    });
    res.status(201).json({
      message: "Your message has been received successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "There was an error submitting your message.",
    });
  }
};
