Feature: Amazon exam

    Scenario: User visit Amazon web page then search for an item

      Given User visits the Amazon home page
      When User searches for an item by using "basketball"
      Then Find then open "Spalding Unisex's Chicago Bulls Basketball, Black/Red, Size 7" in item list
      And Expect item price to be within "10" and "20"

      When User adds the item to basket
      Then Verify a control appears with "Added to Basket" label

    Scenario: User visit Today’s Deals page and check items in the list

      Given User navigates to 'Today’s Deals' page
      Then Expect items with value of test case "deals" to exist
    
    Scenario: User open Currency settings page then change currency

      Given User opens the Hambergur menu
      And User opens "Currency Settings" sub menu
      When User changes currency to "USD"
      Then Expect the Note text is changed accordingly


    


