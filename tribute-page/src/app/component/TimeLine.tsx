import data from "../../data.json";

interface arrayType {
  year : string;
  article : string;
}

interface quotesType {
  quote : string
}
interface dataType {
    youth : arrayType[];
    activism : arrayType[];
    legacy : arrayType[];
    quotes : quotesType[]
}


interface timeType {
   text : string;
   location : dataType;
   array : arrayType[]
}

const TimeLine = ({text, location, array} : timeType) => {
  return (
    <div>
      <ul className="">
        <p className=" bg-black w-[95%] text-center mx-auto py-1 text-lg rounded-xl my-2">
          {text}
        </p>
        {/* {data.location.map((item : arrayType ) => (
          <li className=" list-disc text-sm w-[85%] mx-auto">
            <span>{item.year}</span>
            <span>{item.article}</span>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default TimeLine;
