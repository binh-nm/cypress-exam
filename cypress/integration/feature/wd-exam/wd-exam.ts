import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { contains } from 'cypress/types/jquery';
import { baseUrl } from '../../../constants';
import { data } from '../../../fixtures/items.json'
import { checkItems} from '../../../utils'

Given(
    'User visits the Amazon home page', () => {
        cy.visit(`${baseUrl}`);
        //accept page cookie
        cy.get("form[id='sp-cc']")
        .within(() => {
            cy.get("input[id='sp-cc-accept']")
            .click({force:true});
        })
    }
);
//Type in the search box then click search button
When(
    'User searches for an item by using {string}', (item: string) => {
        cy.get("form[name='site-search']")
        .should('be.visible')
        .within(() => {
            cy.get("input[id='twotabsearchtextbox']")
            .click()
            .type(item, {force:true});
        })
        cy.get("input[id='nav-search-submit-button']")
        .should('be.visible')
        .click();
    }
);
//Find the item and open it
Then(
    'Find then open {string} in item list', (name: string) => {
        cy.get("span[class^='a-size-base-plus']")
        .contains(name)
        .should('be.visible')
        .click();
    }
);
//Check the item's price is between input value
And(
    'Expect item price to be within {string} and {string}', (below: any, above: any) => {
        const min = parseInt(below);
        const max = parseInt(above);
        cy.get("td[class='a-span12']")
        .should('be.visible')
        .within(() =>{
            cy.get("span[class='a-offscreen']")
            .invoke('text')
            .then(price => +price.replace('£', '').trim())
            .should('be.within',min,max)
        })    
    }
);
//Add the item to cart
When(
    'User adds the item to basket', () => {
        cy.get("input[id='add-to-cart-button']")
        .should('be.visible')
        .click();
    }
);

Then(
    'Verify a control appears with {string} label', (label: string) => {
        cy.get("#huc-v2-order-row-with-divider")
        .should('be.visible')
        .within(() => {
            cy.get("h1")
            .should('contain.text',label);
        })
    }
);
//Navigate to Today's Deals page
Given(
    'User navigates to {string} page', (page: string) => {
        cy.get("div[id='nav-subnav']")
        .should('be.visible')
        .within(() => {
            cy.get('[href="/gp/deals/?ie=UTF8&ref_=sv_uk_1"]')
            .should('be.visible')
            .click({timeout: 5000});
        })       
    }
);
//Check the visibility of items in the list
Then(
    'Expect items with value of test case {string} to exist',
    (testCase: string) => {
        const values: string[] = Object.values(data[testCase]);
        for (let index: number = 0; index < values.length; index += 1) {
          checkItems(values[index]);
        }
    }    
);
//Go to Currency Settings page then change currency to USD
Given(
    'User opens the Hambergur menu', () => {
        cy.get('.hm-icon')
        .should('be.visible')
        .click({timeout:3000})
    }
);

And(
    'User opens {string} sub menu', (submenu: string) => {
        cy.get("ul[data-menu-id='1']")
        .should('be.visible')
        .within(() => {
            cy.get("a[class='hmenu-item']")
            .contains(submenu)
            .click();
        })
});

When(
    'User changes currency to {string}', (currency: string) => {
        cy.get("select[name='COP']")
        .should('be.visible')
        .select(currency, {force:true});
});

Then(
    'Expect the Note text is changed accordingly', () => {
        cy.get("span[id='icp-sc-note']")
        .should('contain.text','Note: You will be shown prices in US$')
    }
);



