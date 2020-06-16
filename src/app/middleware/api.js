module.exports =  (req, res, next) => {
    const { "api-key": apiKey } = req.headers;

    if (!apiKey || apiKey !== process.env.API_KEY) return res.status(403).json({ message: 'Forbidden Access' });

    next();
}