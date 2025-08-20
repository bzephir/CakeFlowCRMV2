import { FormCategory, FormTemplate } from "../types/formtemplate";

export const mockForms: FormTemplate[] = [
  {
    id: "standard-cake-contract-001",
    title: "Standard Cake Contract",
    category: FormCategory.Contracts,
    body: `
This contract is entered into between {{client.name}}, hereinafter referred to as the "Client," and Cake Cuties Bakery, hereinafter referred to as the "Bakery," on {{curDate | longDate}}.

1.    Cake Details:
a.    Design: The design of the wedding cake shall be as agreed upon by both parties and specified in the attached cake sketch or design description.
b.    Flavors: The flavors of the wedding cake tiers shall be as selected by the Client from the Bakery's flavor menu.
c.     Size: The size of the wedding cake shall be determined based on the estimated number of guests provided by the Client.

2.    Delivery and Setup:
a.    Delivery Date: The wedding cake will be delivered on {{job.start | mediumDate}} to the venue specified by the Client.
b.    Setup: The Bakery will be responsible for setting up the wedding cake at the venue according to the agreed-upon design.

... // rest of contract body

`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-agreement-001",
    title: "Catering Service Agreement",
    category: FormCategory.Agreements,
    body: `
This Service Agreement is entered into between {{client.name}} ("Client") and Sweet Delights Bakery ("Service Provider") on {{curDate | longDate}}.

## 1. Services to be Provided

The Service Provider agrees to provide catering services for the Client's event as follows:
- Event Date: {{job.start | mediumDate}}
- Event Type: Corporate catering
- Expected Guest Count: As specified by Client
- Menu items as agreed upon in attached proposal

## 2. Service Terms

a. **Setup and Breakdown**: Service Provider will arrive 2 hours before event start time for setup and will complete breakdown within 1 hour after event conclusion.

b. **Staffing**: Adequate professional staff will be provided to ensure smooth service delivery.

c. **Equipment**: All necessary serving equipment, linens, and utensils will be provided by Service Provider.

## 3. Payment Terms

- Total Service Fee: {{job.invoice | total}}
- Payment Schedule: {{paymentSchedule | paymentScheduleFilter}}
- Late payment fees may apply for payments received after due date

## 4. Cancellation Policy

- Cancellations made 30+ days prior: Full refund minus 10% administrative fee
- Cancellations made 14-29 days prior: 50% refund
- Cancellations made less than 14 days prior: No refund

## 5. Force Majeure

Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control.

By signing below, both parties agree to the terms and conditions outlined in this agreement.
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wedding-proposal-001",
    title: "Wedding Cake Proposal",
    category: FormCategory.Proposals,
    body: `
**Prepared for:** {{client.name}}  
**Date:** {{curDate | longDate}}  
**Event Date:** {{job.start | mediumDate}}

---

## Our Vision for Your Special Day

Thank you for considering Sweet Delights Bakery for your wedding celebration. We are honored to be part of your special day and excited to create a stunning centerpiece that reflects your unique love story.

## Proposed Wedding Cake Design

### Cake Specifications
- **Tiers:** 3-tier design (6", 8", 10")
- **Serves:** Approximately 75-80 guests
- **Style:** Classic elegance with modern touches
- **Flavors:** 
  - Top tier: Vanilla bean cake with raspberry filling
  - Middle tier: Chocolate cake with salted caramel filling  
  - Bottom tier: Lemon cake with blueberry compote

### Design Elements
- **Frosting:** Smooth buttercream finish in ivory
- **Decorations:** Fresh flowers and delicate piping details
- **Special Features:** Custom cake topper accommodation
- **Color Palette:** Coordinated with your wedding theme

## Services Included

{{job.invoice | packageItems:true}}

### Delivery & Setup
- Professional delivery to your venue
- Complete cake assembly and styling on-site
- Coordination with your wedding planner/venue coordinator
- Cake cutting guide and serving utensils provided

## Investment

**Total Investment:** {{job.invoice | total}}

**Payment Schedule:**
{{paymentSchedule | paymentScheduleFilter}}

## Next Steps

1. **Cake Tasting:** Schedule a complimentary tasting to finalize flavors
2. **Design Consultation:** Refine design details and decorative elements
3. **Contract Signing:** Secure your date with signed agreement and deposit
4. **Final Details:** Confirm delivery logistics 2 weeks before event

## Why Choose Sweet Delights Bakery?

- Over 10 years of wedding cake expertise
- Premium ingredients and artisanal techniques
- Personalized service from consultation to delivery
- Flexible design options to match your vision
- Reliable delivery and professional setup

We look forward to creating something truly magical for your wedding day!

*This proposal is valid for 30 days from the date above.*
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "event-questionnaire-001",
    title: "Event Planning Questionnaire",
    category: FormCategory.Agreements,
    body: `
**Client Name:** {{client.name}}  
**Date Completed:** {{curDate | longDate}}

---

Thank you for choosing Sweet Delights Bakery! This questionnaire helps us understand your vision and ensure we create the perfect desserts for your special event.

## Event Details

**Event Date:** _______________  
**Event Time:** _______________  
**Event Type:** _______________  
**Venue Name:** _______________  
**Venue Address:** _______________  
**Expected Guest Count:** _______________

## Cake & Dessert Preferences

### Cake Details
**Preferred Cake Size/Tiers:** _______________  
**Cake Style Preference:** 
- [ ] Classic/Traditional
- [ ] Modern/Contemporary  
- [ ] Rustic/Natural
- [ ] Elegant/Formal
- [ ] Fun/Whimsical
- [ ] Other: _______________

**Flavor Preferences:**
- [ ] Vanilla
- [ ] Chocolate
- [ ] Red Velvet
- [ ] Lemon
- [ ] Strawberry
- [ ] Carrot
- [ ] Other: _______________

**Filling Preferences:**
- [ ] Buttercream
- [ ] Cream Cheese Frosting
- [ ] Fruit Preserves
- [ ] Chocolate Ganache
- [ ] Caramel
- [ ] Other: _______________

### Additional Desserts
**Are you interested in additional desserts?**
- [ ] Cupcakes (Quantity: _______)
- [ ] Cookies (Quantity: _______)
- [ ] Mini desserts/petit fours
- [ ] Dessert table setup
- [ ] Other: _______________

## Design & Decoration

**Event Theme:** _______________  
**Color Scheme:** _______________  
**Specific Design Elements:** _______________  
**Inspiration Photos:** (Please attach or describe)

**Special Decorations Needed:**
- [ ] Fresh flowers
- [ ] Custom cake topper
- [ ] Edible images/logos
- [ ] Special lighting
- [ ] Other: _______________

## Dietary Requirements

**Any dietary restrictions or allergies we should know about?**
- [ ] Gluten-free options needed
- [ ] Dairy-free options needed
- [ ] Nut allergies
- [ ] Vegan options needed
- [ ] Sugar-free options needed
- [ ] Other: _______________

## Logistics

**Delivery Preference:**
- [ ] Pickup from bakery
- [ ] Delivery to venue (additional fee may apply)

**Setup Requirements:**
- [ ] Basic delivery only
- [ ] Full setup and styling
- [ ] Coordination with other vendors

**Timeline Preferences:**
**Preferred delivery/setup time:** _______________

## Budget & Additional Information

**Estimated Budget Range:** _______________  
**How did you hear about us?** _______________  
**Previous experience with our bakery?** _______________

**Additional Notes or Special Requests:**
_________________________________________________
_________________________________________________
_________________________________________________

## Contact Preferences

**Best way to reach you:**
- [ ] Email
- [ ] Phone
- [ ] Text message

**Preferred contact times:** _______________

---

Thank you for taking the time to complete this questionnaire! We'll review your responses and contact you within 48 hours to discuss your event in detail and provide a customized proposal.

**Next Steps:**
1. We'll review your questionnaire responses
2. Schedule a consultation call or meeting
3. Provide detailed proposal with pricing
4. Schedule tasting appointment (if desired)
5. Finalize contract and secure your date
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "lead-capture-001",
    title: "Celebration Inquiry Form",
    category: FormCategory.Agreements,
    body: `
**Submitted on:** {{curDate | longDate}}

---

## Contact Information

**Name:** {{client.name}}  
**Email:** _______________  
**Phone:** _______________  
**Preferred Contact Method:** 
- [ ] Email  
- [ ] Phone  
- [ ] Text

## Event Overview

**Event Date:** _______________  
**Event Type:** 
- [ ] Wedding
- [ ] Birthday Party
- [ ] Anniversary
- [ ] Corporate Event
- [ ] Baby Shower
- [ ] Graduation
- [ ] Holiday Party
- [ ] Other: _______________

**Expected Guest Count:** _______________  
**Event Location/Venue:** _______________

## What You're Looking For

**Services Needed:**
- [ ] Custom Cake
- [ ] Wedding Cake
- [ ] Cupcakes
- [ ] Cookies
- [ ] Dessert Table
- [ ] Delivery/Setup
- [ ] Other: _______________

**Estimated Budget:** 
- [ ] Under $100
- [ ] $100 - $250
- [ ] $250 - $500
- [ ] $500 - $1,000
- [ ] $1,000 - $2,500
- [ ] $2,500+
- [ ] Not sure yet

## Additional Details

**Brief description of what you're envisioning:**
_________________________________________________
_________________________________________________

**Any specific dietary requirements?**
- [ ] Gluten-free
- [ ] Dairy-free  
- [ ] Vegan
- [ ] Nut-free
- [ ] Other: _______________

**How did you hear about us?**
- [ ] Google Search
- [ ] Instagram
- [ ] Facebook
- [ ] Friend/Family Referral
- [ ] Wedding Planner
- [ ] Venue Recommendation
- [ ] Previous Customer
- [ ] Other: _______________

**Timeline:**
**When do you need a response by?** _______________

---

## What Happens Next?

1. **Quick Response:** We'll get back to you within 24 hours
2. **Initial Consultation:** Brief phone/email discussion about your needs
3. **Detailed Proposal:** Custom proposal with pricing and options
4. **Booking:** Secure your date with contract and deposit

Thank you for your interest in Sweet Delights Bakery! We're excited to help make your event delicious and memorable.

**Questions?** Feel free to call us at (555) 987-6543 or email orders@sweetdelights.com
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
    {
    id: "lead-capture-002",
    title: "Wedding Inquiry Form",
    category: FormCategory.Proposals,
    body: `
**Submitted on:** {{curDate | longDate}}

---

## Contact Information

**Name:** {{client.name}}  
**Email:** _______________  
**Phone:** _______________  
**Preferred Contact Method:** 
- [ ] Email  
- [ ] Phone  
- [ ] Text

## Wedding Details

**Wedding Date:** _______________  
**Guest Count:** _______________  
**Reception Location/Venue:** _______________

## What You're Looking For

**Services Needed:**
- [ ] Wedding Cake
- [ ] Wedding Cupcakes
- [ ] Custom Cookies
- [ ] Dessert Table
- [ ] Delivery/Setup
- [ ] Other: _______________

**Estimated Budget:** 
- [ ] Under $100
- [ ] $100 - $250
- [ ] $250 - $500
- [ ] $500 - $1,000
- [ ] $1,000 - $2,500
- [ ] $2,500+
- [ ] Not sure yet

## Additional Details

**Brief description of what you're envisioning:**
_________________________________________________
_________________________________________________

**Any specific dietary requirements?**
- [ ] Gluten-free
- [ ] Dairy-free  
- [ ] Vegan
- [ ] Nut-free
- [ ] Other: _______________

**How did you hear about us?**
- [ ] Google Search
- [ ] Instagram
- [ ] Facebook
- [ ] Friend/Family Referral
- [ ] Wedding Planner
- [ ] Venue Recommendation
- [ ] Previous Customer
- [ ] Other: _______________

**Timeline:**
**When do you need a response by?** _______________

---

## What Happens Next?

1. **Quick Response:** We'll get back to you within 24 hours
2. **Initial Consultation:** Brief phone/email discussion about your needs
3. **Detailed Proposal:** Custom proposal with pricing and options
4. **Tasting & Design:** Schedule tasting and finalize design details
5. **Booking:** Secure your date with contract and deposit

Thank you for your interest in Sweet Delights Bakery! We're excited to help make your event delicious and memorable.

**Questions?** Feel free to call us at (555) 987-6543 or email orders@sweetdelights.com
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const formTemplatesMock = mockForms;  // Now safe to export since mockForms is already declared