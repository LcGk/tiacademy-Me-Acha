import { handleFindCEPSubmit } from "./util.js";

window.onload = () => {
    document.getElementById("cep-form").onsubmit = handleFindCEPSubmit;
}