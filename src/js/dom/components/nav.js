import createImgFromUrl from "../assetManager";

import iconSunSrc from "../../../assets/images/icons/light-mode-sun.svg";
import iconMoonSrc from "../../../assets/images/icons/dark-mode-moon.svg";
import iconQuestionMarkSrc from "../../../assets/images/icons/question-mark.svg";

function loadNavImages(){
    loadRightNavImages();
}

function loadThemeToggleImages(){
    const themeToggleDiv = document.querySelector(".theme-toggle");

    const iconSun = createImgFromUrl(iconSunSrc);
    const iconMoon = createImgFromUrl(iconMoonSrc);
   
    iconSun.classList.add("light-mode");
    iconMoon.classList.add("dark-mode");


    themeToggleDiv.appendChild(iconSun);
    themeToggleDiv.appendChild(iconMoon);
}

function loadRightNavImages(){
    const rightNavDiv = document.querySelector(".right");

    const iconQuestionMark = createImgFromUrl(iconQuestionMarkSrc);
    
    iconQuestionMark.classList.add("help");

    rightNavDiv.appendChild(iconQuestionMark);   

    loadThemeToggleImages();
}



export default loadNavImages;