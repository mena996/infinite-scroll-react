import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const [reposData, setReposData] = useState([]);
  const [page, setPage] = useState(1);
  const [dataTotalcount, setDataTotalcount] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  
  // call api when new page change page state change
  useEffect(() => {
    fetch(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`)
      .then(response => response.json())
      .then(data => { 
        data.items && setReposData([...reposData, ...data.items]);
        setDataTotalcount(data.total_count);
        setLoadMore(false);
       });
  }, [page]);

  // add page by one when user reach to the page end 
  useEffect(() => {
    if (loadMore) {
      setPage(page + 1);
    }
  }, [loadMore]);

  // raise flage that user reached to page end and there is more data to view
  function handleOnscroll(e) {
    const currentScrollPostion = e.target.scrollTop + e.target.offsetHeight;
    if (currentScrollPostion + 30 > e.target.scrollHeight && dataTotalcount > reposData.length) {
      setLoadMore(true);
    }
  }

  return (
    <div className="App" onScroll={handleOnscroll}>
      {reposData.map((repo,index) => (
        // add index to node_id becuse api returns redundant data
        <Card key={repo.node_id+index} repo={repo} />
      ))}
      {loadMore && <div className="loader"></div>}
    </div>
  );
}

export default App;
