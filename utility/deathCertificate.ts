export default function deathCertificate(key: string, value: string, minutes: number, die:boolean) {
    const actualMinutes: number = minutes * 60 * 1000;
    const removeItem = () => localStorage.removeItem(key);
    const item = {
      value: value,
      expirationDate: minutes,
    };
  
    const deathPromise = new Promise<void>((resolve, reject,) => {
      localStorage.setItem(key, JSON.stringify(item));
      resolve(); // Resolve without any value since the operation is synchronous
      // reject(console.log(localStorage.getItem(key))); // You might not need this rejection
    });
  
    deathPromise.then(() => {
      if (die) {
        setTimeout(() => {
          removeItem();
        }, actualMinutes);
      } else {
        return
      }
    });
  
    return deathPromise;
  } 
