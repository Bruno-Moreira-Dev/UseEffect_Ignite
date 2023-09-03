import { useEffect, useState } from 'react'

function avisarAPI() {
  console.log('Lista salva!')
}

export function App() {
  const [list, setList] = useState<string[]>([]);

  const [filter, setFilter] = useState('');

  const filteredList = list.filter(item => item.toUpperCase().includes(filter.toUpperCase()));

  useEffect(() => {
    if (list.length !== 0) {
      avisarAPI();
    }
  }, [list]);

  useEffect(() => {
    fetch('https://api.github.com/users/Bruno-Moreira-Dev/repos')
      .then(response => response.json())
      .then(data => {
        setList(data.map((item: any) => item.full_name))
      })
  }, []);

  function addToList() {
    setList(state => [...state, 'Novo item']);
  }

  return (
    <div>
      <input 
        type="text" 
        value={filter} 
        onChange={e => setFilter(e.target.value)}
      />

      <h4>List</h4>
      <ul>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <h4>Filtered List</h4>
      <ul>
        {filteredList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <button onClick={addToList}>Add to List</button>
    </div>
  )
}
