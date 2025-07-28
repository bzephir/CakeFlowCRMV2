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

3.    Payment Terms:
a.    Wedding cake orders require a non-refundable deposit of 20% to secure your wedding date. The deposit is due upon signing this contract. This does not apply to short notice orders placed within one month of the wedding date.
Deposits are NON-REFUNDABLE and it is our discretion if we offer a refund. In the event we need to cancel your order, any deposits paid will be FULLY REFUNDED.
b.    Final Payment: The remaining balance is due no later than 30 days before the wedding date.
c.     Payment Methods: Payments can be made via Credit Card, Debit Card, ACH, Cash or Check, as specified by the Bakery.

4.    Non-Payment:
a.    If full payment for your wedding cake is not received 30 days prior to the delivery/set-up date and no further contact is made, it is assumed that the cake has been cancelled.

5.    Changes:
a.    Changes: Any changes to the design, flavors, or size of the wedding cake must be made in writing and agreed upon by both parties.
b.    Your final payment date is the last day for any changes of size, style or flavors. We will try to accommodate any changes when and where possible. We cannot guarantee to do so. Any changes made to your original design are subject to a change in price. Included are supplies that may no longer be needed but have already been purchased. Please note we are unable to make any changes within four weeks of the wedding date.
c.     Change of Event Date: If you need to re-arrange your event date, we will try to accommodate at no additional charge; provided sufficient notice is given and we have availability for the new date. If we are not available, it may not be possible to refund your deposit. Please bear this in mind when ordering.

6.    Cancellation:
a.    Cancellation Timeline:
                                       i.     Cancellation more than 90 days prior to the wedding date: The deposit will be forfeited, and no further payment will be required. 
                                       ii.     Cancellation within 30 days of the wedding date: The full payment will be required.
b.    Refunds:
                                       i.     In the event of cancellation within 90 days of the wedding date, the Client may be eligible for a partial refund based on the following phased return policy: 
1.    Cancellation 180-90 days prior to the wedding date: 75% of the total payment will be refunded. This does not include the deposit which is non-refundable.
2.    Cancellation 365 - 180 days prior to the wedding date: 100% of the total payment will be refunded. This does not include the deposit which is non-refundable.
c.     Refund Process: Any eligible refunds will be processed within 30 days of the cancellation request, using the original payment method.

7.    Liability:
a.    The Bakery shall not be held liable for any damages to the wedding cake after setup is complete.
b.    The Bakery shall not be held liable for any allergic reactions resulting from the consumption of the wedding cake. Please be aware that while your cake may not be made with common allergens, it will have been prepared in a kitchen where milk, wheat, nuts, soy, and other allergens products may be used in other cakes and fillings. In the event you have not specifically ordered an allergen free product please be advised that our products may contain or come into contact with milk, wheat, nuts, soy, and other allergens. You agree to notify your guests of this risk and hold us harmless for allergic reactions.
c.     Fresh Flowers - We can supply fresh flowers for your cake, or your florist can do so. You acknowledge that fresh flowers are not a food product, and may contain pesticides, insects, dirt, or other contaminants. Please note that some flowers are not suitable for use on cakes. It is your responsibility to ensure that the flowers you choose are safe to come into contact with food.

8.    Weather:
a.    Heat and humidity can adversely affect your cake. It is strongly advised that the cake be kept in an air-conditioned area. You understand that we are not responsible for any damage that may occur due to weather conditions.

9.    Photography:  
a.    The Client agrees to allow the Bakery to use photographs of the wedding cake for promotional purposes, including but not limited to, the Bakery's website, social media, and marketing materials.

10. Governing Law:
a.    This contract shall be governed by the laws of the State of Florida, and any disputes arising out of this contract shall be resolved through arbitration in Tampa, FL.

---

{{job.invoice.title}}

{{job.invoice | packageItems:true}}

{{job.invoice | total}}

---

{{paymentSchedule | paymentScheduleFilter}}

---
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // You can add more form templates here...
];
