export function assertHeaderIsRendered() {
	// Social links
	cy.get("[data-testid=social-links] a")
		.should("have.length", 3)
		.and("be.visible");

	// Logo
	cy.get("[data-testid=logo] svg").should("have.length", 1).and("be.visible");
	cy.get("[data-testid=logo] a").should("have.attr", "href", "/");

	// Menu
	cy.get("[data-testid=menu] a").should("have.length", 4);
	cy.get("[data-testid=menu]")
		.contains("Nabídnout pomoc")
		.should("have.attr", "href", "/nabidka")
		.and("have.class", "bg-blue-600")
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
}

export function assertFooterIsRendered() {
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
}
