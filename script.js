document.addEventListener("DOMContentLoaded", function () {

let imageFile = null;
let paymentFile = null;

// Elements (SAFE references)
const imageUpload = document.getElementById("imageUpload");
const previewSection = document.getElementById("previewSection");
const previewOutput = document.getElementById("previewOutput");
const paymentSection = document.getElementById("paymentSection");
const paymentProof = document.getElementById("paymentProof");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

// -------------------- IMAGE UPLOAD --------------------
imageUpload.addEventListener("change", function () {

    imageFile = this.files[0];

    if (!imageFile) return;

    showPreview();

    if (paymentSection) {
        paymentSection.classList.remove("hidden");
    }
});

// -------------------- PREVIEW --------------------
function showPreview() {

    if (previewSection) {
        previewSection.classList.remove("hidden");
    }

    if (previewOutput) {
        previewOutput.innerHTML = `
            <h3>Basic Analysis</h3>
            <ul>
                <li><b>Undertone:</b> Neutral Warm</li>
                <li><b>Season:</b> Soft Autumn</li>
                <li><b>Contrast:</b> Medium Low</li>
            </ul>

            <div style="display:flex;gap:10px;margin-top:10px;">
                <div style="width:40px;height:40px;background:#d4a373;border-radius:6px;"></div>
                <div style="width:40px;height:40px;background:#b5838d;border-radius:6px;"></div>
                <div style="width:40px;height:40px;background:#6b705c;border-radius:6px;"></div>
            </div>
        `;
    }
}

// -------------------- PAYMENT PROOF --------------------
paymentProof.addEventListener("change", function () {

    paymentFile = this.files[0];

    if (paymentFile) {
        analyzeBtn.disabled = false;

        if (result) {
            result.innerHTML = "<p>✔ Ready to generate report</p>";
        }
    }
});

// -------------------- GENERATE REPORT --------------------
analyzeBtn.addEventListener("click", function () {

    if (!imageFile || !paymentFile) {
        alert("Please complete all steps.");
        return;
    }

    result.innerHTML = "<p>Generating report...</p>";

    setTimeout(generatePDF, 1000);
});

// -------------------- PDF --------------------
function generatePDF() {

    const content = `
PREMIUM COLOUR ANALYSIS REPORT

Undertone: Neutral Warm
Season: Soft Autumn

Palette:
- Olive, Camel, Dusty Rose
- Soft Teal, Cocoa

Makeup:
- Warm nude lips
- Soft bronze eyes

Hair:
- Warm brown tones

Accessories:
- Gold & rose gold
`;

    const blob = new Blob([content], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Colour_Report.pdf";
    link.click();

    result.innerHTML = "<p>✔ Download complete</p>";
}

});
