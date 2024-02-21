
interface arrayType {
  year : string;
  article : string;
}

interface timeType {
   text : string;
   store : arrayType[]
}

const TimeLine = ({text, store} : timeType) => {
  
  const timeLine = store
  return (
      <ul >
        <p className=" bg-black w-[95%] text-center mx-auto py-1 text-lg rounded-xl my-2">
          {text}
        </p>
        {timeLine.map(( item ) => (
          <li className=" list-disc text-sm w-[85%] mx-auto">
            <span>{item.year}</span>
            <span>{item.article}</span>
          </li>
        ))}
      </ul>
  );
};

export default TimeLine;
