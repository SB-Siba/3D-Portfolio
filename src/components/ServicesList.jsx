import React from "react";
import { motion } from "framer-motion";
import { services } from "../constants";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";

const ServicesList = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Our <span className="text-cyan-400">Services</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to transform your ideas into reality
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/services/${index}`}>
                <div className="group bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-6 h-6 filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white text-center mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-center text-sm mb-4">
                    {service.description}
                  </p>

                  {/* Features Preview */}
                  <div className="space-y-2">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* View More */}
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cyan-400 group-hover:underline">
                        Learn more
                      </span>
                      <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              We specialize in creating tailored solutions for unique business needs.
              Contact us to discuss your specific requirements.
            </p>
            <Link to="/#contact">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all">
                Get in Touch
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(ServicesList, "services");