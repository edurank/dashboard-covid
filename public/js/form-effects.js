const fieldFocus = document.querySelectorAll("[required]");

for (let i = 0; i < fieldFocus.length; i++) {

    
    fieldFocus[i].addEventListener("focus", () => {
        fieldFocus[i].classList.add("focus");
    }); 

    fieldFocus[i].addEventListener("blur", () => {
        if (fieldFocus[i].value == "") {
            fieldFocus[i].classList.remove("focus");
        }
    })

    const eyeShow = document.getElementById('eye-show');
    const eyeHidden = document.getElementById("eye-hidden");

    eyeShow.addEventListener("click", () => {
        eyeShow.style.display = 'none';
        eyeHidden.style.display = 'block'
        fieldFocus[1].type = 'text';
    });

    eyeHidden.addEventListener("click", () => {
        eyeShow.style.display = 'block';
        eyeHidden.style.display = 'none';
        fieldFocus[1].type = 'password';
    });
}