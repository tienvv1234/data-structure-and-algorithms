app.use(compression({
    level: 6, // recommend 6
    threshold: 1024 * 100, // recommend 10kb
    filter: function (req, res) {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        }
        // fallback to standard filter function
        return compression.filter(req, res)
    }
}))