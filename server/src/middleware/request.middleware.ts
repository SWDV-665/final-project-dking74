export const queryParamParser = (req, res, next) => {
    req.query = Object.entries(req.query).reduce((prev, curr: [string, any]) => {
        // Convert boolean values properly
        if (curr[1] === 'true') {
            prev[curr[0]] = true;
        } else if (curr[1] === 'false') {
            prev[curr[0]] = false;

        // Save all other values as is -- checking for numbers first
        } else {
            const integerValue = parseInt(curr[1]);
            const isInteger = !isNaN(integerValue);
            prev[curr[0]] = isInteger ? integerValue : curr[1];
        }

        return prev;
    }, {});

    next();
};

export default queryParamParser;