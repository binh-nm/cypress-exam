export function checkItems(testDataValue: string) {
    const selector = `div[data-deal-id=${testDataValue}]`;
    cy.get(selector).should('be.visible');
}