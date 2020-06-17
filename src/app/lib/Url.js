
class UrlLib {
    getFullUrl(req) {
        const url = req.protocol + '://' + req.get('host');
        return url;
    }
}


module.exports = new UrlLib();
