class FullResponse {
    constructor({
        id = null,
        name = '',
        date = null,
        type = '',
        host = '',
        guestList = [],
        paymentStatus = 'PENDING',
        status = 'CONFIRMED',
        userId = null,
        vendorIds = [],
        vendorList = [],
        venueId = null,
        venue = '',
        address = '',
        budget = 0.0,
        orderId = '',
        vendorMap = {},
        rate = 0.0,
        email = '',
        location = ''
    } = {}) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.type = type;
        this.host = host;
        this.guestList = guestList;
        this.paymentStatus = paymentStatus;
        this.status = status;
        this.userId = userId;
        this.vendorIds = vendorIds;
        this.vendorList = vendorList;
        this.venueId = venueId;
        this.venue = venue;
        this.address = address;
        this.budget = budget;
        this.orderId = orderId;
        this.vendorMap = vendorMap;
        this.rate = rate;
        this.email = email;
        this.location = location;
    }
}

module.exports = FullResponse;