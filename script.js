document.addEventListener("DOMContentLoaded", function () {

let imageFile = null;
let paymentFile = null;

const imageUpload = document.getElementById("imageUpload");
const previewSection = document.getElementById("previewSection");
const previewOutput = document.getElementById("previewOutput");
const paymentSection = document.getElementById("paymentSection");
const paymentProof = document.getElementById("paymentProof");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

// IMAGE UPLOAD
imageUpload.addEventListener("change", function () {

    imageFile = this.files[0];
    if (!imageFile) return;

    previewSection.classList.remove("hidden");
    paymentSection.classList.remove("hidden");

    previewOutput.innerHTML = `
        <h3>Basic Analysis</h3>
        <ul>
            <li><b>Undertone:</b> Neutral Warm</li>
            <li><b>Season:</b> Soft Autumn</li>
            <li><b>Contrast:</b> Medium Low</li>
        </ul>

        <p style="margin-top:10px;">🔒 Full report includes palette, styling & guide</p>
    `;
});

// PAYMENT PROOF
paymentProof.addEventListener("change", function () {

    paymentFile = this.files[0];

    if (paymentFile) {
        analyzeBtn.disabled = false;
        result.innerHTML = "<p>✔ Ready to generate report</p>";
    }
});

// GENERATE REPORT
analyzeBtn.addEventListener("click", function () {

    if (!imageFile || !paymentFile) {
        alert("Please complete all steps.");
        return;
    }

    result.innerHTML = "<p>Generating full report...</p>";

    setTimeout(generatePDF, 800);
});

// ✅ REAL PDF (FULL REPORT)
function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // PAGE 1
    doc.setFontSize(18);
    doc.text("PREMIUM COLOUR ANALYSIS REPORT", 10, 20);

    doc.setFontSize(12);

    doc.text("Undertone: Neutral Warm", 10, 40);
    doc.text("Season: Soft Autumn", 10, 50);
    doc.text("Contrast Level: Medium Low", 10, 60);

    doc.text("Recommended Palette:", 10, 80);
    doc.text("- Olive Green", 10, 90);
    doc.text("- Camel Beige", 10, 100);
    doc.text("- Dusty Rose", 10, 110);
    doc.text("- Soft Teal", 10, 120);
    doc.text("- Cocoa Brown", 10, 130);

    doc.text("Makeup Recommendations:", 10, 150);
    doc.text("- Warm nude lipstick", 10, 160);
    doc.text("- Peach / bronze blush", 10, 170);
    doc.text("- Soft brown eyeliner", 10, 180);

    doc.text("Hair Colour Suggestions:", 10, 200);
    doc.text("- Warm brown", 10, 210);
    doc.text("- Chestnut", 10, 220);

    // PAGE 2
    doc.addPage();

    doc.setFontSize(16);
    doc.text("Styling Guide", 10, 20);

    doc.setFontSize(12);

    doc.text("Best Clothing Colours:", 10, 40);
    doc.text("- Earth tones", 10, 50);
    doc.text("- Muted warm shades", 10, 60);

    doc.text("Avoid:", 10, 80);
    doc.text("- Neon colours", 10, 90);
    doc.text("- Cool icy tones", 10, 100);

    doc.text("Accessories:", 10, 120);
    doc.text("- Gold jewellery", 10, 130);
    doc.text("- Rose gold", 10, 140);

    doc.save("Premium_Colour_Report.pdf");

    result.innerHTML = "<p>✔ Report downloaded successfully</p>";
}

});
