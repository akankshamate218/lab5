
document.getElementById("tipForm").addEventListener("input", calculateTotals);
document.getElementById("currencySelect").addEventListener("change", calculateTotals);

// Conversion rates for the dropdown
// USD uses a rate of 1.0, so effectively no conversion
const conversionRates = {
  "USD": 1.00,
  "INR": 85,    // Example: 1 USD = 85 INR
  "EUR": 0.95,  // Example: 1 USD = 0.95 EUR
};

function calculateTotals() {
  const billInput  = document.getElementById("billTotal");
  const tipSlider  = document.getElementById("tipSlider");
  const tipPercent = document.getElementById("tipPercentage");

  const totalWithTax       = document.getElementById("totalWithTax");
  const tipAmountField     = document.getElementById("tipAmount");
  const totalWithTipTax    = document.getElementById("totalWithTipTax");

  const convertedTipAmountField    = document.getElementById("convertedTipAmount");
  const convertedTotalWithTipTax   = document.getElementById("convertedTotalWithTipTax");

  const currencySelect = document.getElementById("currencySelect");
  const errorMsg       = document.getElementById("errorMsg");

  // Parse user inputs
  const billValue = parseFloat(billInput.value);
  const tipValue  = parseInt(tipSlider.value, 10);

  // Display the tip slider percentage
  tipPercent.value = `${tipValue}%`;

  // Basic validation on billValue
  if (isNaN(billValue) || billValue < 0) {
    errorMsg.textContent = "⚠️ Please enter a valid, non-negative number for the bill.";
    errorMsg.style.display = "block";
    clearOutputs();
    return;
  } else {
    errorMsg.style.display = "none";
  }

  // If bill is zero, clear outputs
  if (billValue === 0) {
    clearOutputs();
    return;
  }

  // 1) Calculate the tax = 11% of the base bill
  const tax = billValue * 0.11;
  // 2) Total with Tax
  const totalTaxed = billValue + tax;
  // 3) Tip is on (bill + tax)
  const tipAmount = totalTaxed * (tipValue / 100);
  // 4) Final total with tip & tax
  const finalTotal = totalTaxed + tipAmount;

  // Update the USD fields with two decimals
  totalWithTax.value    = totalTaxed.toFixed(2);
  tipAmountField.value  = tipAmount.toFixed(2);
  totalWithTipTax.value = finalTotal.toFixed(2);

  // Determine if there's a selected currency
  const selectedCurrency = currencySelect.value; // "USD", "INR", "EUR" or ""
  if (!selectedCurrency) {
    // No currency selected => clear conversion outputs
    convertedTipAmountField.value    = "";
    convertedTotalWithTipTax.value   = "";
    return;
  }

  // Convert tip and total
  const rate = conversionRates[selectedCurrency];
  // If the user picked "USD", rate=1 => same amounts
  const convertedTip    = tipAmount * rate;
  const convertedTotal  = finalTotal * rate;

  // Fill in the converted fields
  convertedTipAmountField.value    = convertedTip.toFixed(2);
  convertedTotalWithTipTax.value   = convertedTotal.toFixed(2);

  // Helper function to reset if there's an error or bill=0
  function clearOutputs() {
    totalWithTax.value            = "";
    tipAmountField.value          = "";
    totalWithTipTax.value         = "";
    convertedTipAmountField.value = "";
    convertedTotalWithTipTax.value = "";
  }
}
