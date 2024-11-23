const inputLot = document.getElementById("id_inputLot");
const outputLot = document.getElementById("id_outputLot");
const mmOutput = document.getElementById("id_mmOutput");
const lotTableBody = document.querySelector("#lotTable tbody");


function updateTable(portfolioAmount) {
    lotTableBody.innerHTML = ""; 

    
    const minLot = 0.01; 
    const minPortfolioPerLot = 100; 

    
    if (portfolioAmount >= 100) { // Removed the upper limit condition
        const maxLots = Math.floor(portfolioAmount / minPortfolioPerLot); 
        const lotSizePerTrade = (minLot * maxLots).toFixed(2); 

        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${portfolioAmount}</td>
            <td>${minLot.toFixed(2)}</td>
            <td>${maxLots}</td>
            <td>${lotSizePerTrade}</td>
        `;
        lotTableBody.appendChild(row);

        
        outputLot.textContent = `Lot Size ต่อไม้: ${minLot.toFixed(2)} Lot`;
        outputLot.style.color = "green";
        mmOutput.textContent = `พอร์ต $${portfolioAmount} สามารถออกได้ทั้งหมด ${maxLots} ไม้ รวม Lot ทั้งหมด: ${lotSizePerTrade} Lot`;
        mmOutput.style.color = "blue";
    } else {
        outputLot.textContent = "";
        mmOutput.textContent = "";
    }
}


inputLot.addEventListener("input", () => {
    const portfolioAmount = parseFloat(inputLot.value);

    if (portfolioAmount < 100) {
        outputLot.textContent = "พอร์ตต้องมีอย่างน้อย $100";
        outputLot.style.color = "red";
        mmOutput.textContent = "";
    } else {
        updateTable(portfolioAmount); 
    }
});


window.onload = () => {
    updateTable(100);  // เริ่มต้นที่พอร์ต $100
};