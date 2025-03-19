import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject";
    if (!formData.message.trim()) newErrors.message = "Please enter your message";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSuccessMessage("");
    }
  };

  return (
    <div className="contact wow fadeInUp" id="contact">
      <div className="container-fluid">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="contact-form">
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form name="sentMessage" id="contactForm" noValidate onSubmit={handleSubmit}>
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="help-block">{errors.name}</p>}
                  </div>
                  <div className="control-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="help-block">{errors.email}</p>}
                  </div>
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <p className="help-block">{errors.subject}</p>}
                  </div>
                  <div className="control-group">
                    <textarea
                      className="form-control"
                      id="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && <p className="help-block">{errors.message}</p>}
                  </div>
                  <div>
                    <button className="btn" type="submit" id="sendMessageButton">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
