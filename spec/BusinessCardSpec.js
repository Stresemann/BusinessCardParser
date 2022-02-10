var BusinessCardParser = require('../lib/card-parser').BusinessCardParser;

describe("BusinessCardParser", function () {
  var businessCardParser;

  beforeEach(function () {
    businessCardParser = new BusinessCardParser();
  });

  it("should be able to parse Mike Smith", function () {
    let parsedCard = businessCardParser.getContactInfo("ASYMMETRIK LTD\n \
    Mike Smith\n \
    Senior Software Engineer\n \
    (410)555-1234\n \
    msmith@asymmetrik.com");
    expect(parsedCard.getName()).toEqual("Mike Smith");
    expect(parsedCard.getPhoneNumber()).toEqual("4105551234");
    expect(parsedCard.getEmailAddress()).toEqual("msmith@asymmetrik.com");
  });

  it("should be able to parse Lisa Haung", function () {
    let parsedCard = businessCardParser.getContactInfo("Foobar Technologies\n \
    Analytic Developer\n \
    Lisa Haung\n \
    1234 Sentry Road\n \
    Columbia, MD 12345\n \
    Phone: 410-555-1234\n \
    Fax: 410-555-4321\n \
    lisa.haung@foobartech.com");
    expect(parsedCard.getName()).toEqual("Lisa Haung");
    expect(parsedCard.getPhoneNumber()).toEqual("4105551234");
    expect(parsedCard.getEmailAddress()).toEqual("lisa.haung@foobartech.com");
  });

  it("should be able to parse Arthur Wilson", function () {
    let parsedCard = businessCardParser.getContactInfo("Arthur Wilson\n \
    Software Engineer\n \
    Decision & Security Technologies\n \
    ABC Technologies\n \
    123 North 11th Street\n \
    Suite 229\n \
    Arlington, VA 22209\n \
    Tel: +1 (703) 555-1259\n \
    Fax: +1 (703) 555-1200\n \
    awilson@abctech.com");
    expect(parsedCard.getName()).toEqual("Arthur Wilson");
    expect(parsedCard.getPhoneNumber()).toEqual("17035551259");
    expect(parsedCard.getEmailAddress()).toEqual("awilson@abctech.com");
  });

  it("should be able to parse Barry Simkins with fax first", function () {
    let parsedCard = businessCardParser.getContactInfo("ASYMMETRIK LTD\n \
    Barry Simkins\n \
    Senior Software Engineer\n \
    bsimkins@asymmetrik.com\n \
    F: (410)555-1234\n \
    T: (555)555-1234");
    expect(parsedCard.getName()).toEqual("Barry Simkins");
    expect(parsedCard.getPhoneNumber()).toEqual("5555551234");
    expect(parsedCard.getEmailAddress()).toEqual("bsimkins@asymmetrik.com");
  });

  it("should be able to parse Tony Soprano with different line endings", function () {
    let parsedCard = businessCardParser.getContactInfo("Tony J. Soprano\n\r \
    Mobster\n\r \
    F: +1 410-555-1234\n\r \
    T: +1 555-555-1234");
    expect(parsedCard.getName()).toEqual("Tony J. Soprano");
    expect(parsedCard.getPhoneNumber()).toEqual("15555551234");
    expect(parsedCard.getEmailAddress()).toBeUndefined;
  });

  it("should match nothing", function () {
    let parsedCard = businessCardParser.getContactInfo("Software Engineer\n \
    Decision & Security Technologies\n \
    ABC Technologies\n \
    123 North 11th Street\n \
    Suite 229\n \
    Arlington, VA 22209\n \
    Fax: +1 (703) 555-1200");
    expect(parsedCard.getName()).toBeUndefined;
    expect(parsedCard.getPhoneNumber()).toBeUndefined;
    expect(parsedCard.getEmailAddress()).toBeUndefined;
  });

  it("should match nothing with no input", function () {
    let parsedCard = businessCardParser.getContactInfo();
    expect(parsedCard.getName()).toBeUndefined;
    expect(parsedCard.getPhoneNumber()).toBeUndefined;
    expect(parsedCard.getEmailAddress()).toBeUndefined;
  });

});
