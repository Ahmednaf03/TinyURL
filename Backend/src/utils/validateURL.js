let isValidURL = (url) =>{
    try {
        new URL(url);
        return true;
    } catch (error) {
        console.log("URL invalid");
        return false;
        
    }
}

module.exports = isValidURL;