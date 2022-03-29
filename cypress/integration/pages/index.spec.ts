/// <reference types="cypress" />

import { assertFooterIsRendered, assertHeaderIsRendered } from "./shared";

describe("Home Page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	it("displays header correctly", () => {
		assertHeaderIsRendered();
	});

	it("displays footer correctly", () => {
		assertFooterIsRendered();
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
			.and("have.class", "bg-blue-600")
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
