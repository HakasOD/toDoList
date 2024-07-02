function createImgFromUrl(url){
    const img = new Image();
    img.src = url;

    return img;
}

export default createImgFromUrl;