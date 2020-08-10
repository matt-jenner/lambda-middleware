import { Instance, MiddlewareFunction } from "../interfaces/MiddyTypes";
import { isPromise } from "../utils/isPromise";

export function promisifyMiddyMiddlewareFunction(
  fn: MiddlewareFunction<unknown, unknown>
) {
  return (instance: Instance) => {
    return new Promise((resolve, reject) => {
      function next(err: unknown): void {
        if (err) {
          return reject(err);
        }
        return resolve();
      }

      const result = fn(instance, next);
      if (isPromise(result)) {
        result.then(resolve, reject);
      }
    });
  };
}