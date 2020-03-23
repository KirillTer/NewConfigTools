import { observable, action } from 'mobx'
import * as R from 'ramda'
import { injectable } from "inversify"
import "reflect-metadata";
import { observableMain$ } from '../api'
import { Teams, TeamsStoreModel } from '../models/teams.model'

@injectable()
class TeamsStore implements TeamsStoreModel {
  @observable public teams: Teams | any = [];

  @action
  public async getTeams(): Promise<void> {
    // try {
    //   this.teams = await fetchMainApi();
    // } catch (response) {
    //   alert(response.message);
    // }
    // observableMain$.subscribe({
    //   next: (x) => { 
    //     this.teams = x
    //   },
    //   error: (err) => { console.error('something wrong occurred: ' + err) }
    // })
  }

  public getNameById(id: string): string {
    // console.log('Teams Store -', id, this.teams)
    // this.getTeams()
    return this.teams.length ? R.find(R.propEq('id', id))(this.teams).name : []
  }
}

export { TeamsStore }
