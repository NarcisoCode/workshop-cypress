/// <reference types="cypress" />
describe('saucedemo', () => {
	before(() => {
		cy.visit('https://www.saucedemo.com/')
	})
	it('Login en ​saucedemocon el usuario estandar', () => {
		cy.get('#user-name').type('standard_user')
		cy.get('#password').type('secret_sauce')
		cy.get('#login-button').click()
	})
	it("Agregar al carrito el productos 'Sauce Labs Backpack'", () => {
		cy.xpath(
			"//div[@class='inventory_item_name'][.='Sauce Labs Backpack']/../../../div[@class='pricebar']/button[.='ADD TO CART']"
		).click()
	})
	it("Agregar al carrito el productos 'Sauce Labs Fleece Jacket'", () => {
		cy.xpath(
			"//div[@class='inventory_item_name'][.='Sauce Labs Fleece Jacket']/../../../div[@class='pricebar']/button[.='ADD TO CART']"
		).click()
	})
	it('Ir al carrito', () => {
		cy.get('.shopping_cart_link').click()
	})
	it('Verificar los productos en la lista del carrito', () => {
		cy.xpath("//div[@class='inventory_item_name']")
			.first()
			.should('contain.text', 'Sauce Labs Backpack')
		cy.xpath("//div[@class='inventory_item_name']")
			.last()
			.should('contain.text', 'Sauce Labs Fleece Jacket')
	})
	it('Remover el último producto del carrito', () => {
		cy.xpath("//button[.='REMOVE']").last().click()
	})
	it('Click en el botón checkout​', () => {
		cy.xpath("//a[.='CHECKOUT']").click()
	})
	it('Llenar la información basica y click en continuar​', () => {
		cy.get('#first-name').type('Sander')
		cy.get('#last-name').type('Pacheco')
		cy.xpath("//input[@value='CONTINUE']").click()
	})
	it('Verificar el mensaje de error', () => {
		cy.xpath("//*[@id='checkout_info_container']//form/h3").should(
			'contain.text',
			'Error: Postal Code is required'
		)
	})
	it('Llenar el código postal y dar click en ​ continuar', () => {
		cy.get('input#postal-code').type('505')
		cy.xpath("//input[@value='CONTINUE']").click()
	})
	it('Click en finalizar', () => {
		cy.xpath("//a[.='FINISH']").click()
	})
	it('Verificamos el mensaje de éxito al finalizar la compra', () => {
		cy.get('.complete-header').should(
			'contain.text',
			'THANK YOU FOR YOUR ORDER'
		)
	})
})
