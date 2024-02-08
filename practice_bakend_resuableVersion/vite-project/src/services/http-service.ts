import appClient from "./api_client";


class HttpService {
    endpoint:string;

    constructor(endpoint:string) {
            this.endpoint = endpoint
    }

  getAll<T>() {
    const controller = new AbortController();
   const request =  appClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return {request,cancel : ()=> controller.abort()}
  }

  delete (id:number){
    return appClient.delete(this.endpoint+'/'+id)
  }

  create<T>(entity:T){
    return appClient.post(this.endpoint,entity)
  }

  update<T>(id:number,entity:T){
   return  appClient.patch(this.endpoint+"/" + id, entity)
  }
}

const create = (endpoint:string) => new HttpService(endpoint)

export default create;