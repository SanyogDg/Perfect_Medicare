export const catchAsyncErrors = (inputFunction) => {
    return ((req, res, next) => {
        Promise.resolve(inputFunction(req, res, next)).catch(next);
    })
}