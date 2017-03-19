let inputOrganiser = function (args, pipe) {
    args = args
        .map((arg) => {
            if (arg instanceof Function) {
                return arg;
            } else if (Array.isArray(arg)) {
                return pipe.apply(null, arg);
            }
        })
        .filter((it) => !!it);
    return args;
};

const pipe = (...args) => {
    args = inputOrganiser(args, pipe);

    return (input) => {
        return args.reduce((context, fn) => {
            fn = fn instanceof Function ? fn : (result) => result;
            return fn(context);
        }, input);
    };
};

const promisePipe = (...args) => {
    args = inputOrganiser(args, promisePipe);

    return (input) => {
        return Promise.resolve()
            .then(() => {
                return args.reduce((context, fn) => {
                    fn = fn instanceof Function ? fn : (result) => result;

                    return Promise.resolve()
                        .then(() => context)
                        .then((value) => fn(value));
                }, Promise.resolve(input))
            });
    };
};

module.exports = {pipe, promisePipe};