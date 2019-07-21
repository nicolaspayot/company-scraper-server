const mongoose = require('mongoose');

const Company = new mongoose.Schema(
  {
    linkedinURL: {
      type: String,
      index: true,
    },
    societeURL: {
      type: String,
      index: true,
    },
    logoURL: String,
    name: String,
    publicName: String,
    industry: String,
    address: String,
    siren: String,
    siret: String,
    employees: String,
    employeesOnLinkedin: String,
    shareCapital: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Company', Company);
