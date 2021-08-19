export default (func, limit) => {
  let promiseResolve, promiseReject;
  const promise = new Promise(function (resolve, reject) {
    promiseResolve = resolve;
    promiseReject = reject;
  });

  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      promiseResolve();
      lastRan = Date.now();
      console.log("1", lastRan);
    } else {
      clearTimeout(lastFunc);
      const delay = Math.max(limit - (Date.now() - lastRan), 0);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          console.log("3");
          promiseResolve();
          lastRan = Date.now();
        }
      }, delay);
      console.log("2", delay);
    }
    return promise;
  };
};
