// CSS interfaces
export interface topRightBottomLeftINTERFACE { top: number, right: number, bottom: number, left: number } 
// export interface paddingINTERFACE { }
// end of CSS interfaces 

export interface UsersLoginInterface { id: number, google_id: string, icon: string, username: string, password: string, email: string, age: number, token: string }

export interface SelectedIconImgStr { img: string }

export interface MainInterface {
    HYDRO_SETTINGS: boolean;
}

export interface SettingsInterface { id:number, age:number, height:number, weight:number, start_time:number, end_time:number, reminder:number, activity:number, users_id:number }


export interface SettingsSizeDimensions { margin: topRightBottomLeftINTERFACE, height: number, width: number }

export interface HydroDataInterface { id:number, google_id:string, date:string, progress:number, weekday:string, status:string[], users_id:number }
