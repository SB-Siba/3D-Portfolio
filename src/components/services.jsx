import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const serviceRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedService, setSelectedService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Find the service by title (URL encoded) or index
    const serviceIndex = parseInt(serviceId);
    if (!isNaN(serviceIndex) && services[serviceIndex]) {
      setSelectedService(services[serviceIndex]);
    } else {
      // Try to find by title
      const decodedTitle = decodeURIComponent(serviceId);
      const foundService = services.find(
        (s) => s.title.toLowerCase() === decodedTitle.toLowerCase()
      );
      if (foundService) {
        setSelectedService(foundService);
      } else {
        // Default to first service
        setSelectedService(services[0]);
      }
    }

    setIsVisible(true);
  }, [serviceId]);

  const scrollToContact = () => {
    navigate("/#contact");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "process", label: "Our Process" },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Analysis",
      description:
        "We start by understanding your requirements, goals, and target audience to create a perfect strategy.",
      icon: "🔍",
    },
    {
      step: 2,
      title: "Planning & Strategy",
      description:
        "Creating a detailed roadmap and technical architecture tailored to your needs.",
      icon: "📋",
    },
    {
      step: 3,
      title: "Design & Development",
      description:
        "Implementing the solution with modern technologies and best practices.",
      icon: "💻",
    },
    {
      step: 4,
      title: "Testing & Quality",
      description:
        "Rigorous testing to ensure flawless performance and user experience.",
      icon: "✅",
    },
    {
      step: 5,
      title: "Deployment & Launch",
      description:
        "Smooth deployment and go-live process with proper documentation.",
      icon: "🚀",
    },
    {
      step: 6,
      title: "Support & Maintenance",
      description:
        "Ongoing support and regular updates to keep your solution optimal.",
      icon: "🛠️",
    },
  ];

  if (!selectedService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold mb-2">Service Not Found</h1>
          <p className="text-slate-400 mb-6">
            The service you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={serviceRef} className="relative min-h-screen pt-24 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-all group"
        >
          <span className="text-xl">←</span>
          <span className="group-hover:underline">Back to Services</span>
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-4"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <img
                    src={selectedService.icon}
                    alt={selectedService.title}
                    className="w-10 h-10 filter brightness-0 invert"
                  />
                </div>
              </motion.div>

              {/* Title & Description */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {selectedService.title}
                  </h1>
                  <p className="text-xl text-slate-300 max-w-3xl">
                    {selectedService.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats Bar - Removed Delivery Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          >
            {[
              { value: "24/7", label: "Support Available" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "50+", label: "Projects Delivered" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-md rounded-xl p-4 text-center border border-slate-700/30 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="sticky top-20 z-10 bg-slate-900/80 backdrop-blur-lg rounded-xl mb-8 border border-slate-700/50"
        >
          <div className="flex flex-wrap gap-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Description */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">📋</span>
                  Comprehensive Solution
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">
                      Our {selectedService.title.toLowerCase()} service provides
                      a complete solution tailored to your specific needs. We
                      combine industry best practices with innovative approaches
                      to deliver exceptional results.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      With years of experience and a team of dedicated
                      professionals, we ensure every project is executed with
                      precision and attention to detail.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <p className="text-slate-300">
                        Custom solutions designed specifically for your business
                        requirements
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                      <p className="text-slate-300">
                        Scalable architecture that grows with your business
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <p className="text-slate-300">
                        Ongoing support and maintenance for peace of mind
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "⚡",
                    title: "Fast Delivery",
                    description: "Efficient workflow ensuring timely delivery",
                    color: "from-yellow-500/20 to-orange-500/20",
                  },
                  {
                    icon: "🛡️",
                    title: "Secure & Reliable",
                    description:
                      "Robust security measures and reliable performance",
                    color: "from-green-500/20 to-emerald-500/20",
                  },
                  {
                    icon: "📈",
                    title: "Proven Results",
                    description: "Track record of successful project delivery",
                    color: "from-purple-500/20 to-pink-500/20",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-br ${benefit.color} backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-white/20 transition-all duration-300`}
                  >
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-300">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* All Features */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">✨</span>
                  Complete Feature Set
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedService.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature}</h4>
                        <p className="text-sm text-slate-400">
                          Included in our comprehensive package
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Process Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>

                {/* Process Steps */}
                <div className="space-y-12">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      {/* Step Connector */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-4 border-slate-900 z-10 ${
                          index % 2 === 0 ? "right-0" : "left-0"
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {step.step}
                        </div>
                      </div>

                      {/* Step Card */}
                      <div
                        className={`w-[calc(50%-60px)] ${
                          index % 2 === 0 ? "mr-16" : "ml-16"
                        }`}
                      >
                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-2xl">{step.icon}</div>
                            <h3 className="text-xl font-bold text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-slate-300">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What to Expect - Removed timeline info */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400">🎯</span>
                  What to Expect When Working With Us
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Our Commitment
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Regular progress updates and transparent communication
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Direct access to your dedicated project lead
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Collaborative approach with your feedback incorporated
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Quality assurance at every stage of development
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Project Success
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Clear documentation and training materials
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Post-launch support and maintenance
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Scalable solutions that grow with your business
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Long-term partnership for ongoing success
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-12 border border-cyan-500/20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {selectedService.title.toLowerCase()}{" "}
              service can help you achieve your goals and drive success.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/services/${serviceId}/inquiry`)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(ServiceDetail, "service");
