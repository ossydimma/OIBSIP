import data from '../data.json'

export default function Home() {
  fetch('../data.json')
    .then(res => res.json())
    .then(data => console.log(data))
  return (
    <div>
      {/* { data.quotes.map((quote)=> ( <p>{quote}</p>))} */}
    </div>
  );
}
