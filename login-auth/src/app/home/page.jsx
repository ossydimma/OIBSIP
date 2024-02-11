 'use client'
 const page = () => {
  const storedData = JSON.parse(localStorage.getItem("userInfo"));
  return (
      <div>
        <h1>Secured Page</h1>
        <p> <span className="name">{storedData.userName}</span> Welcome to the secured page</p>
      </div>
  );
};

export default page