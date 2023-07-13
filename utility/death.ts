export default function death(key: string, mins: number) {
    const minutes: number = mins * 60 * 1000;
    const failureMsg: string = "this did not work";
  
    const removeItem = () => {
      localStorage.removeItem(key);
      const item = localStorage.getItem(key);
      if (item !== null) {
        localStorage.removeItem(item);
      }
    };
  
    const StorageKeyPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(removeItem);
      }, minutes);
    });
  
    return StorageKeyPromise
      .then(() => {
        return "success";
      })
      .catch((err: any) => {
        return failureMsg;
      });
  }
  