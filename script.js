const useCustomCookies = () => {
  const store = new Map();

  Object.defineProperty(document, "myCookie", {
    configurable: true,

    set(val) {
      const { key, value, options } = parseCookieString(val);

      let expiry = Infinity;
      if (options["max-age"]) {
        expiry = Date.now() + options["max-age"] * 1000;
      }

      store.set(key, { value, expiry });
    },

    get() {
      const time = Date.now();
      const cookies = [];

      for (let [key, { value, expiry }] of store) {
        if (expiry <= time) {
          store.delete(key);
        } else {
          cookies.push(`${key}=${value}`);
        }
      }

      return cookies.join("; ");
    },
  });

  const parseCookieString = (str) => {
    const [nameValue, ...rest] = str.split(";");

    const [key, value] = separateKeyValue(nameValue);

    const options = {};
    for (let option of rest) {
      const [key, value] = separateKeyValue(option);

      options[key] = value;
    }

    return { key, value, options };
  };

  const separateKeyValue = (str) => {
    return str.split("=").map((s) => s.trim());
  };
};

const cookies = document.querySelector(".cookies");
useCustomCookies();

document.myCookie = "name=yash;max-age=1";
document.myCookie = "height=5'8;max-age=2";
document.myCookie = "weight=60kg;max-age=3";
document.myCookie = "age=24";

cookies.innerHTML = document.myCookie;

setTimeout(() => {
  cookies.innerHTML = document.myCookie;
}, 500);

setTimeout(() => {
  cookies.innerHTML = document.myCookie;
}, 1500);

setTimeout(() => {
  cookies.innerHTML = document.myCookie;
}, 2500);
