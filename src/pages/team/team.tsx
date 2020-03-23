import React, {useEffect} from "react";
import { observer } from 'mobx-react-lite'
import { history } from "../../index";
import { mainContainer } from "../../models/inversify.config";
import { TYPES } from "../../models/types";
import { PlayersStoreModel } from "../../models/players.model";
import { GamesStoreModel } from "../../models/games.model";
import { List, Avatar } from 'antd';

const playersStore = mainContainer.get<PlayersStoreModel>(TYPES.PlayersStoreModel);
const gamesStore = mainContainer.get<GamesStoreModel>(TYPES.GamesStoreModel);

const TeamComponent = observer(({match}: {match: {params: {id: string}}}) => {
  const id = match.params.id

  useEffect(() => {
    playersStore.getPlayers(id);
    gamesStore.getGames(id);
  }, [id])

  const playerToogle = (id: string) => {
    history.push(`/player/${id}`)
  }

  if (!gamesStore.games || !gamesStore.games.length) {
    return <h1>Test</h1>;
  }

  return (
    <div style={{display: 'flex'}}>
      <List
        header={<div>Players</div>}
        itemLayout="horizontal"
        dataSource={playersStore.players}
        renderItem={(item: any) => (
          <List.Item onClick={() => playerToogle(item.id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.flag_url} />}
              title={item.name}
              description={`nationality - ${item.nationality}`}
            />
          </List.Item>
        )}
      />
      <List
        header={<div>Games</div>}
        itemLayout="horizontal"
        dataSource={gamesStore.games}
        style={{marginLeft: 30}}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={<div>
                {gamesStore.getTeamNameById(item.team_one_id) + ' -- ' + gamesStore.getTeamNameById(item.team_two_id)}
                {/* {R.find(R.propEq('id', item.team_one_id))(teamsStore.teams).name + ' - ' + R.find(R.propEq('id', item.team_two_id))(teamsStore.teams).name} */}
              </div>}
              description={`${item.team_one_goals} - ${item.team_two_goals}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
});

export default TeamComponent;
