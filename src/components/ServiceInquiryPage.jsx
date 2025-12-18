import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { nicheCategories, services } from "../constants";

const ServiceInquiryPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionType, setSubmissionType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountryCode: "+91",
    businessName: "",
    websiteLink: "",
    address: "",
    city: "",
    pinCode: "",
    district: "",
    state: "",
    country: "India",
    message: "",
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryCodeRef = useRef(null);
  const countryRef = useRef(null);

  // Get service info
  const getServiceInfo = () => {
    if (!serviceId)
      return {
        title: "Our Services",
        description:
          "Let's discuss how our services can help you achieve your goals and drive success.",
      };

    const serviceIndex = parseInt(serviceId);
    if (!isNaN(serviceIndex) && services[serviceIndex]) {
      return {
        title: services[serviceIndex].title,
        description: services[serviceIndex].description,
      };
    }

    const decodedTitle = decodeURIComponent(serviceId);
    const foundService = services.find(
      (s) => s.title.toLowerCase() === decodedTitle.toLowerCase()
    );
    if (foundService) {
      return {
        title: foundService.title,
        description: foundService.description,
      };
    }

    return {
      title: "Our Services",
      description:
        "Let's discuss how our services can help you achieve your goals and drive success.",
    };
  };

  const serviceInfo = getServiceInfo();
  const serviceTitle = serviceInfo.title;
  const serviceDescription = serviceInfo.description;

  // Transform nicheCategories
  const getBusinessSectors = () => {
    return nicheCategories.map((category) => ({
      sector: category.category,
      focusAreas: category.niches,
    }));
  };

  const businessSectors = getBusinessSectors();

  // Enhanced Country codes data with more details
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳", abbreviation: "IN" },
    { code: "+1", country: "United States", flag: "🇺🇸", abbreviation: "US" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧", abbreviation: "GB" },
    { code: "+61", country: "Australia", flag: "🇦🇺", abbreviation: "AU" },
    { code: "+81", country: "Japan", flag: "🇯🇵", abbreviation: "JP" },
    { code: "+49", country: "Germany", flag: "🇩🇪", abbreviation: "DE" },
    { code: "+33", country: "France", flag: "🇫🇷", abbreviation: "FR" },
    { code: "+39", country: "Italy", flag: "🇮🇹", abbreviation: "IT" },
    { code: "+34", country: "Spain", flag: "🇪🇸", abbreviation: "ES" },
    { code: "+55", country: "Brazil", flag: "🇧🇷", abbreviation: "BR" },
    { code: "+86", country: "China", flag: "🇨🇳", abbreviation: "CN" },
    { code: "+82", country: "South Korea", flag: "🇰🇷", abbreviation: "KR" },
    { code: "+65", country: "Singapore", flag: "🇸🇬", abbreviation: "SG" },
    { code: "+971", country: "UAE", flag: "🇦🇪", abbreviation: "AE" },
    { code: "+27", country: "South Africa", flag: "🇿🇦", abbreviation: "ZA" },
  ];

  // Enhanced Countries for dropdown
  const countries = [
    { name: "India", flag: "🇮🇳", code: "IN" },
    { name: "United States", flag: "🇺🇸", code: "US" },
    { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
    { name: "Australia", flag: "🇦🇺", code: "AU" },
    { name: "Japan", flag: "🇯🇵", code: "JP" },
    { name: "Germany", flag: "🇩🇪", code: "DE" },
    { name: "France", flag: "🇫🇷", code: "FR" },
    { name: "Italy", flag: "🇮🇹", code: "IT" },
    { name: "Spain", flag: "🇪🇸", code: "ES" },
    { name: "Brazil", flag: "🇧🇷", code: "BR" },
    { name: "China", flag: "🇨🇳", code: "CN" },
    { name: "South Korea", flag: "🇰🇷", code: "KR" },
    { name: "Singapore", flag: "🇸🇬", code: "SG" },
    { name: "UAE", flag: "🇦🇪", code: "AE" },
    { name: "South Africa", flag: "🇿🇦", code: "ZA" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (
        countryCodeRef.current &&
        !countryCodeRef.current.contains(event.target)
      ) {
        setShowCountryCodeDropdown(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Form handler functions
  const handleFocusAreaSelect = (area) => {
    setSelectedFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((n) => n !== area) : [...prev, area]
    );
  };

  const handleSectorChange = (sector) => {
    setSelectedSector(sector);
    setSelectedFocusAreas([]);
  };

  const getCurrentFocusAreas = () => {
    const sector = businessSectors.find((cat) => cat.sector === selectedSector);
    return sector ? sector.focusAreas : [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fetch location when PIN code is entered
    if (name === "pinCode" && value.length === 6) {
      fetchLocationFromPin(value);
    }
  };

  // Phone number validation - only allow numbers
  const handlePhoneKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].includes(e.keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }

    // Ensure that it's a number and stop the keypress
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  // Handle country code selection
  const handleCountryCodeSelect = (countryCode) => {
    setFormData((prev) => ({ ...prev, phoneCountryCode: countryCode.code }));
    setShowCountryCodeDropdown(false);
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setFormData((prev) => ({ ...prev, country: country.name }));
    setShowCountryDropdown(false);
  };

  // Get selected country code details
  const getSelectedCountryCode = () => {
    return (
      countryCodes.find((cc) => cc.code === formData.phoneCountryCode) ||
      countryCodes[0]
    );
  };

  // Get selected country details
  const getSelectedCountry = () => {
    return countries.find((c) => c.name === formData.country) || countries[0];
  };

  // Fetch location details from PIN code
  const fetchLocationFromPin = async (pinCode) => {
    if (!pinCode || pinCode.length !== 6) return;

    setIsFetchingLocation(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      const data = await response.json();

      if (
        data &&
        data[0] &&
        data[0].Status === "Success" &&
        data[0].PostOffice &&
        data[0].PostOffice.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          district: postOffice.District || "",
          state: postOffice.State || "",
          city: postOffice.Block || postOffice.District || "",
        }));
      } else {
        // Reset location fields if PIN is invalid
        setFormData((prev) => ({
          ...prev,
          district: "",
          state: "",
          city: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      // Reset location fields on error
      setFormData((prev) => ({
        ...prev,
        district: "",
        state: "",
        city: "",
      }));
    } finally {
      setIsFetchingLocation(false);
    }
  };

  // Enhanced WhatsApp submission with animations
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionType("whatsapp");

    // Stage 1: Preparing data
    setTimeout(() => {
      setSubmissionType("whatsapp_sending");
    }, 800);

    // Stage 2: Opening WhatsApp
    setTimeout(() => {
      setSubmissionType("whatsapp_opening");

      // Enhanced WhatsApp Message Template
      const message = `🌟 *NEW PROJECT INQUIRY - ${serviceTitle}* 🌟

🎯 *PROJECT OVERVIEW*
Service Interested: ${serviceTitle}
Date: ${new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
Time: ${new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })} IST

👤 *CLIENT INFORMATION*
• Full Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Phone: ${formData.phoneCountryCode} ${formData.phone || "Not provided"}
• Business Name: ${formData.businessName}
• Website: ${formData.websiteLink || "Not provided"}
• Location: ${formData.address}, ${formData.city}, ${formData.district}, ${
        formData.state
      } - ${formData.pinCode}, ${formData.country}

🏢 *BUSINESS PROFILE*
• Industry Sector: ${selectedSector || "Not specified"}
• Focus Areas: ${selectedFocusAreas.join(", ") || "Not specified"}
• Service Needed: ${serviceTitle}

📋 *PROJECT DETAILS*
${formData.message || "No additional information provided"}

🎯 *PROJECT GOALS*
${
  formData.message.includes("goal") || formData.message.includes("objective")
    ? formData.message
    : "To be discussed during consultation"
}

⏱️ *TIMELINE EXPECTATION*
${
  formData.message.includes("timeline") || formData.message.includes("deadline")
    ? formData.message.match(/timeline.*?deadline/i)
      ? formData.message.match(/timeline.*?deadline/i)[0]
      : "Flexible, to be discussed"
    : "Flexible, to be discussed"
}

💰 *BUDGET INDICATION*
${
  formData.message.includes("budget") || formData.message.includes("investment")
    ? formData.message.match(/budget.*?investment/i)
      ? formData.message.match(/budget.*?investment/i)[0]
      : "To be discussed"
    : "To be discussed"
}

---
📧 *Alternative Contact*: ${formData.email}
📱 *Direct Contact*: ${formData.phoneCountryCode} ${
        formData.phone || "Via WhatsApp only"
      }
📍 *Location*: ${formData.state || "Remote Collaboration"}

🚀 *NEXT STEPS REQUESTED*
1. Initial Consultation
2. Project Scope Discussion
3. Proposal & Timeline
4. Project Kick-off

Looking forward to discussing this exciting opportunity with you!

Best regards,
${formData.firstName} ${formData.lastName}
${formData.businessName ? `\n${formData.businessName}` : ""}`;

      const whatsappUrl = `https://wa.me/919692199548?text=${encodeURIComponent(
        message
      )}`;

      // Open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");

        // Reset and navigate back
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmissionType("");
          navigate(-1);
        }, 1000);
      }, 500);
    }, 1600);
  };

  // Enhanced Email submission with animations
  const handleEmailSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionType("email");

    // Stage 1: Preparing data
    setTimeout(() => {
      setSubmissionType("email_sending");
    }, 800);

    // Stage 2: Opening Email
    setTimeout(() => {
      setSubmissionType("email_opening");

      // Enhanced Email Template with bold headings
      const subject = `🚀 Project Inquiry: ${serviceTitle} - ${
        formData.businessName || formData.firstName
      }`;
      const body = `Dear SIBANANDA,

I hope this email finds you well!

I am reaching out to express my interest in your ${serviceTitle} services. Here are the details of my project inquiry:

*📋 PROJECT OVERVIEW*
• Service Interested: ${serviceTitle}
• Inquiry Date: ${new Date().toLocaleDateString("en-IN")}
• Reference: Project Inquiry #${Date.now().toString().slice(-6)}

*👤 CLIENT INFORMATION*
• Full Name: ${formData.firstName} ${formData.lastName}
• Email Address: ${formData.email}
• Phone Number: ${formData.phoneCountryCode} ${formData.phone || "Not provided"}
• Business/Organization: ${formData.businessName}
• Website: ${formData.websiteLink || "Not available"}
• Address: ${formData.address}
• City: ${formData.city}
• District: ${formData.district || "Not specified"}
• State: ${formData.state}
• PIN Code: ${formData.pinCode}
• Country: ${formData.country}

*🏢 BUSINESS BACKGROUND*
• Industry Sector: ${selectedSector || "To be discussed"}
• Key Focus Areas: ${selectedFocusAreas.join(", ") || "To be determined"}
• Current Status: ${
        formData.message.includes("existing")
          ? "Existing business"
          : "New project/venture"
      }

*🎯 PROJECT OBJECTIVES*
${
  formData.message ||
  "Looking forward to discussing project goals during our consultation."
}

*📊 ADDITIONAL DETAILS:*
${
  formData.message
    ? `• Project Vision: ${formData.message.substring(0, 200)}${
        formData.message.length > 200 ? "..." : ""
      }
• Timeline Preference: ${
        formData.message.includes("timeline")
          ? "Specific timeline mentioned"
          : "Flexible"
      }
• Budget Range: ${
        formData.message.includes("budget")
          ? "Budget considerations mentioned"
          : "To be discussed"
      }`
    : "Details to be discussed during initial consultation."
}

*🌟 EXPECTED OUTCOMES:*
1. Professional execution of ${serviceTitle}
2. Clear communication throughout the project
3. Timely delivery as per agreed schedule
4. High-quality results meeting business objectives

*📞 PREFERRED CONTACT METHOD:*
• Primary: Email (${formData.email})
• Secondary: ${
        formData.phone
          ? `Phone: ${formData.phoneCountryCode} ${formData.phone}`
          : "WhatsApp"
      }
• Best Time to Contact: Flexible / To be discussed

*⏰ AVAILABILITY:*
I am available for an initial discussion at your earliest convenience. Please suggest a time that works for your schedule.

*📈 BUSINESS VALUE EXPECTATION:*
I believe your expertise in ${serviceTitle} can help us achieve:
• ${
        selectedFocusAreas.length > 0
          ? selectedFocusAreas[0]
          : "Business growth objectives"
      }
• ${
        selectedFocusAreas.length > 1
          ? selectedFocusAreas[1]
          : "Improved operational efficiency"
      }
• ${
        selectedFocusAreas.length > 2
          ? selectedFocusAreas[2]
          : "Enhanced market presence"
      }

Attached is my contact information for your records. I look forward to hearing from you and discussing how we can collaborate on this project.

Thank you for considering my inquiry.

Warm regards,

${formData.firstName} ${formData.lastName}
${formData.businessName ? `${formData.businessName}\n` : ""}
📧 ${formData.email}
${formData.phone ? `📱 ${formData.phoneCountryCode} ${formData.phone}\n` : ""}
${formData.websiteLink ? `🌐 ${formData.websiteLink}\n` : ""}

---
CONFIDENTIALITY NOTICE:
This email contains confidential information intended only for the recipient. If you are not the intended recipient, please notify the sender immediately and delete this email.`;

      const emailUrl = `mailto:work.sibananda@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Open Email
      setTimeout(() => {
        window.open(emailUrl, "_blank");

        // Reset and navigate back
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmissionType("");
          navigate(-1);
        }, 1000);
      }, 500);
    }, 1600);
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      { field: formData.firstName, name: "First Name" },
      { field: formData.lastName, name: "Last Name" },
      { field: formData.email, name: "Email Address" },
      { field: formData.businessName, name: "Business Name" },
      { field: formData.address, name: "Address" },
      { field: formData.city, name: "City" },
      { field: formData.pinCode, name: "PIN Code" },
      { field: formData.state, name: "State" },
      { field: formData.country, name: "Country" },
    ];

    const missingFields = requiredFields
      .filter((item) => !item.field)
      .map((item) => item.name);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n${missingFields.join("\n")}`);
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      alert("Please enter a valid 6-digit PIN code");
      return false;
    }

    if (selectedFocusAreas.length === 0) {
      alert("Please select at least one focus area");
      return false;
    }

    return true;
  };

  // Close page and go back
  const handleClose = () => {
    navigate(-1);
  };

  // Close with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
      // Close dropdowns with Escape
      if (e.key === "Escape") {
        setShowCountryCodeDropdown(false);
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Check if form is complete for showing contact options
  const isFormComplete =
    selectedFocusAreas.length > 0 &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.businessName;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen pt-32 pb-12"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12 relative"
          >
            {/* Back button */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="absolute top-0 left-0 md:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 mt-8"
            >
              Start Your <span className="text-cyan-300">{serviceTitle}</span>{" "}
              Project
            </motion.h1>

            {/* Service Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 border border-white/20 rounded-full px-6 py-2 mb-6 inline-block"
            >
              <p className="text-cyan-200 text-sm font-medium">
                📋 Selected Service: {serviceTitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {serviceDescription}
            </motion.p>
          </motion.div>

          {/* Main Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:p-8 shadow-xl mb-8"
          >
            {/* Project Details Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 mb-8 border border-cyan-500/30"
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="text-cyan-300">📋</span>
                Project Details
              </h3>
              <p className="text-slate-200 text-base">{serviceDescription}</p>
            </motion.div>

            {/* Business Sector Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-cyan-300">🏢</span>
                  Select Your Industry Sector
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {businessSectors.map((sector) => (
                    <motion.button
                      key={sector.sector}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => handleSectorChange(sector.sector)}
                      className={`px-3 py-3 rounded-lg border transition-all duration-300 font-medium text-sm ${
                        selectedSector === sector.sector
                          ? "bg-cyan-500/30 border-cyan-400 text-white shadow-md shadow-cyan-500/20"
                          : "bg-white/10 border-white/20 text-slate-200 hover:border-cyan-300/50 hover:bg-white/15"
                      }`}
                    >
                      {sector.sector}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Focus Areas Selection */}
              {selectedSector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-cyan-300">🎯</span>
                    Select Your Focus Areas ({selectedFocusAreas.length}{" "}
                    selected)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getCurrentFocusAreas().map((area, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 3 }}
                        onClick={() => handleFocusAreaSelect(area)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedFocusAreas.includes(area)
                            ? "bg-green-500/20 border-green-400/50"
                            : "bg-white/10 border-white/20 hover:border-cyan-300/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                              selectedFocusAreas.includes(area)
                                ? "bg-green-500 border-green-500"
                                : "bg-white/20 border-white/30"
                            }`}
                          >
                            {selectedFocusAreas.includes(area) && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </motion.svg>
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              selectedFocusAreas.includes(area)
                                ? "text-green-200"
                                : "text-slate-200"
                            }`}
                          >
                            {area}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Information Form */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-cyan-300">👤</span>
                  Your Information
                </h3>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        First Name <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Last Name <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Email Address <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Enhanced Country Code Dropdown with Custom Animation */}
                        <div className="w-full md:w-48" ref={countryCodeRef}>
                          <div className="relative">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() =>
                                setShowCountryCodeDropdown(
                                  !showCountryCodeDropdown
                                )
                              }
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300 flex items-center justify-between group hover:bg-white/15"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">
                                  {getSelectedCountryCode().flag}
                                </span>
                                <div className="text-left">
                                  <div className="font-medium">
                                    {getSelectedCountryCode().code}
                                  </div>
                                  <div className="text-xs text-slate-300 opacity-75">
                                    {getSelectedCountryCode().country}
                                  </div>
                                </div>
                              </div>
                              <motion.div
                                animate={{
                                  rotate: showCountryCodeDropdown ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-slate-400 group-hover:text-cyan-300"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </motion.div>
                            </motion.button>

                            {/* Animated Dropdown Menu */}
                            <AnimatePresence>
                              {showCountryCodeDropdown && (
                                <motion.div
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  variants={dropdownVariants}
                                  className="absolute z-50 mt-2 w-full bg-slate-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden"
                                >
                                  <div className="max-h-64 overflow-y-auto custom-scrollbar bg-white/5">
                                    {countryCodes.map((country) => (
                                      <motion.div
                                        key={country.code}
                                        variants={dropdownItemVariants}
                                        whileHover={{
                                          scale: 1.02,
                                          backgroundColor:
                                            "rgba(6, 182, 212, 0.15)",
                                        }}
                                        onClick={() =>
                                          handleCountryCodeSelect(country)
                                        }
                                        className={`px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                                          formData.phoneCountryCode ===
                                          country.code
                                            ? "bg-cyan-500/20 text-cyan-300"
                                            : "text-slate-200 hover:text-white"
                                        }`}
                                      >
                                        <span className="text-lg">
                                          {country.flag}
                                        </span>
                                        <div className="flex-1">
                                          <div className="font-medium">
                                            {country.code}
                                          </div>
                                          <div className="text-xs opacity-75">
                                            {country.country}
                                          </div>
                                        </div>
                                        {formData.phoneCountryCode ===
                                          country.code && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center"
                                          >
                                            <svg
                                              className="w-3 h-3 text-white"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                              />
                                            </svg>
                                          </motion.div>
                                        )}
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        {/* Phone Number Input */}
                        <div className="flex-1">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onKeyDown={handlePhoneKeyDown}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Business Name <span className="text-cyan-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Website/Link (if any)
                      </label>
                      <input
                        type="url"
                        name="websiteLink"
                        value={formData.websiteLink}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-cyan-300">📍</span>
                      Address Details
                    </h4>

                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Address <span className="text-cyan-300">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
                        placeholder="Street address, building name, landmark..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          City <span className="text-cyan-300">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          PIN Code <span className="text-cyan-300">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            required
                            maxLength="6"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            placeholder="123456"
                          />
                          {isFetchingLocation && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg
                                className="animate-spin h-4 w-4 text-cyan-400"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          District
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                          placeholder="Auto-filled from PIN"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          State <span className="text-cyan-300">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                          placeholder="Auto-filled from PIN"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                          Country <span className="text-cyan-300">*</span>
                        </label>
                        <div className="relative" ref={countryRef}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() =>
                              setShowCountryDropdown(!showCountryDropdown)
                            }
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300 flex items-center justify-between group hover:bg-white/15"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">
                                {getSelectedCountry().flag}
                              </span>
                              <span className="font-medium">
                                {getSelectedCountry().name}
                              </span>
                            </div>
                            <motion.div
                              animate={{
                                rotate: showCountryDropdown ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="text-slate-400 group-hover:text-cyan-300"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.div>
                          </motion.button>

                          {/* Animated Country Dropdown Menu */}
                          <AnimatePresence>
                            {showCountryDropdown && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                                className="absolute z-50 mt-2 w-full bg-slate-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden"
                              >
                                <div className="max-h-64 overflow-y-auto custom-scrollbar bg-white/5">
                                  {countries.map((country) => (
                                    <motion.div
                                      key={country.code}
                                      variants={dropdownItemVariants}
                                      whileHover={{
                                        scale: 1.02,
                                        backgroundColor:
                                          "rgba(6, 182, 212, 0.15)",
                                      }}
                                      onClick={() =>
                                        handleCountrySelect(country)
                                      }
                                      className={`px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                                        formData.country === country.name
                                          ? "bg-cyan-500/20 text-cyan-300"
                                          : "text-slate-200 hover:text-white"
                                      }`}
                                    >
                                      <span className="text-lg">
                                        {country.flag}
                                      </span>
                                      <span className="flex-1 font-medium">
                                        {country.name}
                                      </span>
                                      {formData.country === country.name && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center"
                                        >
                                          <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={3}
                                              d="M5 13l4 4L19 7"
                                            />
                                          </svg>
                                        </motion.div>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Requirements */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Project Requirements & Goals
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project vision, requirements, timeline, and goals..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Options - Only shows when form is complete */}
          <AnimatePresence>
            {isFormComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                  <div className="text-center mb-8">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-white mb-3"
                    >
                      Ready to Connect? 🚀
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-slate-200 text-base"
                    >
                      Choose your preferred contact method
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                    {/* WhatsApp Option */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="h-full flex flex-col bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                            {/* WhatsApp Logo */}
                            <svg
                              className="w-7 h-7 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                            </svg>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-xl font-bold text-white mb-2">
                            WhatsApp Chat
                          </h4>
                          <p className="text-slate-200 text-sm leading-relaxed mb-4">
                            Quick & instant response
                            <br />
                            <span className="text-green-300/80 text-xs">
                              Typically responds within minutes
                            </span>
                          </p>
                        </div>

                        <div className="w-full mt-auto">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsAppSubmit}
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmitting &&
                            submissionType.startsWith("whatsapp") ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                {submissionType === "whatsapp"
                                  ? "Preparing..."
                                  : submissionType === "whatsapp_sending"
                                  ? "Sending data..."
                                  : "Opening WhatsApp..."}
                              </span>
                            ) : (
                              <>
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                                </svg>
                                Start WhatsApp Chat
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Email Option */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="h-full flex flex-col bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            {/* Email Logo */}
                            <svg
                              className="w-7 h-7 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-xl font-bold text-white mb-2">
                            Send Email
                          </h4>
                          <p className="text-slate-200 text-sm leading-relaxed mb-4">
                            Formal communication with details
                            <br />
                            <span className="text-cyan-300/80 text-xs">
                              Ideal for detailed project discussions
                            </span>
                          </p>
                        </div>

                        <div className="w-full mt-auto">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmailSubmit}
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmitting &&
                            submissionType.startsWith("email") ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                {submissionType === "email"
                                  ? "Preparing..."
                                  : submissionType === "email_sending"
                                  ? "Sending data..."
                                  : "Opening Email..."}
                              </span>
                            ) : (
                              <>
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                Send Email
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceInquiryPage;
