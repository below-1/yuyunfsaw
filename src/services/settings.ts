import { Rules } from '@/model/Rules'
import defaultFuzzyRules from '@/model/defaultFuzzyRules'

const PREFIX = 'yuyun:fsaw'

const APP_NAME = `${PREFIX}:app-name`
const APP_DESCRIPTION = `${PREFIX}:app-description`
const WEIGHTS = `${PREFIX}:weights`
const DATASETS = `${PREFIX}:datasets`
const ACTIVE_DATASETS = `${PREFIX}:dataset-active`
const USERNAME = `${PREFIX}:username`
const PASSWORD = `${PREFIX}:password`
const LOGGED_IN = `${PREFIX}:logged-in`

class Settings {
  private _appName?: string = undefined
  private _description?: string = undefined
  private _weights?: Rules = undefined
  private _datasets?: string[] = undefined
  private _activeDataset?: string = undefined
  private _username?: string = undefined
  private _password?: string = undefined
  private _loggedIn?: boolean = undefined

  get appName() : string {
    if (this._appName === undefined) {
      const s = localStorage.getItem(APP_NAME)
      this._appName = (s === null) ? 'FSAW' : s
    }
    return this._appName
  }

  set appName(name: string) {
    localStorage.setItem(APP_NAME, name)
    this._appName = name
  }

  get description(): string {
    if (this._description === undefined) {
      const s = localStorage.getItem(APP_DESCRIPTION)
      this._description = (s === null) ? 'Good Thing' : s
    }
    return this._description
  }

  set description(s: string) {
    localStorage.setItem(APP_DESCRIPTION, s)
    console.log('HERE')
    this._description = s
  }

  get weights () : Rules {
    if (this._weights === undefined) {
      const wsRaw = localStorage.getItem(WEIGHTS)
      this._weights = (wsRaw === null) ? defaultFuzzyRules : (JSON.parse(wsRaw) as Rules)
    }
    return this._weights
  }

  set weights (ws: Rules) {
    localStorage.setItem(WEIGHTS, JSON.stringify(ws))
    this._weights = ws
  }

  get datasets () : string[] {
    if (this._datasets === undefined) {
      const s = localStorage.getItem(DATASETS)
      this._datasets = (s === null) ? ['main'] : (JSON.parse(s) as string[])
    }
    return this._datasets
  }

  set datasets (ds: string[]) {
    localStorage.setItem(DATASETS, JSON.stringify(ds))
    this._datasets = ds
  }

  get activeDataset () : string {
    if (this._activeDataset === undefined) {
      const s = localStorage.getItem(ACTIVE_DATASETS)
      this._activeDataset = (s === null) ? 'main' : s
    }
    return this._activeDataset
  }

  set activeDataset (s: string) {
    localStorage.setItem(ACTIVE_DATASETS, s)
    this._activeDataset = s
  }

  get username () : string {
    if (this._username === undefined) {
      const s = localStorage.getItem(USERNAME)
      this._username = (s === null) ? 'yuyun' : s
    }
    return this._username
  }

  set username (s: string) {
    localStorage.setItem(USERNAME, s)
    this._username = s
  }

  get password () : string {
    if (this._password === undefined) {
      const s = localStorage.getItem(PASSWORD)
      this._password = (s === null) ? 'yuyun' : s
    }
    return this._password
  }

  set password (s: string) {
    localStorage.setItem(PASSWORD, s)
    this._password = s
  }

  get loggedIn () : boolean {
    if (this._loggedIn === undefined) {
      const s = localStorage.getItem(LOGGED_IN)
      this._loggedIn = (s === null) ? false : (JSON.parse(s) as boolean)
    }
    return this._loggedIn
  }

  set loggedIn (v: boolean) {
    localStorage.setItem(LOGGED_IN, JSON.stringify(v))
    this._loggedIn = v
  }
}

export default new Settings()
