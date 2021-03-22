async function formHandler(outputDivID) {
    let outputDiv = document.getElementById(outputDivID);
    let email = document.getElementById("emailForm1").value;
    let address = document.getElementById("addressForm1").value;
    let city = document.getElementById("cityForm1").value;
    let zip = document.getElementById("zipForm1").value;
    let country = document.getElementById("countryForm1").value;
    let news = document.getElementById("newsForm1").checked;
    if (news) {
        var newsOut = "Ja tack!";
    } else {
        var newsOut = "Nej tack";
    }
    let passwd_hash = await sha256(document.getElementById("passwordForm1").value);
    // console.log(email, passwd_hash, address, city, zip, country, news);
    let outputData = `
    <div class="alert alert-primary" role="alert">
        <ul>
            <li>E-post: ${email}</li>
            <li>Lösenord SHA256 hash: ${passwd_hash}</li>
            <li>Gatuadress: ${address}</li>
            <li>Land: ${city}</li>
            <li>Postnummer: ${zip}</li>
            <li>Land: ${country}</li>
            <li>Nyhetsbrev: ${newsOut}</li>
            
        </ul>
    </div>`;
    outputDiv.innerHTML = outputData;
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join("");
    return hashHex;
}
