import React from 'react';
import { FaCertificate, FaLock, FaMoneyCheckAlt, FaTruck } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaCertificate className="text-warning fs-1 mb-2" />,
    title: 'BIS Certified Gold',
    description: 'Every product is BIS Hallmarked for purity and quality assurance.',
  },
  {
    icon: <FaLock className="text-warning fs-1 mb-2" />,
    title: 'Bank-Pledged Security',
    description: 'Jewelry is pledged in your name at your preferred bank to ensure safety.',
  },
  {
    icon: <FaMoneyCheckAlt className="text-warning fs-1 mb-2" />,
    title: 'Transparent Pricing',
    description: '100% clarity in gold pricing, weight, and plan terms — no hidden charges.',
  },
  {
    icon: <FaTruck className="text-warning fs-1 mb-2" />,
    title: 'Safe Insured Delivery',
    description: 'Insured doorstep delivery with tamper-proof packaging.',
  },
];

const WhyChoose = () => {
  return (
    <div className="container my-5 py-4 bg-light rounded shadow-sm border">
      <h2 className="text-center mb-4">
        Why Choose <span className="text-warning">Thiaworld?</span>
      </h2>

      <div className="row text-center">
        {benefits.map((benefit, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="d-flex flex-column align-items-center px-3">
              {benefit.icon}
              <h5 className="mt-2">{benefit.title}</h5>
              <p className="text-muted small">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
