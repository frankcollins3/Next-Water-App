// CSS interfaces
export interface TopRightBottomLeft { top: number | null, right: number | null, bottom: number | null, left: number | null } 

export interface User { id: number, google_id: string, icon: string, username: string, password: string, email: string, age: number, token: string }
export interface SelectedIconImgStr { img: string }

export interface MainInterface {
    HYDRO_SETTINGS: boolean;
}

export interface DynamicComponents {    
    margin: TopRightBottomLeft | null,
    padding: TopRightBottomLeft | null,
    height: string | number | null | undefined,
    width: string | number | null | undefined,
    elementId: string | null | undefined,
    elementClassname: string | null | undefined,    
    style: string | null // take stringnifiedString only as args like localStorage
    //     
};

export interface City {
    city: string,
    zip: number,
    currConditions: string | null | undefined
}

export interface SettingsInterface { id:number, age:number, height:number, weight:number, start_time:number, end_time:number, reminder:number, activity:number, users_id:number }

export interface SettingsSizeDimensions { margin: TopRightBottomLeft, height: number, width: number }

export interface HydroDataInterface { id:number, google_id:string, date:string, progress:number, weekday:string, status:string[], users_id:number }