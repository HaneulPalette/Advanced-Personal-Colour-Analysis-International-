let imageFile = null;
let paymentFile = null;

// Step 1: Image upload → show preview + payment section
document.getElementById("imageUpload").addEventListener("change", function () {
    imageFile = this.files[0];
    if (imageFile) {
        showPreview();
        document.getElementById("paymentSection").classList.remove("hidden");
    }
});

function showPreview() {
    const previewSection = document.getElementById("previewSection");
    const previewOutput = document.getElementById("previewOutput");
    previewSection.classList.remove("hidden");

    previewOutput.innerHTML = `
        <h3>Personal Tone Preview</h3>
        <ul>
            <li><b>Undertone:</b> Neutral leaning Warm</li>
            <li><b>Temperature Type:</b> Soft Warm</li>
            <li><b>Season Suggestion:</b> Soft Autumn</li>
        </ul>

        <h4>Sample Palette</h4>
        <div style="display:flex;gap:10px;margin-top:10px;">
            <div style="width:40px;height:40px;background:#d4a373;border-radius:6px;"></div>
            <div style="width:40px;height:40px;background:#b5838d;border-radius:6px;"></div>
            <div style="width:40px;height:40px;background:#6b705c;border-radius:6px;"></div>
        </div>
    `;
}

// Step 2: Payment proof upload → enable button
document.getElementById("paymentProof").addEventListener("change", function () {
    paymentFile = this.files[0];
    if (paymentFile) {
        document.getElementById("analyzeBtn").disabled = false;
        document.getElementById("result").innerHTML =
            "<p>✔ Payment received (manual verification via form). Ready to generate report.</p>";
    }
});

// Step 3: Generate PDF
document.getElementById("analyzeBtn").addEventListener("click", function () {
    if (!imageFile || !paymentFile) {
        alert("Please upload photo and payment proof.");
        return;
    }

    document.getElementById("result").innerHTML =
        "<p>Generating your premium report...</p>";

    setTimeout(() => generatePDF(), 1200);
});

function generatePDF() {
    const pdfName = "Premium_Colour_Analysis_Report.pdf";

    const content = `
--- PREMIUM COLOUR ANALYSIS REPORT ($19.99) ---

PAGE 1: UNDERTONE ANALYSIS
• Neutral Warm Balance
• Soft seasonal influence
• Medium contrast profile

PAGE 2: SEASON RESULT
Primary: Soft Autumn
Secondary: Warm Autumn traits

PAGE 3: COLOR PALETTE
• Olive, Camel, Warm Beige
• Dusty Rose, Muted Coral
• Soft Teal, Cocoa tones

PAGE 4: OUTFIT GUIDELINES
• Daily wear palette
• Office styling tones
• Occasion styling combinations

PAGE 5: MAKEUP GUIDE
• Lips: Warm nude, rose brown
• Blush: Peach coral
• Eyes: Bronze, soft brown

PAGE 6: HAIR RECOMMENDATIONS
• Warm brown
• Chestnut tones
• Golden black variations

PAGE 7: ACCESSORIES
• Gold & rose gold metals
• Warm tone glasses
• Soft neutral bags

PAGE 8: DIGITAL SWATCH CARD
• Mobile-friendly palette guide
• HEX reference colors
`;

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = pdfName;
    link.click();

    document.getElementById("result").innerHTML =
        "<p>✔ Premium report downloaded successfully!</p>";
}
