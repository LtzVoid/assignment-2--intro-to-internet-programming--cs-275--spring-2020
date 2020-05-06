
let riceW = document.getElementById(`whiteRice`);
let riceC = document.getElementById(`californiaRice`);
let buttonW = document.getElementById(`button`);
let textbox = document.getElementById(`input`);
let ratio = document.getElementById(`ratio`);
let waterW = textbox.value * 2;//8 oz of rice to 16oz of water

textbox.addEventListener(`input`, function a() {
    textbox = document.getElementById(`input`);
    ratio.innerHTML = (waterW +` Ounces of Water needed`);
});

buttonW.addEventListener(`click`, function() {
    if (riceW.style.display === `block`) {
        riceW.style.display = `none`;
        riceC.style.display = `block`;
    }
    else {
        riceC.style.display = `none`;
        riceW.style.display = `block`;
    }
});
