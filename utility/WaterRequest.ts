export default async function WaterRequest(url:object, options:any) {   // instead of options:object which won't give viability to accessing object endpoints.
    const API = "http://localhost:5000/"
      // get the code from local storage via the key UWU_TOKEN
    //   const userToken = localStorage.getItem('WAPPTOKEN');
         const userToken = "H20TOKEN"
    
      // send the google_id as a custom header
      const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-WAPP-User': userToken,
      };
    
      const response = await fetch(`${url}`, { ...options, headers });
    //   const response = await fetch(`${API}${url}`, { ...options, headers });
      console.log('response')
      console.log(response)
    
      if (response.status === 401){
        return "401"
      }
    //   const contentType = response.headers.get('Content-Type');
    
    //   if (contentType && contentType.includes('application/json')) {
    //     return response.json();
    //   }
        return response.json();
    
        // return "H 2 0"
    }