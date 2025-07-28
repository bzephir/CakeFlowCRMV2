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
  // more form templates...
];

export const formTemplatesMock = mockForms;  // Now safe to export since mockForms is already declared
