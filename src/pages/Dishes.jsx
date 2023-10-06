import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '@/components/Loading'
import logoImage from '@/images/logo.png';
import Navbar from "@/components/Navbar"; 
import "../scss/styles.scss"
import cartService from '../utils/cart';


const Dishes = () => {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dishes/')
      .then((res) => setDishes(res.data.results));
  }, []);


  return (
  
    <div className="containerStyle">
      <div className="header">
        <div className='header-line'>
          <div className="header-logo">
            <img src={logoImage} alt="" />
          </div>
        
          <Navbar />
        </div>
      
        
        
        {dishes ? (
          <div className="ContainerV2" >
            {dishes.map((dish) => (
              <div key={dish.id} className="CardStyle">
                <Link to={`/dishes/${dish.id}`}>
                  <img src={dish.image} alt={dish.name}className="CardImageStyle" />
                  <p className="CardDiscriptionStyle">{dish.name}</p>
                  <p className="CardDiscriptionStyle">{dish.price}</p>
                </Link>
                
                <button className="CardDiscriptionStyleAdd" onClick={() => cartService.addToCart(dish)}>Add to cart</button>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Dishes;
