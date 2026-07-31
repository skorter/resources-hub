const fetchPromise = fetch("http://localhost:3000");

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

const getResources = async () => {
  const response = await fetch("http://localhost:3000/resources", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export { getResources };
