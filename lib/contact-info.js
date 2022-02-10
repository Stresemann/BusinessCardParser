/**
 * Class to store contact info
 */
class ContactInfo {
    constructor(info) {
        this.name = info["name"]
        this.phoneNumber = info["phone"]
        this.emailAddress = info["email"]
    }

    getName() {return this.name}
    getPhoneNumber() {return this.phoneNumber}
    getEmailAddress() {return this.emailAddress}

}

module.exports = {ContactInfo}