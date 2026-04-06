async function checkNews(){

    const text = document.getElementById("newsText").value;

    const response = await fetch("http://localhost:5000/check-news",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({news:text})
    });

    const data = await response.json();

    document.getElementById("result").innerText =
        "Prediction: " + data.prediction +
        " | Confidence: " + data.confidence + "%";
}