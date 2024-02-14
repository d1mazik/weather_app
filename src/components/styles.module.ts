import styled from "styled-components";


export const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 100vh;
    padding-left: 20px; 
      
  
  .container {
    background: linear-gradient(to right, #c7c7eb, #ccf2dd);
    border-radius: 20px;
    padding: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .searchArea {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }


  .searchArea > input {
    padding-right: 40px;
    outline: none;
    border: none;
    border: 1px solid grey;
    padding: 8px;
    border-radius: 20px;
    text-align: center;
    width: 80%;
    background: transparent;
  }

  .searchCircle {
    border: 1px solid grey;
    width: 30px; 
    height: 30px; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;


  > .searchIcon {
    font-size: 20px;
    color: grey;
    }
  }

  .locationIcon {
    position: absolute; 
    right: 55px; 
    top: 50%; // Centrera vertikalt
    transform: translateY(-50%); 
    cursor: pointer; 
    color: grey; 
    font-size: 20px; 
  }


.weatherArea {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;


> .icon {
  font-size: 8rem;
}


> h1 {
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
}


> span {
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
}


> h1 {
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}
}


.bottomInfoArea {
display: flex;
align-items: center;
justify-content: space-around;
font-family: "Roboto", sans-serif;
margin: 0px;
background: linear-gradient(
90deg,
background: linear-gradient(to right, #c7c7eb, #ccf2dd);
);

border-radius: 15px;
padding: 1px;
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
}

.humidityLevel,
.wind {
display: flex;
align-items: center;
margin: 0 15px;

> .humidIcon {
font-size: 3rem;
}
}

.windIcon {
font-size: 2rem;
margin-right: 10px;
}


@keyframes spin {
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
}
`;

export const WidgetCompactView = styled.div`
  cursor: pointer;
  border-radius: 20px;
  background: linear-gradient(to right, #c7c7eb, #ccf2dd);
  padding: 15px;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  width: 120px; 
  position: absolute;
  left: 20px; 
  top: 20px;
  box-shadow: 0 10px 15px rgb(0 0 0 / 30%);

  .temp {
    font-size: 1.5rem; 
    color: #000;
  }
  
  .iconWrapper {
    margin-left: 5px; 
    display: flex; 
    justify-content: center; 
    font-size: 3rem; 
  }

  .weatherDataName {
    margin-top: 1px; 
    font-size: 1.2rem; 
    color: #000; 
    text-align: center;
  }
`;

export const BackButton = styled.button`
  cursor: pointer;
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(to right, #c7c7eb, #ccf2dd);
  color: black;
  border: none;
  text-align: center;
  font-size: 1rem; 
  width: fit-content;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  font-family: "Roboto", sans-serif;
`;












