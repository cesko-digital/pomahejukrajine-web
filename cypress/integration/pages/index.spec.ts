/// <reference types="cypress" />

describe("Home Page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	it("displays header correctly", () => {
		// Logo
		cy.get("[data-testid=logo] svg").should("have.length", 1).and("be.visible");
		cy.get("[data-testid=logo] a").should("have.attr", "href", "/");

		// Menu
		cy.get("[data-testid=menu] a").should("have.length", 4);
		cy.get("[data-testid=menu]")
			.contains("Nabídnout pomoc")
			.should("have.attr", "href", "/nabidka")
			.and("have.class", "bg-blue-600") /* active style applied */
			.and("have.class", "text-white")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Nabídky pomoci")
			.should("have.attr", "href", "/nabidky")
			.and("have.class", "bg-blue-50")
			.and("have.class", "text-blue-600")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Často kladené otázky")
			.should("have.attr", "href", "/faq")
			.and("have.class", "bg-blue-50")
			.and("have.class", "text-blue-600")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Můj profil")
			.should("have.attr", "href", "/moje-nabidky")
			.and("have.class", "bg-blue-50")
			.and("have.class", "text-blue-600")
			.and("be.visible");
	});

	it("displays footer correctly", () => {
		cy.get("footer")
			.contains("Nabídnout pomoc")
			.should("have.attr", "href", "/nabidka")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Nabídky pomoci")
			.should("have.attr", "href", "/nabidky")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Často kladené otázky")
			.should("have.attr", "href", "/faq")
			.and("be.visible");
		cy.get("[data-testid=menu]")
			.contains("Můj profil")
			.should("have.attr", "href", "/moje-nabidky")
			.and("be.visible");
	});

	it("displays the content correctly", () => {
		cy.get("[data-testid=page-home]")
			.contains("Vyplňte prosím formulář a domluvíme se")
			.should(
				"have.attr",
				"href",
				"https://docs.google.com/forms/d/1YmKGhZgUAlq1zNBmBKHQeToaOpl41fCcXXA1uLCBGSk/viewform?edit_requested=true"
			)
			.and("have.attr", "target", "_blank")
			.and("be.visible");

		cy.get("[data-testid=page-home]")
			.contains("pomahejukrajine@migracnikonsorcium.cz")
			.should(
				"have.attr",
				"href",
				"mailto:pomahejukrajine@migracnikonsorcium.cz?subject=PomáhejUkrajině"
			)
			.and("be.visible");

		cy.get("[data-testid=page-home]")
			.contains("Nabídnout pomoc")
			.should("have.attr", "href", "/nabidka")
			.and("have.class", "bg-blue-600") /* active style applied */
			.and("have.class", "text-white")
			.and("be.visible");

		cy.get("[data-testid=page-home]")
			.contains("Nabídky pomoci")
			.should("have.attr", "href", "/nabidky")
			.and("have.class", "bg-blue-50")
			.and("have.class", "text-blue-600")
			.and("be.visible");
	});
});
