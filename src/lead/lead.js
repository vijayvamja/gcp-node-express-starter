const Lead = require('./../models/lead');

class LeadService {
  constructor(logger) {
    this._logger = logger;
    this._store = Lead;
  }

  async createLead({ firstName, lastName, email, phone, description }) {
    const lead = new this._store({
      firstName,
      lastName,
      email,
      phone,
      description,
    });

    return lead.save();
  }

  async listLeads() {
    return this._store.list();
  }
}

module.exports = LeadService;
