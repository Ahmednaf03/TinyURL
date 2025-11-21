let isValidURL = (url) =>{
    try {
        new URL(str);
        return true;
    } catch (error) {
        console.log("URL invalid");
        return false;
        
    }
}

module.exports = isValidURL;