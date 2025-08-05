import React from 'react';
import { Truck, Users, Shield, Award, Clock, Globe, Car, Zap, Heart, Target } from 'lucide-react';
import logo from '../assets/logo.jpg';

export function AboutPage() {
  // Company values and leadership (example data)
  const values = [
    {
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative thinking to solve real-world problems.'
    },
    {
      title: 'Integrity',
      description: 'We uphold the highest standards of ethics and transparency in all our dealings.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to solutions that benefit both business and the environment.'
    },
    {
      title: 'Customer Focus',
      description: 'We put our clients at the center, tailoring solutions to their unique needs.'
    }
  ];
  return (
    <div className="space-y-20 pb-20">
      {/* Company Section */}
      <section className="bg-white rounded-3xl p-10 border border-orange-100 shadow-xl text-center animate-fadeIn max-w-5xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src={logo} alt="Startrit Logo" className="w-28 h-28 object-contain rounded-full border-4 border-orange-200 shadow-md mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Startrit Infratech Private Limited</h1>
          <p className="text-lg text-orange-600 font-semibold mb-4">Innovating for a Smarter, Sustainable Future</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <div>
              <span className="font-bold text-gray-900">Vision:</span> To be the world’s most trusted partner in deep-tech transformation, harnessing AI, ML, Data Analytics, and Quantum Computing to empower organizations, drive sustainable growth, and create lasting positive impact for society and the environment.
            </div>
            <div>
              <span className="font-bold text-gray-900">Mission:</span> To deliver innovative, sustainable, and seamlessly integrated technology solutions that enhance operational efficiency, ensure business continuity, and enable our clients to thrive in a smarter, more connected world.
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Our Core Values</h2>
              <ul className="space-y-2">
                {values.map((v, i) => (
                  <li key={i} className="bg-orange-50 rounded-xl p-3 border-l-4 border-orange-400">
                    <span className="font-semibold text-gray-900">{v.title}:</span> {v.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Fleet Management System Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-12 shadow-lg max-w-5xl mx-auto animate-fadeIn">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-6">Fleet Management System</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Startrit’s Fleet Management System is a next-generation platform designed to empower organizations with real-time visibility, intelligent automation, and actionable insights. Our system leverages AI, IoT, and advanced analytics to optimize every aspect of fleet operations—from vehicle tracking and predictive maintenance to driver safety and compliance. With a focus on sustainability and cost efficiency, we help businesses of all sizes achieve operational excellence and future-ready mobility.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-orange-100 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-700 text-left">
              <li><span className="font-semibold">AI-Powered Tracking:</span> Real-time GPS and telematics for total fleet visibility.</li>
              <li><span className="font-semibold">Predictive Maintenance:</span> Reduce downtime and costs with smart alerts and scheduling.</li>
              <li><span className="font-semibold">Driver Performance:</span> Monitor, score, and coach drivers for safety and efficiency.</li>
              <li><span className="font-semibold">Compliance & Safety:</span> Automated compliance checks and incident reporting.</li>
              <li><span className="font-semibold">Sustainability Insights:</span> Tools to track and reduce environmental impact.</li>
              <li><span className="font-semibold">Customizable Dashboards:</span> Tailor analytics and reports to your business needs.</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 border border-orange-100 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Why Choose Startrit?</h2>
            <ul className="space-y-3 text-gray-700 text-left">
              <li><span className="font-semibold">Deep-Tech Expertise:</span> Decades of experience in AI, ML, and data analytics.</li>
              <li><span className="font-semibold">Client-Centric Approach:</span> Solutions tailored for your unique operational needs.</li>
              <li><span className="font-semibold">Scalable & Secure:</span> Enterprise-grade security and scalability for any fleet size.</li>
              <li><span className="font-semibold">24/7 Support:</span> Dedicated support to keep your operations running smoothly.</li>
              <li><span className="font-semibold">Proven Results:</span> Trusted by industry leaders for reliability and innovation.</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-12 text-white text-center shadow-xl max-w-4xl mx-auto animate-fadeIn">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Transform Your Fleet?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join forward-thinking organizations that trust Startrit Infratech for their fleet management and digital transformation needs. Contact us today to discover how we can help you drive efficiency, sustainability, and growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-white text-orange-600 font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-orange-50 transition-all duration-200 transform hover:scale-105">
            Contact Sales
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-orange-600 px-10 py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105">
            Schedule Demo
          </button>
        </div>
      </section>
    </div>
  );
}