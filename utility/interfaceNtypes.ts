// type Pokemon = { name: String }
export interface PokemonInterface { name: String }

export interface UsersLoginInterface { id: number, google_id: string, icon: string, username: string, password: string, email: string, age: number, token: string }

export interface SelectedIconImgStr { img: string }

export interface MainInterface {
    HYDRO_SETTINGS: boolean;
}

export interface SettingsInterface { id:number, age:number, height:number, weight:number, start_time:number, end_time:number, reminder:number, activity:number, users_id:number }

