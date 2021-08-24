import './App.css';

function Card({ repo }) {
  // calculate date Difference
  function dateDifference(date) {
    return Math.ceil((Date.now() - date) / 8.64e7);
  }
  return (
    <div className="card">
      <img src={repo.owner.avatar_url} className="cardImg" alt="avatar" />
      <div className="cardData">
        <h2 className="cardTitle">{repo.name}</h2>
        <p>{repo.description}</p>
        <div className="cardSubDes">
          <div className="cardSubDesLable">stars: {repo.stargazers_count}</div>
          <div className="cardSubDesLable">issues: {repo.open_issues_count} </div>
          submitted {dateDifference(Date.parse(repo.created_at))} days ago by {repo.owner.login}
        </div>
      </div>
    </div>
  );
}

export default Card;
