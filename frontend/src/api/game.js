import client from './client';

export const music = async () => {
  const res = await client.post('game/game');
  console.log(res);
  return res;
};

export const detail = async (songID) => {
  const res = await client.get(`game/game/${songID}`);
  return res;
};

export const maxScore = async (score, songId) => {
  const res = await client.post('game/game/score', {
    params: {
      score: score,
      songId: songId
    }
  })
  return res
}